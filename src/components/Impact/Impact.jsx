import { useLang } from '../../context/LangContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import MetricValue from '../shared/MetricValue';
import styles from './Impact.module.css';

// Cifras exactas validadas — no recalcular ni agregar nuevas.
const METRICS = [
  { id: 'm1', value: '+300%' },
  { id: 'm2', value: '+20%' },
  { id: 'm3', value: '+30%' },
  { id: 'm4', value: '+250%', hasNote: true },
];

export default function Impact() {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal();
  // La cuenta arranca cuando el borde superior de la grilla entra en pantalla
  // (las cifras, unos píxeles más abajo, aún no se ven al pasar a 0)
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ rootMargin: '0px' });

  return (
    <section id="impacto" className={styles.impact}>
      <div ref={ref} className={`container reveal ${isVisible ? 'visible' : ''}`}>
        <header className={styles.header}>
          <h2 className={styles.title}>{t('impact.title')}</h2>
          <p className={styles.body}>{t('impact.body')}</p>
        </header>

        <ul ref={gridRef} className={styles.grid}>
          {METRICS.map(({ id, value, hasNote }) => (
            <li key={id} className={styles.metric}>
              <MetricValue
                value={value}
                className={styles.value}
                animate={{ active: gridVisible }}
              />
              <p className={styles.label}>{t(`impact.${id}.label`)}</p>
              <p className={styles.source}>{t(`impact.${id}.source`)}</p>
              <p className={styles.context}>{t(`impact.${id}.context`)}</p>
              {hasNote && <p className={styles.note}>{t(`impact.${id}.note`)}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
