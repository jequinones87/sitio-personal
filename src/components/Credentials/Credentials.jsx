import { useLang } from '../../context/LangContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Credentials.module.css';

const CATEGORY_KEYS = ['cred.cat1', 'cred.cat2', 'cred.cat3', 'cred.cat4', 'cred.cat5'];

// Franja de transición entre el Hero y las métricas de Impacto.
export default function Credentials() {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="credenciales" className={styles.credentials} aria-labelledby="credenciales-title">
      <div ref={ref} className={`container reveal ${isVisible ? 'visible' : ''} ${styles.grid}`}>
        <h2 id="credenciales-title" className={styles.title}>{t('cred.title')}</h2>
        <p className={styles.body}>{t('cred.body')}</p>
        <div className={styles.categories}>
          <p className={styles.label}>{t('cred.categoriesLabel')}</p>
          <ul className={styles.list}>
            {CATEGORY_KEYS.map((key) => (
              <li key={key} className={styles.item}>{t(key)}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
