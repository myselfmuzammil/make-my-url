import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

import { Url } from '../models';
import { urlShortService } from '../services';
import { ErrorHandler, catchAsyncErrorHandler } from '../utils';
import { IReqBody, IResBody } from '../../types';

export const createUrl = catchAsyncErrorHandler(
    async (req: Request<never, never, IReqBody>, res: Response<IResBody>, next: NextFunction) => {
        const { urlTitle, redirectedUrl } = req.body;
        
        if(!redirectedUrl) return next(new ErrorHandler(
            {
                message: "fields are required",
                statusCode: 400,
            }
        ));

        const url = await Url.create(
            {
                urlTitle: urlTitle,
                redirectedUrl: redirectedUrl,
                
            }
        );

        const shortUrl = urlShortService(url._id);

        return res.status(200).json(
            {
                urlTitle: urlTitle,
                redirectedUrl: redirectedUrl,
                shortUrl: shortUrl,
                createdAt: url.createdAt,
            }
        );
        
    }
);

export const redirectToOriginalUrl = catchAsyncErrorHandler(
    async (req: Request<{id: Types.ObjectId}>, res: Response, next: NextFunction) => {
        const shortUrlId = req.params.id;

        const url = await Url.findById(shortUrlId);

        if(!url) return next(new ErrorHandler(
            {
                message: "url not found 404",
                statusCode: 404
            }
        ));

        return res.status(200).redirect(url.redirectedUrl);
    }
);