import type {Response, NextFunction} from "express";
import z from "zod";
import _ from "lodash";

import {ApiError, ApiRequest} from "../utils/index.js";

type ZodReq = {[Keys in keyof ApiRequest]?: z.ZodType};
export type ZodReqInfer<T extends ZodReq = ZodReq> = ApiRequest<{
  params: z.infer<NonNullable<T["params"]>>;
  body: z.infer<NonNullable<T["body"]>>;
  query: z.infer<NonNullable<T["query"]>>;
  locals: z.infer<NonNullable<T["locals"]>>;
}>;

export function validateSchema<T extends ZodReq>(schema: T) {
  return (req: ZodReqInfer<T>, _res: Response, next: NextFunction) => {
    try {
      z.object(schema).parse(_.pick(req, _.keys(schema)));
      next();
    } catch ({errors}: any) {
      return next(
        new ApiError({
          name: "Validation error",
          message: "Invalid request",
          errors,
          statusCode: 400,
        })
      );
    }
  };
}
