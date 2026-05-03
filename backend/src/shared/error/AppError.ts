import ErrorCode from "./ErrorCodes";
import ErrorType from "./ErrorType";

export default class AppError extends Error {
  statusCode: number;
  message: string;
  isOperational: boolean;
  type: ErrorType;
  code: ErrorCode;

  constructor(
    statusCode: number,
    type: ErrorType,
    code: ErrorCode,
    message: string,
    isOperational: boolean = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = isOperational;
    this.type = type;
    this.code = code;
  }
}
