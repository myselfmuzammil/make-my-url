import {NextFunction, Request, Response} from "express";
import {ZodError} from "zod";

import {ErrorHandler} from "../utils";
import {JsonWebTokenError} from "jsonwebtoken";

export function globalErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    return res.status(400).json(error.format());
  }

  if (error instanceof ErrorHandler) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({
      message: error.message,
      success: false,
    });
  }

  return res.status(500).json({
    success: false,
    message: error.message || "Something went wrong",
  });
}
