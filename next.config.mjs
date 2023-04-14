/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  daisyui: {
    themes: [
      {
        darkmode: {
          primary: "#e24147",
          secondary: "#5bd891",
          accent: "#978cd8",
          neutral: "#1A192E",
          "base-100": "#E6E4F1",
          info: "#1986EB",
          success: "#119C65",
          warning: "#F4D371",
          error: "#F15232",
        },
        lightmode: {
            primary: "#e24147",
            secondary: "#5bd891",
            accent: "#978cd8",
            neutral: "#1A192E",
            "base-100": "#E6E4F1",
            info: "#1986EB",
            success: "#119C65",
            warning: "#F4D371",
            error: "#F15232",
          },
      },
    ],
  },
  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;
