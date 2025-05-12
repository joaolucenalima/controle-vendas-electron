/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "gray": {
          50: "#F7F8FA"
        }
      },
      animation: {
        "overlayShow": "overlayShow 0.2s ease-out forwards",
        "contentShow": "contentShow 0.2s ease-out forwards"
      },
      keyframes: {
        overlayShow: {
          "from": { opacity: 0 },
          "to": { opacity: 1}
        },
        contentShow: {
          "from": { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          "to": { opacity: 1, transform: "transform: translate(-50%, -50%) scale(1)"}
        }
      }
    },
  },
  plugins: [],
}