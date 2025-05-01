import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    outDir: resolve(__dirname, '../dist/renderer'),
    emptyOutDir: true,
  }
})
