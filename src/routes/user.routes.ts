import express, { Router, Express } from 'express';

import { signupController, loginController } from "../controllers";
import { validateSchema } from '../middlewares';
import { loginSchema, signupSchema } from '../schema';

const router: Router  = express.Router();
export const userRoute: Express = express();

router.post(
    '/register',
    validateSchema({
        body: signupSchema
    }),
    signupController
);

router.post(
    "/login",
    validateSchema({
        body: loginSchema
    }),
    loginController
);

userRoute.use("/user", router);