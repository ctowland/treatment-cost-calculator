import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf4f3",
          100: "#fce7e4",
          200: "#fbd2cd",
          300: "#f6b1a9",
          400: "#ef8478",
          500: "#e3574a",
          600: "#cf3a2e",
          700: "#ad2e25",
          800: "#8f2923",
          900: "#772824",
        },
      },
    },
  },
  plugins: [],
};

export default config;
