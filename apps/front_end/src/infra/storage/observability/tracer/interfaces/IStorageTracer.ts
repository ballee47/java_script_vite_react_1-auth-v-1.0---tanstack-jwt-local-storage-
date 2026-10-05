import type { StorageTrace } from "../types/StorageTrace";
import type { StorageSpan } from "../types/StorageSpan";

export interface IStorageTracer {
  startTrace(
    name: string,
    metadata?: Record<string, unknown>
  ): StorageTrace;

  endTrace(
    trace: StorageTrace,
    status: "success" | "error",
    error?: unknown
  ): void;

  startSpan(
    trace: StorageTrace,
    name: string,
    metadata?: Record<string, unknown>
  ): StorageSpan;

  endSpan(
    span: StorageSpan,
    status: "success" | "error",
    error?: unknown
  ): void;
}