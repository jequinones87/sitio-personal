import { useLang } from '../../context/LangContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SectionTag from '../shared/SectionTag';
import Button from '../shared/Button';
import { CV_URLS, trackCvDownload } from '../shared/cvLinks';
import styles from './Experience.module.css';

// Timeline profesional. Textos en i18n: exp.<id>.{company,role,period,summary,b1..bN}
const ITEMS = [
  { id: 'item1', bullets: 3, current: true },
  { id: 'item2', bullets: 3 },
  { id: 'item3', bullets: 3 },
  { id: 'item4', bullets: 3 },
  { id: 'item5', bullets: 1 },
];

export default function Experience() {
  const { t, lang } = useLang();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experiencia" className={styles.experience}>
      <div ref={ref} className={`container reveal ${isVisible ? 'visible' : ''}`}>
        <header className={styles.header}>
          <SectionTag>{t('exp.tag')}</SectionTag>
          <h2 className={styles.title}>{t('exp.title')}</h2>
          <p className={styles.subtitle}>{t('exp.subtitle')}</p>
        </header>

        <ol className={styles.timeline}>
          {ITEMS.map(({ id, bullets, current }) => (
            <li key={id} className={`${styles.stage} ${current ? styles.current : ''}`}>
              <p className={styles.period}>{t(`exp.${id}.period`)}</p>
              <div className={styles.who}>
                <h3 className={styles.company}>{t(`exp.${id}.company`)}</h3>
                <p className={styles.role}>{t(`exp.${id}.role`)}</p>
              </div>
              <div className={styles.what}>
                <p className={styles.summary}>{t(`exp.${id}.summary`)}</p>
                <ul className={styles.bullets}>
                  {Array.from({ length: bullets }, (_, i) => (
                    <li key={i} className={styles.bullet}>{t(`exp.${id}.b${i + 1}`)}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.ctaRow}>
          <Button
            as="a"
            variant="primary"
            href={CV_URLS[lang]}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCvDownload(lang, 'experience')}
          >
            {t('exp.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
}
