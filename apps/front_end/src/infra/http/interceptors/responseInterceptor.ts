import { axiosInstance } from "../client/axiosInstance";
import { runRefresh } from "./refreshManager";
import { addToQueue, resolveQueue, rejectQueue } from "./retryQueue";
import { logout } from "../auth/logout";
import { logger } from "../logger/logger";

let isRefreshing = false;

export function responseInterceptor(error: any) {
  const originalRequest = error.config;

  if (!originalRequest) return Promise.reject(error);

  const url = originalRequest.url ?? "";

  const isAuthRoute =
    url.includes("/auth/login") ||
    url.includes("/auth/register") ||
    url.includes("/auth/refresh") ||
    url.includes("/auth/logout");

  if (isAuthRoute) {
    return Promise.reject(error);
  }

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
      logger.error("Session expired", err);
      logout();
      return Promise.reject(err);
    })
    .finally(() => {
      isRefreshing = false;
    });
}