import { getCsrfToken } from "../security/csrf";

export function requestInterceptor(config: any) {
  config.withCredentials = true;

  const token = getCsrfToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers["X-CSRFToken"] = token;
  }

  return config;
}