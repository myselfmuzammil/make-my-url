import express, { Router } from 'express';

import { createUser } from "../controllers";

export const userRoute: Router = express.Router().
post('/signup', createUser);