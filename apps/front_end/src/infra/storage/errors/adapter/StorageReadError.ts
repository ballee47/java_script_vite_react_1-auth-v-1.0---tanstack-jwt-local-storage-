import { StorageAdapterError } from "./StorageAdapterError";

export class StorageReadError extends StorageAdapterError {
  constructor(
    message = "Storage read operation failed",
    options?: {
      cause?: unknown;
      metadata?: Record<string, unknown>;
    }
  ) {
    super(message, {
      operation: "read",
      cause: options?.cause,
      metadata: options?.metadata,
    });

    this.name = "StorageReadError";
  }
}