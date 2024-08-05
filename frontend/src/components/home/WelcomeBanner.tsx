import { useSelector } from "react-redux";
import { BsArrowRight } from "react-icons/bs";

import { RootState } from "../../store";
import { Link } from "react-router-dom";

const WelcomeBanner = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return (
    <div className="pt-4 w-full md:pl-2 lg:pl-4 xl:pl-6 md:pr-12 lg:pr-20 xl:pr-28">
      <div className="w-full max-w-[1280px] bg-white rounded-lg px-1 md:px-6 lg:px-8 xl:px-10 flex gap-1 sm:gap-3 md:gap-4">
        <div className="w-full px-1 max-w-[250px]">
          <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl pl-4 sm:pl-8 py-1 font-light">
            Welcome,
          </h2>
          <h1 className="text-base capitalize sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl text-center font-medium sm:text-right overflow-hidden text-ellipsis whitespace-nowrap">
            {userInfo?.name}
          </h1>
        </div>

        <div className="w-full py-1 px-0.5 md:px-2 lg:px-12 xl:px-20">
          <p className="text-[0.6rem] sm:text-[0.65rem] md:text-xs lg:text-sm xl:text-base text-gray-500 italic">
            Empower Your <br />
            Development Journey..
          </p>

          <div className="grid grid-cols-2 gap-1 py-1 px-2">
            <div className="bg-gray-300 col-span-2 rounded-xl py-0.5 md:py-1 px-1 md:px-2 text-[0.55rem] sm:text-[0.65rem] md:text-xs lg:text-sm xl:text-base flex items-center justify-between">
              <div className="hidden h-2 w-2 sm:flex sm:justify-center sm:items-center bg-gradient-to-r from-purple-400 to-purple-500 rounded-full">
                <div className="h-1.5 w-1.5 bg-gray-300 rounded-full mx-auto"></div>
              </div>
              <Link to="/" className="flex-grow px-1 md:px-2 lg:px-3 xl:px-4">
                Trending this month
              </Link>
              <BsArrowRight />
            </div>
            <div className="bg-gray-200 rounded-xl py-0.5 md:py-1 px-1 md:px-2 text-[0.55rem] sm:text-[0.65rem] md:text-xs lg:text-sm xl:text-base flex items-center justify-between">
              <div className="hidden h-2 w-2 sm:flex sm:justify-center sm:items-center bg-gradient-to-r from-purple-400 to-purple-500 rounded-full">
                <div className="h-1.5 w-1.5 bg-gray-200 rounded-full mx-auto"></div>
              </div>
              <Link
                to="/resources"
                className="flex-grow px-1 md:px-2 lg:px-3 xl:px-4"
              >
                Resources
              </Link>
              <BsArrowRight />
            </div>
            <div className="bg-gray-200 rounded-xl py-0.5 md:py-1 px-1 md:px-2 text-[0.55rem] sm:text-[0.65rem] md:text-xs lg:text-sm xl:text-base flex items-center justify-between">
              <div className="hidden h-2 w-2 sm:flex sm:justify-center sm:items-center bg-gradient-to-r from-purple-400 to-purple-500 rounded-full">
                <div className="h-1.5 w-1.5 bg-gray-200 rounded-full mx-auto"></div>
              </div>
              <Link to="/" className="flex-grow px-1 md:px-2 lg:px-3 xl:px-4">
                Projects
              </Link>
              <BsArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
