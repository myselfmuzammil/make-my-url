import {Document, Schema} from "mongoose";

export type User = {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
};

export type UserDocument = User & Document;

export type UserMethods = {
  isPasswordCorrect(password: string);
  generateAccessToken(): string;
  generateRefreshToken(): string;
};

export type JwtDecodedUser = {
  user: Omit<User, "password" | "refreshToken">;
};
