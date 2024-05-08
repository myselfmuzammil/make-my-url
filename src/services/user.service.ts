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
      name: "Log in",
      message: "Invalid user credentials",
      statusCode: 401,
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
      name: "Sign up",
      message: "Email is already registered",
      statusCode: 409,
    });
  }
}

export async function regenerateAccessAndRefreshTokens(token: string) {
  try {
    const {_id} = <JwrtDecodedUser>jwt.verify(token, env.REFRESH_TOKEN_SECRET);

    const user = await UserModel.findById(_id).select("+refreshToken");

    if (token !== user?.refreshToken) {
      throw new Error();
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save();

    return {accessToken, refreshToken};
  } catch (error) {
    throw new ApiError({
      name: "Authorization",
      message: "Refresh token is expired or used",
      errors: [error as Error],
      statusCode: 401,
    });
  }
}
