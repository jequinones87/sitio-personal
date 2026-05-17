import { useEffect, useState } from 'react';

// Mapa de id de sección → tono de fondo. Usado por elementos flotantes
// (FloatingLogo, FloatingMenu) para adaptar su color al fondo visible.
//
// dark  → fondos oscuros (#35535B, #1C1C1A) — logo a color, FAB coral
// teal  → fondo teal claro (#77C8D4) — logo blanco, FAB coral
// light → fondos claros (#F7F6F2, #FFFFFF) — logo #35535B, FAB teal
export const SECTION_TONE = {
  hero: 'teal',
  'sobre-mi': 'light',
  competencias: 'dark',
  experiencia: 'light',
  testimonios: 'light',
  intereses: 'dark',
  contacto: 'light',
  footer: 'dark',
};

const TRACKED_IDS = Object.keys(SECTION_TONE);

export function useSectionTone(initial = 'teal') {
  const [tone, setTone] = useState(initial);

  useEffect(() => {
    const elements = TRACKED_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (elements.length === 0) return;

    const visibility = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = null;
        let bestRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId && SECTION_TONE[bestId]) {
          setTone(SECTION_TONE[bestId]);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return tone;
}
