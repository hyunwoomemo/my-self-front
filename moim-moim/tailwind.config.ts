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
        tantan: ["var(--font-tantan)"],
      },
      colors: {
        primary: "#0da0c5",
        point: "#ed9e2f",
        border: "#d9d9d9",
        surface: "#f5f5f5",
        text: "#333",
        bg: "#fff",
        semiPrimary: "#bbdaed",
        lightPrimary: "#EBF4FA",
        textGray: "#929292",
        hover: "#215c75",
        disabled: "#eee",
        disabledText: "#929292",
        disabledBorder: "#b2b2b2",
        error: "#b81515",
        red: "#da2d2d",
        blue: "#165bb4",
      },
      backgroundImage: {
        main: "linear-gradient(to right, #24C76D, #0da0c5)",
      },
      keyframes: {
        showSlideBar: {
          "0%": {
            left: "130%",
          },
          "100%": {
            left: "50%",
          },
        },
        // shadowRolling: {
        //   "0%": {
        //     boxShadow:
        //       "0px 0 rgba(13,160,197, 0), 0px 0 rgba(13,160,197, 0), 0px 0 rgba(13,160,197, 0), 0px 0 rgba(13,160,197, 0)",
        //   },
        //   "12%": {
        //     boxShadow:
        //       "100px 0 #0da0c5, 0px 0 rgba(13,160,197, 0), 0px 0 rgba(13,160,197, 0), 0px 0 rgba(13,160,197, 0)",
        //   },
        //   "25%": {
        //     boxShadow: "110px 0 #0da0c5, 100px 0 #0da0c5, 0px 0 rgba(13,160,197, 0), 0px 0 rgba(13,160,197, 0)",
        //   },
        //   "36%": {
        //     boxShadow: "120px 0 #24C76D, 110px 0 #24C76D, 100px 0 #24C76D, 0px 0 rgba(13,160,197, 0)",
        //   },
        //   "50%": {
        //     boxShadow: "130px 0 #24C76D, 120px 0 #24C76D, 110px 0 #24C76D, 100px 0 #24C76D",
        //   },
        //   "62%": {
        //     boxShadow: "200px 0 rgba(13,160,197, 0), 130px 0 #24C76D, 120px 0 #24C76D, 110px 0 #24C76D",
        //   },
        //   "75%": {
        //     boxShadow: "200px 0 rgba(13,160,197, 0), 200px 0 rgba(13,160,197, 0), 130px 0 #0da0c5, 120px 0 #0da0c5",
        //   },
        //   "87%": {
        //     boxShadow:
        //       "200px 0 rgba(13,160,197, 0), 200px 0 rgba(13,160,197, 0), 200px 0 rgba(13,160,197, 0), 130px 0 #0da0c5",
        //   },
        //   "100%": {
        //     boxShadow:
        //       "200px 0 rgba(13,160,197, 0), 200px 0 rgba(13,160,197, 0), 200px 0 rgba(13,160,197, 0), 200px 0 rgba(13,160,197, 0)",
        //   },
        // },
      },
      animation: {
        shadowRolling: "shadowRolling 1s linear infinite",
        showSlideBar: "showSlideBar 0.1s linear alternate",
      },
      screens: {
        w_sm: { raw: "(max-width: 599px)" },
        w_lg: { raw: "(min-width: 600px)" },
        h_sm: { raw: "(min-height: 600px)" },
        h_lg: { raw: "(min-height: 700px)" },
        h_xl: { raw: "(min-height: 800px)" },
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        ".react-datepicker__time-list, .scrollbar": {
          "&::-webkit-scrollbar": {
            width: 10,
            height: 10,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#fff",
            borderRadius: 50,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme("colors.border"),
            borderRadius: 10,
            border: `2px solid ${theme("colors.surface")}`,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme("colors.hover"),
          },
        },
      });
    },
  ],
  // reactStrictMode: true,
};
export default config;
