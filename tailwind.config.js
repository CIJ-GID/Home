const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      base: "#D7D7D7",
      primary: "#006473",
      secondary: "#3B4F5F",
      transparent: "transparent",
      touch: "#3B4F5F20",
      success: "#287300",
      process: "#6B7300",
      error: "#FF0000",
      white: "#fff",
      black: "#000",
      gray: colors.gray,
    },
    extend: {},
  },
  plugins: [],
};
