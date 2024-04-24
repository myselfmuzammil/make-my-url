import {Request, Response} from "express";

import {catchAsyncErrorHandler} from "../utils";
import {createURLService, findUrlByIdAndIncrement} from "../services";
import type {CreateUrlSchema} from "../schema";
import type {JwtDecodedUser, UrlIdParam} from "../types";

export const createURLController = catchAsyncErrorHandler(async function (
  req: Request<{}, {}, CreateUrlSchema> & JwtDecodedUser,
  res: Response
) {
  const URL = await createURLService({
    ...req.body,
    ...req.user,
  });

  return res.status(201).json(URL);
});

export const getURLByIdAndRedirectController = catchAsyncErrorHandler(
  async function (req: Request<UrlIdParam>, res: Response) {
    const URL = await findUrlByIdAndIncrement(req.params._id);

    return res.status(303).redirect(URL.redirectedUrl);
  }
);
