import { FormEvent, useCallback, useMemo, useState } from "react";
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

// const DisplayResources = () => {
//   const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
//   const [isOfficialDropdownOpen, setIsOfficialDropdownOpen] =
//     useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [sortResourceValue, setSortResourceValue] =
//     useState<ResourceSortType>("recent");
//   const [sortResourceBy, setSortResourceBy] =
//     useState<ResourceByRate>("community");

//   const [fetchParams, setFetchParams] = useState({
//     search: "",
//     sort: "recent" as ResourceSortType,
//     filter: "community" as ResourceByRate,
//   });
//   const memoizedFetchParams = useMemo(() => fetchParams, [fetchParams]);

//   const { data, error, isLoading, refetch } = useGetResourcesQuery(
//     memoizedFetchParams,
//     {
//       refetchOnConnect: true,
//     }
//   );

//   const toggleDropdown = (
//     setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
//   ) => {
//     setDropdownOpen((prevState) => !prevState);
//   };

//   const handleDropdownItemClick = <T extends string>(
//     item: T,
//     setValue: React.Dispatch<React.SetStateAction<T>>,
//     setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
//   ) => {
//     setValue(item);
//     setDropdownOpen(false);
//   };

//   const handleSubmit = useCallback(
//     (e: FormEvent) => {
//       e.preventDefault();
//       const newFetchParams = {
//         search: searchQuery,
//         sort: sortResourceValue,
//         filter: sortResourceBy,
//       };

//       if (
//         JSON.stringify(newFetchParams) !== JSON.stringify(memoizedFetchParams)
//       ) {
//         setFetchParams(newFetchParams);
//         refetch().then(() => {
//           if (error) {
//             toast.error(error.message);
//           }
//           console.log("refetched");
//         });
//       }
//     },
//     [
//       searchQuery,
//       sortResourceBy,
//       sortResourceValue,
//       memoizedFetchParams,
//       refetch,
//     ]
//   );

//   return (
//     <div className="h-full">
//       <ToastContainer />
//       <div className="text-center font-light py-2 text-sm sm:text-lg lg:text-xl xl:text-2xl">
//         <TextFlipAnimated children="The perfect resources curated for devs just like you" />
//       </div>

//       <div>
//         <form
//           onSubmit={handleSubmit}
//           className="py-6 lg:py-8 px-2 md:px-4 xl:px-8 flex flex-wrap"
//         >
//           {/* search */}
//           <div className="w-full relative flex justify-center items-center bg-slate-300 rounded-xl group">
//             <label htmlFor="resource-search" className="absolute left-2">
//               <IoIosSearch size={18} color="black" />
//             </label>
//             <input
//               id="resource-search"
//               placeholder="Search for resources.."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full appearance-none text-gray-800 bg-transparent rounded-l-xl text-xs tracking-wider font-medium py-1.5 md:py-2 px-1 pl-8 outline-none"
//             />
//             <button
//               type="submit"
//               className="mr-1 md:mr-2 border-l-2 border-gray-600/50 pl-1 md:pl-2"
//             >
//               <span className="px-2 md:px-4 py-0.5 flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-200 ease-in-out bg-slate-400 hover:bg-slate-600/80 rounded-lg">
//                 Search
//               </span>
//             </button>
//           </div>

//           {/* dropdown */}
//           <div className="w-full grid grid-cols-2 gap-2 place-items-center">
//             <div className="relative inline-block px-1 md:px-2 pt-2 md:pt-3">
//               <button
//                 type="button"
//                 className="px-4 py-2 w-[8.8rem] flex gap-1 justify-center items-center bg-transparent border-b text-black rounded-sm focus:outline-none text-xs capitalize"
//                 onClick={() => toggleDropdown(setIsSortDropdownOpen)}
//               >
//                 {sortResourceValue} Resources
//                 <IoIosArrowForward
//                   className={`transition-all ease-in-out duration-300 ${
//                     isSortDropdownOpen && "rotate-90"
//                   }`}
//                 />
//               </button>

//               <AnimatePresence>
//                 {isSortDropdownOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10"
//                   >
//                     <div className="py-2 flex flex-col">
//                       {sortResourceDropdownItems.map((item, index) => (
//                         <button
//                           key={index}
//                           type="submit"
//                           onClick={() =>
//                             handleDropdownItemClick(
//                               item as ResourceSortType,
//                               setSortResourceValue,
//                               setIsSortDropdownOpen
//                             )
//                           }
//                           className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-xs capitalize"
//                         >
//                           {item}
//                         </button>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             <div className="relative inline-block px-1 md:px-2 pt-2 md:pt-3">
//               <button
//                 type="button"
//                 className="px-4 py-2 w-[8.8rem] flex gap-1 justify-center items-center bg-transparent border-b text-black rounded-sm focus:outline-none text-xs capitalize"
//                 onClick={() => toggleDropdown(setIsOfficialDropdownOpen)}
//               >
//                 {sortResourceBy}
//                 <IoIosArrowForward
//                   className={`transition-all ease-in-out duration-300 ${
//                     isOfficialDropdownOpen && "rotate-90"
//                   }`}
//                 />
//               </button>

//               <AnimatePresence>
//                 {isOfficialDropdownOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10"
//                   >
//                     <div className="py-2 flex flex-col">
//                       {filterResourceDropdownItems.map((item, index) => (
//                         <button
//                           key={index}
//                           type="submit"
//                           onClick={() =>
//                             handleDropdownItemClick(
//                               item as ResourceByRate,
//                               setSortResourceBy,
//                               setIsOfficialDropdownOpen
//                             )
//                           }
//                           className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-xs text-center capitalize"
//                         >
//                           {item}
//                         </button>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </form>

//         <div className="text-black w-full bg-green-300">
//           {isLoading
//             ? "Loading..."
//             : JSON.stringify(data.resources.map((idk: any) => idk._id))}
//         </div>
//       </div>
//     </div>
//   );
// };

const DisplayResources = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [formInputs, setFormInputs] = useState({
    search: "",
    sort: "recent" as ResourceSortType,
    filter: "highest" as ResourceByRate,
  });

  const memoizedFormInputs = useMemo(() => formInputs, [formInputs]);

  const { data, error, isLoading, refetch } = useGetResourcesQuery(
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

  return (
    <div className="h-full">
      <div className="text-center font-light py-2 text-sm sm:text-lg lg:text-xl xl:text-2xl">
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
            refetch={refetch}
          />
          <Dropdown
            label={formInputs.filter}
            items={filterResourceDropdownItems}
            selectedItem={formInputs.filter}
            onSelect={(item: ResourceByRate) =>
              setFormInputs((prev) => ({ ...prev, filter: item }))
            }
            refetch={refetch}
          />
        </div>
      </form>

      <div className="text-black w-full bg-green-300">
        {isLoading
          ? "Loading..."
          : JSON.stringify(data?.resources.map((idk: any) => idk._id))}
      </div>
    </div>
  );
};

export default DisplayResources;
