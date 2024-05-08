import type {Request, Response, NextFunction} from "express";

export type ApiController<T> = (
  req: Request & Parameters<T>[1],
  res: Response & Parameters<T>[2],
  next: NextFunction
) => any;
