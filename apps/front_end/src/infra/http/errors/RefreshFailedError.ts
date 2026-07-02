import { HttpError } from "./HttpError";

export class RefreshFailedError extends HttpError {
  constructor(
    message = "Failed to refresh the authentication session."
  ) {
    super(message);
  }
}