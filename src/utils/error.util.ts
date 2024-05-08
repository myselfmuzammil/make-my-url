import {NextFunction, Request, RequestHandler, Response} from "express";
import type {ApiController} from "../types/index.js";

export class ApiError extends Error {
  public name: string;
  public message: string;
  public errors: Error[];
  public statusCode: number;
  public success: boolean;

  constructor({
    name = "",
    statusCode = 500,
    stack = "",
    message = "Something went wrong",
    errors = [] as Error[],
  }) {
    super();

    this.name = name;
    this.message = message;
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export function asyncHandler<T>(
  requestHandler: ApiController<T>
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
}
