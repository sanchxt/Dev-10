import { z } from "zod";
import { loginSchema, signupSchema } from "./schema";

export type ThemeType = "LIGHT" | "DARK";

export type LoginFormFields = z.infer<typeof loginSchema>;
export type SignupFormFields = z.infer<typeof signupSchema>;
