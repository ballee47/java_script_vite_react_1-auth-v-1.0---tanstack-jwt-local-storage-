import { StorageError } from "../base";

export class StorageAdapterError extends StorageError {
  constructor(
    message = "Storage adapter operation failed",
    options?: {
      operation?: string;
      cause?: unknown;
      metadata?: Record<string, unknown>;
    }
  ) {
    super(message, {
      code: "STORAGE_ADAPTER_FAILED",
      operation: options?.operation,
      cause: options?.cause,
      metadata: options?.metadata,
    });

    this.name = "StorageAdapterError";
  }
}