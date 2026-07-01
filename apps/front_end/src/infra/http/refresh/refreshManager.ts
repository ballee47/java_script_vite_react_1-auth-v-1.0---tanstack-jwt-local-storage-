import { axiosInstance } from "../client/axiosInstance";

import {
  isRefreshing,
  getRefreshPromise,
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
 * Handles a request that failed with 401.
 */
export async function handle401(
  request: InternalRequestConfig
) {
  // Another refresh is already running.
  // Queue this request.
  if (isRefreshing()) {
    return new Promise((resolve, reject) => {
      enqueue({
        resolve: () => resolve(axiosInstance(request)),
        reject,
        createdAt: Date.now(),
      });
    });
  }

  // Start a new refresh operation.
  const refresh = executeRefresh();

  setRefreshPromise(refresh);

  try {
    await refresh;

    resolveAll();

    return axiosInstance(request);
  } catch (error) {
    rejectAll(error);

    await expireSession();

    throw error;
  } finally {
    clearRefreshPromise();
  }
}