// src/infra/http/httpClient.ts
import axios from "axios";
import { tokenStorage, clearAllStorage } from "@/infra/storage/localStorage";
import { env } from "@/config/env"; // ✅ import env

export const httpClient = axios.create({
  baseURL: env.API_BASE_URL, // ✅ was hardcoded
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
        if (!refreshToken) throw new Error("No refresh token");

        // ✅ was hardcoded URL
        const { data } = await axios.post(
          `${env.API_BASE_URL}/api/token/refresh/`,
          { refresh: refreshToken }
        );

        tokenStorage.setAccessToken(data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return httpClient(originalRequest);

      } catch (refreshError) {
        clearAllStorage();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);