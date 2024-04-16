import {Request, Response} from "express";
import {Schema} from "mongoose";

import {catchAsyncErrorHandler} from "../utils";
import {CreateUrlSchema} from "../schema";
import {createURLService, findUrlByIdAndIncrement} from "../services";

type User = {
  user: {_id: Schema.Types.ObjectId};
};

export const createURLController = catchAsyncErrorHandler(async function (
  req: Request<{}, {}, CreateUrlSchema> & User,
  res: Response & User
) {
  const URL = await createURLService({
    ...req.body,
    ...req.user,
  });

  return res.status(201).json(URL);
});

export const getURLByIdAndRedirectController = catchAsyncErrorHandler(
  async function (req: Request<{id: Schema.Types.ObjectId}>, res: Response) {
    const URL = await findUrlByIdAndIncrement(req.params.id);

    return res.status(303).redirect(URL.redirectedUrl);
  }
);
