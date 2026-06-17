import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { axiosInstance } from "@/client/axiosInstance";
import { refreshAccessToken } from "@/auth/refreshToken";
import { attachToken } from "@/auth/attachToken";
import { logout } from "@/auth/logout";
import { logger } from "@/@/logger/logger";

let isInterceptorInitialized = false;
let isRefreshing = false;

type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let failedQueue: QueueItem[] = [];

/**
 * Process queued requests after refresh completes
 */
const processQueue = (error: unknown | null, token?: string) => {
  failedQueue.forEach((item) => {
    if (error || !token) {
      item.reject(error);
    } else {
      item.resolve(token);
    }
  });

  failedQueue = [];
};

export const setupInterceptors = () => {
  if (isInterceptorInitialized) return;
  isInterceptorInitialized = true;

  /**
   * REQUEST INTERCEPTOR
   */
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem("access_token");

      if (token) {
        attachToken(config, token);
      }

      return config;
    }
  );

  /**
   * RESPONSE INTERCEPTOR
   */
  axiosInstance.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
      const originalRequest: any = error.config;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      const url = originalRequest.url ?? "";

      /**
       * Skip auth endpoints
       */
      const isAuthRoute =
        url.includes("/api/token/") ||
        url.includes("/api/register/");

      if (isAuthRoute) {
        return Promise.reject(error);
      }

      /**
       * Only handle 401 errors
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
       * If refresh already running → queue request
       */
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization =
                `Bearer ${token}`;

              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        logger.info("Refreshing token...");

        const newToken = await refreshAccessToken();

        logger.info("Token refreshed");

        processQueue(null, newToken);

        originalRequest.headers.Authorization =
          `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        logger.error("Refresh failed", refreshError);

        processQueue(refreshError, undefined);

        logout(); // clean auth exit

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
};