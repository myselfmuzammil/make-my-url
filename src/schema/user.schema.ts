import z from "zod";

const userSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .trim()
    .toLowerCase()
    .email({message: "Invalid email"}),

  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .max(30, {message: "Name must be less than 30 or equal"}),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(4, {message: "Password must be greater than 4 or equal"}),
});

export const loginSchema = userSchema.omit({name: true});

export const signupSchema = userSchema
  .extend({
    confirmationPassword: z.string({
      required_error: "ConfirmationPassword is required",
      invalid_type_error: "ConfirmationPassword must be a string",
    }),
  })
  .refine((user) => user.password === user.confirmationPassword, {
    message: "Passwords do not match",
    path: ["confirmationPassword"],
  });

export const refreshTokenSchema = z.object({
  refreshToken: z.string({required_error: "Unauthorized request"}),
});

export const oldAndNewPasswords = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});

export type SignupSchema = z.infer<typeof userSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type OldAndNewPasswordsBody = z.infer<typeof oldAndNewPasswords>;
export type RefreshTokenSchema = z.infer<typeof refreshTokenSchema>;
