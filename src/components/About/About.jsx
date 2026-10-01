import { useLang } from '../../context/LangContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SectionTag from '../shared/SectionTag';
import styles from './About.module.css';

// Dimensión humana del perfil. Integra el contenido útil de la antigua
// sección Intereses (components/Interests, ahora legacy): aprendizaje
// (int.p4) y las motivaciones personales (int.m1–m4) con sus fotos.
const MOMENTS = [
  { id: 'm4', photo: '/images/motiv-clearlens.webp' },
  { id: 'm2', photo: '/images/motiv-deporte.webp' },
  { id: 'm3', photo: '/images/motiv-proposito.webp' },
  { id: 'm1', photo: '/images/motiv-padre.webp' },
];

const CLEARLENS_URL = 'https://clearlens.app/';

function linkClearLens(text, className) {
  const parts = text.split('ClearLens');
  if (parts.length === 1) return text;
  return parts.flatMap((part, i) => (i === 0 ? [part] : [
    <a key={i} href={CLEARLENS_URL} target="_blank" rel="noopener noreferrer" className={className}>ClearLens</a>,
    part,
  ]));
}

export default function About() {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="sobre-mi" className={styles.about}>
      <div ref={ref} className={`container reveal ${isVisible ? 'visible' : ''}`}>
        <div className={styles.grid}>
          <div className={styles.intro}>
            <SectionTag>{t('about.tag')}</SectionTag>
            <h2 className={styles.title}>{t('about.title')}</h2>
            <p className={styles.lead}>{t('about.intro')}</p>
            <p className={styles.body}>{t('int.p4.body')}</p>
          </div>

          <div className={styles.moments}>
            {MOMENTS.map(({ id, photo }) => (
              <article key={id} className={styles.moment}>
                <div className={styles.imgWrap}>
                  <img
                    src={photo}
                    alt={t(`int.${id}.alt`)}
                    className={styles.img}
                    loading="lazy"
                  />
                </div>
                <h3 className={styles.momentTitle}>{t(`int.${id}.title`)}</h3>
                <p className={styles.momentText}>
                  {id === 'm4' ? linkClearLens(t('int.m4.body'), styles.link) : t(`int.${id}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
