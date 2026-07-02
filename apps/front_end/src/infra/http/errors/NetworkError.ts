import { HttpError } from "./HttpError";

export class NetworkError extends HttpError {
  constructor(
    message = "A network error occurred while communicating with the server."
  ) {
    super(message);
  }
}