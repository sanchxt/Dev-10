// import { FormEvent, useCallback, useMemo, useState, useRef } from "react";

// import TextFlipAnimated from "../TextFlipAnimated";
// import {
//   filterResourceDropdownItems,
//   sortResourceDropdownItems,
// } from "../../utils/constants";
// import { ResourceByRate, ResourceSortType } from "../../utils/types";
// import { useGetResourcesQuery } from "../../slices/resourcesApiSlice";
// import Dropdown from "./Dropdown";
// import { toast } from "react-toastify";
// import ResourceCards from "./ResourceCards";
// import NoResourcesFound from "./NoResourcesFound";
// import PaginationButton from "./PaginationButton";
// import { focusAndClearSearch } from "../../utils/helpers";
// import SearchIcon from "./SearchIcon";

// const DisplayResources = () => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const searchInputRef = useRef<HTMLInputElement>(null);

//   const [formInputs, setFormInputs] = useState({
//     search: "",
//     sort: "recent" as ResourceSortType,
//     filter: "highest" as ResourceByRate,
//     pageNumber: 1,
//   });

//   const memoizedFormInputs = useMemo(() => formInputs, [formInputs]);

//   const { data, error, isLoading, isFetching, refetch } = useGetResourcesQuery(
//     memoizedFormInputs,
//     {
//       refetchOnConnect: true,
//     }
//   );

//   const handleSubmit = useCallback(
//     (e: FormEvent) => {
//       e.preventDefault();
//       const newFormInputs = {
//         search: searchQuery,
//         sort: formInputs.sort,
//         filter: formInputs.filter,
//         pageNumber: 1,
//       };

//       if (
//         JSON.stringify(newFormInputs) !== JSON.stringify(memoizedFormInputs)
//       ) {
//         setFormInputs(newFormInputs);
//         refetch().then(() => {
//           if (error) {
//             toast.error(error.message);
//           }
//           console.log("refetched");
//           console.log("data:\n", data);
//           console.log("\n");
//         });
//       }
//     },
//     [
//       searchQuery,
//       formInputs.sort,
//       formInputs.filter,
//       memoizedFormInputs,
//       refetch,
//       error,
//     ]
//   );

//   const handleNextPage = useCallback(() => {
//     setFormInputs((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
//   }, []);

//   const handlePrevPage = useCallback(() => {
//     setFormInputs((prev) => ({
//       ...prev,
//       pageNumber: prev.pageNumber > 1 ? prev.pageNumber - 1 : 1,
//     }));
//   }, []);

//   const handleSortSelect = useCallback((item: ResourceSortType) => {
//     setFormInputs((prev) => ({ ...prev, sort: item }));
//   }, []);

//   const handleFilterSelect = useCallback((item: ResourceByRate) => {
//     setFormInputs((prev) => ({ ...prev, filter: item }));
//   }, []);

//   const memoizedData = useMemo(() => data, [data]);

//   return (
//     <div className="h-full flex flex-col">
//       <div className="text-center font-light pt-1 md:pt-2 text-sm sm:text-lg lg:text-xl xl:text-2xl">
//         <TextFlipAnimated children="The perfect resources curated for devs just like you" />
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="py-6 md:py-6 lg:py-6 px-2 md:px-4 xl:px-8 flex flex-wrap"
//       >
//         {/* search */}
//         <div className="w-full relative flex justify-center items-center bg-resource-search-bg rounded-xl">
//           <label htmlFor="resource-search" className="absolute left-2">
//             <SearchIcon isFetching={isFetching} />
//           </label>
//           <input
//             ref={searchInputRef}
//             id="resource-search"
//             placeholder="Search for resources.."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full appearance-none text-resource-search-text bg-transparent rounded-l-xl text-xs tracking-wider font-medium py-1.5 md:py-2 px-1 pl-8 outline-none"
//           />
//           <button
//             type="submit"
//             className="mr-1 md:mr-2 border-l-2 border-gray-600/50 pl-1 md:pl-2"
//           >
//             <span className="px-2 md:px-4 py-0.5 flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-200 ease-in-out text-search-btn-text bg-search-btn-bg hover:bg-search-btn-hover-bg rounded-lg">
//               Search
//             </span>
//           </button>
//         </div>

//         <div className="w-full grid grid-cols-2 gap-2 place-items-center">
//           <Dropdown
//             label={`${formInputs.sort} Resources`}
//             items={sortResourceDropdownItems}
//             onSelect={handleSortSelect}
//           />
//           <Dropdown
//             label={formInputs.filter}
//             items={filterResourceDropdownItems}
//             onSelect={handleFilterSelect}
//           />
//         </div>
//       </form>

//       <div className="text-black w-full flex-grow">
//         {isLoading || isFetching ? (
//           <div className="w-full h-full grid grid-cols-2 grid-rows-2">
//             {[...Array(4)].map((_, idx) => (
//               <div role="status" key={idx} className="max-w-sm animate-pulse">
//                 <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
//                 <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
//                 <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
//                 <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
//                 <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
//                 <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
//               </div>
//             ))}
//             <span className="sr-only">Loading...</span>
//           </div>
//         ) : error ? (
//           <div className="flex justify-center items-center">
//             <p>Error fetching resources</p>
//           </div>
//         ) : (
//           <div className="min-w-full h-full">
//             {data?.resources.length === 0 ? (
//               <NoResourcesFound
//                 onExploreResources={() =>
//                   focusAndClearSearch(searchInputRef, setSearchQuery)
//                 }
//               />
//             ) : (
//               <div className="h-full flex flex-col justify-between">
//                 <ResourceCards resources={memoizedData?.resources} />

//                 <div className="flex justify-center items-center gap-4 md:gap-6 xl:gap-8 py-1 pt-2 lg:py-1.5">
//                   <PaginationButton
//                     onClick={handlePrevPage}
//                     disabled={formInputs.pageNumber === 1}
//                     direction="prev"
//                   />

//                   <div>
//                     <p className="text-page-text text-xs lg:text-sm font-medium">
//                       Page <span>{formInputs.pageNumber}</span> of{" "}
//                       <span>{data?.pages}</span>
//                     </p>
//                   </div>

//                   <PaginationButton
//                     onClick={handleNextPage}
//                     disabled={data?.pages === formInputs.pageNumber}
//                     direction="next"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DisplayResources;




// export default DisplayResources;
// import React, { FormEvent, useCallback, useMemo, useState, useRef } from "react";
// import TextFlipAnimated from "../TextFlipAnimated";
// import { sortResourceDropdownItems } from "../../utils/constants";
// import { ResourceSortType, Resource } from "../../utils/types";
// import { useGetResourcesQuery, useAddResourceRatingMutation } from "../../slices/resourcesApiSlice";
// import Dropdown from "./Dropdown";
// import { toast } from "react-toastify";
// import NoResourcesFound from "./NoResourcesFound";
// import PaginationButton from "./PaginationButton";
// import { focusAndClearSearch } from "../../utils/helpers";
// import SearchIcon from "./SearchIcon";
// import { FaStar } from "react-icons/fa6";
// import { ApiError } from "../../utils/types";

// // Popup component
// const Popup: React.FC<{ onClose: () => void; resourceId: string }> = ({ onClose, resourceId }) => {
//   const [ratingValue, setRatingValue] = useState<number>(0);
//   const [comment, setComment] = useState<string>("");
//   const [addResourceRating] = useAddResourceRatingMutation();

//   const handleRatingChange = (rating: number) => {
//     setRatingValue(rating);
//   };

//   const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setComment(e.target.value);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const finalData = {
//       id: resourceId,
//       rating: ratingValue,
//       comment: comment,
//     };

//     try {
//       await addResourceRating(finalData).unwrap();
//       toast.success("Review submitted successfully!");
//       onClose();
//     } catch (error) {
//       const err = error as ApiError;
//       toast.error(err.data?.message || err.error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-xl w-96">
//         <h2 className="text-2xl font-bold mb-4">Rate this Resource</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <div className="bg-gray-500 rounded-xl w-full p-1.5 md:p-2 xl:p-2.5 flex justify-between items-center">
//               <div className="flex">
//                 {[...Array(5)].map((_, index) => {
//                   const rating = index + 1;
//                   return (
//                     <label key={index}>
//                       <input
//                         type="radio"
//                         name="rating"
//                         value={rating}
//                         className="hidden"
//                       />
//                       <FaStar
//                         className={`cursor-pointer transition-colors duration-300 hover:text-yellow-300 ${
//                           rating <= ratingValue
//                             ? "text-yellow-500"
//                             : "text-gray-300"
//                         }`}
//                         onClick={() => handleRatingChange(rating)}
//                       />
//                     </label>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//           <div className="mb-4">
//             <textarea
//               value={comment}
//               onChange={handleCommentChange}
//               className="bg-gray-500 font-medium rounded-xl w-full p-2 xl:p-2.5 resize-none focus:outline-none text-[0.6rem] md:text-xs text-white tracking-wide scrollbar-thin scrollbar-thumb-purple-100 scrollbar-track-slate-300/20"
//               placeholder="Enter your comment here..."
//               rows={4}
//             ></textarea>
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // ResourceBox component
// const ResourceBox: React.FC<{ resource: Resource }> = ({ resource }) => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const handleFeedback = () => {
//     setIsPopupOpen(true);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
//       <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
//       <p className="text-sm text-gray-600 mb-2">Language: {resource.language}</p>
//       <p className="text-sm mb-2"><span className="font-medium">Description:</span> {resource.description}</p>
//       <div className="flex justify-between items-center mt-auto">
//         <a 
//           href={resource.link} 
//           target="_blank" 
//           rel="noopener noreferrer" 
//           className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-sm"
//         >
//           Visit Resource
//         </a>
//         <div className="flex items-center">
//           <span className="text-yellow-500 mr-2">
//             <FaStar className="inline" /> {resource.averageRating.toFixed(1)}
//           </span>
//           <button
//             onClick={handleFeedback}
//             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm"
//           >
//             Rate & Review
//           </button>
//         </div>
//       </div>
//       {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} resourceId={resource._id} />}
//     </div>
//   );
// };

// const DisplayResources = () => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const searchInputRef = useRef<HTMLInputElement>(null);

//   const [formInputs, setFormInputs] = useState({
//     search: "",
//     sort: "recent" as ResourceSortType,
//     pageNumber: 1,
//   });

//   const memoizedFormInputs = useMemo(() => formInputs, [formInputs]);

//   const { data, error, isLoading, isFetching, refetch } = useGetResourcesQuery(
//     memoizedFormInputs,
//     {
//       refetchOnConnect: true,
//     }
//   );

//   const handleSubmit = useCallback(
//     (e: FormEvent) => {
//       e.preventDefault();
//       const newFormInputs = {
//         search: searchQuery,
//         sort: formInputs.sort,
//         pageNumber: 1,
//       };

//       if (
//         JSON.stringify(newFormInputs) !== JSON.stringify(memoizedFormInputs)
//       ) {
//         setFormInputs(newFormInputs);
//         refetch().then(() => {
//           if (error) {
//             toast.error(error.message);
//           }
//           console.log("refetched");
//           console.log("data:\n", data);
//           console.log("\n");
//         });
//       }
//     },
//     [searchQuery, formInputs.sort, memoizedFormInputs, refetch, error, data]
//   );

//   const handleNextPage = useCallback(() => {
//     setFormInputs((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
//   }, []);

//   const handlePrevPage = useCallback(() => {
//     setFormInputs((prev) => ({
//       ...prev,
//       pageNumber: prev.pageNumber > 1 ? prev.pageNumber - 1 : 1,
//     }));
//   }, []);

//   const handleSortSelect = useCallback((item: ResourceSortType) => {
//     setFormInputs((prev) => ({ ...prev, sort: item }));
//   }, []);

//   const groupResourcesByLanguage = (resources: Resource[]) => {
//     return resources.reduce((acc, resource) => {
//       const { language } = resource;
//       if (!acc[language]) {
//         acc[language] = [];
//       }
//       acc[language].push(resource);
//       return acc;
//     }, {} as Record<string, Resource[]>);
//   };

//   const memoizedGroupedData = useMemo(() => {
//     return data?.resources ? groupResourcesByLanguage(data.resources) : {};
//   }, [data]);

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 md:px-6 lg:px-8">
//       <div className="h-full flex flex-col">
//         <div className="text-center font-light pt-4 md:pt-6 text-sm sm:text-lg lg:text-xl xl:text-2xl">
//           <TextFlipAnimated children="The perfect resources curated for devs just like you" />
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="py-6 md:py-8 lg:py-10 flex flex-wrap"
//         >
//           <div className="w-full relative flex justify-center items-center bg-resource-search-bg rounded-xl">
//             <label htmlFor="resource-search" className="absolute left-2">
//               <SearchIcon isFetching={isFetching} />
//             </label>
//             <input
//               ref={searchInputRef}
//               id="resource-search"
//               placeholder="Search for resources.."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full appearance-none text-resource-search-text bg-transparent rounded-l-xl text-xs tracking-wider font-medium py-1.5 md:py-2 px-1 pl-8 outline-none"
//             />
//             <button
//               type="submit"
//               className="mr-1 md:mr-2 border-l-2 border-gray-600/50 pl-1 md:pl-2"
//             >
//               <span className="px-2 md:px-4 py-0.5 flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-200 ease-in-out text-search-btn-text bg-search-btn-bg hover:bg-search-btn-hover-bg rounded-lg">
//                 Search
//               </span>
//             </button>
//           </div>

//           <div className="w-full flex justify-center mt-4">
//             <Dropdown
//               label={`${formInputs.sort} Resources`}
//               items={sortResourceDropdownItems}
//               onSelect={handleSortSelect}
//             />
//           </div>
//         </form>

//         <div className="text-black w-full flex-grow">
//           {isLoading || isFetching ? (
//             <div className="w-full h-full grid grid-cols-2 grid-rows-2">
//               {[...Array(4)].map((_, idx) => (
//                 <div role="status" key={idx} className="max-w-sm animate-pulse">
//                   <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
//                   <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
//                   <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
//                   <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
//                   <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
//                   <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
//                 </div>
//               ))}
//               <span className="sr-only">Loading...</span>
//             </div>
//           ) : error ? (
//             <div className="flex justify-center items-center">
//               <p>Error fetching resources</p>
//             </div>
//           ) : (
//             <div className="min-w-full">
//               {Object.keys(memoizedGroupedData).length === 0 ? (
//                 <NoResourcesFound
//                   onExploreResources={() =>
//                     focusAndClearSearch(searchInputRef, setSearchQuery)
//                   }
//                 />
//               ) : (
//                 <div className="flex flex-col">
//                   {Object.entries(memoizedGroupedData).map(([language, resources]) => (
//                     <div key={language} className="mb-8">
//                       <h2 className="text-2xl font-bold mb-4">{language} Resources</h2>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {resources.map((resource) => (
//                           <ResourceBox key={resource._id} resource={resource} />
//                         ))}
//                       </div>
//                     </div>
//                   ))}

//                   <div className="flex justify-center items-center gap-4 md:gap-6 xl:gap-8 py-4 md:py-6">
//                     <PaginationButton
//                       onClick={handlePrevPage}
//                       disabled={formInputs.pageNumber === 1}
//                       direction="prev"
//                     />

//                     <div>
//                       <p className="text-page-text text-xs lg:text-sm font-medium">
//                         Page <span>{formInputs.pageNumber}</span> of{" "}
//                         <span>{data?.pages}</span>
//                       </p>
//                     </div>

//                     <PaginationButton
//                       onClick={handleNextPage}
//                       disabled={data?.pages === formInputs.pageNumber}
//                       direction="next"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DisplayResources;


import React, { FormEvent, useCallback, useMemo, useState, useRef } from "react";
import TextFlipAnimated from "../TextFlipAnimated";
import { sortResourceDropdownItems } from "../../utils/constants";
import { ResourceSortType, Resource } from "../../utils/types";
import { useGetResourcesQuery, useAddResourceRatingMutation } from "../../slices/resourcesApiSlice";
import Dropdown from "./Dropdown";
import { toast } from "react-toastify";
import NoResourcesFound from "./NoResourcesFound";
import PaginationButton from "./PaginationButton";
import { focusAndClearSearch } from "../../utils/helpers";
import SearchIcon from "./SearchIcon";
import { FaStar } from "react-icons/fa6";
import { ApiError } from "../../utils/types";


// Popup component
const Popup: React.FC<{ onClose: () => void; resourceId: string }> = ({ onClose, resourceId }) => {
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [addResourceRating] = useAddResourceRatingMutation();

  const handleRatingChange = (rating: number) => {
    setRatingValue(rating);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      id: resourceId,
      rating: ratingValue,
      comment: comment,
    };

    try {
      await addResourceRating(finalData).unwrap();
      toast.success("Review submitted successfully!");
      onClose();
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.data?.message || err.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Rate this Resource</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="bg-white-500 border border-gray-300 rounded-xl w-full p-1.5 md:p-2 xl:p-2.5 flex justify-between items-center">
              <div className="flex">
                {[...Array(5)].map((_, index) => {
                  const rating = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        className="hidden"
                      />
                      <FaStar
                        className={`cursor-pointer transition-colors duration-300 hover:text-yellow-300 ${
                          rating <= ratingValue
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        onClick={() => handleRatingChange(rating)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              className=" font-medium rounded-xl w-full p-2 xl:p-2.5 resize-none focus:outline-none text-[0.6rem] md:text-xs text-black border border-gray-300 tracking-wide scrollbar-thin scrollbar-thumb-purple-100 scrollbar-track-slate-300/20"
              placeholder="Enter your comment here..."
              rows={4}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ResourceBox component
const ResourceBox: React.FC<{ resource: Resource }> = ({ resource }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleFeedback = () => {
    setIsPopupOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
      <p className="text-sm text-gray-600 mb-2">Language: {resource.language}</p>
      <p className="text-sm mb-2"><span className="font-medium">Description:</span> {resource.description}</p>
      <div className="flex justify-between items-center mt-auto">
        <a 
          href={resource.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Visit Resource
        </a>
        <div className="flex items-center">
          <span className="text-yellow-500 mr-2">
            <FaStar className="inline" /> {resource.averageRating.toFixed(1)}
          </span>
          <button
            onClick={handleFeedback}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Rate & Review
          </button>
        </div>
      </div>
      {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} resourceId={resource._id} />}
    </div>
  );
};


const FilterDropdown: React.FC<{
  languages: string[];
  selectedLanguage: string;
  selectedRating: string;
  selectedSort: string;
  onLanguageChange: (language: string) => void;
  onRatingChange: (rating: string) => void;
  onSortChange: (sort: string) => void;
}> = ({ languages, selectedLanguage, selectedRating, selectedSort, onLanguageChange, onRatingChange, onSortChange }) => {
  return (
    <div className="flex space-x-4 pt-4">
      <div>
        <select
          id="language-filter"
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Languages</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          id="rating-filter"
          value={selectedRating}
          onChange={(e) => onRatingChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars & Up</option>
          <option value="3">3 Stars & Up</option>
          <option value="2">2 Stars & Up</option>
          <option value="1">1 Star & Up</option>
        </select>
      </div>
      <div>
        <select
          id="sort-filter"
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="recent">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};

const DisplayResources = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [formInputs, setFormInputs] = useState({
    search: "",
    sort: "recent" as ResourceSortType,
    pageNumber: 1,
    language: "",
    rating: "",
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
        ...formInputs,
        search: searchQuery,
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
    [searchQuery, formInputs, memoizedFormInputs, refetch, error, data]
  );

  const handleNextPage = useCallback(() => {
    setFormInputs((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
  }, []);

  const handlePrevPage = useCallback(() => {
    setFormInputs((prev) => ({
      ...prev,
      pageNumber: prev.pageNumber > 1 ? prev.pageNumber - 1 : 1,
    }));
  }, []);

  const handleSortSelect = useCallback((item: ResourceSortType) => {
    setFormInputs((prev) => ({ ...prev, sort: item }));
  }, []);

  const handleLanguageChange = useCallback((language: string) => {
    setFormInputs((prev) => ({ ...prev, language, pageNumber: 1 }));
  }, []);

  const handleRatingChange = useCallback((rating: string) => {
    setFormInputs((prev) => ({ ...prev, rating, pageNumber: 1 }));
  }, []);

  const filteredResources = useMemo(() => {
    if (!data?.resources) return [];
    
    return data.resources.filter((resource) => {
      const languageMatch = formInputs.language === "" || resource.language === formInputs.language;
      const ratingMatch = formInputs.rating === "" || resource.averageRating >= parseInt(formInputs.rating);
      return languageMatch && ratingMatch;
    });
  }, [data?.resources, formInputs.language, formInputs.rating]);

  const groupedResources = useMemo(() => {
    if (formInputs.language !== "") {
      // If a specific language is selected, don't group
      return { [formInputs.language]: filteredResources };
    }

    // Group by language when no specific language is selected
    return filteredResources.reduce((acc, resource) => {
      const { language } = resource;
      if (!acc[language]) {
        acc[language] = [];
      }
      acc[language].push(resource);
      return acc;
    }, {} as Record<string, Resource[]>);
  }, [filteredResources, formInputs.language]);

  const languages = useMemo(() => {
    return data?.resources
      ? [...new Set(data.resources.map((resource) => resource.language))]
      : [];
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-6 lg:px-8">
      <div className="h-full flex flex-col">
        <div className="text-center font-light pt-4 md:pt-6 text-sm sm:text-lg lg:text-xl xl:text-2xl">
          <TextFlipAnimated children="The perfect resources curated for devs just like you" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="py-6 md:py-8 lg:py-10 flex flex-col space-y-4"
        >
          <div className="w-full relative flex justify-center items-center bg-resource-search-bg rounded-xl">
            <label htmlFor="resource-search" className="absolute left-2">
              <SearchIcon isFetching={isFetching} />
            </label>
            <input
              ref={searchInputRef}
              id="resource-search"
              placeholder="Search for resources.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full appearance-none text-resource-search-text bg-transparent rounded-l-xl text-xs tracking-wider font-medium py-1.5 md:py-2 px-1 pl-8 outline-none"
            />
            <button
              type="submit"
              className="mr-1 md:mr-2 border-l-2 border-gray-600/50 pl-1 md:pl-2"
            >
              <span className="px-2 md:px-4 py-0.5 flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-200 ease-in-out text-search-btn-text bg-search-btn-bg hover:bg-search-btn-hover-bg rounded-lg">
                Search
              </span>
            </button>
          </div>

          <FilterDropdown
            languages={languages}
            selectedLanguage={formInputs.language}
            selectedRating={formInputs.rating}
            selectedSort={formInputs.sort}
            onLanguageChange={handleLanguageChange}
            onRatingChange={handleRatingChange}
            onSortChange={handleSortSelect}
          />
        </form>

        <div className="text-black w-full flex-grow">
          {isLoading || isFetching ? (
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
          ) : error ? (
            <div className="flex justify-center items-center">
              <p>Error fetching resources</p>
            </div>
          ) : (
            <div className="min-w-full">
              {Object.keys(groupedResources).length === 0 ? (
                <NoResourcesFound
                  onExploreResources={() =>
                    focusAndClearSearch(searchInputRef, setSearchQuery)
                  }
                />
              ) : (
                <div className="flex flex-col">
                  {Object.entries(groupedResources).map(([language, resources]) => (
                    <div key={language} className="mb-8">
                      {formInputs.language === "" && (
                        <h2 className="text-2xl font-bold mb-4">{language} Resources</h2>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {resources.map((resource) => (
                          <ResourceBox key={resource._id} resource={resource} />
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center items-center gap-4 md:gap-6 xl:gap-8 py-4 md:py-6">
                    <PaginationButton
                      onClick={handlePrevPage}
                      disabled={formInputs.pageNumber === 1}
                      direction="prev"
                    />

                    <div>
                      <p className="text-page-text text-xs lg:text-sm font-medium">
                        Page <span>{formInputs.pageNumber}</span> of{" "}
                        <span>{data?.pages}</span>
                      </p>
                    </div>

                    <PaginationButton
                      onClick={handleNextPage}
                      disabled={data?.pages === formInputs.pageNumber}
                      direction="next"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayResources;

