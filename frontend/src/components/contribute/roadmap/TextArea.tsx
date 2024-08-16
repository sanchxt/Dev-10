import RoadmapInputLabel from "./RoadmapInputLabel";
import { RoadmapTextAreaProps } from "../../../utils/types";

const TextArea = ({
  label,
  id,
  placeholder,
  register,
  error,
}: RoadmapTextAreaProps) => (
  <div className="grid gap-0.5 group relative pt-3 pb-5">
    <RoadmapInputLabel htmlFor={id} text={label} />
    <textarea
      {...register(id)}
      id={id}
      placeholder={placeholder}
      className="resize-none peer focus:placeholder-purple-500/80 text-home-text placeholder:text-xs rounded-lg bg-home-secondary focus:bg-home-primary py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-400/40 focus:shadow-xl focus:shadow-purple-300/20"
    />
    {error ? (
      <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
        {error.message}
      </p>
    ) : (
      <span className="absolute text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-home-text-secondary hidden transition-all ease-in-out group-focus-within:block bottom-0">
        {placeholder}
      </span>
    )}
  </div>
);

export default TextArea;
