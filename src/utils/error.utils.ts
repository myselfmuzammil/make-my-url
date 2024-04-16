import {Request, Response, NextFunction} from "express";

export interface IError {
  message: string;
  statusCode: number;
}

export class ErrorHandler extends Error {
  statusCode: number;

  constructor({message, statusCode}: IError) {
    super(message);

    this.statusCode = statusCode;
  }
}

type ApiController = (req: Request, res: Response, next: NextFunction) => any;

export function catchAsyncErrorHandler(
  requestHandler: Function
): ApiController {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
}
