import { z } from "zod";
import { loginSchema, signupSchema, updateProfileSchema } from "./schema";
import { ComponentType } from "react";
import { FieldError } from "react-hook-form";

export type ThemeType = "LIGHT" | "DARK";

export type LoginFormFields = z.infer<typeof loginSchema>;
export type SignupFormFields = z.infer<typeof signupSchema>;
export type UpdateProfileFields = z.infer<typeof updateProfileSchema>;

// sidebar icons
interface SidebarIconProps {
  size: number;
  className: string;
}
export type SidebarIconType = ComponentType<SidebarIconProps>;

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
}

export interface ApiError {
  data?: {
    message?: string;
  };
  error?: string;
}

export type UpdateFieldType =
  | "name"
  | "email"
  | "oldPassword"
  | "newPassword"
  | "description";
export interface UpdateFieldConfig {
  name: UpdateFieldType;
  type: string;
  placeholder: string;
  error: FieldError | undefined;
  errorMessage: string | undefined;
}
