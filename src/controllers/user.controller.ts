import type {JwtDecodedUser} from "../types/index.js";
import {
  loginUser,
  createUser,
  deleteUser,
  logoutUser,
  regenerateAccessAndRefreshTokens,
  findUser,
} from "../services/index.js";
import type {
  SignupSchema,
  LoginSchema,
  RefreshTokenSchema,
  OldAndNewPasswordsBody,
} from "../schema/index.js";
import {asyncHandler, ApiRequest, ApiResponse} from "../utils/index.js";

export const createUserHandler = asyncHandler(async function (
  req: ApiRequest<{body: SignupSchema}>
) {
  const user = await createUser(req.body);

  return new ApiResponse(user, {
    message: "user registared successfully",
    statusCode: 201,
  });
});

export const loginUserHandler = asyncHandler(async function (
  req: ApiRequest<{body: LoginSchema}>
) {
  const tokens = await loginUser(req.body);

  return new ApiResponse(tokens, {
    message: "User loged in successfully",
  });
});

export const logoutUserHandler = asyncHandler(async function (
  req: ApiRequest<{}, JwtDecodedUser>
) {
  const {user} = req.locals;
  await logoutUser(user._id);

  return new ApiResponse(null, {
    message: "user loged out successfully",
  });
});

export const resetPasswordHandler = asyncHandler(async function (
  req: ApiRequest<{body: OldAndNewPasswordsBody}, JwtDecodedUser>
) {
  const clientUser = req.locals.user;

  const user = await findUser(clientUser._id, {password: true});
  await user.resetPassword(req.body);

  return new ApiResponse(null, {
    message: "Password reset successfully",
  });
});

export const deleteUserHandler = asyncHandler(async function (
  req: ApiRequest<{}, JwtDecodedUser>
) {
  const {user} = req.locals;
  await deleteUser(user._id);

  return new ApiResponse(null, {
    message: "User permanently deleted",
  });
});

export const refreshUserToken = asyncHandler(async function (
  req: ApiRequest<{body: RefreshTokenSchema}>
) {
  const refreshToken = req.body.refreshToken;
  const tokens = await regenerateAccessAndRefreshTokens(refreshToken);

  return new ApiResponse(tokens, {
    message: "New access and refresh tokens created",
    statusCode: 201,
  });
});
