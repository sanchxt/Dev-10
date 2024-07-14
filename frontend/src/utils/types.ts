import { z } from "zod";
import { loginSchema } from "./schema";

export type ThemeType = "LIGHT" | "DARK";

export type LoginFormFields = z.infer<typeof loginSchema>;
