import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";
import ErrorType from "../error/ErrorType";

export const handleError = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      statusCode: error.statusCode,
      error: {
        type: error.type,
        code: error.code,
        message: error.message,
      },
    });
  }
  res.status(500).json({
    success: false,
    code: 500,
    error: { type: ErrorType.INTERNAL_SERVER, message: error.message },
  });
};
