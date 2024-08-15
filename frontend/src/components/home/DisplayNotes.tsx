import { FaPlus } from "react-icons/fa6";
import { DisplayNotesProps } from "../../utils/types";

const DisplayNotes = ({ notes, handleCreateNote }: DisplayNotesProps) => {
  return (
    <>
      {notes.map((note) => (
        <div
          key={note._id}
          className="h-24 sm:h-28 md:h-32 lg:h-40 rounded-lg p-1 overflow-hidden shadow-lg"
          style={{ backgroundColor: `${note.color}` }}
        >
          <h2 className="pb-1 text-[0.6rem] md:text-xs lg:text-base text-center font-bold md:font-black capitalize md:tracking-wide overflow-hidden whitespace-pre text-ellipsis">
            {note.title}
          </h2>
          <p className="font-light text-[0.58rem] md:text-[0.7rem] lg:text-sm p-1">
            {note.content}
          </p>
        </div>
      ))}

      <div
        className="col-span-2 bg-gray-800/80 h-24 sm:h-28 rounded-lg flex justify-center items-center cursor-pointer"
        onClick={handleCreateNote}
      >
        <FaPlus className="text-gray-500 text-3xl bg-slate-300 border-black/30 border-2 rounded-full p-1" />
      </div>
    </>
  );
};

export default DisplayNotes;
