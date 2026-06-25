import { getCsrfToken } from "../security/csrf";

export function requestInterceptor(config: any) {
  config.withCredentials = true;

  config.headers = config.headers ?? {};

  const method = config.method?.toUpperCase();

  const isUnsafeMethod =
    method === "POST" ||
    method === "PUT" ||
    method === "PATCH" ||
    method === "DELETE";

  if (isUnsafeMethod) {
    const csrfToken = getCsrfToken();

    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
  }

  return config;
}