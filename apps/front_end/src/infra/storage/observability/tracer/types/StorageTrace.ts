import type { StorageSpan } from "./StorageSpan";

export interface StorageTrace {
  traceId: string;
  name: string;

  startTime: number;
  endTime?: number;
  duration?: number;

  status: "active" | "success" | "error";

  spans: StorageSpan[];

  metadata?: Record<string, unknown>;
  error?: unknown;
}