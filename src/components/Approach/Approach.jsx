import { useLang } from '../../context/LangContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SectionTag from '../shared/SectionTag';
import styles from './Approach.module.css';

// Diferenciador del perfil: Diseño + Marketing + Tecnología.
const DIMENSIONS = ['d1', 'd2', 'd3'];

export default function Approach() {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="enfoque" className={styles.approach}>
      <div ref={ref} className={`container reveal ${isVisible ? 'visible' : ''}`}>
        <header className={styles.header}>
          <SectionTag>{t('approach.tag')}</SectionTag>
          <h2 className={styles.title}>
            {t('approach.title').split('\n').map((line) => (
              <span key={line} className={styles.titleLine}>{line}</span>
            ))}
          </h2>
          <p className={styles.body}>{t('approach.body')}</p>
        </header>

        <div className={styles.grid}>
          {DIMENSIONS.map((id, i) => (
            <div key={id} className={styles.dimension}>
              <span className={styles.index} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.name}>
                {i > 0 && <span className={styles.plus} aria-hidden="true">+</span>}
                {t(`approach.${id}.name`)}
              </h3>
              <p className={styles.text}>{t(`approach.${id}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
