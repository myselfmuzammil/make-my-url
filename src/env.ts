import {createEnv} from "@t3-oss/env-core";
import {z} from "zod";

export const env = createEnv({
  server: {
    MONGO_URI: z.string().url(),
    ACCESS_TOKEN_SECRET: z.string(),
    ACCESS_TOKEN_EXPIRY: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_EXPIRY: z.string(),
    CORS_ORIGIN: z.string(),
    PORT: z.string(),
    PROTOCOL: z.string(),
    HOST_NAME: z.string(),
  },

  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
});
