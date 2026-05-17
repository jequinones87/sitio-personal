import { useEffect, useRef, useState } from 'react';
import {
  Plus,
  User,
  Sparkles,
  Briefcase,
  Heart,
  Mail,
  Languages,
  Download,
} from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { useSectionTone } from '../../hooks/useSectionTone';
import styles from './FloatingMenu.module.css';

const NAV_LINKS = [
  { id: 'sobre-mi', key: 'nav.about', Icon: User },
  { id: 'competencias', key: 'nav.skills', Icon: Sparkles },
  { id: 'experiencia', key: 'nav.experience', Icon: Briefcase },
  { id: 'intereses', key: 'nav.interests', Icon: Heart },
  { id: 'contacto', key: 'nav.contact', Icon: Mail },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function FloatingMenu() {
  const { t, lang, toggleLang } = useLang();
  const [open, setOpen] = useState(false);
  const sectionTone = useSectionTone('teal');
  // El FAB solo distingue light vs dark/teal: en teal y en dark el FAB es coral.
  const tone = sectionTone === 'light' ? 'light' : 'dark';
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onEscape = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, [open]);

  const handleNav = (id) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), 50);
  };

  const handleLang = () => {
    toggleLang();
  };

  const toneClass = tone === 'light' ? styles.toneLight : styles.toneDark;

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${open ? styles.open : ''} ${toneClass}`}
      data-tone={tone}
    >
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? t('nav.close') : t('nav.menu')}
        aria-expanded={open}
        aria-controls="floating-menu-list"
      >
        <Plus size={26} className={styles.toggleIcon} aria-hidden="true" />
      </button>

      <div
        id="floating-menu-list"
        className={styles.list}
        role="menu"
        aria-hidden={!open}
      >
        {NAV_LINKS.map(({ id, key, Icon }) => (
          <button
            key={id}
            type="button"
            role="menuitem"
            className={styles.item}
            onClick={() => handleNav(id)}
            tabIndex={open ? 0 : -1}
          >
            <Icon size={16} className={styles.itemIcon} aria-hidden="true" />
            {t(key)}
          </button>
        ))}

        <div className={styles.divider} aria-hidden="true" />

        <button
          type="button"
          role="menuitem"
          className={`${styles.item} ${styles.lang}`}
          onClick={handleLang}
          tabIndex={open ? 0 : -1}
          aria-label={`Switch language to ${lang === 'es' ? 'English' : 'Spanish'}`}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <Languages size={16} className={styles.itemIcon} aria-hidden="true" />
            {lang === 'es' ? 'Idioma' : 'Language'}
          </span>
          <span className={styles.langPill}>{lang === 'es' ? 'EN' : 'ES'}</span>
        </button>

        <a
          role="menuitem"
          className={`${styles.item} ${styles.cv}`}
          href={lang === 'es'
            ? 'https://drive.google.com/file/d/1_c1q0uH4AI93AdYNHmIGvlImMr2sUUky/view?usp=sharing'
            : 'https://drive.google.com/file/d/1V6_DgFMmVI5YGS1I_ZRq1qZKHjkV7kQK/view?usp=sharing'
          }
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        >
          <Download size={16} className={styles.itemIcon} aria-hidden="true" />
          {t('nav.cv')}
        </a>
      </div>
    </div>
  );
}
