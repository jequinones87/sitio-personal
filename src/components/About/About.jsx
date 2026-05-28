import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { useLang } from '../../context/LangContext';
import { useScrollFade } from '../../hooks/useScrollFade';
import SectionTag from '../shared/SectionTag';
import styles from './About.module.css';

export default function About() {
  const { t } = useLang();
  const { ref, style } = useScrollFade();

  const pillars = [
    { id: 'p1', index: '01', title: t('about.pillar1.title'), body: t('about.pillar1.body') },
    { id: 'p2', index: '02', title: t('about.pillar2.title'), body: t('about.pillar2.body') },
    { id: 'p3', index: '03', title: t('about.pillar3.title'), body: t('about.pillar3.body') },
  ];

  return (
    <section id="sobre-mi" className={styles.about}>
      <div className="container" ref={ref} style={style}>
        <div className={styles.grid}>
          <div className={styles.intro}>
            <SectionTag>{t('about.tag')}</SectionTag>
            <h2 className={styles.title}>{t('about.title')}</h2>
            {t('about.body').split('\n\n').map((para, i) => (
              <p key={i} className={styles.body}>{para}</p>
            ))}
          </div>

          <AccordionPrimitive.Root
            type="single"
            collapsible
            className={styles.accordion}
          >
            {pillars.map((p) => (
              <AccordionPrimitive.Item
                key={p.id}
                value={p.id}
                className={styles.item}
              >
                <AccordionPrimitive.Header className={styles.header}>
                  <AccordionPrimitive.Trigger className={styles.trigger}>
                    <span className={styles.triggerIndex}>{p.index}</span>
                    <span className={styles.triggerTitle}>{p.title}</span>
                    <span className={styles.triggerIcon} aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <line x1="9" y1="2" x2="9" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={styles.iconV}/>
                        <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className={styles.content}>
                  <p className={styles.contentBody}>{p.body}</p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </div>
    </section>
  );
}
