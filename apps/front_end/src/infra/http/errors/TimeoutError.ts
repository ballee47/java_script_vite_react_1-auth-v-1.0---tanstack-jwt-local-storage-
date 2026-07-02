import { HttpError } from "./HttpError";

export class TimeoutError extends HttpError {
  constructor(
    message = "The request timed out."
  ) {
    super(message);
  }
}