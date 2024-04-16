import {Router} from "express";

import urlRoute from "./url.routes";
import userRoute from "./user.routes";

const appRouter = Router();

appRouter.use(userRoute, urlRoute);

export default appRouter;
