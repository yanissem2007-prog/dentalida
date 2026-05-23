import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a1428",
        deep: "#0d2247",
        royal: "#1e4ba8",
        azure: "#3b82f6",
        violet: { soft: "#a78bfa", deep: "#7c3aed" },
        gold: "#d4af7a",
        pearl: "#f7f5f0",
        silver: "#e7ecf2",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
