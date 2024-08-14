import { Link } from "react-router-dom";
import { useUserStatsMutation } from "../../slices/usersApiSlice";
import { useEffect } from "react";

const DisplayTotalContributions = () => {
  const [userStats, { data, isError, isLoading }] = useUserStatsMutation();

  useEffect(() => {
    userStats();
  }, []);

  if (isError) {
    return <p>Error fetching stats</p>;
  }

  if (isLoading) {
    return <p>Loading stats</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-y-4">
      <div className="grid gap-4">
        <h3 className="text-center italic text-sm md:text-base lg:text-lg font-light">
          Ratings
        </h3>
        <p className="text-center font-black text-2xl md:text-3xl lg:text-4xl">
          {data?.averageRating.toFixed(1) || "N/A"}
        </p>
      </div>
      <div className="grid gap-4">
        <h3 className="text-center italic text-sm md:text-base lg:text-lg font-light">
          Contributions
        </h3>
        <p className="text-center font-black text-2xl md:text-3xl lg:text-4xl">
          {data?.totalContributions || "N/A"}
        </p>
      </div>

      <p className="col-span-2 text-center italic font-extralight text-[0.67rem] sm:text-xs lg:text-sm p-1 text-gray-700">
        Give back to the community by contributing your own{" "}
        <Link
          to="/resources"
          className="text-blue-600 inline-flex font-semibold relative group cursor-pointer hover:text-black hover:font-black transition-all duration-500 ease-in-out"
        >
          resources
          <span className="absolute left-0 top-0 h-full w-0 group-hover:w-full bg-purple-300/40 transition-all duration-500 ease-in-out"></span>
        </Link>{" "}
        or{" "}
        <Link
          to="/roadmaps"
          className="text-blue-600 inline-flex font-semibold relative group cursor-pointer hover:text-black hover:font-black transition-all duration-500 ease-in-out"
        >
          roadmaps
          <span className="absolute left-0 top-0 h-full w-0 group-hover:w-full bg-purple-300/40 transition-all duration-500 ease-in-out"></span>
        </Link>{" "}
        for other developers to access.
      </p>
    </div>
  );
};

export default DisplayTotalContributions;
