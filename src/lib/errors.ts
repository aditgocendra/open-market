export class BaseError extends Error {
  constructor(message = "Something went wrong") {
    super(message);
    this.name = "BaseError";
  }
}
