import {Router} from "express";

import {
  createUrlHandler,
  findManyUrlHandler,
  deleteUrlHandler,
  findUrlHandler,
} from "../controllers/index.js";
import {authenticateUser, validateSchema} from "../middlewares/index.js";
import {urlBodySchema, urlParamSchema} from "../schema/index.js";

const rootRoute = Router();
const urlRoute = Router();
const protectedRoute = Router();

protectedRoute
  .route("/")
  .post(
    validateSchema({
      body: urlBodySchema,
    }),
    createUrlHandler
  )
  .get(findManyUrlHandler);

protectedRoute
  .route("/:id")
  .get(
    validateSchema({
      params: urlParamSchema,
    }),
    findUrlHandler
  )
  .delete(
    validateSchema({
      params: urlParamSchema,
    }),
    deleteUrlHandler
  );

urlRoute.use(authenticateUser, protectedRoute);

rootRoute.use("/urls", urlRoute);

export default rootRoute;
