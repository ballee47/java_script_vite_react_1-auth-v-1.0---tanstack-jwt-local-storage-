import { axiosInstance } from "../client/axiosInstance";
import {
  isRefreshing,
  setRefreshPromise,
  clearRefreshPromise,
} from "./refreshState";
import { executeRefresh } from "./refreshExecutor";
import {
  enqueue,
  resolveAll,
  rejectAll,
} from "./refreshQueue";
import { expireSession } from "./sessionManager";
import type { InternalRequestConfig } from "../types/request/internalRequestConfig";





/**
 * Handles a request that failed with HTTP 401.
 */
export async function handle401(
  request: InternalRequestConfig
): Promise<unknown> {
  // A refresh operation is already in progress.
  // Queue the request until the refresh completes.
  if (isRefreshing()) {
    return new Promise((resolve, reject) => {
      enqueue({
        resolve: () => resolve(axiosInstance(request)),
        reject,
        createdAt: Date.now(),
      });
    });
  }

  const refreshPromise = executeRefresh();

  setRefreshPromise(refreshPromise);

  try {
    await refreshPromise;

    // Retry every queued request.
    resolveAll();

    // Retry the current request.
    return axiosInstance(request);
  } catch (error) {
    // Reject every queued request.
    rejectAll(error);

    // Expire the user's session.
    await expireSession();

    throw error;
  } finally {
    clearRefreshPromise();
  }
}