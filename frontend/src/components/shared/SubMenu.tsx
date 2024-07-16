import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";

import { SidebarIconType } from "../../utils/types";

interface SubMenuProps {
  data: {
    name: string;
    icon: SidebarIconType;
    menu: string[];
  };
}

const SubMenu = ({ data }: SubMenuProps) => {
  const { pathname } = useLocation();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);

  return (
    <>
      <li
        className={`sidebar-link ${
          pathname.includes(data.name) && "text-blue-600"
        }`}
        onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
      >
        <data.icon size={23} className="min-w-max" />
        <p className="capitalize flex-1">{data.name}</p>
        <IoIosArrowDown
          className={`transition-all duration-500 ${
            isSubMenuOpen && "rotate-180"
          }`}
        />
      </li>

      <motion.ul
        animate={
          isSubMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex flex-col pl-14 text-[0.8rem] font-normal overflow-hidden h-0"
      >
        {data.menu.map((subMenu) => (
          <li key={subMenu}>
            <NavLink to="/" className="sidebar-link !bg-transparent capitalize">
              {subMenu}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;
