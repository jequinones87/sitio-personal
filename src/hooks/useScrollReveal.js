import { useEffect, useRef, useState } from 'react';

// Marca el elemento como visible cuando su borde superior entra en la franja
// inferior del viewport. Usa threshold 0 + rootMargin negativo (en vez de un
// threshold proporcional) para que secciones más altas que el viewport —p. ej.
// con zoom alto— siempre lleguen a revelarse.
export function useScrollReveal({ rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // También revela si, al empezar a observar, la sección ya está por
        // encima del viewport (p. ej. scroll restaurado al recargar).
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isVisible };
}
