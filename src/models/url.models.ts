import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUrl extends Document {
    urlTitle: string;
    redirectedUrl: string;
    visits: number;
    createdBy: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface UrlMethods {
    generateURL(): string
}

const urlSchema = new mongoose
.Schema<IUrl, Model<IUrl, {}, UrlMethods>, UrlMethods>(
    {
        urlTitle: {
            type: String,
        },

        redirectedUrl: {
            type: String,
            required: true,
        },

        visits: {
            type: Number,
            default: 0
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },

    {
        timestamps: true, 
    }
);

urlSchema.methods.generateURL = function () {
    const url = this as IUrl & UrlMethods;

    const { PROTOCOL, HOST_NAME, PORT } = process.env;
    return `${PROTOCOL}://${HOST_NAME}:${PORT}/api/v1/url/redirect/${url._id}`;
}

export const Url = mongoose.model<IUrl, Model<IUrl, {}, UrlMethods>>(
    "Url",
    urlSchema
);