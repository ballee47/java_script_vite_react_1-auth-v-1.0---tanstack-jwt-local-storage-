import { StorageAdapterError } from "./StorageAdapterError";

export class StorageWriteError extends StorageAdapterError {
  constructor(
    message = "Storage write operation failed",
    options?: {
      cause?: unknown;
      operation?: string;
      metadata?: Record<string, unknown>;
    }
  ) {
    super(message, {
      operation: "write",
      cause: options?.cause,
      metadata: options?.metadata,
    });

    this.name = "StorageWriteError";
  }
}