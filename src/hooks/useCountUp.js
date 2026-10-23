import { useEffect, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Cuenta de 0 a `target` (ease-out) cuando `active` pasa a true.
// Hasta entonces muestra el valor final, así quien no hace scroll (buscadores,
// capturas, HTML pre-renderizado) ve siempre la cifra real.
// Sin `enabled` o con prefers-reduced-motion devuelve siempre el valor final.
export function useCountUp(target, { enabled = false, active = false, duration = 1600 } = {}) {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (!enabled || !active || prefersReducedMotion()) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, active, duration]);

  if (!enabled || !active || prefersReducedMotion()) return target;
  if (progress === null) return 0;
  return Math.round(target * (1 - Math.pow(1 - progress, 3)));
}
