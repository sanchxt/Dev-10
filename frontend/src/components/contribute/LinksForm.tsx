import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import {
  AboutResourceCollectionFields,
  ApiError,
  LinkResourceFormFields,
} from "../../utils/types";
import { linksResourceFormSchema } from "../../utils/schema";
import { useCreateResourceMutation } from "../../slices/resourcesApiSlice";

interface LinksFormProps {
  formData: AboutResourceCollectionFields;
}

const LinksForm = ({ formData }: LinksFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LinkResourceFormFields>({
    resolver: zodResolver(linksResourceFormSchema),
    defaultValues: {
      links: [
        { url: "", description: "" },
        { url: "", description: "" },
      ],
    },
  });

  const {
    fields: linkFields,
    remove: removeLink,
    append: appendLink,
  } = useFieldArray({
    control,
    name: "links",
  });

  const watchLinks = watch("links");

  const handleAddNewLink = async () => {
    const lastLinkIndex = watchLinks.length - 1;
    const lastLinkData = {
      url: watch(`links.${lastLinkIndex}.url`),
      description: watch(`links.${lastLinkIndex}.description`),
    };

    const linkValidationSchema =
      linksResourceFormSchema.shape.links.element.safeParse(lastLinkData);

    if (!linkValidationSchema.success) {
      linkValidationSchema.error.errors.forEach((issue) => {
        const field = issue.path[0] as keyof typeof lastLinkData;
        setError(`links.${lastLinkIndex}.${field}`, {
          type: "manual",
          message: issue.message,
        });
      });
    } else {
      clearErrors(`links.${lastLinkIndex}`);
      appendLink({ url: "", description: "" });
    }
  };

  const [createResource, { isLoading }] = useCreateResourceMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LinkResourceFormFields> = async (data) => {
    const dataToSubmit = { ...formData, links: data.links };

    try {
      await createResource(dataToSubmit).unwrap();
      toast.success("Resource collection created successfully");
      navigate("/home");
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <section className="h-full flex flex-col bg-home-bg px-1 md:px-2">
      <h2 className="text-center py-4 font-bold text-xl md:text-2xl lg:text-3xl text-home-text">
        Add Links
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="px-0.5 md:px-1">
        <div className="bg-home-accent rounded-lg p-2 max-h-[35rem] overflow-y-auto scrollbar-thin">
          {linkFields.map((link, idx) => (
            <React.Fragment key={link.id}>
              <h4 className="text-center pt-4 text-xs text-home-text-secondary italic tracking-wider underline underline-offset-4">
                Link {idx + 1 < 10 ? "0" : ""}
                {idx + 1}
              </h4>

              <div className="relative">
                {/* url */}
                <div className="grid gap-0.5 group relative pt-3 pb-5">
                  <label
                    htmlFor={`links.${idx}.url`}
                    className="text-xs pb-1 pl-0.5 font-medium text-home-text transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
                  >
                    {`Link ${idx + 1} URL`}
                  </label>

                  <input
                    {...register(`links.${idx}.url`)}
                    id={`links.${idx}.url`}
                    placeholder={`Link ${idx + 1} URL`}
                    className="peer focus:placeholder-purple-500/80 text-home-text placeholder:text-xs rounded-lg bg-home-secondary focus:bg-home-primary py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-400/40 focus:shadow-xl focus:shadow-purple-300/20"
                  />

                  {errors.links?.[idx]?.url ? (
                    <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                      {errors.links?.[idx]?.url.message}
                    </p>
                  ) : (
                    <span className="absolute text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-home-text-secondary hidden transition-all ease-in-out group-focus-within:block bottom-0">
                      {`Link ${idx + 1} URL`}
                    </span>
                  )}
                </div>

                {/* description */}
                <div className="grid gap-0.5 group relative pt-3 pb-5">
                  <label
                    htmlFor={`links.${idx}.description`}
                    className="text-xs pb-1 pl-0.5 font-medium text-home-text transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
                  >
                    {`Link ${idx + 1} Description`}
                  </label>

                  <input
                    {...register(`links.${idx}.description`)}
                    id={`links.${idx}.description`}
                    placeholder={`Link ${idx + 1} Description`}
                    className="peer focus:placeholder-purple-500/80 text-home-text placeholder:text-xs rounded-lg bg-home-secondary focus:bg-home-primary py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-400/40 focus:shadow-xl focus:shadow-purple-300/20"
                  />

                  {errors.links?.[idx]?.description ? (
                    <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                      {errors.links?.[idx]?.description.message}
                    </p>
                  ) : (
                    <span className="absolute text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-home-text-secondary hidden transition-all ease-in-out group-focus-within:block bottom-0">
                      {`Link ${idx + 1} Description`}
                    </span>
                  )}
                </div>

                {linkFields.length > 1 && (
                  <button
                    type="button"
                    className="absolute top-0 right-0 text-home-text-secondary text-[0.6rem]"
                    onClick={() => removeLink(idx)}
                  >
                    Remove Link
                  </button>
                )}
              </div>
            </React.Fragment>
          ))}

          {errors.links && (
            <p className="text-red-500 text-xs text-center font-semibold italic tracking-wider py-1">
              {errors.links.message}
            </p>
          )}

          <div className="pt-2 pb-1 md:pt-4 md:pb-2 flex justify-center text-home-text tracking-wider text-sm disabled:text-home-secondary">
            <button
              type="button"
              onClick={handleAddNewLink}
              disabled={linkFields.length >= 5}
            >
              Add Link
            </button>
          </div>
        </div>

        <button
          className="bg-home-quaternary text-home-text font-bold tracking-wider rounded-lg md:rounded-xl p-3 text-sm lg:text-base w-full mt-4"
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? "Creating..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default LinksForm;
