import {Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

import {ApiError, ApiRequest} from "../utils/index.js";
import {env} from "../env.js";
import {JwtDecodedUser} from "../types/user.js";

export function authenticateUser(
  req: ApiRequest<{}, JwtDecodedUser>,
  res: Response,
  next: NextFunction
) {
  const token = req.header("authorization")?.replace("Bearer ", "");

  if (token == undefined) {
    return next(
      new ApiError({
        name: "Authorization",
        message: "Unauthorized request",
        statusCode: 401,
      })
    );
  }

  return jwt.verify(token, env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return next(
        new ApiError({
          name: "Authorization",
          message: "Invalid token",
          errors: [error],
          statusCode: 401,
        })
      );
    }

    req.locals.user = <JwtDecodedUser["user"]>user;

    return next();
  });
}
