import { memo } from "react";
import { Link } from "react-router-dom";

import { HomePageHeaderLinks } from "../../utils/constants";

const HomeHeader = () => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center md:gap-4 md:pl-8 lg:pl-12 xl:pl-16">
        {HomePageHeaderLinks.map((link) => (
          <div className="relative flex flex-col p-1 md:p-2" key={link.id}>
            <div className="relative w-fit flex flex-col group text-[0.7rem] md:text-base lg:text-lg xl:text-xl md:font-light tracking-wide lg:tracking-wider">
              <Link
                to={link.url}
                className="text-center py-1 text-home-link-text theme-transition"
              >
                {link.text}
              </Link>
              <span className="absolute bottom-0 w-0 group-hover:w-full transition-all duration-700 ease-in-out h-[0.1rem] md:h-0.5 bg-home-link-underline" />
            </div>
          </div>
        ))}
      </div>

      <img
        src="/Dev10-Logo2.png"
        className="w-[30px] sm:w-[35px] md:w-[40px] lg:w-[45px] xl:w-[50px]"
      />
    </div>
  );
};

export default memo(HomeHeader);
