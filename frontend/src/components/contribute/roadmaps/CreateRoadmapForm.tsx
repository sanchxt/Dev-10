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
    defaultValues: {
      steps: [{ title: "", description: "", resources: [""] }],
    },
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
  const watchSteps = watch("steps");

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

  const addNewStep = () => {
    const lastStep = watchSteps[watchSteps.length - 1];
    const validation = createRoadmapSchema.shape.steps.safeParse([
      ...watchSteps,
    ]);

    if (
      !validation.success &&
      validation.error.errors.some((error) =>
        error.message.includes("At least 3 steps are required")
      )
    ) {
      appendStep({ title: "", description: "", resources: [""] });
    } else if (validation.success) {
      appendStep({ title: "", description: "", resources: [""] });
    } else {
      validation.error.errors.forEach((issue, idx) => {
        setError(`steps.${idx}.${issue.path[1]}`, {
          type: "manual",
          message: issue.message,
        });
      });
    }
  };

  return (
    <section className="h-full flex flex-col">
      <h1 className="text-center text-2xl lg:text-3xl 2xl:text-4xl py-2 font-semibold">
        Create a Roadmap
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-grow flex flex-col px-2 md:px-8 pt-4 lg:pt-8 gap-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <div className="bg-slate-200 rounded-lg p-2">
            <h3 className="text-center font-semibold tracking-wide text-sm md:text-base lg:text-lg">
              About the Roadmap
            </h3>
            {/* title */}
            <div className="grid gap-0.5 group relative pt-3 pb-5">
              <label
                htmlFor="title"
                className="text-xs pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
              >
                Title
              </label>
              <input
                {...register("title")}
                id="title"
                placeholder="Enter roadmap's title"
                className="peer focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-100 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-400/40 focus:shadow-xl focus:shadow-purple-300/20"
              />
              {errors.title ? (
                <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                  {errors.title.message}
                </p>
              ) : (
                <span className="absolute italic text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-gray-400 hidden transition-all ease-in-out group-focus-within:block bottom-0">
                  Roadmap Title
                </span>
              )}
            </div>

            {/* description */}
            <div className="grid gap-0.5 group relative pt-3 pb-5">
              <label
                htmlFor="description"
                className="text-xs pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
              >
                Description
              </label>
              <textarea
                {...register("description")}
                id="description"
                placeholder="Enter roadmap description"
                className="resize-none peer focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-100 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-400/40 focus:shadow-xl focus:shadow-purple-300/20"
              />
              {errors.description ? (
                <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                  {errors.description.message}
                </p>
              ) : (
                <span className="absolute italic text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-gray-400 hidden transition-all ease-in-out group-focus-within:block bottom-0">
                  Roadmap Description
                </span>
              )}
            </div>

            {/* tags */}
            <div className="grid gap-0.5 group relative pt-3 pb-5">
              <label
                htmlFor="tags"
                className="text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
              >
                Tags
              </label>

              <div
                onClick={handleDivClick}
                className="peer rounded-lg bg-gray-100 py-2 px-2 text-sm font-light outline-none transition-all duration-500 ease-in-out focus-within:ring-2 focus-within:ring-purple-400/40 cursor-text"
              >
                <div className="flex flex-wrap gap-1">
                  {watchTags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-purple-200 text-purple-700 px-2 py-1 rounded"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1 font-bold"
                        onClick={() => handleRemoveTag(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    ref={tagInputRef}
                    value={tagInput}
                    id="tags"
                    disabled={watchTags.length >= 3}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className={`bg-transparent outline-none placeholder:text-xs focus:placeholder-purple-500/80 ${
                      watchTags.length >= 3 && "hidden"
                    }`}
                    placeholder="Enter comma separated tags"
                  />
                </div>
              </div>

              {errors.tags ? (
                <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                  {errors.tags.message}
                </p>
              ) : (
                <span className="absolute text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-gray-400 hidden transition-all ease-in-out group-focus-within:block bottom-0">
                  Related Tags
                </span>
              )}
            </div>
          </div>

          <div className="bg-slate-300 rounded-lg p-2">
            <h3 className="text-center font-semibold tracking-wide text-sm md:text-base lg:text-lg">
              Roadmap's Steps
            </h3>

            {/* steps */}
            <div className="bg-slate-500">
              {stepFields.map((step, idx) => (
                <div key={step.id}>
                  {/* step title */}
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

                  {/* step description */}
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

                  {/* step resources */}
                  <div>
                    <label htmlFor={`steps.${idx}.resources`}>Resources</label>
                    <input
                      {...register(`steps.${idx}.resources.0`)}
                      placeholder="Enter resource link"
                    />
                    {errors.steps?.[idx]?.resources?.[0] ? (
                      <p>{errors.steps[idx]?.resources?.[0]?.message}</p>
                    ) : (
                      <span className="absolute italic text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-gray-400 hidden transition-all ease-in-out group-focus-within:block bottom-0">
                        Resource Link
                      </span>
                    )}
                  </div>

                  {stepFields.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500 text-xs"
                      onClick={() => removeStep(idx)}
                    >
                      Remove Step
                    </button>
                  )}
                </div>
              ))}

              {errors.steps && <p>{errors.steps.message}</p>}

              <button type="button" onClick={addNewStep}>
                Add Step
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-teal-300 md:col-span-2 rounded-lg font-semibold"
        >
          {isLoading ? "Creating" : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default CreateRoadmapForm;
