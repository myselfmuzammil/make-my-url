import express, { Express } from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { urlRoute, userRoute } from "./routes";
import { errorMiddleware } from "./middlewares";

export const app: Express = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser());

app.use(urlRoute);
app.use(userRoute);
app.use(errorMiddleware);