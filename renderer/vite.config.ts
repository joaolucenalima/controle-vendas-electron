import react from "@vitejs/plugin-react";
import flowbiteReact from "flowbite-react/plugin/vite";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), flowbiteReact()],
  base: "./",
  build: {
    outDir: resolve(__dirname, "../dist/renderer"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@app": resolve("src/app"),
      "@contexts": resolve("src/contexts"),
      "@pages": resolve("src/pages"),
      "@api": resolve("src/api"),
      "@assets": resolve("src/assets"),
      "@components": resolve("src/components"),
      "@utils": resolve("src/utils"),
      "@hooks": resolve("src/hooks"),
    },
  },
});
