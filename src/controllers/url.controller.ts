import type {JwtDecodedUser} from "../types/index.js";
import {
  ApiError,
  ApiRequest,
  ApiResponse,
  asyncHandler,
} from "../utils/index.js";
import {
  createUrl,
  findUrlsByUserId,
  findUrlByIdAndIncrement,
} from "../services/index.js";
import {URLModel} from "../models/url.model.js";
import type {UrlBody, UrlParams} from "../schema/index.js";

export const createUrlHandler = asyncHandler(async function (
  req: ApiRequest<{body: UrlBody}, JwtDecodedUser>
) {
  const {user} = req.locals;
  const url = await createUrl({
    ...req.body,
    ...user,
  });

  return new ApiResponse(url, {
    message: "Url created successfully",
    statusCode: 201,
  });
});

export const findManyUrlHandler = asyncHandler(async function (
  req: ApiRequest<{}, JwtDecodedUser>
) {
  const {user} = req.locals;
  const urls = await findUrlsByUserId(user._id);

  return new ApiResponse(urls);
});

export const findUrlHandler = asyncHandler(async function (
  req: ApiRequest<{params: {id: string}}, JwtDecodedUser>
) {
  const url = await URLModel.findById(req.params.id);

  return new ApiResponse(url);
});

export const deleteUrlHandler = asyncHandler(async function (
  req: ApiRequest<{params: {id: string}}, JwtDecodedUser>
) {
  const {user} = req.locals;
  const url = await URLModel.findById(req.params.id);

  if (!(url && user._id === String(url.createdBy))) {
    throw new ApiError({
      name: "Authorization",
      message: "You are unauthorize to delete url",
      statusCode: 401,
    });
  }

  await url.deleteOne();

  return new ApiResponse(null, {message: "Url deleted successfully"});
});

export const redirectUser = asyncHandler(async function (
  req: ApiRequest<{params: UrlParams}>
) {
  const {id} = req.params;
  const url = await findUrlByIdAndIncrement(id);

  return (res) => res.redirect(url.redirectedUrl);
});
