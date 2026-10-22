import { useEffect, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Cuenta de 0 a `target` (ease-out) cuando `active` pasa a true.
// Con `enabled` la cifra parte en 0 para no mostrar el valor final antes de
// animar. Sin `enabled` o con prefers-reduced-motion devuelve el valor final.
export function useCountUp(target, { enabled = false, active = false, duration = 1600 } = {}) {
  const [value, setValue] = useState(() =>
    enabled && !prefersReducedMotion() ? 0 : target
  );

  useEffect(() => {
    if (!enabled || !active || prefersReducedMotion()) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, enabled, active, duration]);

  return value;
}
