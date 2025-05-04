import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react()
  ],
  base: './',
  build: {
    outDir: resolve(__dirname, '../dist/renderer'),
    emptyOutDir: true,
  }
})
