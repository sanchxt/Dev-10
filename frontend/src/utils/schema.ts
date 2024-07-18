import { z } from "zod";
import { maxWords } from "./helpers";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email(),
  oldPassword: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 8, {
      message: "Password is too short",
    }),
  newPassword: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 8, {
      message: "New password should be at least 8 characters long",
    }),
  description: z
    .string()
    .optional()
    .refine((value) => maxWords(value, 50), {
      message: "Description can't exceed 50 words",
    }),
});
