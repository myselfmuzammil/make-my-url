import { Request, Response, NextFunction } from 'express';

import { IError } from '../../types';

export class ErrorHandler extends Error {
    statusCode: number;

    constructor({ message, statusCode }: IError) {
        super(message);

        this.statusCode = statusCode;
    }
}

export function catchAsyncErrorHandler(asyncController: Function) {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(asyncController(req, res, next)).catch(next);
    }
}