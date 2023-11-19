import { NextFunction, Request, Response } from 'express';
import { Schema } from 'mongoose';

import { Url } from '../models';
import { ErrorHandler, catchAsyncErrorHandler } from '../utils';
import { CreateUrlSchema } from '../schema';

export const postController = catchAsyncErrorHandler(
    async (req: Request<{}, {}, CreateUrlSchema> & {user:{_id:Schema.Types.ObjectId}}, res: Response) => {
        const { urlTitle, redirectedUrl } = req.body;

        const url = await Url.create(
            {
                urlTitle: urlTitle,
                redirectedUrl: redirectedUrl,
                createdBy: req.user._id
            }
        );

        const shortUrl = url.generateURL()

        return res.status(201).json(
            {
                urlTitle: urlTitle,
                redirectedUrl: redirectedUrl,
                shortUrl: shortUrl,
                createdAt: url.createdAt,
            }
        );
        
    }
);

export const getController = catchAsyncErrorHandler(
    async (req: Request<{id: Schema.Types.ObjectId}>, res: Response, next: NextFunction) => {
        const shortUrlId = req.params.id;

        const url = await Url.findByIdAndUpdate(
            shortUrlId, {$inc: {visits: 1}}
        );

        if(!url) return next(new ErrorHandler(
            {
                message: "url not found 404",
                statusCode: 404
            }
        ));

        return res.status(303).redirect(url.redirectedUrl);
    }
);