import {URLModel} from "../models";
import {CreateUrlSchema} from "../schema";
import {ApiError} from "../utils";
import type {JwtDecodedUser, UrlIdParam} from "../types";

export async function createURLService({
  urlTitle,
  redirectedUrl,
  _id,
}: CreateUrlSchema & JwtDecodedUser["user"]) {
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

export async function findUrlByIdAndIncrement(_id: UrlIdParam["_id"]) {
  const URL = await URLModel.findByIdAndUpdate(_id, {$inc: {visits: 1}});

  if (!URL)
    throw new ApiError({
      message: "URL not found",
      statusCode: 404,
    });

  return URL;
}
