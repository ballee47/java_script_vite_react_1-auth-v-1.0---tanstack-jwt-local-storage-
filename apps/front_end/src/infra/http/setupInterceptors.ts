import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { httpClient } from "./httpClient";
import { logger } from "./logger";

let isInterceptorInitialized = false;
let isRefreshing = false;

type QueueItem = {
  resolve: (token?: string) => void;
  reject: (error: unknown) => void;
};

let failedQueue: QueueItem[] = [];

/**
 * Process queued requests after refresh completes
 */
const processQueue = (error: unknown | null, token?: string) => {
  failedQueue.forEach((item) => {
    if (error) {
      item.reject(error);
    } else {
      item.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Attach token safely to request
 */
const attachToken = (
  config: InternalAxiosRequestConfig,
  token: string
) => {
  config.headers = config.headers ?? {};
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

/**
 * Refresh token function (isolated for testability)
 */
const refreshAccessToken = async (): Promise<string> => {
  const res = await httpClient.post("/api/token/refresh/");
  return res.data.access_token;
};

export const setupInterceptors = () => {
  if (isInterceptorInitialized) return;
  isInterceptorInitialized = true;

  httpClient.interceptors.request.use((config) => {
    // Optional: attach token from storage on every request
    // const token = tokenStorage.getAccessToken();
    // if (token) attachToken(config, token);

    return config;
  });

  httpClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      const url = originalRequest.url ?? "";

      const isAuthRoute =
        url.includes("/api/token/") ||
        url.includes("/api/register/");

      // ❌ Don't intercept auth endpoints
      if (isAuthRoute) {
        return Promise.reject(error);
      }

      // ❌ Only handle 401
      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }

      // ❌ Prevent retry loops
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      /**
       * If refresh is already running → queue request
       */
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token?: string) => {
              if (token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(httpClient(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        logger.info("Refreshing access token...");

        const newAccessToken = await refreshAccessToken();

        logger.info("Token refreshed successfully");

        // Update queued requests
        processQueue(null, newAccessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return httpClient(originalRequest);
      } catch (refreshError) {
        logger.error("Refresh token failed", refreshError);

        processQueue(refreshError, undefined);

        // ❌ DO NOT hard redirect in enterprise apps
        // Instead let auth layer handle it
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
};