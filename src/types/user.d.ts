import {Document, HydratedDocument, Schema} from "mongoose";
import {OldAndNewPasswordsBody, SignupSchema} from "../schema";

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
};

export type UserDocument = User & Document;

export type UserMethods = {
  comparePassword(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  resetPassword(passwords: OldAndNewPasswordsBody);
};

export type UserStaticMethodes = {
  createIfNotExists(
    user: SignupSchema
  ): Promise<HydratedDocument<User, UserMethods>>;
};

export type JwtDecodedUser = {
  user: Omit<User, "password" | "refreshToken">;
};

export type JwrtDecodedUser = Pick<User, "_id">;
