// import { useRef, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { SubmitHandler, useForm } from "react-hook-form";

// import { AboutResourceCollectionFields } from "../../utils/types";
// import { aboutResourceCollectionSchema } from "../../utils/schema";

// interface AboutCollectionFormProps {
//   onSubmit: (data: AboutResourceCollectionFields) => void;
// }

// const AboutCollectionForm = ({ onSubmit }: AboutCollectionFormProps) => {
//   const [input, setInput] = useState<string>("");
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     setValue,
//     watch,
//     setError,
//     clearErrors,
//   } = useForm<AboutResourceCollectionFields>({
//     resolver: zodResolver(aboutResourceCollectionSchema),
//   });
//   const watchTags = watch("tags", []);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       const newTags = input
//         .split(",")
//         .map((tag) => tag.trim())
//         .filter((tag) => tag);

//       const validation = aboutResourceCollectionSchema.shape.tags.safeParse([
//         ...watchTags,
//         ...newTags,
//       ]);

//       if (!validation.success) {
//         validation.error.errors.forEach((issue) => {
//           setError("tags", { type: "manual", message: issue.message });
//         });
//       } else {
//         clearErrors("tags");
//         setValue("tags", validation.data);
//         setInput("");
//       }
//     }
//   };

//   const handleRemoveTag = (index: number) => {
//     setValue(
//       "tags",
//       watchTags.filter((_, i) => i !== index)
//     );
//   };

//   const handleDivClick = () => {
//     inputRef.current!.focus();
//   };

//   const handleFormSubmit: SubmitHandler<AboutResourceCollectionFields> = async (
//     data
//   ) => {
//     try {
//       onSubmit(data);
//     } catch (error) {
//       console.log("Form submission error:", error);
//     }
//   };

//   return (
//     <>
//       <h1 className="text-center text-2xl lg:text-3xl 2xl:text-4xl py-2 font-semibold">
//         Create Resource Collection
//       </h1>

//       <form
//         onSubmit={handleSubmit(handleFormSubmit)}
//         className="px-2 md:px-8 pt-4 lg:pt-8 flex flex-col gap-2 md:gap-3"
//       >
//         {/* title */}
//         <div className="flex flex-col group relative pb-5">
//           <label
//             htmlFor="title"
//             className="text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
//           >
//             Title
//           </label>
//           <input
//             {...register("title")}
//             id="title"
//             placeholder="Title of the resource collection"
//             className="peer focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-300 py-2 px-2 text-sm xl:w-2/3 font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:bg-gray-200 focus:ring-2 focus:ring-purple-400/40"
//           />
//           {errors.title ? (
//             <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
//               {errors.title.message}
//             </p>
//           ) : (
//             <span className="absolute text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-gray-400 hidden transition-all ease-in-out group-focus-within:block bottom-0">
//               Title of the Resource Collection
//             </span>
//           )}
//         </div>

//         {/* tags */}
//         <div className="flex flex-col group relative pb-5">
//           <label
//             htmlFor="tags"
//             className="text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
//           >
//             Tags
//           </label>

//           <div
//             onClick={handleDivClick}
//             className="peer rounded-lg bg-gray-300 lg:w-1/2 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus-within:bg-gray-200 focus-within:ring-2 focus-within:ring-purple-400/40 cursor-text"
//           >
//             <div className="flex flex-wrap gap-1">
//               {watchTags.map((tag, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center bg-purple-200 text-purple-700 px-2 py-1 rounded"
//                 >
//                   {tag}
//                   <button
//                     type="button"
//                     className="ml-1 font-bold"
//                     onClick={() => handleRemoveTag(index)}
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//               <input
//                 type="text"
//                 ref={inputRef}
//                 value={input}
//                 id="tags"
//                 disabled={watchTags.length >= 3}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className={`bg-transparent outline-none placeholder:text-xs focus:placeholder-purple-500/80 ${
//                   watchTags.length >= 3 && "hidden"
//                 }`}
//                 placeholder="Enter comma separated tags"
//               />
//             </div>
//           </div>

//           {errors.tags ? (
//             <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
//               {errors.tags.message}
//             </p>
//           ) : (
//             <span className="absolute text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-gray-400 hidden transition-all ease-in-out group-focus-within:block bottom-0">
//               Related Tags
//             </span>
//           )}
//         </div>

//         {/* description */}
//         <div className="flex flex-col group relative pb-5">
//           <label
//             htmlFor="description"
//             className="text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
//           >
//             Short Description
//           </label>
//           <textarea
//             {...register("description")}
//             id="description"
//             placeholder="Description of what this resource collection is about"
//             className="peer placeholder:text-xs focus:placeholder-purple-600/80 rounded-lg h-[4rem] bg-gray-300 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:bg-gray-200 focus:ring-2 focus:ring-purple-400/40 resize-none scrollbar-thin scrollbar-thumb-slate-700/20 scrollbar-track-slate-300/40"
//           ></textarea>
//           {errors.description ? (
//             <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
//               {errors.description.message}
//             </p>
//           ) : (
//             <span className="absolute text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-gray-400 hidden transition-all ease-in-out group-focus-within:block bottom-0">
//               Short Description About the Collection{" "}
//               <span className="font-extrabold">(Max 150 letters)</span>
//             </span>
//           )}
//         </div>

//         {/* notes */}
//         <div className="flex flex-col group relative pb-5">
//           <label
//             htmlFor="notes"
//             className="text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
//           >
//             Additional Notes
//           </label>
//           <textarea
//             {...register("notes")}
//             id="notes"
//             placeholder="Additonal notes to guide learners"
//             className="peer placeholder:text-xs focus:placeholder-purple-600/80 rounded-lg h-[4rem] bg-gray-300 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:bg-gray-200 focus:ring-2 focus:ring-purple-400/40 resize-none scrollbar-thin scrollbar-thumb-slate-700/20 scrollbar-track-slate-300/40"
//           ></textarea>
//           {errors.notes ? (
//             <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
//               {errors.notes.message}
//             </p>
//           ) : (
//             <span className="absolute text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-gray-400 hidden transition-all ease-in-out group-focus-within:block bottom-0">
//               Additional Notes for Learners{" "}
//               <span className="font-extrabold">(Max 200 letters)</span>
//             </span>
//           )}
//         </div>

//         <button
//           className="bg-purple-200 rounded-xl p-3"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Loading..." : "Next Page"}
//         </button>
//       </form>
//     </>
//   );
// };

// export default AboutCollectionForm;

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

// Define a schema for a single resource
const resourceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  language: z.string().min(1, "Language is required"),
  description: z.string().min(1, "Description is required"),
  link: z.string().url("Must be a valid URL"),
});

// Define the schema for the form, which now includes an array of resources
const aboutResourceCollectionSchema = z.object({
  resources: z.array(resourceSchema).min(1, "At least one resource is required"),
});

type AboutResourceCollectionFields = z.infer<typeof aboutResourceCollectionSchema>;

interface AboutCollectionFormProps {
  onSubmit: (data: z.infer<typeof resourceSchema>) => void;
}

const AboutCollectionForm = ({ onSubmit }: AboutCollectionFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AboutResourceCollectionFields>({
    resolver: zodResolver(aboutResourceCollectionSchema),
    defaultValues: {
      resources: [{ title: "", language: "", description: "", link: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "resources",
  });

  const handleFormSubmit: SubmitHandler<AboutResourceCollectionFields> = async (data) => {
    try {
      // Submit each resource individually
      for (const resource of data.resources) {
        await onSubmit(resource);
      }
    } catch (error) {
      console.log("Form submission error:", error);
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl lg:text-3xl 2xl:text-4xl py-2 font-semibold">
        Create Resource Collection
      </h1>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="px-2 md:px-8 pt-4 lg:pt-8 flex flex-col gap-2 md:gap-3"
      >
        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold mb-2">Resource {index + 1}</h2>
            
            {/* title */}
            <div className="flex flex-col group relative pb-5">
              <label htmlFor={`resources.${index}.title`} className="text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500">
                Title
              </label>
              <input
                {...register(`resources.${index}.title`)}
                id={`resources.${index}.title`}
                placeholder="Title of the resource"
                className="peer focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-300 py-2 px-2 text-sm xl:w-2/3 font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:bg-gray-200 focus:ring-2 focus:ring-purple-400/40"
              />
              {errors.resources?.[index]?.title && (
                <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                  {errors.resources[index]?.title?.message}
                </p>
              )}
            </div>

            {/* language */}
            <div className="flex flex-col group relative pb-5">
              <label htmlFor={`resources.${index}.language`} className="text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500">
                Language
              </label>
              <input
                {...register(`resources.${index}.language`)}
                id={`resources.${index}.language`}
                placeholder="Resource language"
                className="peer focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-300 py-2 px-2 text-sm xl:w-2/3 font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:bg-gray-200 focus:ring-2 focus:ring-purple-400/40"
              />
              {errors.resources?.[index]?.language && (
                <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                  {errors.resources[index]?.language?.message}
                </p>
              )}
            </div>

            {/* description */}
            <div className="flex flex-col group relative pb-5">
              <label htmlFor={`resources.${index}.description`} className="text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500">
                Short Description
              </label>
              <textarea
                {...register(`resources.${index}.description`)}
                id={`resources.${index}.description`}
                placeholder="Description of what this resource is about"
                className="peer placeholder:text-xs focus:placeholder-purple-600/80 rounded-lg h-[4rem] bg-gray-300 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:bg-gray-200 focus:ring-2 focus:ring-purple-400/40 resize-none scrollbar-thin scrollbar-thumb-slate-700/20 scrollbar-track-slate-300/40"
              ></textarea>
              {errors.resources?.[index]?.description && (
                <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                  {errors.resources[index]?.description?.message}
                </p>
              )}
            </div>

            {/* link */}
            <div className="flex flex-col group relative pb-5">
              <label htmlFor={`resources.${index}.link`} className="text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500">
                Link
              </label>
              <input
                {...register(`resources.${index}.link`)}
                id={`resources.${index}.link`}
                placeholder="Resource link"
                className="peer focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-300 py-2 px-2 text-sm xl:w-2/3 font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:bg-gray-200 focus:ring-2 focus:ring-purple-400/40"
              />
              {errors.resources?.[index]?.link && (
                <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                  {errors.resources[index]?.link?.message}
                </p>
              )}
            </div>

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white rounded-xl p-2 mt-2"
              >
                Remove Resource
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ title: "", language: "", description: "", link: "" })}
          className="bg-green-500 text-white rounded-xl p-3 mb-4"
        >
          Add Resource
        </button>

        <button
          className="bg-purple-200 rounded-xl p-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default AboutCollectionForm;