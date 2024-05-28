import type {NextFunction, Request, Response} from "express";
import {ApiError} from "../utils/index.js";

export function globalErrorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json(error);
  } else {
    return res.status(500).json(
      new ApiError({
        errors: [error],
      })
    );
  }
}
