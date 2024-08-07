import HomeHeader from "./HomeHeader";
import AddNoteModal from "./AddNoteModal";
import WelcomeBanner from "./WelcomeBanner";
import { useEffect, useState } from "react";
import { useGetNotesQuery } from "../../slices/notesApiSlice";
import DisplayNotes from "./DisplayNotes";
import { RiMenu3Line } from "react-icons/ri";
import ShowAllNotes from "./ShowAllNotes";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import NotesSection from "./NotesSection";

const HomePage = () => {
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] =
    useState<boolean>(false);
  const [isAllNotesModalOpen, setIsAllNotesModalOpen] =
    useState<boolean>(false);

  const handleCreateNote = () => setIsCreateNoteModalOpen(true);
  const handleViewAllNotes = () => setIsAllNotesModalOpen(true);

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const { data, isError, isLoading, refetch } = useGetNotesQuery();

  useEffect(() => {
    if (userInfo) {
      refetch();
    }
  }, [userInfo]);

  return (
    <div className="px-1 h-full">
      <HomeHeader />
      <WelcomeBanner />

      <div className="pt-4 w-full md:pl-2 lg:pl-4 xl:pl-6">
        <div className="w-full grid md:grid-cols-2 xl:grid-cols-3">
          <div className="w-full xl:col-span-2 px-1 lg:pr-4 xl:pr-8">
            {/* <h1 className="text-center py-1">Notes</h1> */}
            <div className="w-full max-w-full bg-slate-100 rounded-lg px-1 lg:px-1.5 pb-1 lg:pb-1.5">
              <NotesSection
                isError={isError}
                isLoading={isLoading}
                handleViewAllNotes={handleViewAllNotes}
                handleCreateNote={handleCreateNote}
                data={data?.slice(0, 2)}
              />
            </div>
          </div>

          <div className="w-full  bg-slate-300">
            <h1 className="text-center py-1">Game</h1>
          </div>
        </div>
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
