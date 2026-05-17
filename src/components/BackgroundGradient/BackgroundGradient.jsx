import { useEffect, useState } from 'react';
import styles from './BackgroundGradient.module.css';

// Capa global de fondo con gradient animado. Va montada una sola vez en App.jsx
// detrás de todo el contenido (z-index: -1, position: fixed). Las secciones con
// fondo opaco la tapan al pasar; el efecto persiste mientras se scrollea.
export default function BackgroundGradient() {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div className={styles.container} aria-hidden="true">
      <svg className={styles.svgDefs}>
        <defs>
          <filter id="hero-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        className={styles.gradientsContainer}
        style={isSafari ? { filter: 'blur(40px)' } : undefined}
      >
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
        <div className={`${styles.orb} ${styles.orb4}`} />
        <div className={`${styles.orb} ${styles.orb5}`} />
      </div>
    </div>
  );
}
