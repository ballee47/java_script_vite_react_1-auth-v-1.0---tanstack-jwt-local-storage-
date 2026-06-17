import { refreshToken } from "../auth/refreshToken";

let refreshPromise: Promise<void> | null = null;

export function runRefresh() {
  if (!refreshPromise) {
    refreshPromise = refreshToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}