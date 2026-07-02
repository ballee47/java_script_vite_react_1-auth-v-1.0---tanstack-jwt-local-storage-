import { HttpError } from "./HttpError";

export class UnauthorizedError extends HttpError {
  constructor(
    message = "Authentication is required."
  ) {
    super(message);
  }
}