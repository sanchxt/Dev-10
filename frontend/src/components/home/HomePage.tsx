import { FaPlus } from "react-icons/fa6";

import HomeHeader from "./HomeHeader";
import AddNoteModal from "./AddNoteModal";
import WelcomeBanner from "./WelcomeBanner";
import { useState } from "react";
import { useGetNotesQuery } from "../../slices/notesApiSlice";
import DisplayNotes from "./DisplayNotes";
import { RiMenu3Line } from "react-icons/ri";

const HomePage = () => {
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] =
    useState<boolean>(false);

  const handleCreateNote = () => {
    setIsCreateNoteModalOpen(true);
  };

  const { data, isError, isLoading, refetch } = useGetNotesQuery();

  return (
    <div className="px-1 h-full">
      <HomeHeader />
      <WelcomeBanner />

      <div className="pt-4 w-full md:pl-2 lg:pl-4 xl:pl-6">
        <div className="w-full grid md:grid-cols-2 xl:grid-cols-3">
          <div className="w-full xl:col-span-2 px-1 lg:pr-4 xl:pr-8">
            <h1 className="text-center py-1">Notes</h1>
            <div className="w-full max-w-full bg-slate-100 rounded-lg p-1 lg:p-1.5">
              {isError ? (
                <h1>Error fetching notes..</h1>
              ) : (
                <div className="w-full max-w-full">
                  <div className="flex justify-end p-2">
                    <RiMenu3Line className="cursor-pointer" />
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
                    <DisplayNotes
                      notes={data}
                      handleCreateNote={handleCreateNote}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full  bg-slate-300">
            <h1 className="text-center py-1">Game</h1>
            <div className=""></div>
          </div>
        </div>
      </div>

      <AddNoteModal
        isOpen={isCreateNoteModalOpen}
        onRequestClose={() => setIsCreateNoteModalOpen(false)}
        requestRefetch={refetch}
      />
    </div>
  );
};

export default HomePage;
