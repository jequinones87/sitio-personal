import { useLang } from '../../context/LangContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SectionTag from '../shared/SectionTag';
import MetricValue from '../shared/MetricValue';
import styles from './Projects.module.css';

// Casos seleccionados. Textos en i18n (`projects.<id>.*`); cifras exactas aquí.
//
// variant: 'feature' (fila ancha) · 'standard' (columna) · 'compact' (caso secundario)
// image:   { src, altKey } — imagen ilustrativa del caso (WebP en public/images/).
//          null muestra un placeholder tipográfico con la paleta del sitio.
// href:    null mientras no exista la página del caso. Al definirla se muestra
//          el CTA "Ver caso" automáticamente.
const PROJECTS = [
  {
    id: 'idiem',
    variant: 'feature',
    hasMeta: true,
    result: '+250%',
    tags: ['B2B', 'Marketing Strategy', 'Demand Generation', 'Content', 'Digital'],
    image: { src: '/images/experience-idiem.webp', altKey: 'projects.idiem.imageAlt' },
    href: null,
  },
  {
    id: 'reebok',
    variant: 'standard',
    hasMeta: false,
    result: '+300%',
    tags: ['Omnichannel', 'E-commerce', 'Retail', 'Trade Marketing', 'Campaign'],
    image: { src: '/images/experience-adidas.webp', altKey: 'projects.reebok.imageAlt' },
    href: null,
  },
  {
    id: 'ripley',
    variant: 'standard',
    hasMeta: true,
    result: '+20%',
    tags: ['Digital Commerce', 'E-commerce', 'Content', 'Conversion'],
    image: { src: '/images/experience-reebok.webp', altKey: 'projects.ripley.imageAlt' },
    href: null,
  },
  {
    id: 'banos',
    variant: 'compact',
    hasMeta: true,
    result: '+30%',
    tags: ['Digital Strategy', 'Lead Generation', 'SEM', 'Social Ads'],
    image: null,
    href: null,
  },
];

function ProjectMedia({ project, index, t }) {
  if (project.image) {
    return (
      <div className={styles.media}>
        <img
          src={project.image.src}
          alt={t(project.image.altKey)}
          className={styles.mediaImg}
          loading="lazy"
        />
      </div>
    );
  }

  // Placeholder neutro: composición tipográfica con la paleta del sitio,
  // sin simular material del proyecto.
  return (
    <div className={`${styles.media} ${styles.mediaPlaceholder}`} aria-hidden="true">
      <span className={styles.posterIndex}>{index}</span>
      <span className={styles.posterCompany}>{t(`projects.${project.id}.company`)}</span>
    </div>
  );
}

function ProjectCard({ project, position, t }) {
  const { id, variant, hasMeta, result, tags, href } = project;
  const index = String(position + 1).padStart(2, '0');
  const titleId = `project-${id}-title`;

  return (
    <article className={`${styles.card} ${styles[variant]}`} aria-labelledby={titleId}>
      {variant !== 'compact' && <ProjectMedia project={project} index={index} t={t} />}

      <div className={styles.content}>
        <p className={styles.meta}>
          <span className={styles.index}>{index}</span>
          <span className={styles.company}>{t(`projects.${id}.company`)}</span>
          {hasMeta && <span className={styles.metaDetail}>{t(`projects.${id}.meta`)}</span>}
        </p>

        <h3 id={titleId} className={styles.cardTitle}>{t(`projects.${id}.title`)}</h3>

        <div className={styles.description}>
          {t(`projects.${id}.body`).split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className={styles.result}>
          <p className={styles.resultLabel}>{t('projects.resultLabel')}</p>
          <MetricValue value={result} className={styles.resultValue} />
          <p className={styles.resultText}>{t(`projects.${id}.result`)}</p>
        </div>

        <ul className={styles.tags} aria-label={t('projects.tagsLabel')}>
          {tags.map((tag) => (
            <li key={tag} className={styles.tag}>{tag}</li>
          ))}
        </ul>

        {href && (
          <a href={href} className={styles.cta}>
            {t('projects.cta')} <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="projects" className={styles.projects}>
      <div ref={ref} className={`container reveal ${isVisible ? 'visible' : ''}`}>
        <header className={styles.header}>
          <SectionTag>{t('projects.tag')}</SectionTag>
          <h2 className={styles.title}>{t('projects.title')}</h2>
          <p className={styles.body}>{t('projects.body')}</p>
        </header>

        <div className={styles.list}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} position={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
