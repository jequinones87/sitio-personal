import { useEffect, useRef, useState } from 'react';

// Devuelve el progreso (0..1) del scroll dentro de una sección alta.
// 0 = el inicio de la sección está alineado con el top del viewport.
// 1 = el final de la sección llegó al top del viewport (= queda fuera).
// Útil para encadenar fades entre paneles que viven en una misma sección
// con altura mayor a 100vh.
export function useSectionProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      // -rect.top = cuántos px llevamos dentro de la sección.
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / total));
      setProgress(p);
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, progress };
}
