import { useLang } from '../../context/LangContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SectionTag from '../shared/SectionTag';
import styles from './Capabilities.module.css';

// Reemplaza a la antigua sección Competencias (components/Skills, ahora legacy).
// Los nombres de los pilares van en i18n; las capacidades son términos de
// industria que se muestran igual en ES y EN.
const AREAS = [
  { id: 'a1', items: ['Marketing Strategy', 'Omnichannel', 'Demand Generation', 'Customer Journey', 'CRO'] },
  { id: 'a2', items: ['Google Ads', 'Social Ads', 'GA4', 'SEO', 'Analytics & Reporting'] },
  { id: 'a3', items: ['CRM', 'Automation', 'Integrations', 'AI applied to Marketing', 'Landing Pages'] },
  { id: 'a4', items: ['Branding', 'Content Strategy', 'Social Media', 'Design', 'Communication'] },
];

export default function Capabilities() {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="capacidades" className={styles.capabilities}>
      <div ref={ref} className={`container reveal ${isVisible ? 'visible' : ''}`}>
        <header className={styles.header}>
          <SectionTag>{t('cap.tag')}</SectionTag>
          <h2 className={styles.title}>{t('cap.title')}</h2>
          <p className={styles.body}>{t('cap.body')}</p>
        </header>

        <div className={styles.grid}>
          {AREAS.map(({ id, items }, i) => (
            <div key={id} className={styles.area}>
              <span className={styles.index} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.areaName}>{t(`cap.${id}.name`)}</h3>
              <ul className={styles.items}>
                {items.map((item) => (
                  <li key={item} className={styles.item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className={styles.closing}>{t('cap.closing')}</p>
      </div>
    </section>
  );
}
