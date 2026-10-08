import { StorageAdapterError } from "./StorageAdapterError";

export class StorageRemoveError extends StorageAdapterError {
  constructor(
    message = "Storage remove operation failed",
    options?: {
      operation?: string;
      cause?: unknown;
      metadata?: Record<string, unknown>;
    }
  ) {
    super(message, {
      operation: "remove",
      cause: options?.cause,
      metadata: options?.metadata,
    });

    this.name = "StorageRemoveError";
  }
}