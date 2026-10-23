// Pre-renderizado de la Home en el build (scripts/prerender.mjs).
// Genera el HTML inicial en español (idioma por defecto) con el mismo árbol
// que monta main.jsx, para que el contenido esté en el HTML sin depender de
// JavaScript. En el navegador, main.jsx hidrata este HTML.
import { StrictMode, createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { LangProvider } from './context/LangContext';
import App from './App.jsx';

export function render() {
  return renderToString(
    createElement(StrictMode, null, createElement(LangProvider, null, createElement(App))),
  );
}
