import express, {Router, Express} from "express";

import {
  loginSchema,
  signupSchema,
  oldAndNewPasswords,
  refreshTokenSchema,
} from "../schema/index.js";
import {
  createUserHandler,
  deleteUserHandler,
  loginUserHandler,
  logoutUserHandler,
  refreshUserToken,
  resetPasswordHandler,
} from "../controllers/index.js";
import {validateSchema, authenticateUser} from "../middlewares/index.js";

const router: Router = express.Router();
const userRoute: Express = express();

router.post(
  "/register",
  validateSchema({
    body: signupSchema,
  }),
  createUserHandler
);

router.post(
  "/login",
  validateSchema({
    body: loginSchema,
  }),
  loginUserHandler
);

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
  resetPasswordHandler
);

router.delete("/logout", authenticateUser, logoutUserHandler);
router.delete("/delete", authenticateUser, deleteUserHandler);

userRoute.use("/user", router);

export default userRoute;
