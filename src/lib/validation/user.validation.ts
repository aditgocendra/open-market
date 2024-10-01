import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const SignUpFormSchema = z
  .object({
    username: z.string().min(6).max(24),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not match",
    path: ["confirmPassword"],
  });

export const GetUsersSchema = z.object({
  limit: z.number(),
  skip: z.number(),
  keyword: z.string().optional(),
});
