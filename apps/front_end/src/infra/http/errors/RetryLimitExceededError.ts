export class RetryLimitExceededError extends Error {
  constructor(
    message = "The request has already been retried."
  ) {
    super(message);

    this.name = RetryLimitExceededError.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}