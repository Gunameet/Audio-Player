/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // ReUI uses class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        gujarati: ["Anek Gujarati", "sans-serif"],
      },
    },
  },
  plugins: [],
};
