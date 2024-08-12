import { Link, useNavigate } from "react-router-dom";
import { homeHeaderButtons } from "../../utils/constants";

const HomeHeader = ({ name }: { name: string }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-b from-purple-100 via-slate-100 to-slate-100 shadow flex gap-x-2 justify-between items-center px-0.5 sm:px-1 md:px-2 py-1">
      <h3 className="block text-lg sm:text-xl md:text-2xl w-full overflow-hidden font-base">
        Welcome,
        <br />
        <span className="block pl-12 md:pl-24 w-full overflow-hidden text-ellipsis capitalize text-2xl sm:text-3xl md:text-4xl font-semibold">
          {name}
        </span>
      </h3>

      <div className="w-full h-full flex justify-center md:justify-end items-center">
        <div className="flex gap-x-2 md:gap-x-8 xl:gap-x-16 place-items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 xl:gap-8">
            {homeHeaderButtons.map((button, idx) => (
              <Link
                key={idx}
                to={button.url}
                className="bg-gradient-to-r from-white via-white/80 to-white/20 rounded-2xl text-xs sm:text-sm lg:text-base px-2 py-1 md:py-2 text-center hover:shadow-md transition-shadow duration-300"
              >
                {button.text}
              </Link>
            ))}
          </div>

          <div>
            <img
              src="/public/Dev10-Logo2.png"
              alt=""
              className="w-8 xl:w-10 cursor-pointer"
              onClick={() => navigate("/settings/profile")}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
