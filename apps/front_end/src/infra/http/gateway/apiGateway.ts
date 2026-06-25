import { httpClient } from "../client/httpClient";
import { logger } from "../observability/logger";
import { tracer } from "../observability/tracer";
import { metrics } from "../observability/metrics";
import { withVersion } from "../config/apiVersion";

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
  get: <T>(url: string) =>
    trace(`GET ${url}`, async () => {
      logger.info("GET", { url });

      return httpClient.request<T>({
        method: "GET",
        url: withVersion(url),

      });
    }),

  post: <T, D>(url: string, data?: D) =>
    trace(`POST ${url}`, async () => {
      logger.info("POST", { url, data });

      return httpClient.request<T>({
        method: "POST",
        url: withVersion(url),
        data,
      });
    }),

  put: <T, D>(url: string, data: D) =>
    trace(`PUT ${url}`, async () => {
      logger.info("PUT", { url, data });

      return httpClient.request<T>({
        method: "PUT",
        url: withVersion(url),
        data,
      });
    }),

  patch: <T, D>(url: string, data: D) =>
    trace(`PATCH ${url}`, async () => {
      logger.info("PATCH", { url, data });

      return httpClient.request<T>({
        method: "PATCH",
        url: withVersion(url),
        data,
      });
    }),

  delete: <T>(url: string) =>
    trace(`DELETE ${url}`, async () => {
      logger.info("DELETE", { url });

      return httpClient.request<T>({
        method: "DELETE",
        url: withVersion(url),
      });
    }),

  batch: async <T>(requests: Promise<T>[]) => {
    return Promise.all(requests);
  },
};