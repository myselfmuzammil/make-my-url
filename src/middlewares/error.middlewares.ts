import {NextFunction, Request, Response} from "express";
import {ZodError} from "zod";

import {ApiError} from "../utils";
import {JsonWebTokenError} from "jsonwebtoken";

export function zodErrorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    return res.status(400).json(error.format());
  } else {
    next(error);
  }
}

export function apiErrorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      ...error,
      message: error.message,
    });
  } else {
    next(error);
  }
}

export function jwtErrorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({
      ...error,
      message: error.message,
    });
  } else {
    next(error);
  }
}

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(500).json({
    ...error,
    statusCode: 500,
    success: false,
    message: error.message || "Something went wrong",
  });
}
