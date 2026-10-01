// URLs del CV por idioma: minisitios propios (cv/index.html y cv/en/index.html),
// con el PDF descargable en public/cv/. Compartidas por FloatingMenu, Hero y Experience.
export const CV_URLS = {
  es: '/cv/',
  en: '/cv/en/',
};

// Mismo evento GA4 en todas las ubicaciones (continuidad histórica);
// `location` identifica el origen del clic: 'hero' | 'menu' | 'experience'.
export function trackCvDownload(lang, location) {
  window.gtag?.('event', `cv_download_${lang}`, { location });
}
