import express, { Express } from 'express'

import { urlRoute } from "./url.routes.js";
import { userRoute } from "./user.routes.js";

export const appRouter: Express = express();

appRouter.use(
    userRoute,
    urlRoute,
);