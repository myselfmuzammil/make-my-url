import express, {Express, Router} from "express";
import z from "zod";

import {
  createURLController,
  getURLByIdAndRedirectController,
} from "../controllers/index.js";
import {verifyJWT, validateSchema} from "../middlewares/index.js";
import {createUrlSchema} from "../schema/index.js";

const router: Router = express.Router();
const urlRoute: Express = express();

router.post(
  "/create",
  verifyJWT,
  validateSchema({
    body: createUrlSchema,
  }),
  createURLController
);

router.get(
  "/redirect/:_id",
  validateSchema({
    params: z.object({
      _id: z
        .string({
          required_error: "Id is required",
          invalid_type_error: "Id must be a string",
        })
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid _id"),
    }),
  }),
  getURLByIdAndRedirectController
);

urlRoute.use("/url", router);

export default urlRoute;
