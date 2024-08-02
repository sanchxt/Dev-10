import { memo } from "react";
import { ResourceCardProps } from "../../utils/types";
import MultiLineEllipsis from "../resources/MultiLineEllipsis";
import { useNavigate } from "react-router-dom";

const ResourceBox: React.FC<ResourceCardProps> = ({ resource, index }) => {
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(`/resource/${id}`);
  };

  return (
    <div
      onClick={() => handleNavigation(resource._id)}
      className={`resource-box-gradient theme-transition cursor-pointer
      ${index === 0 && "rounded-b-lg h-1/2 md:h-3/5 xl:h-[58%]"} 
      ${
        index === 1 &&
        "rounded-r-lg md:rounded-br-none md:rounded-t-lg h-1/2 md:h-2/5 xl:h-[42%]"
      }
      ${
        index === 2 && "rounded-bl-lg md:rounded-b-lg h-1/2 md:h-2/5 xl:h-[42%]"
      }
      ${
        index === 3 &&
        "rounded-l-lg md:rounded-bl-none md:rounded-tr-lg h-1/2 md:h-3/5 xl:h-[58%]"
      }
      ${
        index === 4 &&
        "rounded-tr-lg md:rounded-tr-none md:rounded-bl-lg md:h-1/2 xl:h-3/5"
      }
      ${index === 5 && "rounded-tl-lg md:h-1/2 xl:h-2/5"}
      w-full px-0.5 py-0.5 md:px-1 md:py-1 xl:px-2 grid grid-rows-3 lg:grid-rows-4`}
    >
      {/* heading */}
      <div className="flex gap-1 md:gap-2 items-center max-w-[9rem] md:max-w-[10rem] xl:max-w-64">
        <h1 className="text-[0.68rem] md:text-sm lg:text-base font-medium md:font-bold max-w-2/3 whitespace-nowrap overflow-hidden text-ellipsis text-resource-box-title">
          {resource?.title}
        </h1>
        <p className="text-[0.55rem] md:text-[0.65rem] tracking-wide bg-resource-box-by-bg font-medium px-1 md:px-2 md:py-0.5 rounded-3xl text-resource-box-by-text italic">
          {resource?.isOfficial ? "Official" : "Community"}
        </p>
      </div>

      {/* links */}
      <div className="hidden lg:flex justify-end text-[0.6rem] md:text-xs pr-2 md:pr-4 xl:pr-6 italic">
        ({resource?.essentials.length} essentials, {resource?.extras.length}{" "}
        extras)
      </div>

      {/* description */}
      <div>
        <MultiLineEllipsis text={resource?.description} lines={2} />
      </div>

      {/* tags */}
      <div className="mt-2 flex justify-start items-center text-[0.6rem] xl:text-xs gap-2 md:gap-4 xl:gap-6 flex-wrap">
        <div className="w-full md:w-fit font-medium tracking-wide">
          <h6>Tags:</h6>
        </div>
        {resource?.tags.map((tag, idx) => (
          <p
            key={idx}
            className="bg-purple-300 text-[0.5rem] md:text-[0.6rem] xl:text-xs px-1 md:px-2 xl:px-3 xl:py-1 rounded-lg"
          >
            {tag}
          </p>
        ))}
      </div>

      {/* author */}
      <div className="text-[0.52rem] md:text-[0.7rem] xl:text-xs mt-2 md:mt-8 flex justify-end px-1 md:px-2">
        - {resource?.authorName}
      </div>
    </div>
  );
};

export default memo(ResourceBox);
