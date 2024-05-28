import core from "express-serve-static-core";

export type ReqParameters = Partial<
  Pick<core.Request, "params" | "body" | "query">
>;

export interface ApiRequest<
  T extends ReqParameters = ReqParameters,
  LocalsObj extends Record<string, any> = Record<string, any>,
> extends core.Request<T["params"], any, T["body"], T["query"]> {
  locals: LocalsObj;
}
