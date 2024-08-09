import React, { useRef, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ApiError, CreateRoadmapFields } from "../../../utils/types";
import { createRoadmapSchema } from "../../../utils/schema";
import { useCreateRoadmapMutation } from "../../../slices/roadmapApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";

const CreateRoadmapForm = () => {
  const [tagInput, setTagInput] = useState<string>("");
  const [resourceInputs, setResourceInputs] = useState<string[]>([""]);

  const tagInputRef = useRef<HTMLInputElement | null>(null);
  const resourceInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
      steps: [
        { title: "", description: "", resources: [] },
        { title: "", description: "", resources: [] },
        { title: "", description: "", resources: [] },
      ],
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

  const handleTagDivClick = () => {
    tagInputRef.current?.focus();
  };

  const handleResourceKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    stepIndex: number
  ) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const newResource = resourceInputs[stepIndex].trim();

      if (newResource === "") return;

      const currentResources = watchSteps[stepIndex].resources || [];
      const updatedResources = [...currentResources, newResource];

      const validation =
        createRoadmapSchema.shape.steps.element.shape.resources.safeParse(
          updatedResources
        );

      if (!validation.success) {
        setError(`steps.${stepIndex}.resources`, {
          type: "manual",
          message: validation.error.errors[0].message,
        });
      } else {
        clearErrors(`steps.${stepIndex}.resources`);
        setValue(`steps.${stepIndex}.resources`, updatedResources);
        const newResourceInputs = [...resourceInputs];
        newResourceInputs[stepIndex] = "";
        setResourceInputs(newResourceInputs);
      }
    }
  };

  const handleRemoveResource = (stepIndex: number, resourceIndex: number) => {
    const currentResource = watchSteps[stepIndex].resources || [];
    setValue(
      `steps.${stepIndex}.resources`,
      currentResource.filter((_, i) => i !== resourceIndex)
    );
  };

  const handleResourceDivClick = (stepIndex: number) => {
    resourceInputRefs.current[stepIndex]?.focus();
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

  const addNewStep = async () => {
    const lastStepIndex = watchSteps.length - 1;

    const lastStepData = {
      title: watch(`steps.${lastStepIndex}.title`),
      description: watch(`steps.${lastStepIndex}.description`),
      resources: watch(`steps.${lastStepIndex}.resources`),
    };

    const stepValidationSchema =
      createRoadmapSchema.shape.steps.element.safeParse(lastStepData);

    if (!stepValidationSchema.success) {
      stepValidationSchema.error.errors.forEach((issue) => {
        const field = issue.path[0] as keyof typeof lastStepData;
        setError(`steps.${lastStepIndex}.${field}`, {
          type: "manual",
          message: issue.message,
        });
      });
    } else {
      clearErrors(`steps.${lastStepIndex}`);
      appendStep({ title: "", description: "", resources: [] });
      setResourceInputs([...resourceInputs, ""]);
    }
  };

  return (
    <section className="h-full flex flex-col">
      <h1 className="text-center text-2xl lg:text-3xl 2xl:text-4xl py-2 font-semibold">
        Create a Roadmap
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-grow flex flex-col px-2 md:px-8 py-4 lg:py-8 gap-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {/* about fields */}
          <div className="bg-slate-200 rounded-lg p-2">
            <h3 className="text-center font-semibold tracking-wide text-sm md:text-base lg:text-lg">
              About the Roadmap
            </h3>
            {/* title */}
            <div className="grid gap-0.5 group relative pt-12 pb-5">
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
                onClick={handleTagDivClick}
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
                    className={`bg-transparent w-full outline-none placeholder:text-xs focus:placeholder-purple-500/80 ${
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

          {/* steps */}
          <div className="bg-slate-300 rounded-lg p-2 max-h-[30rem] overflow-y-auto scrollbar-thin scrollbar-track-purple-200 scrollbar-thumb-purple-100">
            <h3 className="text-center font-semibold tracking-wide text-sm md:text-base lg:text-lg">
              Roadmap's Steps
            </h3>

            <div>
              {stepFields.map((step, idx) => (
                <React.Fragment key={step.id}>
                  <h4 className="text-center pt-4 text-sm italic tracking-wider underline underline-offset-4">
                    Step {idx + 1 < 10 ? "0" : ""}
                    {idx + 1}
                  </h4>

                  <div className="relative">
                    {/* title */}
                    <div className="grid gap-0.5 group relative pt-3 pb-5">
                      <label
                        htmlFor={`steps.${idx}.title`}
                        className="text-xs pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
                      >
                        Step Title
                      </label>
                      <input
                        {...register(`steps.${idx}.title`)}
                        id={`steps.${idx}.title`}
                        placeholder="Enter step title"
                        className="peer focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-100 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-400/40 focus:shadow-xl focus:shadow-purple-300/20"
                      />
                      {errors.steps?.[idx]?.title ? (
                        <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                          {errors.steps[idx]?.title?.message}
                        </p>
                      ) : (
                        <span className="absolute italic text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-gray-400 hidden transition-all ease-in-out group-focus-within:block bottom-0">
                          Step Title
                        </span>
                      )}
                    </div>

                    {/* description */}
                    <div className="grid gap-0.5 group relative pt-3 pb-5">
                      <label
                        htmlFor={`steps.${idx}.description`}
                        className="text-xs pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
                      >
                        Step Description
                      </label>
                      <textarea
                        {...register(`steps.${idx}.description`)}
                        id={`steps.${idx}.description`}
                        placeholder="Enter step description"
                        className="resize-none peer focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-100 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-400/40 focus:shadow-xl focus:shadow-purple-300/20"
                      />
                      {errors.steps?.[idx]?.description ? (
                        <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                          {errors.steps[idx]?.description?.message}
                        </p>
                      ) : (
                        <span className="absolute italic text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-gray-400 hidden transition-all ease-in-out group-focus-within:block bottom-0">
                          Step Description
                        </span>
                      )}
                    </div>

                    {/* resources */}
                    <div className="grid gap-0.5 group relative pt-3 pb-5">
                      <label
                        htmlFor={`steps.${idx}.resources`}
                        className="text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
                      >
                        Resources
                      </label>

                      <div
                        onClick={() => handleResourceDivClick(idx)}
                        className="peer rounded-lg bg-gray-100 py-2 px-2 text-sm font-light outline-none transition-all duration-500 ease-in-out focus-within:ring-2 focus-within:ring-purple-400/40 cursor-text"
                      >
                        <div className="flex flex-wrap gap-1">
                          {watchSteps[idx].resources &&
                            watchSteps[idx].resources.map(
                              (resource, resourceIdx) => (
                                <div
                                  key={resourceIdx}
                                  className="flex items-center bg-purple-200 text-purple-700 px-2 py-1 rounded"
                                >
                                  {resource}
                                  <button
                                    type="button"
                                    className="ml-1 font-bold"
                                    onClick={() =>
                                      handleRemoveResource(idx, resourceIdx)
                                    }
                                  >
                                    &times;
                                  </button>
                                </div>
                              )
                            )}
                          <input
                            type="text"
                            ref={(el) => (resourceInputRefs.current[idx] = el)}
                            value={resourceInputs[idx] || ""}
                            onChange={(e) => {
                              const newInputs = [...resourceInputs];
                              newInputs[idx] = e.target.value;
                              setResourceInputs(newInputs);
                              console.log(watchSteps[idx].resources);
                            }}
                            onKeyDown={(e) => handleResourceKeyDown(e, idx)}
                            className="bg-transparent w-full outline-none placeholder:text-xs focus:placeholder-purple-500/80 disabled:placeholder-transparent"
                            placeholder="Enter comma separated resources"
                            disabled={watchSteps[idx].resources.length > 3}
                          />
                        </div>
                      </div>

                      {errors.steps?.[idx]?.resources ? (
                        <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                          {errors.steps[idx]?.resources?.message}
                        </p>
                      ) : (
                        <span className="absolute italic text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-gray-400 hidden transition-all ease-in-out group-focus-within:block bottom-0">
                          Resource Links
                        </span>
                      )}
                    </div>

                    {stepFields.length > 3 && (
                      <button
                        type="button"
                        className="absolute top-0 right-0 text-black text-[0.6rem]"
                        onClick={() => removeStep(idx)}
                      >
                        <ImCross />
                      </button>
                    )}
                  </div>
                </React.Fragment>
              ))}

              {errors.steps && (
                <p className="text-red-500 text-xs text-center font-semibold italic tracking-wider py-1">
                  {errors.steps.message}
                </p>
              )}

              <button type="button" onClick={addNewStep}>
                Add Step
              </button>
            </div>
          </div>
        </div>

        <div className="md:py-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-teal-300 w-full hover:bg-teal-400 hover:tracking-wide transition-all duration-300 md:col-span-2 rounded-lg font-semibold py-1 md:py-1.5 xl:py-2 shadow-xl shadow-blue-300/50"
          >
            {isLoading ? "Creating" : "Create Roadmap"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateRoadmapForm;
