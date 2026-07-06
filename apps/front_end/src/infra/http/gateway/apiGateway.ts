import { httpClient } from "../client/httpClient";
import { logger } from "../observability/logger";
import { tracer } from "../observability/tracer";
import { metrics } from "../observability/metrics";

const trace = async <T>(name: string, fn: () => Promise<T>) => {
  const span = tracer.startSpan(name);
  const start = performance.now();

  try {
    const result = await fn();

    metrics.timing(name, performance.now() - start);
    span.end();

    return result;
  } catch (error) {
    metrics.increment("api_error");
    span.end();
    throw error;
  }
};

export const apiGateway = {
  get: <TResponse>(
    url: string,
    params?: Record<string, unknown>
  ) =>
    trace(`GET ${url}`, async () => {
      logger.info("GET", { url, params });

      return httpClient.request<TResponse>({
        method: "GET",
        url,
        params,
      });
    }),

  post: <TResponse, TRequest>(
    url: string,
    data?: TRequest
  ) =>
    trace(`POST ${url}`, async () => {
      logger.info("POST", { url, data });

      return httpClient.request<TResponse>({
        method: "POST",
        url,
        data,
      });
    }),

  put: <TResponse, TRequest>(
    url: string,
    data: TRequest
  ) =>
    trace(`PUT ${url}`, async () => {
      logger.info("PUT", { url, data });

      return httpClient.request<TResponse>({
        method: "PUT",
        url,
        data,
      });
    }),

  patch: <TResponse, TRequest>(
    url: string,
    data: TRequest
  ) =>
    trace(`PATCH ${url}`, async () => {
      logger.info("PATCH", { url, data });

      return httpClient.request<TResponse>({
        method: "PATCH",
        url,
        data,
      });
    }),

  delete: <TResponse>(url: string) =>
    trace(`DELETE ${url}`, async () => {
      logger.info("DELETE", { url });

      return httpClient.request<TResponse>({
        method: "DELETE",
        url,
      });
    }),

  batch: <T>(requests: Promise<T>[]) => Promise.all(requests),
};