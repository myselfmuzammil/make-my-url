import { Types } from "mongoose";

export interface IUrl {
    urlTitle: string;
    redirectedUrl: string;
    createdAt: Date;
    updatedAt: Date
}
export interface IUser {
    name: string;
    email: string;
    urls: Types.ObjectId[];
    password: string;
}
