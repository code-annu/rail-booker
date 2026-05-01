import { NextFunction } from "express";
import { ZodError, ZodObject } from "zod";
import { Request, Response } from "express";
import { BadRequestError, InternalServerError } from "../error/errors";

export const validateRequestBody =
  (schema: ZodObject<any>) =>
  (req: Request, _: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestError(
          error.issues[0]?.message || "Invalid request",
        );
      }
      throw new InternalServerError(`Server error: `);
    }
  };
