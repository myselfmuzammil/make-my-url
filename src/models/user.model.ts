import mongoose, {Model} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";

import type {UserDocument, UserMethods} from "../types/index.js";
import {env} from "../env.js";

export const userSchema = new mongoose.Schema<
  UserDocument,
  Model<UserDocument, {}, UserMethods>,
  UserMethods
>({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  refreshToken: {
    type: String,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(user.password, salt);

  user.password = password;

  return next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  const user = this as UserDocument & UserMethods;

  return bcrypt.compare(password, user.password);
};

userSchema.methods.generateAccessToken = function () {
  const user = this as UserDocument & UserMethods;

  return jwt.sign(
    _.omit(user.toJSON(), ["password", "refreshToken"]),
    env.ACCESS_TOKEN_SECRET,
    {expiresIn: env.ACCESS_TOKEN_EXPIRY}
  );
};

userSchema.methods.generateRefreshToken = function () {
  const user = this as UserDocument & UserMethods;

  return jwt.sign(_.pick(user.toJSON(), "_id"), env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRY,
  });
};

export const UserModel = mongoose.model<
  UserDocument,
  Model<UserDocument, {}, UserMethods>
>("User", userSchema);
