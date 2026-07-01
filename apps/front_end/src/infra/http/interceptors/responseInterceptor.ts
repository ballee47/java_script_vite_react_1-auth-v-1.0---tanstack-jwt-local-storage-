import { AxiosError } from "axios";
import { axiosInstance } from "../client/axiosInstance";
import { logout } from "../auth/logout";
import { runRefresh } from "./refreshManager";
import { addToQueue, rejectQueue, resolveQueue } from "./retryQueue";
import { AUTH_ROUTES } from "../auth/authRoutes";
import { InternalRequestConfig } from "../types/request/internalRequestConfig";

let isRefreshing = false;

export async function responseInterceptor(error: AxiosError) {
  const originalRequest =
    error.config as InternalRequestConfig | undefined;

  // Request doesn't exist
  if (!originalRequest) {
    return Promise.reject(error);
  }

  // Network / DNS / Timeout
  if (!error.response) {
    return Promise.reject(error);
  }

  // Request was cancelled
  if (error.code === "ERR_CANCELED") {
    return Promise.reject(error);
  }

  const url = originalRequest.url ?? "";

  // Never refresh auth endpoints
  const isAuthRoute = AUTH_ROUTES.some(route =>
    url.includes(route)
  );

  if (isAuthRoute) {
    return Promise.reject(error);
  }

  // Only refresh on Unauthorized
  if (error.response.status !== 401) {
    return Promise.reject(error);
  }

  // Prevent infinite retry loop
  if (originalRequest._retry) {
    return Promise.reject(error);
  }

  originalRequest._retry = true;

  // Another refresh is already running.
  // Wait until it completes.
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      addToQueue({
        resolve: () => resolve(axiosInstance(originalRequest)),
        reject,
      });
    });
  }

  isRefreshing = true;

  try {
    await runRefresh();

    resolveQueue();

    return axiosInstance(originalRequest);
  } catch (err) {
    rejectQueue(err);

    logout();

    return Promise.reject(err);
  } finally {
    isRefreshing = false;
  }
}