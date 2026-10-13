
// src/infra/http/gateway/apiGateway.ts

import { httpClient } from "../client/httpClient";

import type {
  RequestOptions,
  BatchRequest,
} from "../types/gateway";

/* ─────────────────────────────────────────
   API GATEWAY
   ───────────────────────────────────────── */

export const apiGateway = {
  get<TResponse>(
    url: string,
    options?: RequestOptions
  ): Promise<TResponse> {
    return httpClient.request<TResponse>({
      method: "GET",
      url,
      params: options?.params,
      headers: options?.headers,
      timeout: options?.timeout,
      signal: options?.signal,
    });
  },

  post<TResponse, TRequest>(
    url: string,
    data?: TRequest,
    options?: RequestOptions
  ): Promise<TResponse> {
    return httpClient.request<TResponse>({
      method: "POST",
      url,
      data,
      headers: options?.headers,
      timeout: options?.timeout,
      signal: options?.signal,
    });
  },

  put<TResponse, TRequest>(
    url: string,
    data: TRequest,
    options?: RequestOptions
  ): Promise<TResponse> {
    return httpClient.request<TResponse>({
      method: "PUT",
      url,
      data,
      headers: options?.headers,
      timeout: options?.timeout,
      signal: options?.signal,
    });
  },

  patch<TResponse, TRequest>(
    url: string,
    data: TRequest,
    options?: RequestOptions
  ): Promise<TResponse> {
    return httpClient.request<TResponse>({
      method: "PATCH",
      url,
      data,
      headers: options?.headers,
      timeout: options?.timeout,
      signal: options?.signal,
    });
  },

  delete<TResponse>(
    url: string,
    options?: RequestOptions
  ): Promise<TResponse> {
    return httpClient.request<TResponse>({
      method: "DELETE",
      url,
      headers: options?.headers,
      timeout: options?.timeout,
      signal: options?.signal,
    });
  },

  batch<T>(
    requests: BatchRequest<T>
  ): Promise<T[]> {
    return Promise.all(requests);
  },
};
