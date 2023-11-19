import { Request, Response, NextFunction } from "express";
import z, { ZodType } from "zod";
import _ from 'lodash';

export function validateSchema(
    schema: Partial<Record<keyof Request, ZodType>>
) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            z.object(schema)
            .parse(
                _.pick(
                    req,
                    _.keys(schema)
                )
            ), next();
            return;
        } catch (error) {
            return next(error);
        }
    }
}