import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const page = (path) => fileURLToPath(new URL(path, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Home (SPA) + minisitios estáticos del CV: /cv/ (ES) y /cv/en/ (EN)
      input: {
        main: page('./index.html'),
        cv: page('./cv/index.html'),
        cvEn: page('./cv/en/index.html'),
      },
    },
  },
})
