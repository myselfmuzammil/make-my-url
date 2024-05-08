import {Router} from "express";

import urlRoute from "./url.route.js";
import userRoute from "./user.route.js";

const appRouter = Router();

appRouter.use(userRoute, urlRoute);

export default appRouter;
