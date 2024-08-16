import { useRef, useState } from "react";

import TagInput from "./TagInput";
import TextArea from "./TextArea";
import TextInput from "./TextInput";
import { createRoadmapSchema } from "../../../utils/schema";
import { CreateRoadmapFieldsProps } from "../../../utils/types";
import RoadmapColumnHeading from "./RoadmapColumnHeading";

const AboutFields = ({
  register,
  errors,
  watch,
  setError,
  clearErrors,
  setValue,
}: CreateRoadmapFieldsProps) => {
  const watchTags = watch("tags", []);
  const [tagInput, setTagInput] = useState<string>("");
  const tagInputRef = useRef<HTMLInputElement | null>(null);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const newTags = tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const validation = createRoadmapSchema.shape.tags.safeParse([
        ...watchTags,
        ...newTags,
      ]);

      if (!validation.success) {
        validation.error.errors.forEach((issue) => {
          setError("tags", { type: "manual", message: issue.message });
        });
      } else {
        clearErrors("tags");
        setValue("tags", validation.data);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    setValue(
      "tags",
      watchTags.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="bg-home-accent rounded-lg p-2">
      <RoadmapColumnHeading text="About the Roadmap" />
      <h4 className="text-center pt-4 text-xs text-home-text-secondary italic tracking-wide">
        General information about the roadmap you're submitting
      </h4>
      <TextInput
        label="Title"
        id="title"
        placeholder="Enter roadmap's title"
        register={register}
        error={errors.title}
      />

      <TextArea
        label="Description"
        id="description"
        placeholder="Enter roadmap's description"
        register={register}
        error={errors.description}
      />

      <TagInput
        watchTags={watchTags}
        errors={errors}
        tagInput={tagInput}
        setTagInput={setTagInput}
        tagInputRef={tagInputRef}
        handleTagKeyDown={handleTagKeyDown}
        handleRemoveTag={handleRemoveTag}
      />
    </div>
  );
};

export default AboutFields;
