import express, {Express, Router} from "express";
import z from "zod";

import {
  createURLController,
  getURLByIdAndRedirectController,
} from "../controllers";
import {verifyJWT, validateSchema} from "../middlewares";
import {createUrlSchema} from "../schema";

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
  "/redirect/:id",
  validateSchema({
    params: z.object({
      id: z
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
