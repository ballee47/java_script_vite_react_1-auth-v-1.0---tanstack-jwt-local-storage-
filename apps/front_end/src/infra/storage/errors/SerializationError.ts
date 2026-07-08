import { StorageError } from "./StorageError";

export class SerializationError extends StorageError {
  constructor(cause?: unknown) {
    super("Failed to serialize storage value.", cause);

    this.name = "SerializationError";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}