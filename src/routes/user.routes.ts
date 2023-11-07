import express, { Router } from 'express';

import { createUrl } from "../controllers";

export const userRoute: Router = express.Router().
post('/signup', createUrl);