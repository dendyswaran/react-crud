module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(239, 68, 68, 1)",
        secondary: "rgb(127 29 29 / 1)",
      },
    },
  },
  plugins: [],
};
