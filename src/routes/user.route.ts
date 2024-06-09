import {Router} from "express";

import {
  loginSchema,
  signupSchema,
  oldAndNewPasswords,
  refreshTokenSchema,
} from "../schema/index.js";
import {
  createUserHandler,
  deleteUserHandler,
  findUserHandler,
  loginUserHandler,
  logoutUserHandler,
  refreshUserToken,
  resetPasswordHandler,
} from "../controllers/index.js";
import {validateSchema, authenticateUser} from "../middlewares/index.js";

const rootRoute = Router();
const userRoute = Router();

userRoute
  .route("/")
  .post(
    validateSchema({
      body: signupSchema,
    }),
    createUserHandler
  )
  .get(authenticateUser, findUserHandler)
  .delete(authenticateUser, deleteUserHandler);

userRoute.post(
  "/login",
  validateSchema({
    body: loginSchema,
  }),
  loginUserHandler
);

userRoute.post(
  "/refreshToken",
  validateSchema({
    body: refreshTokenSchema,
  }),
  refreshUserToken
);

userRoute.post(
  "/resetPassword",
  authenticateUser,
  validateSchema({
    body: oldAndNewPasswords,
  }),
  resetPasswordHandler
);

userRoute.delete("/logout", authenticateUser, logoutUserHandler);

rootRoute.use("/users", userRoute);

export default rootRoute;
