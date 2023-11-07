import { NextFunction, Request, Response } from "express";

import { User } from "../models";
import { ErrorHandler, catchAsyncErrorHandler } from "../utils";
import { IUser  } from "../../types";

export const createUser = catchAsyncErrorHandler(
    async (req: Request<never, never, IUser>, res: Response, next: NextFunction) => {
        const { name, email, password } = req.body;

        if(!name || !email || !password)  next(new ErrorHandler(
            {
                message: "fields are required",
                statusCode: 400
            }
        ));

        await User.create(
            {
                name: name,
                password: password,
                email: email
            }
        );

        return res.status(200).json(
            {
                email: email,
                name: name,
            }
        );
    }
);