// ./tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/flowbite-react/lib/**/*.js", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
    screens: {
      xl: { max: "1279px" },

      lg: { max: "1023px" },

      md: { max: "767px" },

      sm: { max: "639px" },
    },
  },
  plugins: [require("flowbite/plugin")],
};
