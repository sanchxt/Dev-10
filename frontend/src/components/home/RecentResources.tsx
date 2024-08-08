import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiArrowRightDoubleLine } from "react-icons/ri";

import { RootState } from "../../store";
import NoRecentsFound from "./NoRecentsFound";

const RecentResources = () => {
  const { resources } = useSelector(
    (state: RootState) => state.recentlyVisited
  );

  return (
    <div className="flex items-end">
      <div className="p-1 w-full h-full md:h-[85%] bg-gradient-to-br from-purple-300 to-purple-500 rounded-lg md:rounded-b-none flex flex-col">
        <h1 className="italic text-center pt-2 pb-1 font-medium tracking-wide text-lg lg:text-xl">
          Recently Viewed Resources
        </h1>

        {resources.length !== 0 && (
          <p className="text-[0.65rem] md:text-xs italic text-gray-600 font-light text-center tracking-wide">
            Continue where you left off !
          </p>
        )}

        {resources.length === 0 ? (
          <NoRecentsFound type="resources" />
        ) : (
          <ul className="flex-grow px-3 py-1 md:py-2 grid grid-cols-1 gap-2">
            {resources?.map((resource) => (
              <li
                key={resource.id}
                className="text-sm flex items-center gap-2 h-fit"
              >
                <Link
                  to={`/resource/${resource.id}`}
                  className="p-2 w-full capitalize whitespace-pre overflow-hidden text-ellipsis relative flex items-center group"
                >
                  {resource.title}

                  <div className="absolute h-full flex items-center justify-end left-0 w-0 px-0 overflow-hidden bg-gradient-to-r from-blue-600/15 via-blue-400/10 to-blue-100/25 rounded-xl group-hover:w-full transition-all duration-500 group-hover:px-4">
                    <RiArrowRightDoubleLine className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 text-lg" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecentResources;
