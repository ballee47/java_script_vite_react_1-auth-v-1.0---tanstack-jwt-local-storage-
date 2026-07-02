import { HttpError } from "./HttpError";

export class HttpStatusError extends HttpError {
  constructor(
    public readonly status: number,
    message = `HTTP request failed with status ${status}.`
  ) {
    super(message);
  }
}