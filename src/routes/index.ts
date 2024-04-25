import {Router} from "express";

import urlRoute from "./url.routes.js";
import userRoute from "./user.routes.js";

const appRouter = Router();

appRouter.use(userRoute, urlRoute);

export default appRouter;
