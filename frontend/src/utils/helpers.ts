import { UseFormClearErrors, UseFormSetError } from "react-hook-form";
import { linksResourceFormSchema } from "./schema";
import { LinkResourceFormFields } from "./types";
import { MutableRefObject, SetStateAction } from "react";

export const maxWords = (value: string | undefined, max: number) => {
  if (!value) return true;
  const wordCount = value.trim().split(/\s+/).length;
  return wordCount <= max;
};

export const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  inputType: "essentials" | "extras",
  inputValue: string,
  watchValue: string[],
  setValue: (value: any) => void,
  setInputValue: (value: string) => void,
  setError: UseFormSetError<LinkResourceFormFields>,
  clearErrors: UseFormClearErrors<LinkResourceFormFields>
) => {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault();
    const newValues = inputValue
      .split(",")
      .map((link) => link.trim())
      .filter((link) => link);

    const validation = linksResourceFormSchema.shape[inputType].safeParse([
      ...watchValue,
      ...newValues,
    ]);

    if (!validation.success) {
      validation.error.errors.forEach((issue) => {
        setError(inputType, { type: "manual", message: issue.message });
      });
    } else {
      clearErrors(inputType);
      setValue(validation.data);
      setInputValue("");
    }
  }
};

export const focusAndClearSearch = (
  searchInputRef: MutableRefObject<HTMLInputElement | null>,
  setSearchQuery: React.Dispatch<SetStateAction<string>>
) => {
  if (searchInputRef.current) {
    searchInputRef.current.focus();
    setSearchQuery("");
  }
};
