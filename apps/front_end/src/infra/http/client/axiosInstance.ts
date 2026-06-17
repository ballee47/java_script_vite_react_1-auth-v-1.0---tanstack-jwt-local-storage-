import axios from "axios";
import { httpConfig } from "./config";
import Cookies from "js-cookie";

/**
 * Axios Instance (Enterprise-grade setup)
 * - Cookie-based auth
 * - CSRF protection
 * - Scalable for JWT/session hybrid systems
 */
export const axiosInstance = axios.create({
  baseURL: httpConfig.baseURL,
  timeout: httpConfig.timeout,
  withCredentials: true, // 🔥 REQUIRED for Django cookies (session + CSRF)
});

/**
 * Request Interceptor
 * Handles CSRF automatically for unsafe HTTP methods
 */
axiosInstance.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase();

  const isUnsafeMethod =
    method === "POST" ||
    method === "PUT" ||
    method === "PATCH" ||
    method === "DELETE";

  if (isUnsafeMethod) {
    const csrfToken = Cookies.get("csrftoken"); // using js-cookie (cleaner than document.cookie)

    if (csrfToken) {
      config.headers = config.headers ?? {};
      config.headers["X-CSRFToken"] = csrfToken;
    }
  }

  return config;
});