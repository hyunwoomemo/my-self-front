import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gamtan: ["var(--font-gamtan)"],
      },
      colors: {
        primary: "#0da0c5",
        point: "#ed9e2f",
        border: "#d9d9d9",
        surface: "#f5f5f5",
        text: "#333",
        white: "#fff",
        semiPrimary: "#bbdaed",
        textGray: "#929292",
      },
      backgroundImage: {
        main: "linear-gradient(to right, #24C76D, #0da0c5)",
      },
      keyframes: {
        shadowRolling: {
          "0%": {
            boxShadow:
              "0px 0 rgba(13,160,197, 0), 0px 0 rgba(13,160,197, 0), 0px 0 rgba(13,160,197, 0), 0px 0 rgba(13,160,197, 0)",
          },
          "12%": {
            boxShadow:
              "100px 0 #0da0c5, 0px 0 rgba(13,160,197, 0), 0px 0 rgba(13,160,197, 0), 0px 0 rgba(13,160,197, 0)",
          },
          "25%": {
            boxShadow: "110px 0 #0da0c5, 100px 0 #0da0c5, 0px 0 rgba(13,160,197, 0), 0px 0 rgba(13,160,197, 0)",
          },
          "36%": {
            boxShadow: "120px 0 #24C76D, 110px 0 #24C76D, 100px 0 #24C76D, 0px 0 rgba(13,160,197, 0)",
          },
          "50%": {
            boxShadow: "130px 0 #24C76D, 120px 0 #24C76D, 110px 0 #24C76D, 100px 0 #24C76D",
          },
          "62%": {
            boxShadow: "200px 0 rgba(13,160,197, 0), 130px 0 #24C76D, 120px 0 #24C76D, 110px 0 #24C76D",
          },
          "75%": {
            boxShadow: "200px 0 rgba(13,160,197, 0), 200px 0 rgba(13,160,197, 0), 130px 0 #0da0c5, 120px 0 #0da0c5",
          },
          "87%": {
            boxShadow:
              "200px 0 rgba(13,160,197, 0), 200px 0 rgba(13,160,197, 0), 200px 0 rgba(13,160,197, 0), 130px 0 #0da0c5",
          },
          "100%": {
            boxShadow:
              "200px 0 rgba(13,160,197, 0), 200px 0 rgba(13,160,197, 0), 200px 0 rgba(13,160,197, 0), 200px 0 rgba(13,160,197, 0)",
          },
        },
      },
      animation: {
        shadowRolling: "shadowRolling 2s linear infinite",
      },
    },
  },
  plugins: [],
  // reactStrictMode: true,
};
export default config;
