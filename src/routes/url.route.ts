import express, {Express, Router} from "express";

import {createUrlHandler, redirectUser} from "../controllers/index.js";
import {authenticateUser, validateSchema} from "../middlewares/index.js";
import {urlBodySchema, urlParamSchema} from "../schema/index.js";

const router: Router = express.Router();
const urlRoute: Express = express();

router.post(
  "/create",
  authenticateUser,
  validateSchema({
    body: urlBodySchema,
  }),
  createUrlHandler
);

router.get(
  "/redirect/:_id",
  validateSchema({
    params: urlParamSchema,
  }),
  redirectUser
);

urlRoute.use("/url", router);

export default urlRoute;
