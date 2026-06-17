import type { InternalAxiosRequestConfig } from "axios";

export function attachToken(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  config.withCredentials = true;

  return config;
}