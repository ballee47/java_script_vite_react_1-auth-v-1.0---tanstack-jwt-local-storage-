
// src/infra/http/gateway/apiGateway.ts

import { httpClient } from "../client/httpClient";

import { ObservabilityFactory } from
  "../../observability/ObservabilityFactory";

import type {
  RequestOptions,
  BatchRequest,
} from "../types/gateway";

/* ─────────────────────────────────────────
   CENTRAL OBSERVABILITY
   ───────────────────────────────────────── */

const observability = ObservabilityFactory.getInstance();

const { logger, metrics, tracer, errors } = observability;

function reportTelemetry(action: () => void): void {
  try {
    action();
  } catch (telemetryError) {
    // Observability must never prevent an API request from completing.
    console.warn("HTTP telemetry failed", telemetryError);
  }
}

/* ─────────────────────────────────────────
   API GATEWAY
   ───────────────────────────────────────── */

async function executeRequest<TResponse>(
  method: string,
  url: string,
  request: () => Promise<TResponse>
): Promise<TResponse> {
  const startedAt = Date.now();
  let span: ReturnType<typeof tracer.startSpan> | undefined;

  reportTelemetry(() => {
    span = tracer.startSpan(`HTTP ${method}`);
    logger.info("HTTP request started", {
      method,
      url,
    });
  });

  try {
    const response = await request();

    const duration = Date.now() - startedAt;

    reportTelemetry(() => {
      metrics.increment("http.requests.success");
      metrics.record("http.request.duration", duration);

      logger.info("HTTP request completed", {
        method,
        url,
        duration,
      });
    });

    return response;
  } catch (error: unknown) {
    const duration = Date.now() - startedAt;

    reportTelemetry(() => {
      metrics.increment("http.requests.failure");
      metrics.record("http.request.duration", duration);

      logger.error("HTTP request failed", {
        method,
        url,
        duration,
      });

      errors.handle(error);
    });

    throw error;
  } finally {
    reportTelemetry(() => span?.end());
  }
}

export const apiGateway = {
  get<TResponse>(
    url: string,
    options?: RequestOptions
  ): Promise<TResponse> {
    return executeRequest("GET", url, () =>
      httpClient.request<TResponse>({
        method: "GET",
        url,
        params: options?.params,
        headers: options?.headers,
        timeout: options?.timeout,
        signal: options?.signal,
      })
    );
  },

  post<TResponse, TRequest>(
    url: string,
    data?: TRequest,
    options?: RequestOptions
  ): Promise<TResponse> {
    return executeRequest("POST", url, () =>
      httpClient.request<TResponse>({
        method: "POST",
        url,
        data,
        headers: options?.headers,
        timeout: options?.timeout,
        signal: options?.signal,
      })
    );
  },

  put<TResponse, TRequest>(
    url: string,
    data: TRequest,
    options?: RequestOptions
  ): Promise<TResponse> {
    return executeRequest("PUT", url, () =>
      httpClient.request<TResponse>({
        method: "PUT",
        url,
        data,
        headers: options?.headers,
        timeout: options?.timeout,
        signal: options?.signal,
      })
    );
  },

  patch<TResponse, TRequest>(
    url: string,
    data: TRequest,
    options?: RequestOptions
  ): Promise<TResponse> {
    return executeRequest("PATCH", url, () =>
      httpClient.request<TResponse>({
        method: "PATCH",
        url,
        data,
        headers: options?.headers,
        timeout: options?.timeout,
        signal: options?.signal,
      })
    );
  },

  delete<TResponse>(
    url: string,
    options?: RequestOptions
  ): Promise<TResponse> {
    return executeRequest("DELETE", url, () =>
      httpClient.request<TResponse>({
        method: "DELETE",
        url,
        headers: options?.headers,
        timeout: options?.timeout,
        signal: options?.signal,
      })
    );
  },

  batch<T>(
    requests: BatchRequest<T>
  ): Promise<T[]> {
    return Promise.all(requests);
  },
};
