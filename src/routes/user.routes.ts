import express, {Router, Express} from "express";

import {
  signupController,
  loginController,
  refreshTokenController,
} from "../controllers";
import {validateSchema} from "../middlewares";
import {loginSchema, refreshTokenSchema, signupSchema} from "../schema";

const router: Router = express.Router();
const userRoute: Express = express();

router.post(
  "/register",
  validateSchema({
    body: signupSchema,
  }),
  signupController
);

router.post(
  "/login",
  validateSchema({
    body: loginSchema,
  }),
  loginController
);

router.post(
  "/refreshToken",
  validateSchema({
    body: refreshTokenSchema,
  }),
  refreshTokenController
);

userRoute.use("/user", router);

export default userRoute;
