import { FormEvent, useCallback, useMemo, useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import TextFlipAnimated from "./TextFlipAnimated";
import {
  filterResourceDropdownItems,
  sortResourceDropdownItems,
} from "../utils/constants";
import { ResourceByRate, ResourceSortType } from "../utils/types";
import { useGetResourcesQuery } from "../slices/resourcesApiSlice";
import { toast } from "react-toastify";
import Dropdown from "./Dropdown";
import ResourceCards from "./ResourceCards";
import NoResourcesFound from "./NoResourcesFound";
import { focusAndClearSearch } from "../utils/helpers";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const DisplayResources = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [formInputs, setFormInputs] = useState({
    search: "",
    sort: "recent" as ResourceSortType,
    filter: "highest" as ResourceByRate,
    pageNumber: 1,
  });

  const memoizedFormInputs = useMemo(() => formInputs, [formInputs]);

  const { data, error, isLoading, isFetching, refetch } = useGetResourcesQuery(
    memoizedFormInputs,
    {
      refetchOnConnect: true,
    }
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const newFormInputs = {
        search: searchQuery,
        sort: formInputs.sort,
        filter: formInputs.filter,
        pageNumber: 1,
      };

      if (
        JSON.stringify(newFormInputs) !== JSON.stringify(memoizedFormInputs)
      ) {
        setFormInputs(newFormInputs);
        refetch().then(() => {
          if (error) {
            toast.error(error.message);
          }
          console.log("refetched");
          console.log("data:\n", data);
          console.log("\n");
        });
      }
    },
    [
      searchQuery,
      formInputs.sort,
      formInputs.filter,
      memoizedFormInputs,
      refetch,
      error,
    ]
  );

  const handleNextPage = () => {
    setFormInputs((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
  };

  const handlePrevPage = () => {
    setFormInputs((prev) => ({
      ...prev,
      pageNumber: prev.pageNumber > 1 ? prev.pageNumber - 1 : 1,
    }));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="text-center font-light pt-1 md:pt-2 text-sm sm:text-lg lg:text-xl xl:text-2xl">
        <TextFlipAnimated children="The perfect resources curated for devs just like you" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="py-6 lg:py-8 px-2 md:px-4 xl:px-8 flex flex-wrap"
      >
        {/* search */}
        <div className="w-full relative flex justify-center items-center bg-slate-300 rounded-xl">
          <label htmlFor="resource-search" className="absolute left-2">
            <IoIosSearch size={18} color="black" />
          </label>
          <input
            ref={searchInputRef}
            id="resource-search"
            placeholder="Search for resources.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full appearance-none text-gray-800 bg-transparent rounded-l-xl text-xs tracking-wider font-medium py-1.5 md:py-2 px-1 pl-8 outline-none"
          />
          <button
            type="submit"
            className="mr-1 md:mr-2 border-l-2 border-gray-600/50 pl-1 md:pl-2"
          >
            <span className="px-2 md:px-4 py-0.5 flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-200 ease-in-out bg-slate-400 hover:bg-slate-600/80 rounded-lg">
              Search
            </span>
          </button>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 place-items-center">
          <Dropdown
            label={`${formInputs.sort} Resources`}
            items={sortResourceDropdownItems}
            selectedItem={formInputs.sort}
            onSelect={(item: ResourceSortType) =>
              setFormInputs((prev) => ({ ...prev, sort: item }))
            }
          />
          <Dropdown
            label={formInputs.filter}
            items={filterResourceDropdownItems}
            selectedItem={formInputs.filter}
            onSelect={(item: ResourceByRate) =>
              setFormInputs((prev) => ({ ...prev, filter: item }))
            }
          />
        </div>
      </form>

      <div className="text-black w-full flex-grow">
        {isLoading ? (
          <div className="w-full h-full grid grid-cols-2 grid-rows-2">
            {[...Array(4)].map((_, idx) => (
              <div role="status" key={idx} className="max-w-sm animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              </div>
            ))}
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="min-w-full h-full">
            {data?.resources.length === 0 ? (
              <NoResourcesFound
                onExploreResources={() =>
                  focusAndClearSearch(searchInputRef, setSearchQuery)
                }
              />
            ) : (
              <div className="h-full w-full flex flex-col justify-between">
                <ResourceCards />

                <div className="flex justify-center items-center gap-4 md:gap-6 xl:gap-8 pb-1 lg:pb-2 bg-yellow-400">
                  <button
                    onClick={handlePrevPage}
                    disabled={formInputs.pageNumber === 1}
                    className="pagination-button"
                  >
                    <MdKeyboardArrowLeft color="#000" />
                  </button>

                  <div>
                    <p className="text-gray-700 text-xs lg:text-sm font-medium">
                      Page <span>{formInputs.pageNumber}</span> of{" "}
                      <span>{data?.pages}</span>
                    </p>
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={data?.pages === formInputs.pageNumber}
                    className="pagination-button"
                  >
                    <MdKeyboardArrowRight color="#000" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayResources;
