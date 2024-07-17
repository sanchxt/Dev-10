import { z } from "zod";
import { loginSchema, signupSchema } from "./schema";
import { ComponentType } from "react";

export type ThemeType = "LIGHT" | "DARK";

export type LoginFormFields = z.infer<typeof loginSchema>;
export type SignupFormFields = z.infer<typeof signupSchema>;

// sidebar icons
interface SidebarIconProps {
  size: number;
  className: string;
}
export type SidebarIconType = ComponentType<SidebarIconProps>;

export interface ApiError {
  data?: {
    message?: string;
  };
  error?: string;
}
