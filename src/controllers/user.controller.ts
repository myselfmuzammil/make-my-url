import {Request, Response} from "express";

import {ApiError, asyncHandler} from "../utils/index.js";
import type {JwtDecodedUser} from "../types/index.js";
import {
  loginService,
  signupService,
  regenerateAccessAndRefreshTokens,
} from "../services/index.js";
import type {
  SignupSchema,
  LoginSchema,
  RefreshTokenSchema,
  OldAndNewPasswordsBody,
} from "../schema/index.js";
import {UserModel} from "../models/index.js";

export const signupUser = asyncHandler(async function (
  req: Request<{}, {}, SignupSchema>,
  res: Response
) {
  await signupService(req.body);

  return res.status(201).json({
    success: true,
    message: "SignUp successfully!",
  });
});

export const loginUser = asyncHandler(async function (
  req: Request<{}, {}, LoginSchema>,
  res: Response
) {
  const tokens = await loginService(req.body);

  return res.json(tokens);
});

export const logoutUser = asyncHandler(async function (
  req: Request & JwtDecodedUser,
  res: Response
) {
  await UserModel.findByIdAndUpdate(req.user._id, {
    $set: {refreshToken: ""},
  });

  return res.json({
    statusCode: 200,
    success: true,
    message: "logout successfully",
  });
});

export const resetPassword = asyncHandler(async function (
  req: Request<{}, {}, OldAndNewPasswordsBody> & JwtDecodedUser,
  res: Response
) {
  const {oldPassword, newPassword} = req.body;

  const user = await UserModel.findById(req.user._id).select("+password");

  if (!(user && (await user.comparePassword(oldPassword)))) {
    throw new ApiError({
      name: "Reset Password",
      message: "Wrong password",
      statusCode: 400,
    });
  }

  user.password = newPassword;
  await user.save();

  return res.json({
    message: "Password reset successfully",
    statusCode: 200,
    success: true,
  });
});

export const refreshUserToken = asyncHandler(async function (
  req: Request<{}, {}, RefreshTokenSchema>,
  res: Response
) {
  const {refreshToken} = req.body;

  const tokens = await regenerateAccessAndRefreshTokens(refreshToken);

  return res.json(tokens);
});
