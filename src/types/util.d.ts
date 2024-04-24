import type {Request, Response, NextFunction} from "express";

export type ApiController = (
  req: Request,
  res: Response,
  next: NextFunction
) => any;
