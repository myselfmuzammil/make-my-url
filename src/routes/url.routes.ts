import express, { Router } from 'express';

import { redirectToOriginalUrl, createUrl } from "../controllers";

export const urlRoute: Router = express.Router().
post('/', createUrl).
get('/:id', redirectToOriginalUrl);