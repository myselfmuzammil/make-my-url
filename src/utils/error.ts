import {NextFunction, Response} from "express";
import {ApiRequest, ApiResponse} from "./index.js";

export class ApiError extends Error {
  public name: string;
  public message: string;
  public errors: unknown[];
  public success: boolean;
  public statusCode: number;

  constructor({
    name = "Internal server error",
    statusCode = 500,
    stack = "",
    message = "Something went wrong",
    errors = [] as unknown[],
  } = {}) {
    super();

    this.name = name;
    this.message = message;
    this.errors = errors;
    this.success = statusCode < 400;
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export function asyncHandler<T extends ApiRequest, U extends Response>(
  requestHandler: (req: T) => Promise<ApiResponse | ((res: U) => void)>
): (req: T, res: U, next: NextFunction) => Promise<U | void> {
  return (req, res, next) => {
    return Promise.resolve(requestHandler(req))
      .then((apiRes) => {
        if (apiRes instanceof ApiResponse) {
          return res.status(apiRes.statusCode).json(apiRes);
        }

        return apiRes(res);
      })
      .catch(next);
  };
}
