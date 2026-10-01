# CLAUDE.md — Sitio Personal Juan Enrique Quiñones

## 1. Visión

SPA one-page bilingüe (ES/EN) para **Juan Enrique Quiñones**, Especialista en Marketing (Santiago de Chile). Audiencia dual: empleadores y clientes freelance. Especificación fuente de verdad: [../jequinones-sitio-spec.md](../jequinones-sitio-spec.md).

---

## 2. Stack

| Capa | Decisión |
|------|----------|
| Framework | React 19 + Vite 7 (NO Vite 8 — rompe en Node 21) |
| Estilos | **CSS Modules** + custom properties — sin Tailwind, sin styled-components |
| Animación | CSS transitions. framer-motion solo en `Skills/` (legacy, fuera de la Home: no entra en el bundle activo) — NO framer-motion en el resto |
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
    ├── Skills/                ← LEGACY (fuera de la Home): carrusel CircularSkills (framer-motion + lucide-react)
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

Orden de la Home (Phase 2 del rediseño portfolio). La numeración visible (`XX — nombre`) vive en las claves `*.tag` de i18n.

| # | ID | Componente | Notas clave |
|---|----|------------|-------------|
| — | fixed | `FloatingMenu` | FAB: Proyectos · Experiencia · Sobre mí · Contacto + idioma + CV (`shared/cvLinks.js`) |
| — | `#hero` | `Hero` | `height:500vh`, canvas de frames. Panel A (H1 único + CTAs) → Panel B (frase secundaria). |
| — | `#credenciales` | `Credentials` | Franja oscura de transición. |
| 01 | `#impacto` | `Impact` | 4 métricas (`shared/MetricValue`). Cifras validadas: no inventar ni recalcular. |
| 02 | `#projects` | `Projects` | Casos; `image`/`href` en `null` hasta tener material/páginas de caso. |
| 03 | `#capacidades` | `Capabilities` | 4 pilares. Reemplaza a Competencias. |
| 04 | `#experiencia` | `Experience` | Timeline + CTA CV. |
| 05 | `#enfoque` | `Approach` | Diseño + Marketing + Tecnología. |
| 06 | `#testimonios` | `Testimonials` | 3 citas, sin carrusel. Citas originales (ES) sin editar; en EN se muestran traducidas con la nota "Translated from Spanish". |
| 07 | `#sobre-mi` | `About` | Dimensión humana; integra contenido de la antigua Intereses (`int.p4`, `int.m1–m4`). |
| 08 | `#contacto` | `Contact` | Info + form Web3Forms. |

**Minisitio del CV:** `/cv/` (ES) y `/cv/en/` (EN) son páginas HTML estáticas (`cv/index.html`, `cv/en/index.html`, entradas extra en `vite.config.js`) con estilos en `src/cv/cv.css` (reutiliza `reset.css` + `theme.css`). Replican el PDF literal salvo el teléfono (solo en el PDF). PDFs en `public/cv/`. No se indexan (meta robots + `X-Robots-Tag` en `vercel.json`). Para actualizar el CV: reemplazar el PDF en `public/cv/` y sincronizar el HTML.

**Legacy (fuera de la Home, conservados como rollback):** `components/Skills/` (+ `CircularSkills`) e `components/Interests/`, sus claves i18n `skills.*` / `int.*` no usadas y assets asociados (`public/bckg.mp4`, `public/frames/interests/`, `public/images/competencias/`, `public/images/experience-*`). Eliminar en una fase posterior.

---

## 6. i18n

- Idioma por defecto: **`es`**. `toggleLang` alterna `es ↔ en`.
- Diccionarios planos en `src/i18n/es.js` y `en.js`. Llaves tipo `'skills.s1.name'`.
- **Regla:** cada string nuevo requiere entrada en ambos archivos.
- **Testimonios:** la cita en ES es el original y no se edita. En EN se permite la traducción, siempre acompañada de la nota "Translated from Spanish" (`test.translatedNote`, visible solo en EN).
- **Nombres de clientes:** el nombre correcto y definitivo es **"Baños Móviles de Lujo"** (igual en ES y EN; no traducir ni abreviar). Excepción: el minisitio del CV (`/cv/`) replica el PDF literal, que dice "Baños de Lujo".

---

## 7. Assets pendientes

| Asset | Ruta destino | Sustituye |
|-------|-------------|-----------|
| `logo.svg` definitivo | `public/logo.svg` | placeholder geométrico |
| `foto-hero.jpg` | `src/assets/` | `<ImagePlaceholder>` en Hero |
| `motiv-clearlens.webp` | `public/images/` | placeholder para tarjeta m4 (Explorar construyendo) |
| Imágenes competencias definitivas (8) | `public/images/competencias/*.webp` | imágenes actuales |

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
