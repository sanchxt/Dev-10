import { FaCodeBranch, FaCog } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { GrResources } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import { RxStarFilled } from "react-icons/rx";

export const navItems = [
  { href: "/", label: "Login", icon: "/login-icon.svg", width: 24, height: 24 },
  {
    href: "/",
    label: "About Us",
    icon: "/about-icon.svg",
    width: 24,
    height: 24,
  },
  { href: "/", label: "FAQs", icon: "/faq-icon.svg", width: 28, height: 28 },
];

export const USERS_URL = "/api/users";

// sidebar
export const sidebarSubMenusList = [
  {
    name: "favorites",
    icon: RxStarFilled,
    menu: [
      { label: "roadmaps", url: "favorites/roadmaps" },
      { label: "resources", url: "favorites/resources" },
    ],
  },
  {
    name: "contribute",
    icon: FaCirclePlus,
    menu: [
      { label: "roadmaps", url: "/contribute/roadmaps" },
      { label: "resources", url: "/contribute/resources" },
    ],
  },
];
export const sidebarSettingsSubMenu = [
  {
    name: "settings",
    icon: FaCog,
    menu: [
      { label: "profile", url: "/settings/profile" },
      { label: "theme", url: "" },
      { label: "logout", url: "" },
    ],
  },
];
export const sidebarMenu = [
  { name: "Home", href: "/", size: 23, icon: IoHome },
  { name: "Resources", href: "/", size: 23, icon: GrResources },
  { name: "Roadmaps", href: "/", size: 23, icon: FaCodeBranch },
];
