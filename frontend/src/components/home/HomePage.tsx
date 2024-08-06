import { FaPlus } from "react-icons/fa6";

import HomeHeader from "./HomeHeader";
import AddNoteModal from "./AddNoteModal";
import WelcomeBanner from "./WelcomeBanner";
import { useState } from "react";

const HomePage = () => {
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] =
    useState<boolean>(false);

  const handleCreateNote = () => {
    setIsCreateNoteModalOpen(true);
  };

  return (
    <div className="px-1 h-full">
      <HomeHeader />
      <WelcomeBanner />

      <div className="pt-4 w-full md:pl-2 lg:pl-4 xl:pl-6">
        <div className="w-full grid md:grid-cols-2 xl:grid-cols-3">
          <div className="w-full xl:col-span-2 px-1 lg:pr-4 xl:pr-8">
            <h1 className="text-center py-1">Notes</h1>
            <div className="w-full max-w-full bg-slate-100 rounded-lg grid grid-cols-2 lg:grid-cols-3 gap-1 p-1">
              <div className="bg-blue-200 h-32 lg:h-48 rounded-lg p-1">
                <h2 className="text-[0.7rem] md:text-xs lg:text-sm">
                  Sticky note title
                </h2>
              </div>
              <div className="bg-blue-400 h-32 lg:h-48 rounded-lg">b</div>

              <div
                className="col-span-2 lg:col-span-1 bg-gray-400/80 h-32 lg:h-48 rounded-lg flex justify-center items-center cursor-pointer"
                onClick={handleCreateNote}
              >
                <FaPlus className="text-gray-500 text-5xl bg-slate-300 border-black/30 border-2 rounded-full p-1" />
              </div>
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
      />
    </div>
  );
};

export default HomePage;
