import express, { Router } from 'express';

import { postController, getController } from "../controllers";
import { authMiddleware } from '../middlewares';

export const urlRoute: Router = express.Router().
post('/', authMiddleware, postController).
get('/:id', getController);