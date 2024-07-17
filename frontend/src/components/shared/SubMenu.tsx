import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { SidebarIconType } from "../../utils/types";
import { loadTheme, setTheme } from "../../slices/themeSlice";
import { RootState } from "../../store";

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

  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const theme = useSelector((state: RootState) => state.theme.theme);
  const handleToggleTheme = () => {
    dispatch(setTheme(theme === "LIGHT" ? "DARK" : "LIGHT"));
  };

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
            {subMenu === "logout" ? (
              <button
                onClick={handleLogout}
                className="sidebar-link !bg-transparent capitalize"
              >
                {subMenu}
              </button>
            ) : subMenu === "theme" ? (
              <button
                onClick={handleToggleTheme}
                className="sidebar-link !bg-transparent capitalize"
              >
                {subMenu}
              </button>
            ) : (
              <NavLink
                to="/"
                className="sidebar-link !bg-transparent capitalize"
              >
                {subMenu}
              </NavLink>
            )}
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;
