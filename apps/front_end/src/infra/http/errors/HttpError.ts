export class HttpError extends Error {
  constructor(message: string) {
    super(message);

    this.name = new.target.name;

    // Fix prototype chain
    Object.setPrototypeOf(this, new.target.prototype);
  }
}