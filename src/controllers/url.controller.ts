import {createUrl, findUrlByIdAndIncrement} from "../services/index.js";
import {ApiRequest, ApiResponse, asyncHandler} from "../utils/index.js";
import type {JwtDecodedUser} from "../types/index.js";
import type {UrlBody, UrlParams} from "../schema/index.js";

export const createUrlHandler = asyncHandler(async function (
  req: ApiRequest<{body: UrlBody}, JwtDecodedUser>
) {
  const data = await createUrl({
    ...req.body,
    ...req.locals.user,
  });

  return new ApiResponse(data, {
    message: "Url created successfully",
    statusCode: 201,
  });
});

export const redirectUser = asyncHandler(async function (
  req: ApiRequest<{params: UrlParams}>
) {
  const id = req.params._id;
  const url = await findUrlByIdAndIncrement(id);

  return (res) => res.redirect(url.redirectedUrl);
});
