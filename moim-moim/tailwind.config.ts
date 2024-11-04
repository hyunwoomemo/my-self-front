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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // backgroundImage: {
      //   "gradient-yellowred": "linear-gradient(90deg, #FF616A 0%, #FFC837 100%)",
      //   "mobile-home": "url('./assets/(파일명).png')"
      // },
      // fontFamily: {
      //   dmsans: ["DM Sans", "sans-serif"],
      //   montserrat: ["Montserrat", "sans-serif"]
      // },
      // content: {
      //   evolvetext: "url('./assets/(파일명).png')",
      //   abstractwaves: "url('./assets/(파일명).png')",
      //   sparkles: "url('./assets/(파일명).png')",
      //   circles: "url('./assets/(파일명).png')",
      // },
    },
  },
  plugins: [],
};
export default config;
