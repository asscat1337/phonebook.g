export class HttpException extends Error {
  status: number;
  message: string;
  type: string;

  constructor(status: number, message: string, type: string) {
    super(message);

    this.message = message;
    this.status = status;
    this.type = type;
  }
}

export class ConflictError extends HttpException {
  constructor(message: string) {
    super(409, message, "ConfictName");
  }
}

export class BadRequestError extends HttpException {
  constructor(message: string) {
    super(400, message, "BadRequestError");
  }
}

export class InternalServerError extends HttpException {
  constructor(message: string) {
    super(500, message, "InternalServerError");
  }
}

export class UnAuthorizeError extends HttpException {
  constructor(message: string) {
    super(401, message, "UnAuthorizeError");
  }
}

export class NotFoundError extends HttpException {
  constructor(message: string) {
    super(404, message, "NotFoundError");
  }
}
