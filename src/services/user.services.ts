import jwt from "jsonwebtoken";

import {UserModel} from "../models/index.js";
import {ApiError} from "../utils/index.js";
import {env} from "../env.js";
import type {LoginSchema, SignupSchema} from "../schema/index.js";
import type {JwrtDecodedUser} from "../types/index.js";

export async function loginService({email, password}: LoginSchema) {
  const user = await UserModel.findOne({email}).select("+password");

  if (!(user && (await user.isPasswordCorrect(password)))) {
    throw new ApiError({
      statusCode: 401,
      message: "Invalid user credentials",
    });
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save();

  return {accessToken, refreshToken};
}

export async function signupService({email, name, password}: SignupSchema) {
  if (!(await UserModel.findOne({email}))) {
    return UserModel.create({
      email,
      name,
      password,
    });
  } else {
    throw new ApiError({
      statusCode: 409,
      message: "Email is already registered",
    });
  }
}

export async function regenerateAccessAndRefreshTokens(refreshToken: string) {
  const {_id} = <JwrtDecodedUser>(
    jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET)
  );

  const user = await UserModel.findById(_id).select("+refreshToken");

  if (refreshToken !== user?.refreshToken) {
    throw new ApiError({
      statusCode: 401,
      message: "refresh token is expired or used",
    });
  }

  const accessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();

  user.refreshToken = newRefreshToken;

  await user.save();

  return {accessToken, newRefreshToken};
}
