import RoadmapInputLabel from "./RoadmapInputLabel";
import { RoadmapTagInputProps } from "../../../utils/types";

const TagInput = ({
  watchTags,
  errors,
  tagInput,
  setTagInput,
  tagInputRef,
  handleTagKeyDown,
  handleRemoveTag,
}: RoadmapTagInputProps) => (
  <div className="grid gap-0.5 group relative pt-3 pb-5">
    <RoadmapInputLabel htmlFor="tags" text="Tags" />

    <div
      onClick={() => tagInputRef.current?.focus()}
      className="peer rounded-lg bg-gray-100 py-2 px-2 text-sm font-light outline-none transition-all duration-500 ease-in-out focus-within:ring-2 focus-within:ring-purple-400/40 cursor-text"
    >
      <div className="flex flex-wrap gap-1">
        {watchTags.map((tag: string, index: number) => (
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
);

export default TagInput;
