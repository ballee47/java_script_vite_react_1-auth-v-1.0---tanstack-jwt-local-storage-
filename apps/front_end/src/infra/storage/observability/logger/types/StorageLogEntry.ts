export type StorageLogLevel =
  | "debug"
  | "info"
  | "warn"
  | "error";

export interface StorageLogEntry {
  level: StorageLogLevel;
  message: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
  error?: unknown;
}