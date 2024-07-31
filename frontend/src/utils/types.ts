import { z } from "zod";
import {
  aboutResourceCollectionSchema,
  linksResourceFormSchema,
  loginSchema,
  reviewSchema,
  signupSchema,
  updateProfileSchema,
} from "./schema";
import { ComponentType } from "react";
import { FieldError } from "react-hook-form";

export type ThemeType = "LIGHT" | "DARK";

export type LoginFormFields = z.infer<typeof loginSchema>;
export type SignupFormFields = z.infer<typeof signupSchema>;
export type UpdateProfileFields = z.infer<typeof updateProfileSchema>;
export type AboutResourceCollectionFields = z.infer<
  typeof aboutResourceCollectionSchema
>;
export type LinkResourceFormFields = z.infer<typeof linksResourceFormSchema>;
export type ReviewFormFields = z.infer<typeof reviewSchema>;

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

export interface CreateResourceRequest {
  essentials: string[];
  extras: string[];
  description: string;
  notes: string;
  tags: string[];
  title: string;
}

export interface GetResourcesRequest {
  search?: string;
  sort?: string;
  filter?: string;
  pageNumber?: string;
}

export type ResourceSortType = "recent" | "oldest";
export type ResourceByRate = "highest" | "lowest";

export interface ResourceProps {
  _id: string;
  title: string;
  isOfficial: boolean;
  essentials: string[];
  extras: string[];
  description: string;
  tags: string[];
  authorName: string;
}
export interface ResourceCardProps {
  resource: ResourceProps;
  index: number;
}
export interface MultipleResourceCardsProps {
  resources: ResourceProps[];
}

export interface AddResourceRatingRequest {
  id: string;
  rating: number;
  comment: string;
}

export interface LatestCommentsProps {
  comment: string;
  placeholder: boolean;
}
