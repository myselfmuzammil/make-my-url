import {URLModel} from "../models/index.js";
import {ApiError} from "../utils/index.js";
import type {JwtDecodedUser, Url, User} from "../types/index.js";
import type {UrlBody, UrlParams} from "../schema/index.js";

export async function createUrl(data: UrlBody & JwtDecodedUser["user"]) {
  const {urlTitle, redirectedUrl, _id} = data;

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

export async function findUrlsByUserId(userId: User["_id"]) {
  return URLModel.find({createdBy: userId});
}

export async function deleteUrlById(id: string) {
  return URLModel.findByIdAndDelete(id);
}

export async function findUrlByIdAndIncrement(_id: UrlParams["id"]) {
  const URL = await URLModel.findByIdAndUpdate(_id, {$inc: {visits: 1}});

  if (!URL) {
    throw new ApiError({
      message: "URL not found",
      statusCode: 404,
    });
  }

  return URL;
}
