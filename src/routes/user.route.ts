import express, {Router, Express} from "express";

import {
  signupUser,
  loginUser,
  refreshUserToken,
  logoutUser,
} from "../controllers/index.js";
import {validateSchema, authenticateUser} from "../middlewares/index.js";
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
  signupUser
);

router.post(
  "/login",
  validateSchema({
    body: loginSchema,
  }),
  loginUser
);

router.patch("/logout", authenticateUser, logoutUser);

router.post(
  "/refreshToken",
  validateSchema({
    body: refreshTokenSchema,
  }),
  refreshUserToken
);

userRoute.use("/user", router);

export default userRoute;
