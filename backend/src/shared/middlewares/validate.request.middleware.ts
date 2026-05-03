import { NextFunction } from "express";
import { ZodError, ZodObject } from "zod";
import { Request, Response } from "express";
import { BadRequestError, InternalServerError } from "../error/errors";
import ErrorCode from "../error/ErrorCodes";

export const validateRequestBody =
  (schema: ZodObject<any>) =>
  (req: Request, _: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestError(
          ErrorCode.BAD_REQUEST,
          error.issues[0]?.message || "Invalid request",
        );
      }
      console.log(error);
      throw new InternalServerError(
        ErrorCode.INTERNAL_SERVER,
        `Internal server error`,
      );
    }
  };
