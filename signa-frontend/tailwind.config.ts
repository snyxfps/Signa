import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          50: "#0b0b16",
          100: "#101026",
          200: "#b9b9ff",
          300: "#8f8fff",
          400: "#6b6bff",
          500: "#4b4bff"
        },
        nebula: {
          500: "#a855f7"
        }
      },
      fontFamily: {
        display: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite",
      },
      boxShadow: {
        "cosmic-lg": "0 0 40px -10px rgba(75, 75, 255, 0.4), 0 0 20px -5px rgba(168, 85, 247, 0.3)",
      }
    },
  },
  plugins: [],
} satisfies Config;
