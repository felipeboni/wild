/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFD9CF",
          100: "#FFBBAA",
          200: "#FE9E86",
          300: "#FA8164",
          400: "#F66643",
          500: "#f04b23",
          600: "#D2421F",
          700: "#B4381A",
          800: "#962F16",
          900: "#782612",
        },
      },
    },
  },
  plugins: [],
};
