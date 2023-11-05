import { NextFunction, Request, Response} from 'express';

import { ErrorHandler } from "../utils";

export function errorMiddleware (error: ErrorHandler, req: Request, res: Response, next: NextFunction) {
    error.message = error.message || "Server internal Error";
    error.statusCode = error.statusCode || 500;
    
    return res.status(error.statusCode).json(
        {
            error: {
                statusCode: error.statusCode,
                message: error.message
            }
        }
    );
}