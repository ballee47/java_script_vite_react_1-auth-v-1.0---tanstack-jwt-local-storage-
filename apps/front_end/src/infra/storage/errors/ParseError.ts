import { StorageError } from "./StorageError";

export class ParseError extends StorageError {
  constructor(cause?: unknown) {
    super("Failed to parse storage value.", cause);

    this.name = "ParseError";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}