import mongoose from "mongoose";

import { IUser } from "../../types";

export const userSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            lowercase: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
            select: false
        },

        urls: {
            type: [
                mongoose.Types.ObjectId
            ],
            ref: "Url",
            select: false,
        }
    }
);

export const User = mongoose.model<IUser>("User", userSchema);