import { Link } from "react-router-dom";
import { useUserStatsMutation } from "../../slices/usersApiSlice";
import { useEffect } from "react";

const DisplayTotalContributions = () => {
  const [userStats, { data, isError, isLoading }] = useUserStatsMutation();

  useEffect(() => {
    userStats();
  }, []);

  if (isError) {
    return (
      <p className="text-home-text text-sm flex items-center justify-center h-full italic">
        Error fetching stats
      </p>
    );
  }

  if (isLoading) {
    return (
      <p className="text-home-text text-sm flex items-center justify-center h-full italic">
        Loading stats
      </p>
    );
  }

  return (
    <div className="grid grid-rows-[1fr_1fr_1fr] py-2 gap-y-4 h-full">
      <div className="grid grid-cols-2">
        <h3 className="text-center text-home-text theme-transition italic text-sm md:text-base lg:text-lg font-light">
          Ratings
        </h3>

        <h3 className="text-center text-home-text theme-transition italic text-sm md:text-base lg:text-lg font-light">
          Contributions
        </h3>
      </div>

      <div className="grid grid-cols-2">
        <h2 className="flex justify-center items-start font-black text-3xl sm:text-4xl lg:text-5xl text-home-text theme-transition">
          {data?.averageRating.toFixed(1) || "N/A"}
        </h2>
        <h2 className="flex justify-center items-start font-black text-3xl sm:text-4xl lg:text-5xl text-home-text theme-transition">
          {data?.totalContributions || "N/A"}
        </h2>
      </div>

      <div>
        <p className="col-span-2 text-center italic font-extralight text-[0.67rem] sm:text-xs lg:text-sm p-1 text-home-text">
          Give back to the community by contributing your own{" "}
          <Link
            to="/resources"
            className="text-home-text-link inline-flex font-semibold relative group cursor-pointer hover:text-home-text hover:font-black transition-all duration-500 ease-in-out"
          >
            resources
            <span className="absolute left-0 top-0 h-full w-0 group-hover:w-full bg-purple-300/40 transition-all duration-500 ease-in-out"></span>
          </Link>{" "}
          or{" "}
          <Link
            to="/roadmaps"
            className="text-home-text-link inline-flex font-semibold relative group cursor-pointer hover:text-home-text hover:font-black transition-all duration-500 ease-in-out"
          >
            roadmaps
            <span className="absolute left-0 top-0 h-full w-0 group-hover:w-full bg-purple-300/40 transition-all duration-500 ease-in-out"></span>
          </Link>{" "}
          for other developers to access.
        </p>
      </div>
    </div>
  );
};

export default DisplayTotalContributions;
