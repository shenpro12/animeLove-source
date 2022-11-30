/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin: {
        "-170": "-120%",
        "-142": "-142%",
        "-130": "130%",
        "-15": "15px",
      },
      zIndex: {
        "-60": "60",
        "-100": "100",
        "-11": "11",
        "-25": "25",
        "-35": "35",
      },
      padding: {
        "-142": "142%",
      },
      height: {
        "-260": "254.19px",
        "-400": "400px",
      },
      width: {
        "-180": "180px",
      },
      backgroundColor: {
        "-custom1": "rgba(99, 99, 99, 0.2)",
      },
      fontFamily: { custom1: "alata,sans-serif" },
      top: {
        "-1.5": "40%",
      },
    },
  },
  plugins: [],
};
