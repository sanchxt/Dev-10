import { Link } from "react-router-dom";

const DisplayTotalContributions = ({
  contributions,
}: {
  contributions: number;
}) => {
  return (
    <>
      <h2 className="text-center text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black">
        {contributions}
      </h2>
      <div className="flex items-end text-[0.58rem] md:text-xs italic text-gray-700 px-2 py-1">
        <p>
          Add your own{" "}
          <span className="text-blue-700 cursor-pointer font-medium">
            <Link to="/resources">resource collection here</Link>
          </span>
          , or{" "}
          <span className="text-blue-700 cursor-pointer font-medium">
            <Link to="/roadmaps">roadmaps here</Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default DisplayTotalContributions;
