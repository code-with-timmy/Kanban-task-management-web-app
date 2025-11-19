/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        background: "rgba(var(--background))",
        "header-bg": "rgba(var(--header-bg))",
        "sidebar-bg": "rgba(var(--sidebar-bg))",

        heading: "rgba(var(--heading))",
        "input-heading": "rgba(var(--input-heading))",

        "main-purple": "rgba(var(--main-purple))",
        "purple-purple-hover": "rgba(var(--purple-purple-hover))",

        "medium-grey": "rgba(var(--medium-grey))",
        "light-grey": "rgba(var(--light-grey))",

        border: "rgba(var(--border))",

        "black-bg": "rgba(var(--black-bg))",
        "white-bg": "rgba(var(--white-bg))",
        "sub-btn": "rgba(var(--sub-btn))",
        "col-hover": "rgba(var(--col-hover))",
      },
      boxShadow: {
        "custom-blue": "0px 4px 6px 0px rgba(54, 78, 126, 0.1015)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    function ({ addUtilities }) {
      addUtilities({
        ".text-stroke": {
          "-webkit-text-stroke": "1px black",
        },
        ".text-stroke-white": {
          "-webkit-text-stroke": "1px white",
        },
        ".text-stroke-2": {
          "-webkit-text-stroke-width": "2px",
        },
      });
    },
  ],
};
