import z from "zod";

export const createUrlSchema = z.object({
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

export type CreateUrlSchema = z.infer<typeof createUrlSchema>;
