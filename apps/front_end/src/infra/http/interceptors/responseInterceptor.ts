import { axiosInstance } from "../client/axiosInstance";
import { runRefresh } from "./refreshManager";
import { addToQueue, resolveQueue, rejectQueue } from "./retryQueue";
import { logger } from "../logger/logger";
import { logout } from "../auth/logout";

let isRefreshing = false;
let isLoggingOut = false;

export function responseInterceptor(error: any) {
  const originalRequest = error.config;

  if (!originalRequest) return Promise.reject(error);

  const url = originalRequest.url ?? "";

  /**
   * FIX: match REAL backend routes
   */
  const isAuthRoute =
    url.includes("/api/token") ||        // login + refresh both start here
    url.includes("/api/register") ||
    url.includes("/api/logout/");

  if (isAuthRoute) {
    return Promise.reject(error);
  }

  /**
   * Only handle 401
   */
  if (error.response?.status !== 401) {
    return Promise.reject(error);
  }

  if (originalRequest._retry) {
    return Promise.reject(error);
  }

  originalRequest._retry = true;

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
      if (isLoggingOut) return Promise.reject(err);

      isLoggingOut = true;
      logger.error("Session expired", err);
      logout();
      return Promise.reject(err);
    })
    .finally(() => {
      isRefreshing = false;
    });
}