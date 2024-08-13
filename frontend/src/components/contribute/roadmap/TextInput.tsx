import RoadmapInputLabel from "./RoadmapInputLabel";
import { RoadmapTextInputProps } from "../../../utils/types";

const TextInput = ({
  label,
  id,
  placeholder,
  register,
  error,
}: RoadmapTextInputProps) => (
  <div className="grid gap-0.5 group relative pt-3 pb-5">
    <RoadmapInputLabel htmlFor={id} text={label} />
    <input
      {...register(id)}
      id={id}
      placeholder={placeholder}
      className="peer focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-100 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-400/40 focus:shadow-xl focus:shadow-purple-300/20"
    />
    {error ? (
      <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
        {error.message}
      </p>
    ) : (
      <span className="absolute italic text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-gray-400 hidden transition-all ease-in-out group-focus-within:block bottom-0">
        {placeholder}
      </span>
    )}
  </div>
);

export default TextInput;
