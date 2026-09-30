import { StorageError } from "../base";

export class StorageAlreadyRegisteredError extends StorageError {
  constructor(
    message = "Storage is already registered",
    options?: {
      operation?: string;
      cause?: unknown;
      metadata?: Record<string, unknown>;
    }
  ) {
    super(message, {
      code: "STORAGE_ALREADY_REGISTERED",
      operation: options?.operation,
      cause: options?.cause,
      metadata: options?.metadata,
    });

    this.name = "StorageAlreadyRegisteredError";
  }
}