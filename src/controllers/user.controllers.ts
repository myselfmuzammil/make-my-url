import { Request, Response } from "express";

import { catchAsyncErrorHandler } from "../utils";
import { loginService, signupService } from "../services";
import { SignupSchema, LoginSchema } from "../schema";

export const signupController = catchAsyncErrorHandler(
    async (req: Request<{}, {}, SignupSchema>, res: Response) => {
        await signupService(req.body);

        return res.status(201).json({ message: "SignUp successfully!" });
    }
);

export const loginController = catchAsyncErrorHandler(
    async (req: Request<{}, {}, LoginSchema>, res: Response) => {
        const user = await loginService(req.body);

        const access_token = user.generateAccessToken();
        const refresh_token = user.generateRefreshToken();

        return res.json({ access_token, refresh_token });
    }
);