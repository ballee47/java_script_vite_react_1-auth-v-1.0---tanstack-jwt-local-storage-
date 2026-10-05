export interface StorageSpan {
  spanId: string;
  name: string;

  startTime: number;
  endTime?: number;
  duration?: number;

  status: "active" | "success" | "error";

  metadata?: Record<string, unknown>;
  error?: unknown;
}