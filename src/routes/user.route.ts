import express, {Router, Express} from "express";

import {
  signupUser,
  loginUser,
  refreshUserToken,
  logoutUser,
  resetPassword,
} from "../controllers/index.js";
import {validateSchema, authenticateUser} from "../middlewares/index.js";
import {
  loginSchema,
  oldAndNewPasswords,
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

router.post(
  "/resetPassword",
  authenticateUser,
  validateSchema({
    body: oldAndNewPasswords,
  }),
  resetPassword
);

userRoute.use("/user", router);

export default userRoute;
