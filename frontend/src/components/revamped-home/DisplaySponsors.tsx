import { Link } from "react-router-dom";
import SponsorDetails from "./SponsorDetails";

const DisplaySponsors = () => {
  return (
    <div className="h-full grid grid-rows-3 rounded-xl px-1 gap-2">
      <SponsorDetails
        eventName="code cubicle 2"
        eventDate="April 3, 2024"
        eventLink="https://codecubicle2.vercel.app/"
      />
      <SponsorDetails
        eventName="code cubicle 1"
        eventDate="May 4, 2024"
        eventLink="https://code-cubicle.devfolio.co/"
      />

      <p className="text-center italic font-extralight text-[0.67rem] sm:text-xs lg:text-sm p-1 text-gray-700">
        You can{" "}
        <Link
          to="/contact"
          className="font-black relative group cursor-pointer hover:text-black hover:underline decoration-[1.5px] transition-all duration-500 ease-in-out"
        >
          contact us
          <span className="absolute left-0 top-0 h-full w-0 group-hover:w-full bg-purple-300/40 transition-all duration-500 ease-in-out"></span>
        </Link>{" "}
        to sponsor your own events to be displayed here, and help it reach an
        even wider audience.
      </p>
    </div>
  );
};

export default DisplaySponsors;
