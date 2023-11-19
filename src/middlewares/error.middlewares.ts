import { NextFunction, Request, Response} from 'express';
import { ZodError } from 'zod';

import { ErrorHandler, log } from "../utils";

export function errorMiddleware(
    error: unknown, req: Request, res: Response, next: NextFunction
) {
    if(error instanceof ZodError) return res
    .status(400).json(error.format());

    if (error instanceof ErrorHandler) {
        return res.status(error.statusCode).json(
            {
                success: false,
                error: {
                    statusCode: error.statusCode,
                    message: error.message
                }
            }
        );
    }

    log.error(error);
    return res.status(500).json({ success: false, error: {
        statusCode: 500,
        message: "Something went wrong"
    }});
}