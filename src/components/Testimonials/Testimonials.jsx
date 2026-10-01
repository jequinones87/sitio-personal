import { useLang } from '../../context/LangContext';
import { useScrollFade } from '../../hooks/useScrollFade';
import SectionTag from '../shared/SectionTag';
import styles from './Testimonials.module.css';

// El primero se muestra destacado (columna izquierda en desktop).
const CARDS = [
  {
    id: 'c1',
    photo: '/images/testimonial-xavier.webp',
    linkedin: 'https://www.linkedin.com/in/xavi-espinosa/',
  },
  {
    id: 'c2',
    photo: '/images/testimonial-cristian.webp',
    linkedin: 'https://www.linkedin.com/in/cristi%C3%A1n-fern%C3%A1ndez-pinochet-ba3493121/',
  },
  {
    id: 'c3',
    photo: '/images/testimonial-trinidad.webp',
    linkedin: 'https://www.linkedin.com/in/trinidad-gonzalez-besa-227316a8/',
  },
];

export default function Testimonials() {
  const { t, lang } = useLang();
  const { ref, style } = useScrollFade();

  return (
    <section id="testimonios" className={styles.testimonials}>
      <div className="container" ref={ref} style={style}>
        <div className={styles.header}>
          <SectionTag>{t('test.tag')}</SectionTag>
          <h2 className={styles.title}>{t('test.title')}</h2>
        </div>
        <div className={styles.grid}>
          {CARDS.map(({ id, photo, linkedin }, i) => (
            <figure key={id} className={`${styles.card} ${i === 0 ? styles.featured : ''}`}>
              <span className={styles.quoteIcon} aria-hidden="true">“</span>
              <blockquote className={styles.quote}>
                <p>{t(`test.${id}.quote`)}</p>
              </blockquote>
              {/* Las citas originales están en español; en EN se indica la traducción. */}
              {lang === 'en' && (
                <p className={styles.translatedNote}>{t('test.translatedNote')}</p>
              )}
              <figcaption className={styles.author}>
                {/* Decorativo: el nombre ya aparece como texto en el link contiguo. */}
                <img
                  src={photo}
                  alt=""
                  className={styles.avatar}
                  loading="lazy"
                />
                <div>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.name}
                  >
                    {t(`test.${id}.name`)}
                  </a>
                  <div className={styles.role}>{t(`test.${id}.role`)}</div>
                  <div className={styles.company}>{t(`test.${id}.company`)}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
