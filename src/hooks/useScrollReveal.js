import { useEffect, useRef, useState } from 'react';

// Marca el elemento como visible poco ANTES de que entre en pantalla
// (rootMargin positivo por abajo). El contenido es visible por defecto: la
// clase .visible solo dispara la animación de entrada (ver theme.css), así
// que nunca queda oculto para quien no hace scroll, como los buscadores.
export function useScrollReveal({ rootMargin = '0px 0px 25% 0px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // También marca la sección si, al empezar a observar, ya está por
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
