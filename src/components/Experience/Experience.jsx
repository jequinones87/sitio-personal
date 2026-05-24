import { useState, useEffect } from 'react';
import { Building2, Briefcase, ShoppingBag, Award, PenTool } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import SectionTag from '../shared/SectionTag';
import styles from './Experience.module.css';

const ITEMS = [
  {
    id: 'item1',
    image: '/images/experience-idiem.webp',
    Icon: Building2,
  },
  {
    id: 'item2',
    image: '/images/experience-consultor.webp',
    Icon: Briefcase,
  },
  {
    id: 'item3',
    image: '/images/experience-reebok.webp',
    Icon: ShoppingBag,
  },
  {
    id: 'item4',
    image: '/images/experience-adidas.webp',
    Icon: Award,
  },
  {
    id: 'item5',
    image: '/images/experience-labstore.webp',
    Icon: PenTool,
  },
];

export default function Experience() {
  const { t } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animated, setAnimated] = useState([]);

  useEffect(() => {
    const timers = ITEMS.map((_, i) =>
      setTimeout(() => setAnimated((prev) => [...prev, i]), 180 * i)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section id="experiencia" className={styles.experience}>
      <div className="container">
        <div className={styles.header}>
          <SectionTag>{t('exp.tag')}</SectionTag>
          <h2 className={styles.title}>{t('exp.title')}</h2>
          <p className={styles.subtitle}>{t('exp.subtitle')}</p>
        </div>

        <div className={styles.selector}>
          {ITEMS.map(({ id, image, Icon }, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={id}
                className={`${styles.card} ${isActive ? styles.cardActive : ''} ${animated.includes(index) ? styles.cardVisible : ''}`}
                style={{ backgroundImage: `url('${image}')` }}
                onClick={() => setActiveIndex(index)}
                role="button"
                tabIndex={0}
                aria-label={t(`exp.${id}.company`)}
                onKeyDown={(e) => e.key === 'Enter' && setActiveIndex(index)}
              >
                <div className={`${styles.shadow} ${isActive ? styles.shadowActive : ''}`} aria-hidden="true" />

                <div className={`${styles.body} ${isActive ? styles.bodyActive : ''}`}>
                  <p className={styles.bodyText}>{t(`exp.${id}.body`)}</p>
                </div>

                <div className={styles.label}>
                  <div className={styles.iconWrap} aria-hidden="true">
                    <Icon size={22} color="#ffffff" />
                  </div>
                  <div className={`${styles.info} ${isActive ? styles.infoActive : ''}`}>
                    <span className={styles.company}>{t(`exp.${id}.company`)}</span>
                    <span className={styles.role}>{t(`exp.${id}.role`)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
