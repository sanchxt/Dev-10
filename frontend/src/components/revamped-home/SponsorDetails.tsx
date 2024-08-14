import { GiPlainCircle } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";

import { addHttpPrefix } from "../../utils/helpers";
import { SponsorDetailsProps } from "../../utils/types";

const SponsorDetails = ({
  eventName,
  eventDate,
  eventLink,
}: SponsorDetailsProps) => {
  return (
    <div className="flex items-center justify-between border-2 border-black rounded-xl px-1 text-[0.6rem] md:text-xs">
      <div className="flex gap-1 items-center">
        <GiPlainCircle className="text-[0.3rem] md:text-[0.4rem] lg:text-[0.5rem]" />
        <p className="font-bold capitalize">{eventName}</p>
      </div>

      <div className="flex flex-col justify-center">
        <FaLocationDot className="text-center mx-auto text-sm" />
        <p className="capitalize">{eventDate}</p>
      </div>

      <button className="bg-blue-300 px-1.5 py-1 rounded-lg font-semibold">
        <a
          href={addHttpPrefix(eventLink)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Check It Out
        </a>
      </button>
    </div>
  );
};

export default SponsorDetails;
