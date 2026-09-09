import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so the built dist/ folder works when hosted
  // at a domain root OR in a subfolder (e.g. GitHub Pages project sites).
  base: './',
})
