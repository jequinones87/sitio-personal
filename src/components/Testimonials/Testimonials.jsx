import { useLang } from '../../context/LangContext';
import { useScrollFade } from '../../hooks/useScrollFade';
import SectionTag from '../shared/SectionTag';
import styles from './Testimonials.module.css';

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
  const { t } = useLang();
  const { ref, style } = useScrollFade();

  return (
    <section id="testimonios" className={styles.testimonials}>
      <div className="container" ref={ref} style={style}>
        <div className={styles.header}>
          <SectionTag>{t('test.tag')}</SectionTag>
          <h2 className={styles.title}>{t('test.title')}</h2>
        </div>
        <div className={styles.grid}>
          {CARDS.map(({ id, photo, linkedin }) => (
            <figure key={id} className={styles.card}>
              <span className={styles.quoteIcon} aria-hidden="true">"</span>
              <blockquote className={styles.quote}>
                {t(`test.${id}.quote`)}
              </blockquote>
              <div className={styles.separator} />
              <figcaption className={styles.author}>
                <img
                  src={photo}
                  alt={t(`test.${id}.name`)}
                  className={styles.avatar}
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
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
