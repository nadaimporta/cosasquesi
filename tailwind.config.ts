import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F4F3EE",
        ink: "#0A0A0A",
        mist: "#E8E2D9",
        stone: "#9B9189",
        pebble: "#6B6560",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        card: "0.25rem",
        pill: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
