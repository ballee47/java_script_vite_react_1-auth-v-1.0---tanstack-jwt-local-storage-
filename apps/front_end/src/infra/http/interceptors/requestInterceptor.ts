import { getCsrfToken } from "../security/csrf";
import type { InternalAxiosRequestConfig } from "axios";

export function requestInterceptor(config: InternalAxiosRequestConfig) {
  config.withCredentials = true;

  const token = getCsrfToken();

  if (token) {
    config.headers["X-CSRFToken"] = token;
  }

  return config;
}
