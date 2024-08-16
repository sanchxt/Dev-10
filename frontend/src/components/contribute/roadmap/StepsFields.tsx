import { ImCross } from "react-icons/im";
import React, { useRef, useState } from "react";
import { useFieldArray } from "react-hook-form";

import { createRoadmapSchema } from "../../../utils/schema";
import { CreateRoadmapFieldsProps } from "../../../utils/types";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import ResourceInput from "./ResourceInput";
import RoadmapColumnHeading from "./RoadmapColumnHeading";

const StepsFields = ({
  register,
  errors,
  control,
  watch,
  setError,
  clearErrors,
  setValue,
}: CreateRoadmapFieldsProps) => {
  const [resourceInputs, setResourceInputs] = useState<string[]>([""]);
  const resourceInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const watchSteps = watch("steps");

  const {
    fields: stepFields,
    remove: removeStep,
    append: appendStep,
  } = useFieldArray({
    control,
    name: "steps",
  });

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
    <div className="bg-home-accent rounded-lg p-2 max-h-[30rem] overflow-y-auto scrollbar-thin scrollbar-track-purple-200 scrollbar-thumb-purple-100">
      <RoadmapColumnHeading text="Roadmap's Steps (Minimum 3)" />

      <div>
        {stepFields.map((step, idx) => (
          <React.Fragment key={step.id}>
            <h4 className="text-center pt-4 text-xs text-home-text-secondary italic tracking-wider underline underline-offset-4">
              Step {idx + 1 < 10 ? "0" : ""}
              {idx + 1}
            </h4>

            <div className="relative">
              <TextInput
                label={`Step ${idx + 1} Title`}
                id={`steps.${idx}.title`}
                placeholder={`Step ${idx + 1} title`}
                register={register}
                error={errors.steps?.[idx]?.title}
              />

              <TextArea
                label={`Step ${idx + 1} Description`}
                id={`steps.${idx}.description`}
                placeholder={`Step ${idx + 1} description`}
                register={register}
                error={errors.steps?.[idx]?.description}
              />

              <ResourceInput
                label={`Step ${idx + 1} Resoruces`}
                id={`steps.${idx}.resources`}
                resources={watchSteps[idx].resources}
                resourceInput={resourceInputs[idx] || ""}
                placeholder={`Step ${idx + 1} Resources`}
                onResourceInputChange={(e) => {
                  const newInputs = [...resourceInputs];
                  newInputs[idx] = e.target.value;
                  setResourceInputs(newInputs);
                }}
                onResourceKeyDown={(e) => handleResourceKeyDown(e, idx)}
                onRemoveResource={(resourceIdx) =>
                  handleRemoveResource(idx, resourceIdx)
                }
                onDivClick={() => handleResourceDivClick(idx)}
                resourceRef={resourceInputRefs.current[idx]}
                disabled={watchSteps[idx].resources.length > 3}
                error={errors.steps?.[idx]?.resources?.message}
              />

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

        <div className="pt-2 pb-1 md:pt-4 md:pb-2 flex justify-center">
          <button
            type="button"
            onClick={addNewStep}
            className="py-2 w-full italic bg-gradient-to-r from-home-quaternary to-home-primary text-home-text font-semibold rounded-lg"
          >
            Add Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepsFields;
