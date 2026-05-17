import { useEffect, useRef } from 'react';
import { useLang } from '../../context/LangContext';
import Button from '../shared/Button';
import styles from './Hero.module.css';

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clamp01(x, a, b) {
  if (b === a) return x >= b ? 1 : 0;
  return Math.min(1, Math.max(0, (x - a) / (b - a)));
}

export default function Hero() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const panelARef = useRef(null);
  const panelBRef = useRef(null);
  const scrollHintRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const panelA = panelARef.current;
    const panelB = panelBRef.current;
    const scrollHint = scrollHintRef.current;
    if (!section || !video || !panelA || !panelB) return;

    let raf = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / total));

      // Video scrub
      if (video.readyState >= 1 && video.duration) {
        video.currentTime = p * video.duration;
      }

      // Scroll hint fades out immediately on scroll
      if (scrollHint) {
        scrollHint.style.opacity = Math.max(0, 1 - p * 20);
      }

      // Panel A: visible at start, fades out 35%–50%
      const aOut = clamp01(p, 0.35, 0.5);
      panelA.style.opacity = 1 - aOut;
      panelA.style.transform = `translateY(${-aOut * 40}px)`;
      panelA.style.pointerEvents = aOut > 0.95 ? 'none' : 'auto';

      // Panel B: fades in 50%–65%, fades out 95%–100%
      const bIn = clamp01(p, 0.5, 0.65);
      const bOut = clamp01(p, 0.95, 1);
      const bOpacity = bIn * (1 - bOut);
      panelB.style.opacity = bOpacity;
      panelB.style.transform = `translateY(${(1 - bIn) * 30 - bOut * 30}px)`;
      panelB.style.pointerEvents = bOpacity < 0.05 ? 'none' : 'auto';

      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="hero" className={styles.hero} ref={sectionRef}>
      <div className={styles.sticky}>
        <video
          ref={videoRef}
          className={styles.videoBg}
          src="/hero.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className={styles.videoOverlay} aria-hidden="true" />

        {/* Panel A — presentación */}
        <div ref={panelARef} className={styles.panel} style={{ opacity: 1, transform: 'translateY(0px)' }}>
          <div className={`container ${styles.panelInner}`}>
            <h3 className={styles.intro}>
              <strong>{t('hero.h3.name')}</strong>
              <span className={styles.introSep} aria-hidden="true"> | </span>
              <span className={styles.introRole}>{t('hero.h3.role')}</span>
            </h3>
            <h1 className={styles.title}>
              <span className={styles.titleLine}>{t('hero.line1.accent')}{t('hero.line1.rest')}</span>
              <span className={styles.titleLine}>{t('hero.line2.accent')}{t('hero.line2.rest')}</span>
              <span className={styles.titleLine}>{t('hero.line3.accent')}{t('hero.line3.rest')}</span>
            </h1>
            <div className={styles.ctas}>
              <Button variant="primary" onClick={() => scrollToId('contacto')}>
                {t('hero.cta1')}
              </Button>
              <Button variant="secondary" className={styles.ctaWhite} onClick={() => scrollToId('experiencia')}>
                {t('hero.cta2')}
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div ref={scrollHintRef} className={styles.scrollHint} aria-hidden="true">
          <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
            <polyline points="2,2 14,14 26,2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Panel B — tagline */}
        <div ref={panelBRef} className={styles.panel} style={{ opacity: 0, transform: 'translateY(30px)' }}>
          <div className={`container ${styles.panelInner} ${styles.panelCenter}`}>
            <h2 className={styles.tagline}>
              {t('hero.tag.a')}
              {t('hero.tag.aRest')}
              {t('hero.tag.b')}
              {t('hero.tag.bRest')}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
