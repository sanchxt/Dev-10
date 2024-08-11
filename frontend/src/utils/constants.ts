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
export const RESOURCS_URL = "/api/resources";
export const NOTES_URL = "/api/notes";
export const ROADMAPS_URL = "/api/roadmaps";

// sidebar
export const sidebarSubMenusList = [
  {
    name: "favorites",
    icon: RxStarFilled,
    menu: [
      { label: "roadmaps", url: "/favorites/roadmaps" },
      { label: "resources", url: "/favorites/resources" },
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
  { name: "Home", href: "/home", size: 23, icon: IoHome },
  { name: "Resources", href: "/resources", size: 23, icon: GrResources },
  { name: "Roadmaps", href: "/roadmaps", size: 23, icon: FaCodeBranch },
];

export const sortResourceDropdownItems = ["recent", "oldest"];
export const filterResourceDropdownItems = ["highest", "lowest"];

export const LOADER_DURATION = 4000;

export const HomePageHeaderLinks = [
  { url: "/resources", text: "Explore Resources", id: 1 },
  { url: "/roadmaps", text: "Explore Roadmaps", id: 2 },
];

export const landingCarouselImages = [
  {
    image: "/landing-page/carousel/main-code-img.webp",
    name: "Main Coding Image",
    id: 1,
  },
  {
    image: "/landing-page/carousel/code-img-1.webp",
    name: "Side Coding Image",
    id: 2,
  },
  {
    image: "/landing-page/carousel/code-img-1.webp",
    name: "Side Coding Image",
    id: 3,
  },
  {
    image: "/landing-page/carousel/code-img-1.webp",
    name: "Side Coding Image",
    id: 4,
  },
  {
    image: "/landing-page/carousel/code-img-1.webp",
    name: "Side Coding Image",
    id: 5,
  },
  {
    image: "/landing-page/carousel/code-img-1.webp",
    name: "Side Coding Image",
    id: 6,
  },
];
