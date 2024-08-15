import { useForm } from "react-hook-form";
import { ApiCode, ApiCodeGeneratorFields } from "../../utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiCodeGeneratorSchema } from "../../utils/schema";
import { useState } from "react";
import {
  generateAxiosCode,
  generateFetchCode,
  generateRtkQueryCode,
} from "../../utils/helpers";
import CodeModal from "./CodeModal";

const ApiCodeGenerator = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ApiCodeGeneratorFields>({
    resolver: zodResolver(apiCodeGeneratorSchema),
  });

  const [generatedCode, setGeneratedCode] = useState<ApiCode | null>(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);

  const onSubmit = (data: ApiCodeGeneratorFields) => {
    let code: ApiCode | null = null;
    if (data.approach === "fetch") {
      code = generateFetchCode(data.route, data.method, data.body);
    } else if (data.approach === "axios") {
      code = generateAxiosCode(data.route, data.method, data.body);
    } else if (data.approach === "RTK Query") {
      code = generateRtkQueryCode(data.route, data.method, data.body);
    }

    setGeneratedCode(code);
    setIsCodeModalOpen(true);
  };

  const method = watch("method");

  return (
    <div>
      <h3 className="text-center text-xs lg:text-sm font-light italic">
        API Code Generator
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:grid md:grid-cols-2 md:gap-1">
          <div className="flex flex-col group relative pb-5">
            <label
              htmlFor="route"
              className="text-[0.6rem] lg:text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
            >
              Route / Endpoint
            </label>
            <input
              id="route"
              {...register("route")}
              type="text"
              className="peer focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-100 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:ring-2 focus:ring-purple-400/40"
            />
            {errors.route && (
              <span className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                {errors.route.message}
              </span>
            )}
          </div>

          <div className="flex flex-col group relative pb-5">
            <label
              htmlFor="method"
              className="text-[0.6rem] lg:text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
            >
              HTTP Method
            </label>
            <select
              id="method"
              {...register("method")}
              className="peer text-sm focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-100 py-2 px-2 font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:ring-2 focus:ring-purple-400/40"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
            {errors.method && (
              <span className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                {errors.method.message}
              </span>
            )}
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-1">
          {(method === "POST" || method === "PUT" || method === "PATCH") && (
            <div className="flex flex-col group relative pb-5">
              <label
                htmlFor="body"
                className="text-[0.6rem] lg:text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
              >
                Request Body
              </label>
              <input
                id="body"
                {...register("body")}
                className="peer focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-100 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:ring-2 focus:ring-purple-400/40"
                placeholder='{"key": "value"}'
              />
              {errors.body && (
                <span className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                  {errors.body.message}
                </span>
              )}
            </div>
          )}

          <div
            className={`flex flex-col group relative pb-5 ${
              method !== "POST" && method !== "PUT" && method !== "PATCH"
                ? "md:col-span-2"
                : ""
            }`}
          >
            <label
              htmlFor="approach"
              className="text-[0.6rem] lg:text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
            >
              Approach
            </label>
            <select
              id="approach"
              {...register("approach")}
              className="peer focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-100 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:ring-2 focus:ring-purple-400/40"
            >
              <option value="RTK Query">RTK Query</option>
              <option value="fetch">fetch</option>
              <option value="axios">axios</option>
            </select>
            {errors.approach && (
              <span className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
                {errors.approach.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-xl shadow-sm"
        >
          Generate Code
        </button>
      </form>

      <CodeModal
        isOpen={isCodeModalOpen}
        onRequestClose={() => setIsCodeModalOpen(false)}
        code={generatedCode}
      />
    </div>
  );
};

export default ApiCodeGenerator;
