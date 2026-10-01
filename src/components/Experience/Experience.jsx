import { useLang } from '../../context/LangContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SectionTag from '../shared/SectionTag';
import Button from '../shared/Button';
import { CV_URLS, trackCvDownload } from '../shared/cvLinks';
import styles from './Experience.module.css';

// Timeline vertical (anatomía: indicador + separador + header + contenido).
// Textos en i18n: exp.<id>.{company,role,period,summary,b1..bN}
// state: 'current' (etapa actual) | 'completed' (etapas anteriores)
const ITEMS = [
  { id: 'item1', bullets: 3, state: 'current' },
  { id: 'item2', bullets: 3, state: 'completed' },
  { id: 'item3', bullets: 3, state: 'completed' },
  { id: 'item4', bullets: 3, state: 'completed' },
  { id: 'item5', bullets: 1, state: 'completed' },
];

export default function Experience() {
  const { t, lang } = useLang();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experiencia" className={styles.experience}>
      <div ref={ref} className={`container reveal ${isVisible ? 'visible' : ''}`}>
        <div className={styles.grid}>
          <header className={styles.header}>
            <SectionTag>{t('exp.tag')}</SectionTag>
            <h2 className={styles.title}>{t('exp.title')}</h2>
            <p className={styles.subtitle}>{t('exp.subtitle')}</p>
          </header>

          <div className={styles.body}>
            <ol className={styles.timeline}>
              {ITEMS.map(({ id, bullets, state }) => (
                <li key={id} className={styles.item} data-state={state}>
                  <span className={styles.indicator} aria-hidden="true" />
                  <span className={styles.separator} aria-hidden="true" />

                  <div className={styles.itemHeader}>
                    <p className={styles.date}>{t(`exp.${id}.period`)}</p>
                    <h3 className={styles.itemTitle}>{t(`exp.${id}.company`)}</h3>
                    <p className={styles.role}>{t(`exp.${id}.role`)}</p>
                  </div>

                  <div className={styles.content}>
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
        </div>
      </div>
    </section>
  );
}
