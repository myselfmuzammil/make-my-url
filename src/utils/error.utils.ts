import type {ApiController} from "../types/index.js";

export class ApiError extends Error {
  statusCode: number;
  errors: any[];
  success: boolean;

  constructor({
    statusCode = 500,
    stack = "",
    message = "Something went wrong",
    errors = [],
  }) {
    super(message);

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

export function catchAsyncErrorHandler(
  requestHandler: Function
): ApiController {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
}
