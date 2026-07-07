// src/infra/http/gateway/apiGateway.ts

import { httpClient } from "../client/httpClient";

import { logger } from "../observability/logger";
import { tracer } from "../observability/tracer";
import { metrics } from "../observability/metrics";

import type {
  RequestOptions,
  BatchRequest,
} from "../types/gateway";

/* ─────────────────────────────────────────
   TRACE WRAPPER
   ───────────────────────────────────────── */

const trace = async <T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> => {
  const span = tracer.startSpan(name);
  const start = performance.now();

  try {
    const result = await fn();

    metrics.timing(
      name,
      performance.now() - start
    );

    span.end();

    return result;
  } catch (error) {
    metrics.increment("api_error");
    span.end();
    throw error;
  }
};

/* ─────────────────────────────────────────
   API GATEWAY
   ───────────────────────────────────────── */

export const apiGateway = {
  get<TResponse>(
    url: string,
    options?: RequestOptions
  ): Promise<TResponse> {
    return trace(`GET ${url}`, async () => {
      logger.info("GET", { url, options });

      return httpClient.request<TResponse>({
        method: "GET",
        url,
        params: options?.params,
        headers: options?.headers,
        timeout: options?.timeout,
        signal: options?.signal,
      });
    });
  },

  post<TResponse, TRequest>(
    url: string,
    data?: TRequest,
    options?: RequestOptions
  ): Promise<TResponse> {
    return trace(`POST ${url}`, async () => {
      logger.info("POST", { url, data, options });

      return httpClient.request<TResponse>({
        method: "POST",
        url,
        data,
        headers: options?.headers,
        timeout: options?.timeout,
        signal: options?.signal,
      });
    });
  },

  put<TResponse, TRequest>(
    url: string,
    data: TRequest,
    options?: RequestOptions
  ): Promise<TResponse> {
    return trace(`PUT ${url}`, async () => {
      logger.info("PUT", { url, data, options });

      return httpClient.request<TResponse>({
        method: "PUT",
        url,
        data,
        headers: options?.headers,
        timeout: options?.timeout,
        signal: options?.signal,
      });
    });
  },

  patch<TResponse, TRequest>(
    url: string,
    data: TRequest,
    options?: RequestOptions
  ): Promise<TResponse> {
    return trace(`PATCH ${url}`, async () => {
      logger.info("PATCH", { url, data, options });

      return httpClient.request<TResponse>({
        method: "PATCH",
        url,
        data,
        headers: options?.headers,
        timeout: options?.timeout,
        signal: options?.signal,
      });
    });
  },

  delete<TResponse>(
    url: string,
    options?: RequestOptions
  ): Promise<TResponse> {
    return trace(`DELETE ${url}`, async () => {
      logger.info("DELETE", { url, options });

      return httpClient.request<TResponse>({
        method: "DELETE",
        url,
        headers: options?.headers,
        timeout: options?.timeout,
        signal: options?.signal,
      });
    });
  },

  batch<T>(
    requests: BatchRequest<T>
  ): Promise<T[]> {
    return Promise.all(requests);
  },
};