import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from "path"
import fs from "fs"

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        fs.copyFileSync(
          path.resolve(__dirname, 'public/_redirects'),
          path.resolve(__dirname, 'dist/_redirects')
        )
        console.log('✅ _redirects copied to dist/')
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
