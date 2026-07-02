import { HttpError } from "./HttpError";

export class ForbiddenError extends HttpError {
  constructor(
    message = "You do not have permission to perform this action."
  ) {
    super(message);
  }
}