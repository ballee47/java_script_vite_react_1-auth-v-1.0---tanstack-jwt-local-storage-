import { getCsrfToken, shouldAttachCsrf } from "../security/csrf";

export function requestInterceptor(config: any) {
  config.withCredentials = true;

  if (shouldAttachCsrf(config.method)) {
    const token = getCsrfToken();
    if (token) {
      config.headers["X-CSRFToken"] = token;
    }
  }

  return config;
}