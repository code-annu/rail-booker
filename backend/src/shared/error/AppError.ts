import ErrorType from "./ErrorType";

export default class AppError extends Error {
  statusCode: number;
  message: string;
  isOperational: boolean;
  type: ErrorType;

  constructor(
    message: string,
    statusCode: number,
    type: ErrorType,
    isOperational: boolean = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = isOperational;
    this.type = type;
  }
}
