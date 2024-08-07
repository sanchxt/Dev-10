import HomeHeader from "./HomeHeader";
import AddNoteModal from "./AddNoteModal";
import WelcomeBanner from "./WelcomeBanner";
import { useEffect, useState } from "react";
import { useGetNotesQuery } from "../../slices/notesApiSlice";
import ShowAllNotes from "./ShowAllNotes";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import NotesSection from "./NotesSection";
import { useTotalContributionsQuery } from "../../slices/usersApiSlice";
import FloatingChatbotButton from "../FloatingChatbotButton";

const HomePage = () => {
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] =
    useState<boolean>(false);
  const [isAllNotesModalOpen, setIsAllNotesModalOpen] =
    useState<boolean>(false);

  const handleCreateNote = () => setIsCreateNoteModalOpen(true);
  const handleViewAllNotes = () => setIsAllNotesModalOpen(true);

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const { data, isError, isLoading, refetch } = useGetNotesQuery();
  const {
    data: totalContributions,
    isError: getContributionsError,
    isLoading: getContributionsLoading,
  } = useTotalContributionsQuery();

  console.log(totalContributions);

  useEffect(() => {
    if (userInfo) {
      refetch();
    }
  }, [userInfo]);

  return (
    <div className="px-1 h-full flex flex-col">
      <HomeHeader />
      <WelcomeBanner />

      <div className="pt-4 w-full md:pl-2 lg:pl-4 xl:pl-6 pb-4">
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

      <div className="md:px-2 lg:px-4 xl:px-6 pt-2 flex-grow h-fit grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="flex items-end">
          <div className="w-full h-full bg-gradient-to-br from-purple-300 to-purple-500 rounded-lg md:rounded-b-none"></div>
        </div>
        <div className="flex items-end">
          <div className="w-full h-full md:h-[85%] bg-gradient-to-br from-purple-300 to-purple-500 rounded-lg md:rounded-b-none"></div>
        </div>
        <div className="flex items-end">
          <div className="p-1 w-full h-full md:h-[70%] bg-gradient-to-br from-purple-300 to-purple-500 rounded-lg md:rounded-b-none flex justify-center items-center">
            {getContributionsError ? (
              <div>
                <h3 className="italic font-light text-sm md:text-base xl:text-lg tracking-wider">
                  Error fetching contributions..
                </h3>
                <h3 className="text-red-950 font-medium text-center">
                  Try again later
                </h3>
              </div>
            ) : getContributionsLoading ? (
              <div className="italic tracking-widest animate-pulse text-base lg :text-lg">
                <h3>Loading..</h3>
              </div>
            ) : (
              <div>
                <h1>Your Contributions</h1>
                <h2 className="">{totalContributions?.totalContributions}</h2>
              </div>
            )}
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
      <FloatingChatbotButton /> {/* Add the floating button */}
      
    </div>
  );
};

export default HomePage;
