class HttpError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);

    // this.code = ;
    this.message = message;
    this.code = code;
  }
}

export class ConflictError extends HttpError {
  constructor(message: string, code: number) {
    super(message, code);
    this.name = "ConflictError";
    this.code = 409;
  }
}
