import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        daoboxg: "#5dfdcb",
        black: "#1B212D",
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],

  daisyui: {
    themes: [
      {
        darkmode: {
          primary: "#02AB76",
          secondary: "#d9d9d9",
          accent: "#978cd8",
          "base-100": "#292D32",
          info: "#1986EB",
          success: "#119C65",
          warning: "#F4D371",
          error: "#F15232",
          neutral: "#191B1E",
        },
        lightmode: {
          primary: "#02AB76",
          secondary: "#808191",
          accent: "#978cd8",
          neutral: "#DEF1FF",
          "base-100": "#fff",
          info: "#0CA5E9",
          success: "#2DD4BF",
          warning: "#F4BF50",
          error: "#E11D48",
          border: "#DEF1FF",
        },
      },
    ],
  },
} satisfies Config;
