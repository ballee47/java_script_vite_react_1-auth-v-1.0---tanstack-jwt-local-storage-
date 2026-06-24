
import { axiosInstance } from "../client/axiosInstance";
import { runRefresh } from "./refreshManager";
import { addToQueue, resolveQueue, rejectQueue } from "./retryQueue";
import { logger } from "../logger/logger";
import { logout } from "../auth/logout";

let isRefreshing = false;

export function responseInterceptor(error: any) {
  const originalRequest = error.config;

  if (!originalRequest) {
    return Promise.reject(error);
  }

  const url = originalRequest.url ?? "";

  /**
   * Routes that should NEVER trigger refresh logic
   */
  const isAuthRoute =
    url.includes("/api/token/") ||
    url.includes("/api/token/refresh/") ||
    url.includes("/api/register/") ||
    url.includes("/api/logout/") ||
    url.includes("/api/me/") ||
    url.includes("/api/csrf/");

  if (isAuthRoute) {
    return Promise.reject(error);
  }

  /**
   * Only handle 401 responses
   */
  if (error.response?.status !== 401) {
    return Promise.reject(error);
  }

  /**
   * Prevent infinite retry loop
   */
  if (originalRequest._retry) {
    return Promise.reject(error);
  }

  originalRequest._retry = true;

  /**
   * Queue requests while refresh is running
   */
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      addToQueue({
        resolve: () => resolve(axiosInstance(originalRequest)),
        reject,
      });
    });
  }

  isRefreshing = true;

  return runRefresh()
    .then(() => {
      resolveQueue();
      return axiosInstance(originalRequest);
    })
    .catch((err) => {
      rejectQueue(err);

      logger.error("Session expired", err);

      logout();

      return Promise.reject(err);
    })
    .finally(() => {
      isRefreshing = false;
    });
}

