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
| Íconos | `lucide-react@^0.460.0` + `react-icons` (solo en Skills) |
| i18n | React Context propio + diccionarios JS planos |
| Form | Formspree (fallback a `mailto:` si no hay `.env.local`) |

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
    ├── Hero/                  ← video scroll-scrubbed (public/hero.mp4, re-enc. -g 1)
    ├── About/                 ← accordion Radix (@radix-ui/react-accordion)
    ├── Skills/                ← carrusel CircularSkills (framer-motion + react-icons)
    ├── Experience/
    ├── Testimonials/
    ├── Interests/
    ├── Contact/
    └── Footer/
```

---

## 5. Secciones

| # | ID | Notas clave |
|---|----|-------------|
| — | fixed | `FloatingMenu`: FAB coral, lista 5 anclas + toggle ES/EN + CV |
| 1 | `#hero` | `height:500vh`, sticky inner. Video `/hero.mp4` scrubbing por scroll. Panel A (presentación) → Panel B (tagline). Todo texto blanco. |
| 2 | `#sobre-mi` | Grid 2 cols. Accordion Radix: 3 ítems (Análisis, Colaboración, Creatividad), títulos uppercase coral, +/− icon. |
| 3 | `#competencias` | `CircularSkills`: carrusel 8 competencias. Imágenes placeholder `picsum.photos` hasta tener las finales. Fondo `--color-secondary`. |
| 4 | `#experiencia` | Timeline vertical: IDIEM (2024-presente), Consultor (2024), Reebok (2022-2024) |
| 5 | `#testimonios` | 2 cards. Citas se mantienen en español en ambos idiomas. |
| 6 | `#intereses` | Íconos lucide + 3 cards motivaciones con ImagePlaceholder |
| 7 | `#contacto` | Info izq + form Formspree der |

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
| `foto-wawi/deporte/dei.jpg` | `src/assets/` | `<ImagePlaceholder>` en Interests |
| Imágenes competencias (8) | `public/images/competencias/` | picsum en CircularSkills |
| `cv-juan-enrique-quinones.pdf` | `public/` | link 404 en FloatingMenu |

Para integrar fotos: dejar el archivo en `src/assets/` con el nombre indicado — `photos.js` lo detecta con `import.meta.glob` automáticamente.

Para imágenes de competencias: actualizar los `src` en el array `SKILLS_DATA` dentro de `src/components/Skills/Skills.jsx`.

---

## 8. Config pendiente

- **Formspree:** copiar `.env.example` → `.env.local` y rellenar `VITE_FORMSPREE_ID`.
- **Canonical URL:** reemplazar placeholder `https://jequinones.cl/` en `index.html` al desplegar.

---

## 9. Comandos

```bash
npm run dev      # http://localhost:5173
npm run build    # dist/ (~381 kB JS / 123 kB gzip)
npm run preview
npm run lint
```

---

## 10. Reglas

1. **Sin librerías CSS ni animación nueva** (framer-motion ya está, no agregar más).
2. **No subir Vite a v8** hasta Node 22.12+.
3. **No bajar lucide-react** de `^0.460.0`.
4. **Bilingüe completo** — todo string nuevo en `es.js` Y `en.js`.
5. **Spec es fuente de verdad** para contenido, paleta y layout.
6. **Mobile-first** — media queries `max-width: 1023px` y `767px` en cada componente.
7. **Accesibilidad mínima:** `alt` en imágenes, `aria-label` en botones de ícono.
