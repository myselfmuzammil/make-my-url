import {ApiRequest, ApiResponse, asyncHandler} from "../utils/index.js";
import type {JwtDecodedUser} from "../types/index.js";
import {
  createUrl,
  findUrlsByUserId,
  findUrlByIdAndIncrement,
} from "../services/index.js";
import type {UrlBody, UrlParams} from "../schema/index.js";

export const createUrlHandler = asyncHandler(async function (
  req: ApiRequest<{body: UrlBody}, JwtDecodedUser>
) {
  const {user} = req.locals;

  const data = await createUrl({
    ...req.body,
    ...user,
  });

  return new ApiResponse(data, {
    message: "Url created successfully",
    statusCode: 201,
  });
});

export const findUrlHandler = asyncHandler(async function (
  req: ApiRequest<{}, JwtDecodedUser>
) {
  const {user} = req.locals;
  const urls = await findUrlsByUserId(user._id);

  return new ApiResponse(urls);
});

export const redirectUser = asyncHandler(async function (
  req: ApiRequest<{params: UrlParams}>
) {
  const id = req.params._id;
  const url = await findUrlByIdAndIncrement(id);

  return (res) => res.redirect(url.redirectedUrl);
});
