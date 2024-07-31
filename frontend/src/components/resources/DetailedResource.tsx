import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ReviewForm from "./ReviewForm";
import { RootState } from "../../store";
import DetailedHeader from "./DetailedHeader";
import DetailedLinksAndNotes from "./DetailedLinksAndNotes";
import {
  useGetResourceByIdQuery,
  useGetLatestCommentsQuery,
} from "../../slices/resourcesApiSlice";
import { LatestCommentsProps } from "../../utils/types";

const DetailedResource = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetResourceByIdQuery(id);
  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading,
  } = useGetLatestCommentsQuery(id);

  const currentUserId = useSelector(
    (state: RootState) => state?.auth?.userInfo?._id
  );

  const filledComments = (comments || []).concat(
    Array.from({ length: Math.max(0, 3 - (comments?.length || 0)) }).map(
      () => ({
        comment: "Encourage people to review this collection",
        placeholder: true,
      })
    )
  );

  return (
    <div className="text-black h-full">
      {isLoading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="h-full">
          <DetailedHeader
            title={data?.title}
            author={data?.authorName}
            description={data?.description}
            tags={data?.tags}
          />

          <DetailedLinksAndNotes
            essentials={data?.essentials}
            extras={data?.extras}
            notes={data?.notes}
          />

          <div className="max-w-full grid grid-cols-2 pt-1 md:pt-2 md:gap-2 lg:gap-4 xl:gap-6">
            {/* comments */}
            <div>
              <h2 className="text-center text-[0.8rem] md:text-sm lg:text-base xl:text-xl font-medium md:tracking-wide">
                Latest Comments
              </h2>

              <div className="p-0.5 md:pt-1 xl:pt-2 px-1 md:px-2">
                <div className="pt-1 md:pt-2 grid grid-cols-2 grid-rows-2 gap-1 gap-y-5">
                  {commentsLoading ? (
                    <div className="">Loading comments..</div>
                  ) : commentsError ? (
                    <div className="">
                      Some error occured while trying to load the comments
                    </div>
                  ) : (
                    filledComments.map(
                      (comment: LatestCommentsProps, idx: number) => (
                        <div
                          key={idx}
                          className={`${
                            idx === 0
                              ? "bg-gray-900 col-span-2"
                              : "bg-gray-800 w-full"
                          } rounded-xl p-1.5 md:p-2 xl:p-2.5`}
                        >
                          <p
                            className={`text-[0.6rem] md:text-[0.68rem] xl:text-xs ${
                              comment.placeholder
                                ? "text-gray-300 italic"
                                : "text-slate-200"
                            } font-medium overflow-hidden whitespace-nowrap text-ellipsis`}
                          >
                            {comment.comment}
                          </p>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            </div>

            {/* review */}
            {currentUserId === data?.user ? (
              <div>hi</div>
            ) : (
              <ReviewForm id={id!} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedResource;
