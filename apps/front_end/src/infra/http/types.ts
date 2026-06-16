import { AxiosError, InternalAxiosRequestConfig } from "axios";

export interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export interface RefreshResponse {
  access: string;
}

export interface ApiErrorResponse {
  detail?: string;
  message?: string;
  code?: string;
}

export type HttpError = AxiosError<ApiErrorResponse>;
