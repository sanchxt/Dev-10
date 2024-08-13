import { FaPlus } from "react-icons/fa6";
import { DisplayNotesProps } from "../../utils/types";

const DisplayNotes = ({ notes, handleCreateNote }: DisplayNotesProps) => {
  return (
    <>
      {notes.length === 0 ? (
        [0, 1].map((_, idx) => (
          <div
            key={idx}
            className="h-24 sm:h-28 md:h-32 lg:h-40 rounded-lg p-1 overflow-hidden shadow-lg bg-gray-400"
          >
            <h2 className="pb-1 text-[0.6rem] md:text-xs lg:text-base text-center font-bold md:font-black capitalize md:tracking-wide overflow-hidden whitespace-pre text-ellipsis">
              Your notes
            </h2>
            <p className="italic font-light text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-sm p-1">
              will be displayed here
            </p>
          </div>
        ))
      ) : (
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
              <p className="italic font-light text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-sm p-1">
                {note.content}
              </p>
            </div>
          ))}
        </>
      )}

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
