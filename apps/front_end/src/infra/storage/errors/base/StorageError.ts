// making the interfac above here not in the base folder it is titly copuled to the stroage error if the storageError will used in multiple places then we should make the interface in a separate file and import it here
 

export interface StorageErrorOptions {
  code: string;
  operation?: string;
  cause?: unknown;
  metadata?: Record<string, unknown>;
}

export class StorageError extends Error {
  public readonly code: string;
  public readonly operation?: string;
  public readonly cause?: unknown;
  public readonly metadata?: Record<string, unknown>;

  constructor(message: string, options: StorageErrorOptions) {
    super(message);

    this.name = "StorageError";
    this.code = options.code;
    this.operation = options.operation;
    this.cause = options.cause;
    this.metadata = options.metadata;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}