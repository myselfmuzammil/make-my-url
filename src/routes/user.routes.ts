import express, {Router, Express} from "express";

import {
  signupController,
  loginController,
  refreshTokenController,
  logoutUser,
} from "../controllers/index.js";
import {validateSchema, verifyJWT} from "../middlewares/index.js";
import {
  loginSchema,
  refreshTokenSchema,
  signupSchema,
} from "../schema/index.js";

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

router.patch("/logout", verifyJWT, logoutUser);

router.post(
  "/refreshToken",
  validateSchema({
    body: refreshTokenSchema,
  }),
  refreshTokenController
);

userRoute.use("/user", router);

export default userRoute;
