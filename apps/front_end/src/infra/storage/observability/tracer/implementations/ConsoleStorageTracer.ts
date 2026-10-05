import type { IStorageTracer } from "../interfaces/IStorageTracer";
import type { StorageTrace } from "../types/StorageTrace";
import type { StorageSpan } from "../types/StorageSpan";

export class ConsoleStorageTracer implements IStorageTracer {
  startTrace(
    name: string,
    metadata?: Record<string, unknown>
  ): StorageTrace {
    const trace: StorageTrace = {
      traceId: crypto.randomUUID(),
      name,
      startTime: Date.now(),
      status: "active",
      spans: [],
      metadata,
    };

    console.debug("[TRACE START]", trace);

    return trace;
  }

  endTrace(
    trace: StorageTrace,
    status: "success" | "error",
    error?: unknown
  ): void {
    trace.endTime = Date.now();
    trace.duration = trace.endTime - trace.startTime;
    trace.status = status;
    trace.error = error;

    console.debug("[TRACE END]", trace);
  }

  startSpan(
    trace: StorageTrace,
    name: string,
    metadata?: Record<string, unknown>
  ): StorageSpan {
    const span: StorageSpan = {
      spanId: crypto.randomUUID(),
      name,
      startTime: Date.now(),
      status: "active",
      metadata,
    };

    trace.spans.push(span);

    console.debug("[SPAN START]", span);

    return span;
  }

  endSpan(
    span: StorageSpan,
    status: "success" | "error",
    error?: unknown
  ): void {
    span.endTime = Date.now();
    span.duration = span.endTime - span.startTime;
    span.status = status;
    span.error = error;

    console.debug("[SPAN END]", span);
  }
}