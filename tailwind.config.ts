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
        white: "#FEFFFE",
        purple: "#531640",
        spotifyGreen: "#1ED760",
        gray: {
          text: "#a6a6a6",
          bg: "#121212",
          hover: "#1a1a1a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
