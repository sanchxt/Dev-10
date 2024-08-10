const RoadmapInputLabel = ({
  htmlFor,
  text,
}: {
  htmlFor: string;
  text: string;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
    >
      {text}
    </label>
  );
};

export default RoadmapInputLabel;
