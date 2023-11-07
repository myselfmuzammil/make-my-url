import { Types, Document } from "mongoose";

export interface IUrl extends Document {
    urlTitle: string;
    redirectedUrl: string;
    createdAt: Date;
    updatedAt: Date
}
export interface IUser extends Document {
    name: string;
    email: string;
    urls?: Types.ObjectId[];
    password: string;
}
