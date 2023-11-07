import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

import { ErrorHandler } from "../utils";

type AuthRequest = Request & {user: JwtPayload | string} 

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const user = jwt.verify(
            req.cookies.jwt_token , process.env.JWT_SECRET as Secret
        );

        return (req as AuthRequest).user = user, next();
    } catch (error) {
        return next(new ErrorHandler(
            {
                message: "Unauthorized token",
                statusCode: 401
            }
        ));
    }
}