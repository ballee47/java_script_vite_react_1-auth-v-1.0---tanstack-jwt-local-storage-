import type { AxiosRequestConfig } from "axios";

export interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;

  skipRefresh?: boolean;
}