import { z } from "zod";
import {
  aboutResourceCollectionSchema,
  addNoteSchema,
  createRoadmapSchema,
  linksResourceFormSchema,
  loginSchema,
  reportResourceSchema,
  reviewSchema,
  signupSchema,
  updateProfileSchema,
} from "./schema";
import React, { ComponentType, ReactNode, RefObject } from "react";
import {
  Control,
  FieldError,
  FieldErrors,
  Path,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export type ThemeType = "LIGHT" | "DARK";

export type LoginFormFields = z.infer<typeof loginSchema>;
export type SignupFormFields = z.infer<typeof signupSchema>;
export type UpdateProfileFields = z.infer<typeof updateProfileSchema>;
export type AboutResourceCollectionFields = z.infer<
  typeof aboutResourceCollectionSchema
>;
export type LinkResourceFormFields = z.infer<typeof linksResourceFormSchema>;
export type ReviewFormFields = z.infer<typeof reviewSchema>;
export type ReportResourceFields = z.infer<typeof reportResourceSchema>;
export type AddNoteFields = z.infer<typeof addNoteSchema>;
export type CreateRoadmapFields = z.infer<typeof createRoadmapSchema>;

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

export interface FavoriteResourceRequest {
  id: string;
}

export interface CheckFavoriteResponse {
  isFavorite: boolean;
}

export interface ReportModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  resourceId: string;
}

export interface AddNoteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  requestRefetch: () => void;
}

export interface ShowAllNotesProps {
  isOpen: boolean;
  notes: Note[];
  onRequestClose: () => void;
  requestRefetch: () => void;
}

export interface ReportResourceRequest {
  resourceId: string;
  reason: string;
  comments: string;
}

export interface DetailedLinksAndNotesProps {
  essentials: [string];
  extras: [string];
  notes: string;
}

export interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  clicked: boolean;
}

export interface CreateNoteProps {
  title: string;
  content: string;
  color: string;
}

export type Note = {
  color: string;
  content: string;
  title: string;
  _id: string;
};

export interface DisplayNotesProps {
  notes: Note[];
  handleCreateNote: () => void;
}

export interface UpdateNoteProps {
  id: string;
  color: string;
}

export interface ModifyNoteProps {
  note: {
    color: string;
    _id: string;
  };
  requestRefetch: () => void;
}

export interface NotesSectionProps {
  isError: boolean;
  isLoading: boolean;
  handleViewAllNotes: () => void;
  handleCreateNote: () => void;
  data: Note[];
}

export interface RecentResourcesState {
  id: string;
  title: string;
}

export interface RecentlyVisitedState {
  resources: RecentResourcesState[];
  roadmaps: RecentResourcesState[];
}

export interface CreateRoadmapProps {
  title: string;
  description: string;
  tags: string[];
  steps: {
    title: string;
    description: string;
    resources: string;
  }[];
}

export interface CreateRoadmapFieldsProps {
  register: UseFormRegister<CreateRoadmapFields>;
  errors: FieldErrors<CreateRoadmapFields>;
  control?: Control<CreateRoadmapFields>;
  watch: UseFormWatch<CreateRoadmapFields>;
  setValue: UseFormSetValue<CreateRoadmapFields>;
  setError: UseFormSetError<CreateRoadmapFields>;
  clearErrors: UseFormClearErrors<CreateRoadmapFields>;
}

export interface RoadmapTextInputProps {
  label: string;
  id: Path<CreateRoadmapFields>;
  placeholder: string;
  register: UseFormRegister<CreateRoadmapFields>;
  error?: FieldError;
}

export interface RoadmapTextAreaProps {
  label: string;
  id: Path<CreateRoadmapFields>;
  placeholder: string;
  register: UseFormRegister<CreateRoadmapFields>;
  error?: FieldError;
}

export interface RoadmapTagInputProps {
  watchTags: string[];
  errors: FieldErrors<CreateRoadmapFields>;
  tagInput: string;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
  tagInputRef: RefObject<HTMLInputElement>;
  handleTagKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleRemoveTag: (index: number) => void;
}

export interface ResourceInputProps {
  label: string;
  id: Path<CreateRoadmapFields>;
  resources: string[];
  resourceInput: string;
  onResourceInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResourceKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemoveResource: (resourceIdx: number) => void;
  onDivClick: () => void;
  disabled: boolean;
  resourceRef: HTMLInputElement | null;
  error?: string;
  placeholder: string;
}

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export interface LandingButtonProps {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
}
