import { useRef, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ApiError, CreateRoadmapFields } from "../../../utils/types";
import { createRoadmapSchema } from "../../../utils/schema";
import { useCreateRoadmapMutation } from "../../../slices/roadmapApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateRoadmapForm = () => {
  const [tagInput, setTagInput] = useState<string>("");
  const tagInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateRoadmapFields>({
    resolver: zodResolver(createRoadmapSchema),
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "steps",
  });

  const watchTags = watch("tags", []);

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

  const handleDivClick = () => {
    tagInputRef.current?.focus();
  };

  const [newRoadmap, { isError, isLoading, reset }] =
    useCreateRoadmapMutation();

  const onSubmit: SubmitHandler<CreateRoadmapFields> = async (data) => {
    try {
      await newRoadmap(data).unwrap();
      toast.success("Roadmap has been created successfully");
      navigate("/home");
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl lg:text-3xl 2xl:text-4xl py-2 font-semibold">
        Create Roadmap
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* title */}
        <div>
          <label htmlFor="title">Title</label>
          <input
            {...register("title")}
            id="title"
            placeholder="Enter roadmap's title"
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        {/* description */}
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            {...register("description")}
            id="description"
            placeholder="Enter roadmap description"
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        {/* tags */}
        <div>
          <label htmlFor="tags">Tags</label>
          <div onClick={handleDivClick}>
            {watchTags.map((tag, idx) => (
              <span key={idx}>
                {tag}
                <button type="button" onClick={() => handleRemoveTag(idx)}>
                  &times;
                </button>
              </span>
            ))}
            <input
              type="text"
              ref={tagInputRef}
              value={tagInput}
              id="tags"
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              disabled={watchTags.length >= 3}
              placeholder="Enter comma-separated tags"
            />
          </div>
          {errors.tags && <p>{errors.tags.message}</p>}
        </div>

        {/* steps */}
        <div>
          <label>Steps</label>
          {stepFields.map((step, idx) => (
            <div key={step.id}>
              <div>
                <label htmlFor={`steps.${idx}.title`}>Step Title</label>
                <input
                  {...register(`steps.${idx}.title`)}
                  placeholder="Enter step title"
                />
                {errors.steps?.[idx]?.title && (
                  <p>{errors.steps[idx]?.title?.message}</p>
                )}
              </div>

              <div>
                <label htmlFor={`steps.${idx}.description`}>
                  Step Description
                </label>
                <textarea
                  {...register(`steps.${idx}.description`)}
                  placeholder="Enter step description"
                />
                {errors.steps?.[idx]?.description && (
                  <p>{errors.steps[idx]?.description?.message}</p>
                )}
              </div>

              <div>
                <label htmlFor={`steps.${idx}.resources`}>Resources</label>
                <input
                  {...register(`steps.${idx}.resources.0`)}
                  placeholder="Enter resource URL"
                />
                {errors.steps?.[idx]?.resources?.[0] && (
                  <p>{errors.steps[idx]?.resources?.[0]?.message}</p>
                )}
              </div>

              <button type="button" onClick={() => removeStep(idx)}>
                Remove Step
              </button>
            </div>
          ))}

          {errors.steps && <p>{errors.steps.message}</p>}

          <button
            type="button"
            onClick={() =>
              appendStep({
                title: "",
                description: "",
                resources: [""],
              })
            }
          >
            Add Step
          </button>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isLoading ? "Creating" : "Submit"}
        </button>
      </form>
    </>
  );
};

export default CreateRoadmapForm;
