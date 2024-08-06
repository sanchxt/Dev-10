import { RiMenu3Line } from "react-icons/ri";
import DisplayNotes from "./DisplayNotes";
import { NotesSectionProps } from "../../utils/types";

const NotesSection = ({
  isError,
  isLoading,
  handleViewAllNotes,
  handleCreateNote,
  data,
}: NotesSectionProps) => {
  if (isError) {
    return (
      <div>
        <h1>Error fetching notes..</h1>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full">
      <div className="flex justify-end items-center px-2 py-0.5">
        <p className="flex-grow text-center">Recent Notes</p>
        <RiMenu3Line className="cursor-pointer" onClick={handleViewAllNotes} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
        {isLoading ? (
          <div>hi</div>
        ) : (
          <DisplayNotes notes={data} handleCreateNote={handleCreateNote} />
        )}
      </div>
    </div>
  );
};

export default NotesSection;
