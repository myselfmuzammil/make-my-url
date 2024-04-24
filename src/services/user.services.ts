import jwt, {Secret} from "jsonwebtoken";

import {UserModel} from "../models";
import {ApiError} from "../utils";
import {LoginSchema, SignupSchema} from "../schema";

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
  const {_id} = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as Secret
  ) as {_id: string};

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
