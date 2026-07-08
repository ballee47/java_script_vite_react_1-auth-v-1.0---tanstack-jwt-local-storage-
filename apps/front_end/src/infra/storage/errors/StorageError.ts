export class StorageError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);

    this.name = "StorageError";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}