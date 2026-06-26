import { axiosInstance } from "../client/axiosInstance";
import { runRefresh } from "./refreshManager";
import { addToQueue, resolveQueue, rejectQueue } from "./retryQueue";
import { logout } from "../auth/logout";

let isRefreshing = false;

export function responseInterceptor(error: any) {
  const originalRequest = error.config;

  if (!originalRequest) {
    return Promise.reject(error);
  }

  const url = originalRequest.url ?? "";

  // ❌ never intercept auth routes
  const isAuthRoute =
    url.includes("/token/") ||
    url.includes("/refresh/") ||
    url.includes("/login/") ||
    url.includes("/logout/");

  if (isAuthRoute) {
    return Promise.reject(error);
  }

  // ❌ only handle 401
  if (error.response?.status !== 401) {
    return Promise.reject(error);
  }

  // ❌ prevent infinite loop
  if (originalRequest._retry) {
    return Promise.reject(error);
  }

  originalRequest._retry = true;

  // ⏳ if refresh already running → queue request
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
      logout();
      return Promise.reject(err);
    })
    .finally(() => {
      isRefreshing = false;
    });
}