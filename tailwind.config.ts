import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        daoboxg: "#5dfdcb",
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
          primary: "#5dfdcb",
          secondary: "#7eb2ff",
          accent: "#978cd8",
          neutral: "#d2c47e",
          "base-100": "#0F172A",
          info: "#1986EB",
          success: "#119C65",
          warning: "#F4D371",
          error: "#F15232",
        },
        lightmode: {
          primary: "#5dfdcb",
          secondary: "#f3f4f6",
          accent: "#978cd8",
          neutral: "#d2c47e",
          "base-100": "#fff",
          info: "#0CA5E9",
          success: "#2DD4BF",
          warning: "#F4BF50",
          error: "#E11D48",
        },
      },
    ],
  },
} satisfies Config;
