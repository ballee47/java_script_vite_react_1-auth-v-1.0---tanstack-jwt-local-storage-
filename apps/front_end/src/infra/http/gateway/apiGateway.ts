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
      console.log("🚀 API GATEWAY GET", url);
      logger.info("GET", { url });
      return httpClient.get<T>(withVersion(url));
    }),

  post: <T, D>(url: string, data?: D) =>
    trace(`POST ${url}`, async () => {
      logger.info("POST", { url, data });
      return httpClient.post<T>(withVersion(url), data);
    }),

  put: <T, D>(url: string, data: D) =>
    trace(`PUT ${url}`, () =>
      httpClient.put<T>(withVersion(url), data)
    ),

  patch: <T, D>(url: string, data: D) =>
    trace(`PATCH ${url}`, () =>
      httpClient.patch<T>(withVersion(url), data)
    ),

  delete: <T>(url: string) =>
    trace(`DELETE ${url}`, () =>
      httpClient.delete<T>(withVersion(url)),
    ),
};