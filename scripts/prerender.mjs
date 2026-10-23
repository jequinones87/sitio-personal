// Inserta el HTML pre-renderizado de la Home en dist/index.html.
// Se ejecuta después de `vite build` (cliente) y `vite build --ssr`.
// Si algo falla, el proceso termina con error y Vercel no publica el build.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const htmlPath = `${root}dist/index.html`;
const { render } = await import(pathToFileURL(`${root}dist-ssr/entry-server.js`).href);

const appHtml = render();
const html = await readFile(htmlPath, 'utf8');
const placeholder = '<div id="root"></div>';

if (!html.includes(placeholder)) throw new Error('prerender: no se encontró <div id="root"></div> en dist/index.html');
if (appHtml.length < 2000) throw new Error(`prerender: HTML generado demasiado corto (${appHtml.length} caracteres)`);

await writeFile(htmlPath, html.replace(placeholder, `<div id="root">${appHtml}</div>`));
console.log(`prerender: Home pre-renderizada (${Math.round(appHtml.length / 1024)} KB de HTML)`);
