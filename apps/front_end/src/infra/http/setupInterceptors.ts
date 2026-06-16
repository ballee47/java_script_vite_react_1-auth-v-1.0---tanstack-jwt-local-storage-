// src/infra/http/setupInterceptors.ts

import { AxiosError } from "axios";
import { httpClient } from "./httpClient";
import { logger } from "./logger";
import { RetryableRequestConfig } from "./types";

let interceptorInitialized = false;

let isRefreshing = false;

let failedQueue: Array<{
  resolve: () => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error?: unknown) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

export const setupInterceptors = (): void => {
  // Prevent duplicate interceptor registration
  if (interceptorInitialized) return;

  interceptorInitialized = true;

  httpClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
      const originalRequest =
        error.config as RetryableRequestConfig;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      const url = originalRequest.url ?? "";

      // --------------------------------------------------
      // Never intercept authentication endpoints
      // --------------------------------------------------
      const isAuthEndpoint =
        url.includes("/api/token/") ||
        url.includes("/api/token/refresh/") ||
        url.includes("/api/register/");

      if (isAuthEndpoint) {
        return Promise.reject(error);
      }

      // --------------------------------------------------
      // Only handle 401 errors
      // --------------------------------------------------
      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }

      // --------------------------------------------------
      // Prevent infinite retry loop
      // --------------------------------------------------
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // --------------------------------------------------
      // Refresh already in progress
      // --------------------------------------------------
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => {
              resolve(httpClient(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        logger.info("Refreshing access token...");

        await httpClient.post("/api/token/refresh/");

        logger.info("Token refresh successful");

        processQueue();

        return httpClient(originalRequest);
      } catch (refreshError) {
        logger.error(
          "Token refresh failed",
          refreshError
        );

        processQueue(refreshError);

        // Force logout
        window.location.replace("/login");

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
};