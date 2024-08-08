import { Link } from "react-router-dom";

const NoRecentsFound = ({ type }: { type: "resources" | "roadmaps" }) => {
  return (
    <div className="flex-grow px-2 py-1 md:py-2 flex items-center">
      <h3 className="text-xs md:text-sm xl:text-base italic font-light tracking-wide">
        As you{" "}
        <span className="relative group">
          <Link
            to={`/${type}`}
            className="text-blue-600 font-semibold underline underline-offset-2 decoration-blue-800 group-hover:text-white transition-all duration-500 ease-in-out group-hover:decoration-transparent"
          >
            start viewing {type}
            <div className="absolute left-0 top-0 w-0 h-full group-hover:w-full group-hover:bg-blue-400/20 transition-all duration-500 ease-out" />
          </Link>
        </span>
        , your recently accessed ones will appear here, providing you an easy
        way to access them again.
      </h3>
    </div>
  );
};

export default NoRecentsFound;
