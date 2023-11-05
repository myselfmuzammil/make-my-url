import mongoose from 'mongoose';

import { IUrl } from "../../types"

const urlSchema = new mongoose.Schema<IUrl>(
    {
        urlTitle: {
            type: String,
        },
        
        redirectedUrl: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

export const Url = mongoose.model<IUrl>(
    "Url",
    urlSchema
);