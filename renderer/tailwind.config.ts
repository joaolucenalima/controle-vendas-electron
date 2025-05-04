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
    },
  },
  plugins: [],
}