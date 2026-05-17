# Sitio personal — Juan Enrique Quiñones

One-page bilingüe (ES/EN) construido con React 19 + Vite 7 + CSS Modules.
Documentación completa del proyecto en [CLAUDE.md](CLAUDE.md).
Especificación original: [../jequinones-sitio-spec.md](../jequinones-sitio-spec.md).

## Requisitos

- Node.js **20.19+** o **22.12+** (en Node 21 funciona con warnings `EBADENGINE`).
- npm 10+.

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # dev server en http://localhost:5173
npm run build      # build de producción → dist/
npm run preview    # servir el build localmente
npm run lint       # ESLint
```

## Variables de entorno

Copia `.env.example` a `.env.local` y rellena:

```bash
VITE_FORMSPREE_ID=tu_form_id   # ID del formulario en https://formspree.io
```

Sin este valor, el formulario de contacto hace fallback a abrir el cliente de
correo del usuario (`mailto:`) con el mensaje pre-rellenado.

## Assets pendientes

Estos archivos no están incluidos y deben ser entregados por el dueño del sitio
(consultar [CLAUDE.md](CLAUDE.md) §7 para detalles):

| Archivo | Ubicación |
|---------|-----------|
| Logo definitivo | `public/logo.svg` (sustituye al placeholder geométrico) |
| Foto hero | `src/assets/foto-hero.{jpg,jpeg,png,webp}` |
| Foto familia (Wawi) | `src/assets/foto-wawi.{jpg,jpeg,png,webp}` |
| Foto deporte | `src/assets/foto-deporte.{jpg,jpeg,png,webp}` |
| Foto DEI | `src/assets/foto-dei.{jpg,jpeg,png,webp}` |
| CV PDF | `public/cv-juan-enrique-quinones.pdf` |

Hasta que estén las fotos, el sitio muestra `ImagePlaceholder` automáticamente —
basta con dejar el archivo en la ruta indicada y el código lo detecta sin más
cambios (vía `import.meta.glob` en [src/assets/photos.js](src/assets/photos.js)).

## Despliegue

El output es estático en `dist/`. Compatible con cualquier hosting de SPA:

- **Vercel / Netlify / Cloudflare Pages:** apuntar el build command a
  `npm run build` y el publish dir a `dist`. No requieren rewrites porque el
  sitio es one-page (todas las rutas viven bajo `/`).
- **GitHub Pages:** si se publica bajo un subpath (ej. `/sitio/`), añadir
  `base: '/sitio/'` en `vite.config.js`.
- **Acción manual:** `npm run build` y subir `dist/` al hosting.

Antes de publicar, actualizar la URL real en:
- `<link rel="canonical">` de [index.html](index.html) (TODO marcado).
- `meta[property="og:image"]` (añadir cuando exista preview oficial).

## Estructura

Ver [CLAUDE.md §4](CLAUDE.md). Resumen:

```
src/
├── theme.css, reset.css       ← tokens y reset
├── context/LangContext.jsx    ← i18n provider
├── i18n/{es,en}.js            ← diccionarios
├── hooks/useScrollReveal.js   ← IntersectionObserver
├── components/
│   ├── shared/                ← Button, SectionTag, ImagePlaceholder
│   ├── FloatingMenu/          ← FAB de navegación (esquina sup. der.)
│   ├── Hero, About, Skills, Experience,
│   └── Testimonials, Interests, Contact, Footer
└── assets/
    └── photos.js              ← detección automática de fotos
```

## Stack

- React 19 + Vite 7 + `@vitejs/plugin-react` v4
- CSS Modules (sin Tailwind, sin librería CSS)
- `lucide-react` para íconos
- IntersectionObserver para scroll reveal (sin framer-motion)
- Formspree (opcional) para el form

## Reglas para futuras modificaciones

Resumidas en [CLAUDE.md §10](CLAUDE.md):

1. No añadir librerías CSS ni de animación.
2. Mantener `lucide-react@^0.460.0` (no las versiones 1.x abandonadas).
3. Mantener Vite 7 mientras Node sea < 22.12 (Vite 8 + rolldown rompen).
4. Toda string nueva debe estar en `es.js` Y `en.js`.
