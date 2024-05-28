import express, {Express} from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import {env} from "./env.js";
import appRouter from "./routes/index.js";
import {globalErrorHandler, defineLocals} from "./middlewares/index.js";

const app: Express = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(defineLocals());

app.use("/api/v1", appRouter);

app.all("/health", (req, res) => {
  res.sendStatus(200);
});

app.use(globalErrorHandler);

export default app;
