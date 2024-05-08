import {Document, Schema} from "mongoose";

export type Url = {
  _id: Schema.Types.ObjectId;
  urlTitle?: string;
  redirectedUrl: string;
  visits: number;
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type UrlDocument = Url & Document;

export type UrlMethods = {
  generateURL(): string;
};
