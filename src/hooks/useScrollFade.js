import { useEffect, useRef, useState } from 'react';

// Devuelve un opacity (0..1) que sube al entrar al viewport y baja al salir,
// con un translateY ligero para que el contenido "fluya" entre secciones.
// Útil para conseguir el efecto de "el fondo se mantiene, el contenido se va".
export function useScrollFade({ enterRatio = 0.15, exitRatio = 0.15 } = {}) {
  const ref = useRef(null);
  const [opacity, setOpacity] = useState(1);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;

      // Distancia desde el viewport: 0 cuando la sección está completamente
      // visible, y crece hacia 1 al salir por arriba o por abajo.
      const enterPx = viewport * enterRatio;
      const exitPx = viewport * exitRatio;

      // Alpha al entrar (desde abajo): 0 cuando el top de la sección está
      // 'enterPx' por debajo del fondo del viewport, 1 cuando ya entró 'enterPx'.
      let alphaIn = 1;
      if (rect.top > viewport - enterPx) {
        alphaIn = Math.max(0, (viewport - rect.top) / enterPx);
      }

      // Alpha al salir (por arriba): 1 mientras el fondo de la sección esté
      // dentro del viewport menos exitPx, decae a 0 cuando ya salió.
      let alphaOut = 1;
      if (rect.bottom < exitPx) {
        alphaOut = Math.max(0, rect.bottom / exitPx);
      }

      const next = Math.min(alphaIn, alphaOut);
      setOpacity(next);

      // Translate sutil: empuja hacia arriba mientras sale, baja desde abajo
      // mientras entra. Acota a ±24px para no romper el layout.
      const translate = (1 - next) * 24 * (rect.top > 0 ? 1 : -1);
      setOffset(translate);

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
  }, [enterRatio, exitRatio]);

  const style = {
    opacity,
    transform: `translateY(${offset}px)`,
    willChange: 'opacity, transform',
  };

  return { ref, style };
}
