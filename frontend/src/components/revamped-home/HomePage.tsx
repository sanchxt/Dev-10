import { useSelector } from "react-redux";

import HomeHeader from "./HomeHeader";
import MainInfoBox from "./MainInfoBox";
import { RootState } from "../../store";
import { useGetNotesQuery } from "../../slices/notesApiSlice";
import NotesSection from "./NotesSection";
import { useEffect, useState } from "react";
import AddNoteModal from "./AddNoteModal";
import ShowAllNotes from "./ShowAllNotes";
import DisplayTotalContributions from "./DisplayTotalContributions";
import DisplaySponsors from "./DisplaySponsors";

const HomePage = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] =
    useState<boolean>(false);
  const [isAllNotesModalOpen, setIsAllNotesModalOpen] =
    useState<boolean>(false);

  const { data, isError, isLoading, refetch } = useGetNotesQuery();

  const handleCreateNote = () => setIsCreateNoteModalOpen(true);
  const handleViewAllNotes = () => setIsAllNotesModalOpen(true);

  useEffect(() => {
    if (userInfo) {
      refetch();
    }
  }, [userInfo]);

  return (
    <div className="bg-slate-100">
      <HomeHeader name={userInfo?.name!} />
      <div className="grid grid-cols-1 md:grid-cols-[57%_43%] lg:grid-cols-[60%_40%]">
        <div className="grid grid-cols-2 grid-rows-2">
          <div className="col-span-2 px-0.5 pt-2 md:px-2 md:pt-3">
            <MainInfoBox />
          </div>

          <div className="col-span-2 px-0.5 pt-2 md:px-2 md:pt-3 h-fit">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 px-1">
              <div className="order-2 md:order-1 bg-slate-200 shadow-md rounded-xl p-1">
                <DisplayTotalContributions />
              </div>
              <div className="order-1 md:order-2 bg-slate-200 shadow-md rounded-xl p-1">
                <DisplaySponsors />
              </div>
            </div>
          </div>
        </div>

        <div className="px-0.5 py-2 md:px-2 md:py-3">
          <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 bg-blue-100 rounded-xl p-1">
            <div>
              <NotesSection
                isError={isError}
                isLoading={isLoading}
                handleViewAllNotes={handleViewAllNotes}
                handleCreateNote={handleCreateNote}
                data={data?.slice(0, 2)}
              />
            </div>

            <div className="pt-2 md:pt-3 h-fit">
              <div className="bg-green-400 rounded-xl px-1">calendar</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-400">blogs</div>
        <div className="bg-blue-300">recents</div>
      </div>

      <AddNoteModal
        isOpen={isCreateNoteModalOpen}
        onRequestClose={() => setIsCreateNoteModalOpen(false)}
        requestRefetch={refetch}
      />
      <ShowAllNotes
        isOpen={isAllNotesModalOpen}
        notes={data}
        onRequestClose={() => setIsAllNotesModalOpen(false)}
        requestRefetch={refetch}
      />
    </div>
  );
};

export default HomePage;
