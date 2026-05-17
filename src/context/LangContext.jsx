import { createContext, useContext, useEffect, useState } from 'react';
import { es } from '../i18n/es';
import { en } from '../i18n/en';

const LangContext = createContext(null);
const dictionaries = { es, en };

export function LangProvider({ children }) {
  const [lang, setLang] = useState('es');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key) => dictionaries[lang]?.[key] ?? key;
  const toggleLang = () => setLang((prev) => (prev === 'es' ? 'en' : 'es'));

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
