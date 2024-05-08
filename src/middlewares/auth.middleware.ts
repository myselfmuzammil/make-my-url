import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

import {ApiError} from "../utils/index.js";
import {env} from "../env.js";

export function authenticateUser(
  req: Request,
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

  jwt.verify(token, env.ACCESS_TOKEN_SECRET, (error, user) => {
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

    (req as Request & {user: typeof user}).user = user;

    return next();
  });
}
