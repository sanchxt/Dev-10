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
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(15, { message: "Name can't contain more than 15 characters" }),
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

export const aboutResourceCollectionSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must contain at least 3 letters" })
    .max(40, { message: "Title can't contain more than 40 letters" }),
  tags: z
    .array(
      z
        .string()
        .max(8, { message: "Each tag can't be more than 8 letters long" })
    )
    .min(1, { message: "At least one tag is required" })
    .max(3, { message: "Can't have more than 3 tags" }),
  description: z
    .string()
    .min(4, { message: "Description must be at least 4 letters long" })
    .max(150, { message: "Description can't exceed 50 letters" }),
  notes: z
    .string()
    .min(4, { message: "Notes must be at least 4 letters long" })
    .max(200, { message: "Notes can't exceed 80 letters" }),
});

export const linksResourceFormSchema = z.object({
  essentials: z
    .array(
      z
        .string()
        .max(100, { message: "Each link can't have more than 100 characters" })
    )
    .min(1, { message: "At least one link is required" })
    .max(5, { message: "Can't have more than 5 links" }),
  extras: z
    .array(z.string())
    .min(1, { message: "At least 1 extra resource is required" })
    .max(5, { message: "Cannot have more than 5 extras resource links" }),
});

export const reviewSchema = z.object({
  rating: z.number().min(1, { message: "At least 1 star is required" }),
  comment: z
    .string()
    .max(100, { message: "Comment can't exceed 100 characters" }),
});

export const reportResourceSchema = z.object({
  reason: z
    .string()
    .min(3, { message: "Reason must be at least 3 characters long" })
    .max(100, { message: "Reason can't exceed 100 characters" }),
  comments: z
    .string()
    .max(200, { message: "Comments can't exceed 200 characters" })
    .optional(),
});

export const addNoteSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(40, { message: "Title can't exceed 40 characters" }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" })
    .max(150, { message: "Content can't exceed 150 characters" }),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, { message: "Color must be a valid hex code" })
    .optional(),
});
