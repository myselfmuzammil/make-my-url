import type {Request, Response, NextFunction} from "express";

export type ApiController<T, U> = (
  req: Request & T,
  res: Response & U,
  next?: NextFunction
) => Promise<Response & U>;
