import express, { Express, Router } from 'express';
import z from 'zod';

import { postController, getController } from "../controllers";
import { authMiddleware, validateSchema } from '../middlewares';
import { createUrlSchema } from '../schema';

const router: Router = express.Router();
export const urlRoute: Express = express();

router.post(
    "/create",
    authMiddleware,
    validateSchema({
        body: createUrlSchema
    }),
    postController
);

router.get(
    "/redirect/:id",
    validateSchema({
        params: z.object({
            id: z.string({
                required_error: "Id is required",
                invalid_type_error: "Id must be a string"
            }).regex(/^[0-9a-fA-F]{24}$/, "Invalid _id")
        })
    }),
    getController
);

urlRoute.use("/url", router);
