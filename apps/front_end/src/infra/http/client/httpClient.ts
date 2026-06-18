import { axiosInstance } from "./axiosInstance";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Generic request handler (core wrapper)
 */
const request = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> =
    await axiosInstance.request<T>(config);

  return response.data;};

/**
 * HTTP CLIENT (enterprise-style abstraction)
 */
export const httpClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: "GET", url }),

  post: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) =>
    request<T>({
      ...config,
      method: "POST",
      url,
      data,
    }),

  put: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) =>
    request<T>({
      ...config,
      method: "PUT",
      url,
      data,
    }),

  patch: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) =>
    request<T>({
      ...config,
      method: "PATCH",
      url,
      data,
    }),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: "DELETE", url }),
};