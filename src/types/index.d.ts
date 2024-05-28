import core from "express-serve-static-core";
import {ApiRequest, ReqParameters} from "../utils/request.js";

declare global {
  namespace Express {
    export interface Request {
      locals: any;
    }
  }
}

export * from "./user.js";
export * from "./url.js";
export * from "./util.js";
