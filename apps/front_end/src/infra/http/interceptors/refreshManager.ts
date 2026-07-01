import { refreshToken } from "../auth/refreshToken";

let refreshPromise: Promise<void> | null = null;

/**
 * Returns true when a token refresh is currently running.
 */
export function isRefreshing(): boolean {
  return refreshPromise !== null;
}

/**
 * Returns the active refresh promise.
 * If no refresh is running, starts one.
 */
export function runRefresh(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = refreshToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

/**
 * Returns the current refresh promise without creating one.
 */
export function getRefreshPromise(): Promise<void> | null {
  return refreshPromise;
}