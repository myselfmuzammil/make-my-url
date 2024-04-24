import {Request, Response, NextFunction} from "express";
import jwt, {Secret} from "jsonwebtoken";
import _ from "lodash";

import {ApiError} from "../utils";

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
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret);
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
