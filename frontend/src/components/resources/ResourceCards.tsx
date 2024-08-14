// import ResourceBox from "./ResourceBox";
// import { MultipleResourceCardsProps } from "../../utils/types";
// import { memo } from "react";

// const ResourceCards: React.FC<MultipleResourceCardsProps> = ({ resources }) => {
//   const numColumns =
//     resources.length > 4 ? "3" : resources.length > 2 ? "2" : "1";

//   return (
//     <div
//       className={`h-full grid gap-1  ${
//         numColumns === "1" ? "grid-cols-1" : "grid-cols-2"
//       }
//     ${numColumns === "2" ? "md:grid-cols-2" : ""}
//     ${numColumns === "3" ? "md:grid-cols-3" : ""}`}
//     >
//       {/* col 1 & 2 */}
//       {[0, 1].map((colIndex) => (
//         <div key={colIndex} className="flex flex-col gap-1 md:px-1">
//           {[0, 1].map((rowIndex) => {
//             const index = colIndex * 2 + rowIndex;
//             if (index >= resources.length) return null;
//             return (
//               <ResourceBox
//                 key={index}
//                 resource={resources[index]}
//                 index={index}
//               />
//             );
//           })}
//         </div>
//       ))}

//       {/* col 3 */}
//       {resources.length > 4 && (
//         <div className="col-span-2 md:col-span-1 h-fit md:h-full flex md:flex-col gap-1 md:px-1">
//           {[4, 5].map((index) => {
//             if (index >= resources.length) return null;
//             return (
//               <ResourceBox
//                 key={index}
//                 resource={resources[index]}
//                 index={index}
//               />
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default memo(ResourceCards);


import React, { memo } from "react";
import ResourceBox from "./ResourceBox";
import { MultipleResourceCardsProps } from "../../utils/types";

const ResourceCards: React.FC<MultipleResourceCardsProps> = ({ resources }) => {
  const numColumns =
    resources.length > 4 ? "3" : resources.length > 2 ? "2" : "1";

  return (
    <div
      className={`h-full grid gap-1  ${
        numColumns === "1" ? "grid-cols-1" : "grid-cols-2"
      }
    ${numColumns === "2" ? "md:grid-cols-2" : ""}
    ${numColumns === "3" ? "md:grid-cols-3" : ""}`}
    >
      {/* col 1 & 2 */}
      {[0, 1].map((colIndex) => (
        <div key={colIndex} className="flex flex-col gap-1 md:px-1">
          {[0, 1].map((rowIndex) => {
            const index = colIndex * 2 + rowIndex;
            if (index >= resources.length) return null;
            return (
              <ResourceBox
                key={resources[index]._id}
                resource={resources[index]}
                index={index}
              />
            );
          })}
        </div>
      ))}

      {/* col 3 */}
      {resources.length > 4 && (
        <div className="col-span-2 md:col-span-1 h-fit md:h-full flex md:flex-col gap-1 md:px-1">
          {[4, 5].map((index) => {
            if (index >= resources.length) return null;
            return (
              <ResourceBox
                key={resources[index]._id}
                resource={resources[index]}
                index={index}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default memo(ResourceCards);