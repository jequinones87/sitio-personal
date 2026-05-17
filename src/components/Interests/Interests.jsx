import { useEffect, useRef } from 'react';
import { Users, ClipboardCheck, HeartHandshake, BookOpen } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import SectionTag from '../shared/SectionTag';
import styles from './Interests.module.css';

const CARDS = [
  { id: 'p1', Icon: Users },
  { id: 'p2', Icon: ClipboardCheck },
  { id: 'p3', Icon: HeartHandshake },
  { id: 'p4', Icon: BookOpen },
];

const MOTIVS = [
  { id: 'm1', photo: '/images/motiv-padre.jpg' },
  { id: 'm2', photo: '/images/motiv-deporte.jpg' },
  { id: 'm3', photo: '/images/motiv-proposito.jpg' },
];

function clamp01(x, a, b) {
  if (b === a) return x >= b ? 1 : 0;
  return Math.min(1, Math.max(0, (x - a) / (b - a)));
}

export default function Interests() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const panelARef = useRef(null);
  const panelBRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const panelA = panelARef.current;
    const panelB = panelBRef.current;
    if (!section || !video || !panelA || !panelB) return;

    const isMobile = window.innerWidth <= 767;

    // On mobile: no scroll animation — panels are static via CSS
    if (isMobile) return;

    let raf = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / total));

      if (video.readyState >= 1 && video.duration) {
        video.currentTime = p * video.duration;
      }

      // Panel A (glassmorphism cards): visible at start, fades out 40%–55%
      const aOut = clamp01(p, 0.4, 0.55);
      panelA.style.opacity = 1 - aOut;
      panelA.style.transform = `translateY(${-aOut * 40}px)`;
      panelA.style.pointerEvents = aOut > 0.95 ? 'none' : 'auto';

      // Panel B (motivations): fades in 55%–70%, stays through end
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
    <section id="intereses" className={styles.interests} ref={sectionRef}>
      <div className={styles.sticky}>
        {/* Background video */}
        <video
          ref={videoRef}
          className={styles.videoBg}
          src="/interests.mp4"
          muted
          playsInline
          preload="auto"
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
                  className={styles.card}
                  style={{ transitionDelay: `${i * 100}ms` }}
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

      {/* Mobile-only: motivations as standalone section below sticky area */}
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
