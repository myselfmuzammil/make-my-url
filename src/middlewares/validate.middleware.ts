import type {Request, Response, NextFunction} from "express";
import z, {ZodRawShape, ZodType} from "zod";
import _ from "lodash";

export function validateSchema<T>(
  schema: Partial<Record<keyof (T & Request), ZodType>>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      z.object(schema as ZodRawShape).parse(_.pick(req, _.keys(schema)));
      next();
    } catch (error) {
      next(error);
    }
  };
}
