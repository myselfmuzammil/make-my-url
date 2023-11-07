import express, { Router } from 'express';

import { signupController, loginController } from "../controllers";

export const userRoute: Router = express.Router().
post('/signup', signupController).
post('/login', loginController);