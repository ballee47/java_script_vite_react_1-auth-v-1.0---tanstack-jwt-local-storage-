import { getCsrfToken } from "../security/csrf";

export function requestInterceptor(config: any) {
  config.withCredentials = true;

  config.headers = config.headers || {}; // 🔥 IMPORTANT FIX

  const token = getCsrfToken();
  if (token) {
    config.headers["X-CSRFToken"] = token;
  }

  return config;
}
