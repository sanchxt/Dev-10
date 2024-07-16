import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";

import SubMenu from "./SubMenu";
import {
  sidebarMenu,
  sidebarSettingsSubMenu,
  sidebarSubMenusList,
} from "../../utils/constants";

const Sidebar = () => {
  let isTab = useMediaQuery({ query: "(max-width: 768px)" });

  const { pathname } = useLocation();

  useEffect(() => {
    isTab && setSidebarIsOpen(false);
  }, [pathname]);

  const sidebarAnimation = isTab
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        close: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        close: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  useEffect(() => {
    if (isTab) {
      setSidebarIsOpen(false);
    } else {
      setSidebarIsOpen(true);
    }
  }, [isTab]);

  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(
    isTab ? false : true
  );

  return (
    <>
      <div
        onClick={() => setSidebarIsOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          sidebarIsOpen ? "block" : "hidden"
        }`}
      ></div>

      <motion.div
        variants={sidebarAnimation}
        animate={sidebarIsOpen ? "open" : "close"}
        className="bg-white text-gray-700 shadow-2xl z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative fixed"
      >
        {/* logo */}
        <div
          className={`${
            !sidebarIsOpen && "opacity-0"
          } flex items-center gap-2.5 font-medium border-b border-slate-300 py-3 mx-3`}
        >
          <img
            src="/dev10-logo.webp"
            alt="Dev-10 Logo"
            width={45}
            className=""
          />
          <span className="text-xl whitespace-pre">Dev-10</span>
        </div>

        {/* menu */}
        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden h-[70%] md:h-[68%]">
            {sidebarMenu.map((item) => (
              <li key={item.name}>
                <NavLink to={item.href} className="sidebar-link">
                  <item.icon size={23} className="min-w-max" />
                  {item.name}
                </NavLink>
              </li>
            ))}

            {/* submenu */}
            {sidebarIsOpen && (
              <>
                <div className="border-y py-5 border-slate-300">
                  <small className="pl-3 text-slate-500 inline-block mb-2">
                    Your account
                  </small>
                  {sidebarSubMenusList.map((menu) => (
                    <div key={menu.name} className="flex flex-col gap-1">
                      <SubMenu data={menu} />
                    </div>
                  ))}
                </div>

                {sidebarSettingsSubMenu.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </>
            )}
          </ul>

          {sidebarIsOpen && (
            <div className="flex-1 text-sm z-50 max-h-48 my-auto whitespace-pre w-full font-medium">
              <div className="flex items-center justify-between border-y border-slate-300 p-4">
                <div>
                  <p>Free</p>
                  <small>$0 / month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p>
              </div>
            </div>
          )}
        </div>

        {/* sidebar btn */}
        <motion.button
          animate={sidebarIsOpen ? { rotate: 0 } : { rotate: 180 }}
          transition={{
            duration: 0.4,
          }}
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          className="absolute w-fit h-fit z-50 right-2 top-5 cursor-pointer hidden md:block"
        >
          <IoIosArrowBack size={25} />
        </motion.button>
      </motion.div>

      <div className="p-3 md:hidden" onClick={() => setSidebarIsOpen(true)}>
        <MdMenu size={25} color="black" />
      </div>
    </>
  );
};

export default Sidebar;
