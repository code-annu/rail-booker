import AppError from "./AppError";
import ErrorType from "./ErrorType";

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404, ErrorType.NOT_FOUND_ERROR);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401, ErrorType.UNAUTHORIZED_ERROR);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403, ErrorType.FORBIDDEN_ERROR);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400, ErrorType.BAD_REQUEST_ERROR);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string) {
    super(message, 500, ErrorType.INTERNAL_SERVER_ERROR, false);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message: string) {
    super(message, 422, ErrorType.UNPROCESSABLE_ENTITY_ERROR);
  }
}

export class InsufficientBalanceError extends AppError {
  constructor(message: string) {
    super(message, 422, ErrorType.INSUFFICIENT_BALANCE_ERROR);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, ErrorType.CONFLICT_ERROR);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message: string) {
    super(message, 429, ErrorType.TOO_MANY_REQUESTS_ERROR);
  }
}

export class MissingTokenError extends AppError {
  constructor(message: string) {
    super(message, 401, ErrorType.MISSING_TOKEN_ERROR);
  }
}

export class InvalidTokenError extends AppError {
  constructor(message: string) {
    super(message, 401, ErrorType.INVALID_TOKEN_ERROR);
  }
}
