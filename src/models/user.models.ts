import mongoose, { Schema, Model, Document } from "mongoose";
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import _ from 'lodash'

export interface IUser extends Document {
    name: string;
    email: string;
    urls?: Schema.Types.ObjectId[];
    password: string;
    refreshToken?: string;
}

export interface UserMethods {
    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): Secret;
    generateRefreshToken(): Secret;
}

export const userSchema = new mongoose.
Schema<IUser, Model<IUser, {}, UserMethods>, UserMethods>(
    {
        name: {
            type: String,
            required: true,
            trim: true
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
            select: false
        },

        urls: {
            type: [
                Schema.Types.ObjectId
            ],
            ref: "Url",
            select: false,
        },

        refreshToken: String,
    }
);

userSchema.pre("save", async function (next) {
    const user = this;
    
    if(!user.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);

    user.password = password;

    return next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
    const user = this as IUser & UserMethods;

    return bcrypt.compare(password, user.password);
}

userSchema.methods.generateAccessToken = function() {
    const user = this as IUser & UserMethods;

    return jwt.sign(
        _.omit(user.toJSON(), "password"),
        process.env.ACCESS_TOKEN_SECRET as Secret,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
}

userSchema.methods.generateRefreshToken = function() {
    const user = this as IUser & UserMethods;

    return jwt.sign(
        _.pick(user.toJSON(), "_id"), 
        process.env.REFRESH_TOKEN_SECRET as Secret,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
}

export const User = mongoose.model<IUser, Model<IUser, {}, UserMethods> >(
    "User",
    userSchema
);