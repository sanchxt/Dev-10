import { useState } from "react";
import { BiMenu, BiMoon, BiX } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";

import logo from "/dev10-logo.webp";
import { RootState } from "../../store";
import { navItems } from "../../utils/constants";
import { setTheme } from "../../slices/themeSlice";

const PublicNavbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const toggleTheme = () => {
    dispatch(setTheme(theme === "LIGHT" ? "DARK" : "LIGHT"));
  };

  return (
    <header
      className={`bg-gradient-to-tr from-public-nav-1 to-public-nav-2 ${
        mobileDrawerOpen ? "shadow-none" : "shadow-5xl"
      } md:shadow-none theme-transition`}
    >
      <nav className="flex justify-between items-center p-1 sm:w-[92%] mx-auto">
        <div className="">
          <img
            src={logo}
            alt="Dev-10 Logo"
            className="w-[4.5rem] md:w-20 xl:w-24"
          />
        </div>

        <div
          className={`md:static absolute py-12 sm:py-20 md:py-2 md:min-h-fit left-0 bg-public-nav-1 md:bg-transparent z-50 theme-transition ${
            mobileDrawerOpen ? "shadow-dropdown" : "shadow-none"
          } 
          ${
            mobileDrawerOpen ? "top-[9%]" : "top-[-100%]"
          } md:w-auto w-full flex items-center px-5`}
        >
          <ul className="public-nav-items">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <a href={item.href}>
                  <span className="static md:hidden">{item.label}</span>
                  <img
                    src={item.icon}
                    alt={item.label}
                    width={item.width}
                    height={item.height}
                    className="hidden md:block"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className={`${
              theme === "DARK"
                ? "bg-[#222] hover:bg-[#555] text-white"
                : "bg-[#e0d2d1] text-black hover:bg-[#d1c1c0]"
            } rounded-full p-2`}
          >
            <BiMoon className="w-[1.35rem] h-[1.35rem] md:w-7 md:h-7 xl:w-9 xl:h-9" />
          </button>

          <button
            onClick={toggleDrawer}
            className="md:hidden text-3xl cursor-pointer"
          >
            {mobileDrawerOpen ? (
              <BiX color="black" />
            ) : (
              <BiMenu color="black" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default PublicNavbar;
