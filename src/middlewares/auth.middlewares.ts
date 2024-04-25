import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import _ from "lodash";

import {ApiError} from "../utils/index.js";
import {env} from "../env.js";

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.header("authorization")?.replace("Bearer ", "");

  if (!token) {
    return next(
      new ApiError({
        message: "Unauthorized request",
        statusCode: 401,
      })
    );
  }

  try {
    const user = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
    return _.assign(req, {user: user}), next();
  } catch (error) {
    next(
      new ApiError({
        message: "Invalid token",
        statusCode: 401,
      })
    );
  }
}
