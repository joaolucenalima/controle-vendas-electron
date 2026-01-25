import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    ".flowbite-react/class-list.json"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
      },
      animation: {
        "overlayShow": "overlayShow 0.2s ease-out forwards",
        "contentShow": "contentShow 0.2s ease-out forwards"
      },
      keyframes: {
        overlayShow: {
          "from": { opacity: 0 },
          "to": { opacity: 1 }
        },
        contentShow: {
          "from": { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          "to": { opacity: 1, transform: "transform: translate(-50%, -50%) scale(1)" }
        }
      }
    },
  },
  plugins: [flowbiteReact],
}