import { Link } from "react-router-dom";
import { BiPlusCircle, BiSearch } from "react-icons/bi";

import NoResults from "../../assets/NoResults.gif";

interface NoResourcesFoundProps {
  onExploreResources: () => void;
}

const NoResourcesFound: React.FC<NoResourcesFoundProps> = ({
  onExploreResources,
}) => {
  return (
    <div className="mx-4 h-full grid grid-rows-2 rounded-xl">
      <div className="flex justify-center items-center">
        <img src={NoResults} alt="couldnt find" />
      </div>

      <div className="text-xs md:text-sm flex flex-col">
        <div className="px-2 text-center tracking-wide">
          <p className="italic font-thin">
            No matching resources could be found.
          </p>
          <p className="font-extralight">
            Did you mean to{" "}
            <Link to="/roadmaps" className="text-blue-600 font-light">
              search roadmaps?
            </Link>
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center items-center md:text-base gap-y-4 gap-x-8">
          <button>
            <Link
              to="/contribute/resources"
              className="bg-gradient-to-r from-blue-400 via-blue-400 to-blue-300 text-slate-900 px-3 py-2 shadow-lg hover:shadow-2xl transition-all duration-300 font-black rounded-lg flex justify-center items-center gap-2"
            >
              <BiPlusCircle size={24} color="#1c1e1f" />
              Add your own resource
            </Link>
          </button>

          <button
            onClick={onExploreResources}
            className="bg-transparent border-2 border-slate-300 text-slate-800 px-3 py-2 shadow-lg hover:shadow-2xl transition-all duration-300 font-black rounded-lg flex justify-center items-center gap-2"
          >
            <BiSearch size={24} /> Explore other resources
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoResourcesFound;
