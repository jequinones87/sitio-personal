import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const page = (path) => fileURLToPath(new URL(path, import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    // El build SSR (pre-renderizado de la Home) no necesita copiar public/
    copyPublicDir: !isSsrBuild,
    rollupOptions: {
      // Home (SPA) + minisitios estáticos del CV: /cv/ (ES) y /cv/en/ (EN).
      // En el build SSR la entrada es src/entry-server.js (ver package.json).
      input: isSsrBuild ? undefined : {
        main: page('./index.html'),
        cv: page('./cv/index.html'),
        cvEn: page('./cv/en/index.html'),
      },
    },
  },
}))
