import AppError from "./AppError";
import ErrorCode from "./ErrorCodes";
import ErrorType from "./ErrorType";

export class NotFoundError extends AppError {
  constructor(code: ErrorCode = ErrorCode.RESOURCE_NOT_FOUND, message: string) {
    super(404, ErrorType.NOT_FOUND, code, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(code: ErrorCode, message: string) {
    super(401, ErrorType.UNAUTHORIZED, code, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(code: ErrorCode, message: string) {
    super(403, ErrorType.FORBIDDEN, code, message);
  }
}

export class BadRequestError extends AppError {
  constructor(code: ErrorCode, message: string) {
    super(400, ErrorType.BAD_REQUEST, code, message);
  }
}

export class InternalServerError extends AppError {
  constructor(code: ErrorCode, message: string) {
    super(500, ErrorType.INTERNAL_SERVER, code, message);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(code: ErrorCode, message: string) {
    super(422, ErrorType.UNPROCESSABLE_ENTITY, code, message);
  }
}

export class ConflictError extends AppError {
  constructor(code: ErrorCode, message: string) {
    super(409, ErrorType.CONFLICT, code, message);
  }
}

export class RateLimitExceededError extends AppError {
  constructor(code: ErrorCode, message: string) {
    super(429, ErrorType.RATE_LIMIT_EXCEEDED, code, message);
  }
}
