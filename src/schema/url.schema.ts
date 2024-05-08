import z from "zod";

export const urlBodySchema = z.object({
  urlTitle: z
    .string()
    .max(30, "Title must be less than 30 or equal")
    .optional(),

  redirectedUrl: z
    .string({
      required_error: "Url is required",
      invalid_type_error: "Url must be a string",
    })
    .trim()
    .url("Invalid Url"),
});

export const urlParamSchema = z.object({
  _id: z
    .string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string",
    })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid _id"),
});

export type UrlBody = z.infer<typeof urlBodySchema>;
export type UrlParams = z.infer<typeof urlParamSchema>;
