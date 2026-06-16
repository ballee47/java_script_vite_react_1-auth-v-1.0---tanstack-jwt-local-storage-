import { httpClient } from "./httpClient";
import { tokenStorage } from "@/infra/storage/cookieStorage";
import { refreshAccessToken } from "./refresh";
import { handleAuthFailure } from "./authFailure";
import { logger } from "./logger";
import { RetryableRequestConfig } from "./types";

export const setupInterceptors = () => {
  httpClient.interceptors.request.use(
    (config) => {
      const token = tokenStorage.getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },

    (error) => Promise.reject(error)
  );

  httpClient.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config as RetryableRequestConfig;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const accessToken = await refreshAccessToken();

          originalRequest.headers.Authorization =
            `Bearer ${accessToken}`;

          return httpClient(originalRequest);
        } catch (refreshError) {
          logger.error(
            "Refresh token request failed",
            refreshError
          );

          handleAuthFailure();

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
