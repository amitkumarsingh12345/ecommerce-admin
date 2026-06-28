/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF8F1",
          100: "#FEEFD9",
          200: "#FDD9A8",
          300: "#FBC16D",
          400: "#F9A43A",
          500: "#F97316", // Main Brand Color
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
      },
    },
  },
  plugins: [],
};