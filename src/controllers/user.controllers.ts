import {Request, Response} from "express";

import {catchAsyncErrorHandler} from "../utils/index.js";
import {
  loginService,
  signupService,
  regenerateAccessAndRefreshTokens,
} from "../services/index.js";
import type {
  SignupSchema,
  LoginSchema,
  RefreshTokenSchema,
} from "../schema/index.js";
import type {JwtDecodedUser} from "../types/index.js";
import {UserModel} from "../models/index.js";

export const signupController = catchAsyncErrorHandler(async function (
  req: Request<{}, {}, SignupSchema>,
  res: Response
) {
  await signupService(req.body);

  return res.status(201).json({
    success: true,
    message: "SignUp successfully!",
  });
});

export const loginController = catchAsyncErrorHandler(async function (
  req: Request<{}, {}, LoginSchema>,
  res: Response
) {
  const tokens = await loginService(req.body);

  return res.json(tokens);
});

export const logoutUser = catchAsyncErrorHandler(async function (
  req: Request & JwtDecodedUser,
  res: Response
) {
  const user = await UserModel.findByIdAndUpdate(req.user._id, {
    $set: {refreshToken: ""},
  });

  return res.json({
    statusCode: 200,
    success: true,
    message: "logout successfully",
  });
});

export const refreshTokenController = catchAsyncErrorHandler(async function (
  req: Request<{}, {}, RefreshTokenSchema>,
  res: Response
) {
  const {refreshToken} = req.body;
  const tokens = await regenerateAccessAndRefreshTokens(refreshToken);

  return res.json(tokens);
});
