/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./app/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "custom-color": "#333333",
      },
    },
  },
  plugins: [],
};
