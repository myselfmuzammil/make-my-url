import {Request, Response} from "express";

import {asyncHandler} from "../utils/index.js";
import {createURLService, findUrlByIdAndIncrement} from "../services/index.js";
import type {UrlBody, UrlParams} from "../schema/index.js";
import type {JwtDecodedUser} from "../types/index.js";

export const createUrl = asyncHandler(async function (
  req: Request<{}, {}, UrlBody> & JwtDecodedUser,
  res: Response
) {
  const URL = await createURLService({
    ...req.body,
    ...req.user,
  });

  return res.status(201).json(URL);
});

export const redirectUser = asyncHandler(async function (
  req: Request<UrlParams>,
  res: Response
) {
  const URL = await findUrlByIdAndIncrement(req.params._id);

  return res.status(303).redirect(URL.redirectedUrl);
});
