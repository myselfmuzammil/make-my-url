import express, {Express} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import {
  zodErrorHandler,
  apiErrorHandler,
  jwtErrorHandler,
  errorHandler,
} from "./middlewares/index.js";
import {env} from "./env.js";
import appRouter from "./routes/index.js";

const app: Express = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1", appRouter);

app.all("/health", (req, res) => {
  res.sendStatus(200);
});

app.use(zodErrorHandler);
app.use(apiErrorHandler);
app.use(jwtErrorHandler);
app.use(errorHandler);

export default app;
