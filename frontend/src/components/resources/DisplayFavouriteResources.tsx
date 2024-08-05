import React, { useEffect } from "react";
import { useGetFavoriteResourcesQuery } from "../../slices/resourcesApiSlice";
import TextFlipAnimated from "../TextFlipAnimated";
import NoResourcesFound from "./NoResourcesFound";
import { useNavigate } from "react-router-dom";

type Resource = {
  _id: string;
  title: string;
  description?: string;
  // Add other properties if needed
};

const DisplayFavoriteResources: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: favoriteResources = [],
    error,
    isLoading,
    refetch,
  } = useGetFavoriteResourcesQuery();

  useEffect(() => {
    refetch(); // Fetch resources on component mount
  }, [refetch]);

  useEffect(() => {
    if (favoriteResources.length > 0) {
      console.log("Fetched Favorite Resources:", favoriteResources);
    }
  }, [favoriteResources]);

  const handleResourceClick = (resourceId: string) => {
    navigate(`/resource/${resourceId}`);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="text-center font-extrabold pt-4 pb-6 text-2xl md:text-3xl lg:text-4xl">
        <TextFlipAnimated>
          Discover Your Top Favorite Resources
        </TextFlipAnimated>
      </div>

      <div className="w-full flex-grow p-4">
        {isLoading ? (
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {[...Array(6)].map((_, idx) => (
              <div
                role="status"
                key={idx}
                className="max-w-sm bg-white p-4 rounded-lg shadow-md animate-pulse"
              >
                <div className="h-3 bg-gray-300 rounded-full mb-4"></div>
                <div className="h-2 bg-gray-300 rounded-full max-w-[300px] mb-3"></div>
                <div className="h-2 bg-gray-300 rounded-full max-w-[250px] mb-3"></div>
                <div className="h-2 bg-gray-300 rounded-full max-w-[200px]"></div>
              </div>
            ))}
            <span className="sr-only">Loading...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-8">
            <p className="text-red-500 text-lg">
              Error fetching favorite resources
            </p>
          </div>
        ) : (
          <div className="w-full p-4">
            {favoriteResources.length === 0 ? (
              <NoResourcesFound />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteResources.map((resource: Resource) => (
                  <div
                    key={resource._id}
                    className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => handleResourceClick(resource._id)}
                  >
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {resource.title}
                    </h3>
                    <p className="text-gray-700 text-base">
                      {resource.description || "No description available."}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayFavoriteResources;
