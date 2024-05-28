import {URLModel} from "../models/index.js";
import {ApiError} from "../utils/index.js";
import type {JwtDecodedUser} from "../types/index.js";
import type {UrlBody, UrlParams} from "../schema/index.js";

export async function createUrl({
  urlTitle,
  redirectedUrl,
  _id,
}: UrlBody & JwtDecodedUser["user"]) {
  const URL = await URLModel.create({
    urlTitle,
    redirectedUrl,
    createdBy: _id,
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

export async function findUrlByIdAndIncrement(_id: UrlParams["_id"]) {
  const URL = await URLModel.findByIdAndUpdate(_id, {$inc: {visits: 1}});

  if (!URL)
    throw new ApiError({
      message: "URL not found",
      statusCode: 404,
    });

  return URL;
}
