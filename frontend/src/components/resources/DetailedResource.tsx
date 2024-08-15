import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BsEye } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { GoBookmarkFill, GoBookmarkSlashFill, GoReport } from "react-icons/go";
import ReviewForm from "./ReviewForm";
import ReportModal from "./ReportModal";
import DetailedHeader from "./DetailedHeader";
import DetailedLinksAndNotes from "./DetailedLinksAndNotes";
import {
  useGetResourceByIdMutation,
  useGetLatestCommentsQuery,
  useCheckIfResourceFavoritedQuery,
  useAddFavoriteResourceMutation,
  useRemoveFavoriteResourceMutation,
} from "../../slices/resourcesApiSlice";
import { RootState } from "../../store";
import { addVisitedResource } from "../../slices/recentlyVisitedSlice";
import { LatestCommentsProps } from "../../utils/types";
import UpdateResourceForm from "./UpdateResourceForm";

const DetailedResource: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Using the mutation hook instead of the query
  const [getResourceById, { data, error, isLoading, refetch: test }] =
    useGetResourceByIdMutation();
  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading,
  } = useGetLatestCommentsQuery(id);

  const {
    data: isFavoritedData,
    isLoading: isFavoritedLoading,
    refetch: refetchFavoriteStatus,
  } = useCheckIfResourceFavoritedQuery({ id });
  const [addFavoriteResource] = useAddFavoriteResourceMutation();
  const [removeFavoriteResource] = useRemoveFavoriteResourceMutation();

  const currentUserId = useSelector(
    (state: RootState) => state.auth.userInfo?._id
  );

  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleUpdateClick = () => {
    setIsUpdateFormOpen(true);
  };

  const handleReportClick = () => {
    setIsReportModalOpen(true);
  };

  const handleFavoriteClick = async () => {
    if (isFavoritedData?.isFavorited) {
      await removeFavoriteResource({ id });
      toast.success("Removed from favorites");
    } else {
      await addFavoriteResource({ id });
      toast.success("Added to favorites");
    }
    refetchFavoriteStatus();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      getResourceById(id);
    }
  }, [id, getResourceById]);

  useEffect(() => {
    if (id && data?.title) {
      dispatch(addVisitedResource({ id, title: data.title }));
    }
  }, [id, data?.title]);

  if (isLoading) return <div>Loading data...</div>;
  if (error) return <div>{error.toString()}</div>;

  return (
    <div className="text-black h-full">
      <div className="h-full flex flex-col justify-between">
        <section>
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
            {/* Comments Section */}
            <div>
              <h2 className="text-center text-[0.8rem] md:text-sm lg:text-base xl:text-xl font-medium md:tracking-wide">
                Latest Comments
              </h2>

              <div className="p-0.5 md:pt-1 xl:pt-2 px-1 md:px-2">
                <div className="pt-1 md:pt-2 grid grid-cols-2 grid-rows-2 gap-1 gap-y-5">
                  {commentsLoading ? (
                    <div>Loading comments...</div>
                  ) : commentsError ? (
                    <div>
                      Some error occurred while trying to load the comments.
                    </div>
                  ) : (
                    (comments || [])?.map(
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

            {/* Review or Update Resource */}
            <div>
              {currentUserId === data?.user ? (
                <div className="flex justify-end">
                  <button
                    onClick={handleUpdateClick}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                  >
                    Update Resource
                  </button>
                </div>
              ) : (
                <ReviewForm id={id!} />
              )}
            </div>
          </div>
        </section>

        <div className="px-4 md:px-6 xl:px-8 py-4 md:py-5 xl:py-6 flex justify-end items-center">
          {currentUserId === data?.user ? (
            <div className="flex gap-4 md:gap-5 xl:gap-8 items-center">
              <div className="flex gap-2 items-center">
                <BsEye className="text-xl md:text-2xl xl:text-3xl" />
                <span className="text-xs md:text-sm">
                  {data?.totalViews || 0}
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <FaRegBookmark className="text-xl md:text-2xl xl:text-3xl" />
                <span className="text-xs md:text-sm">
                  {data?.favoritesCount}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 md:gap-5 xl:gap-8 items-center">
              <button onClick={handleReportClick}>
                <GoReport className="text-xl md:text-2xl xl:text-3xl" />
              </button>

              <button onClick={handleFavoriteClick}>
                {isFavoritedData?.isFavorited ? (
                  <GoBookmarkSlashFill className="text-gray-700 text-xl md:text-2xl xl:text-3xl" />
                ) : (
                  <GoBookmarkFill className="text-gray-700 text-xl md:text-2xl xl:text-3xl" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Update Resource Form */}
      {isUpdateFormOpen && (
        <UpdateResourceForm
          resourceId={id!}
          onClose={() => setIsUpdateFormOpen(false)}
          refetchResources={test}
        />
      )}

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onRequestClose={() => setIsReportModalOpen(false)}
        resourceId={id!}
      />
    </div>
  );
};

export default DetailedResource;
