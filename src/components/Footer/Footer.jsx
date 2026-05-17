import { useLang } from '../../context/LangContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer id="footer" className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.left}>{t('footer.left')}</span>
        <span className={styles.right}>{t('footer.right')}</span>
      </div>
    </footer>
  );
}
