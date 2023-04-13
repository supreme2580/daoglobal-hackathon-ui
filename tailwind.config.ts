import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        daoboxg: "#5dfdcb",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms"), require("@tailwindcss/typography")],

  daisyui: {
    themes: ["light", "dark", "night"],
  },
} satisfies Config;
