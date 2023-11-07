import express, { Router } from 'express';

import { postController, getController } from "../controllers";

export const urlRoute: Router = express.Router().
post('/', postController).
get('/:id', getController);