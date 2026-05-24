# CLAUDE.md — Sitio Personal Juan Enrique Quiñones

## 1. Visión

SPA one-page bilingüe (ES/EN) para **Juan Enrique Quiñones**, Especialista en Marketing (Santiago de Chile). Audiencia dual: empleadores y clientes freelance. Especificación fuente de verdad: [../jequinones-sitio-spec.md](../jequinones-sitio-spec.md).

---

## 2. Stack

| Capa | Decisión |
|------|----------|
| Framework | React 19 + Vite 7 (NO Vite 8 — rompe en Node 21) |
| Estilos | **CSS Modules** + custom properties — sin Tailwind, sin styled-components |
| Animación | CSS transitions + framer-motion (solo en Skills) — NO framer-motion en el resto |
| Íconos | `lucide-react@^0.460.0` (única librería de íconos — react-icons eliminado) |
| i18n | React Context propio + diccionarios JS planos |
| Form | Web3Forms (fallback a `mailto:` si no hay `.env.local`) |
| Imágenes | **WebP** — todas las imágenes de `public/images/` convertidas con sharp (scripts/optimize-images.mjs) |

**⚠️ Node 21:** warnings `EBADENGINE` son ignorables. No subir a Vite 8 hasta Node 22.12+.

---

## 3. Tokens (`src/theme.css`)

```css
--color-primary:   #77C8D4;  /* teal claro */
--color-secondary: #35535B;  /* teal oscuro */
--color-accent:    #EB5A4A;  /* coral */
--color-bg:        #F7F6F2;  /* crema */
--color-dark:      #1C1C1A;  /* casi negro */
--color-surface:   #FFFFFF;
```

Tipografía: `Plus Jakarta Sans` (Google Fonts). Breakpoints: `max-width: 1023px` / `767px`.

---

## 4. Estructura

```
src/
├── main.jsx · App.jsx · reset.css · theme.css
├── context/LangContext.jsx
├── i18n/es.js · en.js
├── hooks/useScrollReveal.js · useScrollFade.js · useSectionProgress.js
├── assets/photos.js          ← import.meta.glob, muestra <img> o <ImagePlaceholder>
└── components/
    ├── shared/  Button · SectionTag · ImagePlaceholder · CardStack
    ├── FloatingMenu/          ← FAB esquina sup-der, abre menú con anclas + CV + toggle ES/EN
    ├── Hero/                  ← video scroll-scrubbed (public/hero.mp4, re-enc. CRF 24)
    ├── About/                 ← accordion Radix (@radix-ui/react-accordion)
    ├── Skills/                ← carrusel CircularSkills (framer-motion + lucide-react)
    ├── Experience/
    ├── Testimonials/
    ├── Interests/
    ├── Contact/
    └── Footer/
scripts/
└── optimize-images.mjs       ← convierte JPG/PNG → WebP con sharp (npm run optimize-images)
```

---

## 5. Secciones

| # | ID | Notas clave |
|---|----|-------------|
| — | fixed | `FloatingMenu`: FAB coral, lista 5 anclas + toggle ES/EN + CV |
| 1 | `#hero` | `height:500vh`, sticky inner. Video `/hero.mp4` scrubbing por scroll. Panel A (presentación) → Panel B (tagline). Todo texto blanco. |
| 2 | `#sobre-mi` | Grid 2 cols. Accordion Radix: 3 ítems (Mirada Integral, Creatividad Medible, Adaptación Constante), títulos uppercase coral, +/− icon. |
| 3 | `#competencias` | `CircularSkills`: carrusel 8 competencias. Fondo `--color-secondary`. |
| 4 | `#experiencia` | Accordion expandible desktop / stacked cards mobile. 5 items. |
| 5 | `#testimonios` | 2 cards. Citas se mantienen en español en ambos idiomas. |
| 6 | `#intereses` | Panel A: 4 glassmorphism cards (IA Marketing, Vibe Coding, DEI, Aprendizaje). Panel B: 4 motivaciones personales (scroll-driven desktop / motivSection mobile). |
| 7 | `#contacto` | Info izq + form Web3Forms der |

---

## 6. i18n

- Idioma por defecto: **`es`**. `toggleLang` alterna `es ↔ en`.
- Diccionarios planos en `src/i18n/es.js` y `en.js`. Llaves tipo `'skills.s1.name'`.
- **Regla:** cada string nuevo requiere entrada en ambos archivos. Excepción: testimonios (solo ES).

---

## 7. Assets pendientes

| Asset | Ruta destino | Sustituye |
|-------|-------------|-----------|
| `logo.svg` definitivo | `public/logo.svg` | placeholder geométrico |
| `foto-hero.jpg` | `src/assets/` | `<ImagePlaceholder>` en Hero |
| `motiv-clearlens.webp` | `public/images/` | placeholder para tarjeta m4 (Explorar construyendo) |
| Imágenes competencias definitivas (8) | `public/images/competencias/*.webp` | imágenes actuales |
| `cv-juan-enrique-quinones.pdf` | `public/` | link 404 en FloatingMenu |

Para imágenes de competencias: actualizar los `src` en el array `SKILLS_DATA` dentro de `src/components/Skills/Skills.jsx`.

Para nuevas imágenes: correr `node scripts/optimize-images.mjs` para generar WebP antes de referenciarlas en el código.

---

## 8. Config pendiente

- **Web3Forms:** copiar `.env.example` → `.env.local` y rellenar `VITE_WEB3FORMS_KEY`.

---

## 9. Comandos

```bash
npm run dev      # http://localhost:5173
npm run build    # dist/ (~393 kB JS / 127 kB gzip)
npm run preview
npm run lint
node scripts/optimize-images.mjs  # Convierte JPG/PNG → WebP en public/images/
```

---

## 10. Reglas

1. **Sin librerías CSS ni animación nueva** (framer-motion ya está, no agregar más).
2. **No subir Vite a v8** hasta Node 22.12+.
3. **No bajar lucide-react** de `^0.460.0`. Es la única librería de íconos — no reinstalar react-icons.
4. **Bilingüe completo** — todo string nuevo en `es.js` Y `en.js`.
5. **Spec es fuente de verdad** para contenido, paleta y layout.
6. **Mobile-first** — media queries `max-width: 1023px` y `767px` en cada componente.
7. **Accesibilidad mínima:** `alt` en imágenes, `aria-label` en botones de ícono.
8. **Imágenes siempre en WebP** — no usar JPG/PNG en producción. Correr el script de optimización antes de referenciar nuevas imágenes.
9. **Videos optimizados:** hero.mp4 e interests.mp4 con CRF 24/28 **y `-g 24 -keyint_min 24 -sc_threshold 0`** (keyframe cada segundo — imprescindible para scroll-scrubbing fluido). bckg/yomismo con CRF 28. Los `*_original.mp4` están en .gitignore.
10. **No reinstalar @emailjs/browser** — el formulario usa Web3Forms.

---

## 11. SEO

- `index.html`: meta description optimizada, JSON-LD Schema.org Person, preload hero.mp4, noscript fallback.
- Favicon: `logo.png` (PNG — WebP no tiene soporte universal en favicons).
- Open Graph y Twitter Card configurados con og-image.jpg (1200×630).
- GA4: `G-KDNVHGZ11X`.
- Canonical: `https://www.juanenriquequinones.com/`.
