import mongoose, {Model, Schema} from "mongoose";

import type {UrlDocument, UrlMethods} from "../types/index.js";
import {env} from "../env.js";

const urlSchema = new mongoose.Schema<
  UrlDocument,
  Model<UrlDocument, {}, UrlMethods>,
  UrlMethods
>(
  {
    urlTitle: {
      type: String,
    },

    redirectedUrl: {
      type: String,
      required: true,
    },

    visits: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

urlSchema.methods.generateURL = function () {
  const url = this as UrlDocument & UrlMethods;

  const {PROTOCOL, HOST_NAME, PORT} = env;
  return `${PROTOCOL}://${HOST_NAME}:${PORT}/api/v1/url/redirect/${url._id}`;
};

export const URLModel = mongoose.model<
  UrlDocument,
  Model<UrlDocument, {}, UrlMethods>
>("Url", urlSchema);
