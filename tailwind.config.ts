import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        customPurple: "#7357FF",
      },
      textColor: {
        customPurple: "#110C22",
        customSubPurple: "#4F4B5C",
        customText: "#4F4B5C",
      },
      spacing: {
        customSpacing: "10px",
      },
      borderWidth: {
        customBorderWidth: "3px",
      },
    },
  },
  plugins: [],
} satisfies Config;
