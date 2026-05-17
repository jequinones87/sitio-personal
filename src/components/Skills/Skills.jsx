import { useLang } from '../../context/LangContext';
import { useScrollFade } from '../../hooks/useScrollFade';
import SectionTag from '../shared/SectionTag';
import CircularSkills from './CircularSkills';
import styles from './Skills.module.css';

const SKILLS_DATA = [
  { id: 's1', src: '/images/competencias/marketing.jpg?v=2' },
  { id: 's2', src: '/images/competencias/seo.jpg?v=2' },
  { id: 's3', src: '/images/competencias/cro_2.jpg' },
  { id: 's4', src: '/images/competencias/ads.jpg?v=2' },
  { id: 's5', src: '/images/competencias/analytics.jpg?v=2' },
  { id: 's6', src: '/images/competencias/trade.jpg?v=2' },
  { id: 's7', src: '/images/competencias/social_media.jpg?v=2' },
  { id: 's8', src: '/images/competencias/ecommerce.jpg?v=2' },
];

export default function Skills() {
  const { t } = useLang();
  const { ref, style } = useScrollFade();

  const skills = SKILLS_DATA.map((s) => ({
    ...s,
    name: t(`skills.${s.id}.name`),
    designation: t(`skills.${s.id}.designation`),
    quote: t(`skills.${s.id}.quote`),
  }));

  return (
    <section id="competencias" className={styles.skills}>
      <video
        className={styles.bgVideo}
        src="/bckg.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className={styles.bgFade} aria-hidden="true" />
      <div className={`container ${styles.inner}`} ref={ref} style={style}>
        <div className={styles.header}>
          <SectionTag>{t('skills.tag')}</SectionTag>
          <h2 className={styles.title}>{t('skills.title')}</h2>
        </div>
        <CircularSkills skills={skills} autoplay={true} />
      </div>
    </section>
  );
}
