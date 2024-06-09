import jwt from "jsonwebtoken";
import _ from "lodash";

import {UserModel} from "../models/index.js";
import {env} from "../env.js";
import {ApiError} from "../utils/index.js";
import type {LoginSchema, SignupSchema} from "../schema/index.js";
import type {JwrtDecodedUser, User} from "../types/user.js";

export async function loginUser(cred: LoginSchema) {
  const {email, password} = cred;
  const user = await UserModel.findOne({email}).select("+password");

  if (!(user && (await user.comparePassword(password)))) {
    throw new ApiError({
      name: "Log in",
      message: "Invalid user credentials",
      statusCode: 401,
    });
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({validateBeforeSave: true});

  return {accessToken, refreshToken};
}

export async function createUser(user: SignupSchema) {
  const newUser = await UserModel.createIfNotExists(user);

  return _.omit(newUser.toJSON(), "password");
}

export async function findUser(
  id: User["_id"],
  select: {[T in keyof User]?: boolean} = {}
) {
  const user = await UserModel.findById(id).select(
    Object.keys(select)
      .map((key) => (select[key as keyof User] ? `+${key}` : `-${key}`))
      .join(" ")
  );

  if (!user) {
    throw new ApiError({
      name: "User not found",
      message: "user does not exist",
      statusCode: 404,
    });
  }

  return user;
}

export async function deleteUser(id: JwrtDecodedUser["_id"]) {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new ApiError({
      name: "user deletion",
      message: "User permanently deleted",
      statusCode: 410,
    });
  }

  return user.deleteOne();
}

export async function logoutUser(id: JwrtDecodedUser["_id"]) {
  return UserModel.findByIdAndUpdate(id, {
    $set: {refreshToken: ""},
  });
}

export async function regenerateAccessAndRefreshTokens(token: string) {
  try {
    const {_id} = <JwrtDecodedUser>jwt.verify(token, env.REFRESH_TOKEN_SECRET);
    const user = await findUser(_id, {refreshToken: true});

    if (token !== user.refreshToken) {
      throw new Error();
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: true});

    return {accessToken, refreshToken};
  } catch (e) {
    throw new ApiError({
      name: "Authorization",
      message: "Refresh token is expired or used",
      errors: [e],
      statusCode: 401,
    });
  }
}
