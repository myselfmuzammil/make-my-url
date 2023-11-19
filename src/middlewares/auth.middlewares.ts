import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import _ from 'lodash';

import { ErrorHandler } from "../utils";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const user = jwt.verify(
            req.cookies.access_token,
            process.env.ACCESS_TOKEN_SECRET as Secret
        );

        return _.assign(req, { user }), next();
    } catch (error) {
        return next(new ErrorHandler(
            {
                message: "Unauthorized token",
                statusCode: 401
            }
        ));
    }
}