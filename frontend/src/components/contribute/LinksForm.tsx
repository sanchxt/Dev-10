import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";

import {
  AboutResourceCollectionFields,
  LinkResourceFormFields,
} from "../../utils/types";
import { linksResourceFormSchema } from "../../utils/schema";

interface LinksFormProps {
  formData: AboutResourceCollectionFields;
}

const LinksForm = ({ formData }: LinksFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LinkResourceFormFields>({
    resolver: zodResolver(linksResourceFormSchema),
  });

  const handleLinkChange = (
    index: number,
    type: "essentials" | "extras",
    value: string
  ) => {
    const updateLinks = (
      links: string[],
      setLinks: Dispatch<SetStateAction<string[]>>
    ) => {
      const newLinks = [...links];
      newLinks[index] = value;

      if (index < newLinks.length - 1) {
        newLinks[index + 1] = newLinks[index + 1] || "";
      }
      setLinks(newLinks);
    };

    // type === "essentials"
    //   ? updateLinks(essentialLinks, setEssentialLinks)
    //   : updateLinks(extraLinks, setExtraLinks);
  };

  const onSubmit = (data: any) => {
    console.log("data to send:", data);
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-center text-xl lg:text-3xl 2xl:text-4xl py-2 font-semibold">
        Links for Resource Collection
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-grow pt-4 lg:pt-8 hover:drop-shadow-xl"
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-1/2 bg-slate-200">
            <h1 className="text-lg text-center tracking-wider font-thin">
              Essential Links
            </h1>

            <div className="flex flex-col px-2">
              <label htmlFor="essentials" className="text-xs">
                Essential Links
              </label>
              <input
                {...register("essentials")}
                id="essentials"
                className="focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-300 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:bg-gray-200 focus:ring-2 focus:ring-purple-400/40"
              />
            </div>
          </div>

          <div className="md:w-1/2 bg-slate-300">
            <h1 className="text-lg text-center tracking-wider font-thin">
              Extra Resources
            </h1>

            <div className="flex flex-col px-2">
              <label htmlFor="extras" className="text-xs">
                Extra Resources
              </label>

              <input
                {...register("extras")}
                id="extras"
                className="focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-300 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:bg-gray-200 focus:ring-2 focus:ring-purple-400/40"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LinksForm;
