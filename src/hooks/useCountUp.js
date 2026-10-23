import { useEffect, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Cuenta de 0 a `target` (ease-out).
// - Por defecto muestra el valor final (lo que ven buscadores y lectores).
// - `armed`: la grilla está por entrar en pantalla → la cifra pasa a 0.
// - `active`: la grilla ya se ve → cuenta hasta el valor final.
// Sin `enabled` o con prefers-reduced-motion devuelve siempre el valor final.
export function useCountUp(target, { enabled = false, armed = false, active = false, duration = 1600 } = {}) {
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

  if (!enabled || !armed || prefersReducedMotion()) return target;
  if (progress === null) return 0;
  return Math.round(target * (1 - Math.pow(1 - progress, 3)));
}
