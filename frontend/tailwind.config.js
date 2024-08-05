/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        "public-nav-1": "var(--public-nav-bg-1)",
        "public-nav-2": "var(--public-nav-bg-2)",
        "primary-public-heading": "var(--primary-public-heading)",
        "secondary-public-text": "var(--secondary-public-text)",
        "public-input-bg": "var(--public-input-bg)",
        "public-placeholder": "var(--public-placeholder)",
        "public-input-text": "var(--public-input-text)",
        "tertiary-public-text": "var(--tertiary-public-text)",
        "spotlight-bg-1": "var(--spotlight-btn-bg-1)",
        "spotlight-bg-2": "var(--spotlight-btn-bg-2)",
        "spotlight-bg-3": "var(--spotlight-btn-bg-3)",
        "spotlight-text": "var(--spotlight-text)",
        "spotlight-circle": "var(--spotlight-circle)",
        "socials-bg": "var(--socials-bg)",
        "socials-icon": "var(--socials-icon)",
        "sidebar-bg-1": "var(--sidebar-bg-1)",
        "sidebar-bg-2": "var(--sidebar-bg-2)",
        "sidebar-text": "var(--sidebar-text)",
        "sidebar-active": "var(--sidebar-active-bg)",
        "sidebar-scroll-bg": "var(--sidebar-scrollbar-bg)",
        "sidebar-scroll-fg": "var(--sidebar-scrollbar-fg)",
        "sidebar-menu": "var(--sidebar-menu-btn)",
        "flip-primary-1": "var(--text-flip-primary-1)",
        "flip-primary-2": "var(--text-flip-primary-2)",
        "flip-secondary-1": "var(--text-flip-secondary-1)",
        "flip-secondary-2": "var(--text-flip-secondary-2)",
        "resources-pg-bg": "var(--resources-page-bg)",
        "pagination-btn": "var(--pagination-btn)",
        "page-text": "var(--page-text)",
        "resource-box-bg-1": "var(--resource-box-bg-1)",
        "resource-box-bg-2": "var(--resource-box-bg-2)",
        "resource-box-primary": "var(--resource-box-primary)",
        "resource-box-by-bg": "var(--resource-box-by-bg)",
        "resource-box-by-text": "var(--resource-box-by-text)",
        "resource-box-secondary": "var(--resource-box-secondary)",
        "resource-box-dropdown": "var(--resource-box-dropdown)",
        "resource-box-dropdown-border": "var(--resource-box-dropdown-border)",
        "dropdown-border-hover-bg": "var(--dropdown-border-hover-bg)",
        "dropdown-underline": "var(--dropdown-underline)",
        "resource-search-bg": "var(--resource-search-bg)",
        "resource-search-text": "var(--resource-search-text)",
        "search-icon": "var(--search-icon)",
        "search-btn-bg": "var(--search-btn-bg)",
        "search-btn-text": "var(--search-btn-text)",
        "search-btn-hover-bg": "var(--search-btn-hover-bg)",
        "no-resources-text": "var(--no-resources-text)",
        "no-resources-link": "var(--no-resources-link)",
        "no-resources-btn-bg-1": "var(--no-resources-btn-bg-1)",
        "no-resources-btn-bg-2": "var(--no-resources-btn-bg-2)",
        "no-resources-btn-1-text": "var(--no-resources-btn-1-text)",
        "no-resources-btn-2-text": "var(--no-resources-btn-2-text)",
        "no-resources-btn-2-border": "var(--no-resources-btn-2-border)",
        "home-link-underline": "var(--home-link-underline)",
        "home-link-text": "var(--home-link-text)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
