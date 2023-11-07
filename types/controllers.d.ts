import { Types } from "mongoose";

export interface IReqBody {
    urlTitle?: string;
    redirectedUrl: string;
}

export interface IResBody extends IReqBody {
    shortUrl: string;
    createdAt: Date;
}


export interface ILoginReqBody {
    email: string;
    password: string;
}
export interface ILoginResBody {
    _id: Types.ObjectId
    email: string;
    name: string;
}

export interface IUserReqBody extends ILoginReqBody{
    name: string;
}