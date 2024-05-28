import {Response, NextFunction} from "express";
import {ApiRequest} from "../utils/index.js";

export function defineLocals(locals: Record<string, unknown> = {}) {
  return function (req: ApiRequest, res: Response, next: NextFunction) {
    req.locals = locals;
    next();
  };
}
