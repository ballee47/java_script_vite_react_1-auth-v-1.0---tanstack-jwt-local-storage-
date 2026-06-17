import { getCsrfToken,  } from "../security/csrf";

export function requestInterceptor(config: any) {
  config.withCredentials = true;

  if (getCsrfToken()) {
    const token = getCsrfToken();
    if (token) {
      config.headers["X-CSRFToken"] = token;
    }
  }

  return config;
}