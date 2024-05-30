import mongoose, {Model} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";

import type {
  UserDocument,
  UserMethods,
  UserStaticMethodes,
} from "../types/index.js";
import {env} from "../env.js";
import {SignupSchema} from "../schema/user.schema.js";
import {ApiError} from "../utils/error.js";

export const userSchema = new mongoose.Schema<
  UserDocument,
  UserStaticMethodes & Model<UserDocument, {}, UserMethods>,
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

userSchema.pre(
  "deleteOne",
  {document: true, query: false},
  async function (next) {
    await this.model("Url").deleteMany({createdBy: this._id});

    next();
  }
);

userSchema.methods.comparePassword = async function (password) {
  const user = <UserDocument & UserMethods>this;

  return bcrypt.compare(password, user.password || "");
};

userSchema.methods.resetPassword = async function ({oldPassword, newPassword}) {
  const user = <UserDocument & UserMethods>this;

  if (!(await user.comparePassword(oldPassword))) {
    throw new ApiError({
      name: "Reset Password",
      message: "Wrong password",
      statusCode: 400,
    });
  }

  user.password = newPassword;

  return user.save({validateBeforeSave: true});
};

userSchema.methods.generateAccessToken = function () {
  const user = <UserDocument & UserMethods>this;

  return jwt.sign(
    _.omit(user.toJSON(), ["password", "refreshToken"]),
    env.ACCESS_TOKEN_SECRET,
    {expiresIn: env.ACCESS_TOKEN_EXPIRY}
  );
};

userSchema.methods.generateRefreshToken = function () {
  const user = <UserDocument & UserMethods>this;

  return jwt.sign(_.pick(user.toJSON(), "_id"), env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRY,
  });
};

userSchema.statics.createIfNotExists = async function (user: SignupSchema) {
  if (await this.findOne({email: user.email})) {
    throw new ApiError({
      name: "Sign up",
      message: "Email is already registered",
      statusCode: 409,
    });
  }

  return this.create(user);
};

export const UserModel = mongoose.model<
  UserDocument,
  UserStaticMethodes & Model<UserDocument, {}, UserMethods>
>("User", userSchema);
