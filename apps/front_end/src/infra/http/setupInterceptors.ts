import { httpClient } from "./httpClient";
import { logger } from "./logger";
import { RetryableRequestConfig } from "./types";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

export const setupInterceptors = () => {
  httpClient.interceptors.response.use(
    (res) => res,

    async (error) => {
      const originalRequest = error.config;

      if (!originalRequest || originalRequest._retry) {
        return Promise.reject(error);
      }

      const url = originalRequest.url || "";

      // ❌ NEVER TOUCH AUTH ROUTES
      if (
        url.includes("/api/token/") ||
        url.includes("/api/register/")
      ) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401) {
        originalRequest._retry = true;

        try {
          await httpClient.post("/api/token/refresh/");
          return httpClient(originalRequest);
        } catch (err) {
          window.location.href = "/login";
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};