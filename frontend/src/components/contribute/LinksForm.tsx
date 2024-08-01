import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AboutResourceCollectionFields,
  ApiError,
  LinkResourceFormFields,
} from "../../utils/types";
import { handleKeyDown } from "../../utils/helpers";
import { linksResourceFormSchema } from "../../utils/schema";
import { useCreateResourceMutation } from "../../slices/resourcesApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface LinksFormProps {
  formData: AboutResourceCollectionFields;
}

const LinksForm = ({ formData }: LinksFormProps) => {
  const [essentialsInput, setEssentialsInput] = useState<string>("");
  const [extrasInput, setExtrasInput] = useState<string>("");
  const navigate = useNavigate();

  const [createResource, { isLoading }] = useCreateResourceMutation();

  const {
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LinkResourceFormFields>({
    resolver: zodResolver(linksResourceFormSchema),
  });

  const watchEssentials = watch("essentials", []);
  const watchExtras = watch("extras", []);

  const handleKeyDownEssentials = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    handleKeyDown(
      e,
      "essentials",
      essentialsInput,
      watchEssentials,
      (data) => setValue("essentials", data),
      setEssentialsInput,
      setError,
      clearErrors
    );
  };

  const handleKeyDownExtras = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(
      e,
      "extras",
      extrasInput,
      watchExtras,
      (data) => setValue("extras", data),
      setExtrasInput,
      setError,
      clearErrors
    );
  };

  const handleRemoveLink = (type: "essentials" | "extras", index: number) => {
    setValue(
      `${type}`,
      watchEssentials.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: LinkResourceFormFields) => {
    const finalFormData = {
      ...formData,
      essentials: data.essentials,
      extras: data.extras,
    };

    try {
      await createResource(finalFormData).unwrap();
      toast.success("Resource collection created successfully");
      navigate("/");
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-center text-xl lg:text-3xl 2xl:text-4xl py-2 font-semibold">
        Links for Resource Collection
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-grow pt-4 lg:pt-8"
      >
        <div className="flex flex-col md:flex-row h-[90%]">
          {/* essentials */}
          <div className="h-[45%] md:h-full md:w-1/2 px-4 bg-slate-200/20 rounded-l-xl">
            <h1 className="text-lg text-center tracking-wider font-thin py-3 md:py-4">
              Resource Links
            </h1>

            <div className="flex flex-col group relative pb-5 group">
              <label
                htmlFor="essentials"
                className="text-xs pb-2 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
              >
                Essential Resources Links
              </label>

              <div className="peer rounded-lg bg-gray-300 py-2 px-2 text-sm font-light outline-none transition-all duration-500 ease-in-out focus-within:bg-gray-200 focus-within:ring-2 focus-within:ring-purple-400/40 cursor-text">
                <input
                  type="text"
                  value={essentialsInput}
                  id="essentials"
                  disabled={watchEssentials.length >= 5}
                  onChange={(e) => setEssentialsInput(e.target.value)}
                  onKeyDown={handleKeyDownEssentials}
                  className={`bg-transparent outline-none placeholder:text-xs focus:placeholder-purple-500/80 w-full ${
                    watchEssentials.length >= 5 && "hidden"
                  }`}
                  placeholder="Enter comma separated links"
                />
              </div>

              <div>
                {watchEssentials.map((link, index) => (
                  <div
                    key={index}
                    className="bg-purple-100/70 flex text-purple-500 px-2 sm:py-1 rounded mt-2 text-ellipsis overflow-hidden text-xs md:text-sm"
                  >
                    <button
                      type="button"
                      className="mr-1 font-bold"
                      onClick={() => handleRemoveLink("essentials", index)}
                    >
                      &times;
                    </button>
                    <p>{link}</p>
                  </div>
                ))}
              </div>

              {errors.essentials && (
                <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                  {errors.essentials.message}
                </p>
              )}
            </div>
          </div>

          {/* extras */}
          <div className="h-[45%] md:h-full md:w-1/2 px-4 bg-slate-200/20 rounded-r-xl">
            <h1 className="text-lg text-center tracking-wider font-thin py-3 md:py-4">
              Extra Links
            </h1>

            <div className="flex flex-col group relative pb-5 group">
              <label
                htmlFor="extras"
                className="text-xs pb-2 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
              >
                Extra Resources Links
              </label>

              <div className="peer rounded-lg bg-gray-300 py-2 px-2 text-sm font-light outline-none transition-all duration-500 ease-in-out focus-within:bg-gray-200 focus-within:ring-2 focus-within:ring-purple-400/40 cursor-text">
                <input
                  type="text"
                  value={extrasInput}
                  id="extras"
                  disabled={watchExtras.length >= 5}
                  onChange={(e) => setExtrasInput(e.target.value)}
                  onKeyDown={handleKeyDownExtras}
                  className={`bg-transparent outline-none placeholder:text-xs focus:placeholder-purple-500/80 w-full ${
                    watchExtras.length >= 5 && "hidden"
                  }`}
                  placeholder="Enter comma separated extra links"
                />
              </div>

              <div>
                {watchExtras.map((link, index) => (
                  <div
                    key={index}
                    className="bg-purple-100/70 flex text-purple-500 px-2 sm:py-1 rounded mt-2 text-ellipsis overflow-hidden text-xs md:text-sm"
                  >
                    <button
                      type="button"
                      className="mr-1 font-bold"
                      onClick={() => handleRemoveLink("extras", index)}
                    >
                      &times;
                    </button>
                    <p>{link}</p>
                  </div>
                ))}
              </div>

              {errors.extras && (
                <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                  {errors.extras.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex mt-2 justify-center items-center p-2 bg-purple-100 rounded-xl">
          <button className="w-full" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Submit"}{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LinksForm;
