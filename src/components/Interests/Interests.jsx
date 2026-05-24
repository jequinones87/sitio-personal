import { useEffect, useRef } from 'react';
import { Users, ClipboardCheck, HeartHandshake, BookOpen } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import SectionTag from '../shared/SectionTag';
import styles from './Interests.module.css';

const INT_FRAME_COUNT = 106;

const CARDS = [
  { id: 'p1', Icon: Users },
  { id: 'p2', Icon: ClipboardCheck },
  { id: 'p3', Icon: HeartHandshake },
  { id: 'p4', Icon: BookOpen },
];

const MOTIVS = [
  { id: 'm1', photo: '/images/motiv-padre.webp' },
  { id: 'm2', photo: '/images/motiv-deporte.webp' },
  { id: 'm3', photo: '/images/motiv-proposito.webp' },
  { id: 'm4', photo: '/images/motiv-clearlens.webp' },
];

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

export default function Interests() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef(null);
  const panelARef = useRef(null);
  const panelBRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const panelA = panelARef.current;
    const panelB = panelBRef.current;
    if (!section || !canvas || !panelA || !panelB) return;

    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth <= 767;

    const frames = preloadFrames(INT_FRAME_COUNT, '/frames/interests/');
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
    frames[0].onload = () => drawFrame(0);
    if (frames[0].complete) drawFrame(0);

    if (isMobile) {
      let animFrame = 0;
      let mobileFrameIndex = 0;
      let lastTime = 0;
      const INTERVAL = 1000 / 15;

      function mobileLoop(ts) {
        if (ts - lastTime >= INTERVAL) {
          lastTime = ts;
          mobileFrameIndex = (mobileFrameIndex + 1) % INT_FRAME_COUNT;
          drawFrame(mobileFrameIndex);
        }
        animFrame = requestAnimationFrame(mobileLoop);
      }
      animFrame = requestAnimationFrame(mobileLoop);

      const cards = cardRefs.current.filter(Boolean);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              cards.forEach((card, i) => {
                setTimeout(() => card.classList.add(styles.cardVisible), i * 120);
              });
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(section);
      return () => {
        observer.disconnect();
        cancelAnimationFrame(animFrame);
      };
    }

    let raf = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / total));

      const index = Math.round(p * (INT_FRAME_COUNT - 1));
      drawFrame(index);

      const aOut = clamp01(p, 0.4, 0.55);
      panelA.style.opacity = 1 - aOut;
      panelA.style.transform = `translateY(${-aOut * 40}px)`;
      panelA.style.pointerEvents = aOut > 0.95 ? 'none' : 'auto';

      const bIn = clamp01(p, 0.55, 0.70);
      panelB.style.opacity = bIn;
      panelB.style.transform = `translateY(${(1 - bIn) * 30}px)`;
      panelB.style.pointerEvents = bIn < 0.05 ? 'none' : 'auto';

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
    };
  }, []);

  return (
    <section id="intereses" className={styles.interests} ref={sectionRef}>
      <div className={styles.sticky}>
        <canvas
          ref={canvasRef}
          className={styles.videoBg}
          aria-hidden="true"
        />
        <div className={styles.videoOverlay} aria-hidden="true" />

        {/* Panel A — glassmorphism interest cards */}
        <div ref={panelARef} className={styles.panel} style={{ opacity: 1, transform: 'translateY(0px)' }}>
          <div className={`container ${styles.panelInner}`}>
            <div className={styles.header}>
              <SectionTag>{t('int.tag')}</SectionTag>
              <h2 className={styles.title}>{t('int.title')}</h2>
              <p className={styles.subtitle}>{t('int.subtitle')}</p>
            </div>
            <div className={styles.grid}>
              {CARDS.map(({ id, Icon }, i) => (
                <div
                  key={id}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className={styles.card}
                >
                  <div className={styles.iconWrap} aria-hidden="true">
                    <Icon size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.cardTitle}>{t(`int.${id}.name`)}</h3>
                  <p className={styles.cardText}>{t(`int.${id}.body`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel B — personal motivations (desktop sticky panel) */}
        <div ref={panelBRef} className={styles.panel} data-panel="b" style={{ opacity: 0, transform: 'translateY(30px)' }}>
          <div className={`container ${styles.panelInner}`}>
            <div className={styles.motivHeader}>
              <span className={styles.motivLabel}>{t('int.motiv.label')}</span>
              <h3 className={styles.motivTitle}>{t('int.motiv.title')}</h3>
            </div>
            <div className={styles.motivGrid}>
              {MOTIVS.map(({ id, photo }, i) => (
                <article
                  key={id}
                  className={styles.motivCard}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className={styles.motivImgWrap}>
                    <img src={photo} alt={t(`int.${id}.alt`)} className={styles.motivImg} />
                  </div>
                  <h4 className={styles.motivCardTitle}>{t(`int.${id}.title`)}</h4>
                  <p className={styles.motivCardText}>{t(`int.${id}.body`)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only: motivations as standalone section below */}
      <div className={styles.motivSection}>
        <div className="container">
          <div className={styles.motivHeader}>
            <span className={styles.motivLabel}>{t('int.motiv.label')}</span>
            <h3 className={styles.motivTitle}>{t('int.motiv.title')}</h3>
          </div>
          <div className={styles.motivGrid}>
            {MOTIVS.map(({ id, photo }) => (
              <article key={`mob-${id}`} className={styles.motivCard}>
                <div className={styles.motivImgWrap}>
                  <img src={photo} alt={t(`int.${id}.alt`)} className={styles.motivImg} />
                </div>
                <h4 className={styles.motivCardTitle}>{t(`int.${id}.title`)}</h4>
                <p className={styles.motivCardText}>{t(`int.${id}.body`)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
