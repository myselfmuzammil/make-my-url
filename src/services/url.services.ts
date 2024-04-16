import {Schema} from "mongoose";

import {URLModel} from "../models";
import {CreateUrlSchema} from "../schema";
import {ErrorHandler} from "../utils";

export async function createURLService({
  urlTitle,
  redirectedUrl,
  _id: createdBy,
}: CreateUrlSchema & {_id: Schema.Types.ObjectId}) {
  const URL = await URLModel.create({
    urlTitle,
    redirectedUrl,
    createdBy,
  });

  return {
    urlTitle: URL.urlTitle,
    redirectedUrl: URL.redirectedUrl,
    shortURL: URL.generateURL(),
    visits: URL.visits,
    createdAt: URL.createdAt,
    updatedAt: URL.updatedAt,
  };
}

export async function findUrlByIdAndIncrement(id: Schema.Types.ObjectId) {
  const URL = await URLModel.findByIdAndUpdate(id, {$inc: {visits: 1}});

  if (!URL)
    throw new ErrorHandler({
      message: "URL not found",
      statusCode: 404,
    });

  return URL;
}
