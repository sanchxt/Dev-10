import { memo } from "react";

interface DetailedLinksAndNotesProps {
  essentials: [string];
  extras: [string];
  notes: string;
}

const DetailedLinksAndNotes = ({
  essentials,
  extras,
  notes,
}: DetailedLinksAndNotesProps) => {
  return (
    <div className="flex md:gap-1 flex-wrap md:flex-nowrap p-0.5 max-h-[30rem]">
      {/* essentials */}
      <div className="w-1/2 md:w-1/3 flex flex-col py-2 xl:py-4">
        <h2 className="w-full h-fit italic text-center tracking-wide font-light text-sm md:text-base lg:text-lg xl:text-2xl">
          Essentials
        </h2>

        <ul className="w-full text-left font-thin tracking-wider text-[0.68rem] md:text-xs lg:text-sm 2xl:text-base pt-3 md:pt-6 xl:pt-8 px-0.5 md:px-2 flex flex-col gap-2">
          {essentials?.map((link: string, idx: number) => (
            <li
              key={idx}
              className="bg-purple-200 group px-2 py-0.5 md:py-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-xl hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer"
            >
              <a href={link} rel="noreferrer" target="_blank" className="block">
                <p className="inline relative after:bg-slate-600 after:absolute after:h-[0.1rem] after:w-0 after:bottom-0 after:left-0 group-hover:after:w-full after:transition-all after:duration-500">
                  {link}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* extras */}
      <div className="w-1/2 md:w-1/3 flex flex-col py-2 xl:py-4">
        <h2 className="w-full h-fit italic text-center tracking-wide font-light text-sm md:text-base lg:text-lg xl:text-2xl">
          Extras
        </h2>

        <ul className="w-full text-left font-light tracking-wider text-[0.68rem] md:text-xs lg:text-sm 2xl:text-base pt-3 md:pt-6 xl:pt-8 px-0.5 md:px-2 flex flex-col gap-2">
          {extras?.map((link: string, idx: number) => (
            <li
              key={idx}
              className="bg-purple-200 group px-2 py-0.5 md:py-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-xl hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer"
            >
              <a href={link} rel="noreferrer" target="_blank" className="block">
                <p className="inline relative after:bg-slate-600 after:absolute after:h-[0.1rem] after:w-0 after:bottom-0 after:left-0 group-hover:after:w-full after:transition-all after:duration-500">
                  {link}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* notes */}
      <div className="w-full md:w-1/3 grid py-2 xl:py-4">
        <h2 className="w-full h-fit text-center tracking-wide font-normal text-sm md:text-base lg:text-lg xl:text-2xl">
          Author Notes
        </h2>

        <div className="px-0.5 md:px-1 text-xs md:text-sm overflow-hidden pt-3 md:pt-6 xl:pt-8">
          <p className="break-words font-light px-1 md:px-1.5 xl:px-2 py-1 text-[0.68rem] md:text-xs lg:text-sm overflow-hidden text-ellipsis rounded-sm md:rounded-md bg-slate-200">
            {notes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(DetailedLinksAndNotes);
