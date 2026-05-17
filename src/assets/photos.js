// Detecta qué fotos están presentes en src/assets/. Si no existen, devuelve null
// y el componente fallback (`ImagePlaceholder`) se muestra en su lugar.
// Para activar una foto, basta con dejar el archivo con cualquiera de los nombres
// listados abajo (jpg, jpeg, png o webp).

const modules = import.meta.glob(
  ['./foto-hero.{jpg,jpeg,png,webp}', './foto-wawi.{jpg,jpeg,png,webp}', './foto-deporte.{jpg,jpeg,png,webp}', './foto-dei.{jpg,jpeg,png,webp}'],
  { eager: true, import: 'default' }
);

function pick(prefix) {
  const entry = Object.entries(modules).find(([path]) => path.includes(`/${prefix}.`));
  return entry ? entry[1] : null;
}

export const photos = {
  hero: pick('foto-hero'),
  wawi: pick('foto-wawi'),
  deporte: pick('foto-deporte'),
  dei: pick('foto-dei'),
};
