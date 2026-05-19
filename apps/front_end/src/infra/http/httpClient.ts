// src/infra/http/httpClient.ts
import axios from "axios";
import { tokenStorage, clearAllStorage } from "@/infra/storage/cookieStorage";
import { env } from "@/config/env";

export const httpClient = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
});

// REQUEST INTERCEPTOR
httpClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE INTERCEPTOR
httpClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = tokenStorage.getRefreshToken();
        if (!refreshToken) {
          clearAllStorage();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const refreshClient = axios.create({
          baseURL: env.API_BASE_URL,
          withCredentials: true,
        });

        const { data } = await refreshClient.post(
          "/api/token/refresh/",
          { refresh: refreshToken }
        );

        if (data.access) {
          tokenStorage.setAccessToken(data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return httpClient(originalRequest);
        } else {
          clearAllStorage();
          window.location.href = "/login";
          return Promise.reject(error);
        }

      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        clearAllStorage();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);