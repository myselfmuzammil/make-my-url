import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'

import { User } from "../models";
import { ErrorHandler, catchAsyncErrorHandler } from "../utils";
import { IUserReqBody, ILoginReqBody, ILoginResBody } from "../../types";

export const signupController = catchAsyncErrorHandler(
    async (req: Request<never, never, IUserReqBody>, res: Response, next: NextFunction) => {
        const { name, email, password } = req.body;

        if(!name || !email || !password) return next(new ErrorHandler(
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

        return res.status(201).json(
            {
                email: email,
                name: name,
            }
        );
    }
);

export const loginController = catchAsyncErrorHandler(
    async (req: Request<never, never, ILoginReqBody>, res: Response<ILoginResBody>, next: NextFunction) => {
        const { email, password } = req.body;

        if(!email || !password) return next(new ErrorHandler(
            {
                message: "fields are required",
                statusCode: 400
            }
        ));

        const user = await User.findOne({ email }).select(
            '+password -email'
        );

        if(!user) return next(new ErrorHandler(
            {
                message: "Invalid email address",
                statusCode: 404
            }
        ));

        const isPassword = await bcrypt.compare(
            password, user.password
        );

        if(!isPassword) return next(new ErrorHandler(
            {
                message: "Incorrect password",
                statusCode: 400
            }
        ));

        const userToken = await jwt.sign(
            {
                _id: user._id,
                name: user.name, email: email,
            },
                process.env.JWT_SECRET as Secret,
            {
                expiresIn: "90d" 
            }
        );

        return res.status(200).cookie("jwt_token", userToken).json(
            {
                _id: user._id,
                name: user.name, email: email
            }
        );
    }
);