import { useEffect, useRef } from 'react';
import { useLang } from '../../context/LangContext';
import Button from '../shared/Button';
import styles from './Hero.module.css';

const HERO_FRAME_COUNT = 121;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clamp01(x, a, b) {
  if (b === a) return x >= b ? 1 : 0;
  return Math.min(1, Math.max(0, (x - a) / (b - a)));
}

function preloadFrames(count, basePath) {
  const imgs = [];
  for (let i = 1; i <= count; i++) {
    const img = new Image();
    img.src = `${basePath}f${String(i).padStart(3, '0')}.webp`;
    imgs.push(img);
  }
  return imgs;
}

export default function Hero() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef(null);
  const panelARef = useRef(null);
  const panelBRef = useRef(null);
  const scrollHintRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const panelA = panelARef.current;
    const panelB = panelBRef.current;
    const scrollHint = scrollHintRef.current;
    if (!section || !canvas || !panelA || !panelB) return;

    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth <= 767;

    // Preload all frames
    const frames = preloadFrames(HERO_FRAME_COUNT, '/frames/hero/');
    framesRef.current = frames;

    let lastIndex = -1;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      lastIndex = -1;
    }

    function drawFrame(index) {
      if (index === lastIndex) return;
      lastIndex = index;
      const img = frames[index];
      if (!img.complete || !img.naturalWidth) return;
      if (!canvas.width || !canvas.height) resizeCanvas();
      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    }

    resizeCanvas();
    // Draw first frame as soon as it loads
    frames[0].onload = () => drawFrame(0);
    if (frames[0].complete) drawFrame(0);

    // On mobile: loop video fallback via canvas animation
    let animFrame = 0;
    let mobileFrameIndex = 0;
    let lastTime = 0;
    const FPS = 15;
    const INTERVAL = 1000 / FPS;

    function mobileLoop(ts) {
      if (ts - lastTime >= INTERVAL) {
        lastTime = ts;
        mobileFrameIndex = (mobileFrameIndex + 1) % HERO_FRAME_COUNT;
        drawFrame(mobileFrameIndex);
      }
      animFrame = requestAnimationFrame(mobileLoop);
    }

    if (isMobile) {
      animFrame = requestAnimationFrame(mobileLoop);
    }

    let raf = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / total));

      if (!isMobile) {
        const index = Math.round(p * (HERO_FRAME_COUNT - 1));
        drawFrame(index);
      }

      if (scrollHint) {
        scrollHint.style.opacity = Math.max(0, 1 - p * 20);
      }

      const aOut = clamp01(p, 0.35, 0.5);
      panelA.style.opacity = 1 - aOut;
      panelA.style.transform = `translateY(${-aOut * 40}px)`;
      panelA.style.pointerEvents = aOut > 0.95 ? 'none' : 'auto';

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

    const onResize = () => {
      resizeCanvas();
      update();
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <section id="hero" className={styles.hero} ref={sectionRef}>
      <div className={styles.sticky}>
        <canvas
          ref={canvasRef}
          className={styles.videoBg}
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
              <Button variant="primary" onClick={() => scrollToId('experiencia')}>
                {t('hero.cta1')}
              </Button>
              <Button variant="secondary" className={styles.ctaWhite} onClick={() => scrollToId('contacto')}>
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
