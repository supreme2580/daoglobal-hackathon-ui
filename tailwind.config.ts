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
          primary: "#FFFFFF",
          secondary: "#191B1E",
          accent: "#978cd8",
          neutral: "#D9D9D9",
          "base-100": "#292D32",
          info: "#1986EB",
          success: "#02AB76",
          warning: "#F4D371",
          error: "#F15232",
        },
        lightmode: {
          primary: "#000000",
          secondary: "#F8F8F8",
          accent: "#1B212D",
          neutral: "#DEF1FF",
          "base-100": "#FFFFFF",
          info: "#0CA5E9",
          success: "#02AB76",
          warning: "#F4BF50",
          error: "#E11D48",
          border: "#DEF1FF",
        },
      },
    ],
  },
} satisfies Config;
