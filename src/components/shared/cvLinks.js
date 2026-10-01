// URLs del CV por idioma. Compartidas por FloatingMenu y Hero.
export const CV_URLS = {
  es: 'https://drive.google.com/file/d/1_c1q0uH4AI93AdYNHmIGvlImMr2sUUky/view?usp=sharing',
  en: 'https://drive.google.com/file/d/1V6_DgFMmVI5YGS1I_ZRq1qZKHjkV7kQK/view?usp=sharing',
};

// Mismo evento GA4 en todas las ubicaciones (continuidad histórica);
// `location` identifica el origen del clic: 'hero' | 'menu' | 'experience'.
export function trackCvDownload(lang, location) {
  window.gtag?.('event', `cv_download_${lang}`, { location });
}
