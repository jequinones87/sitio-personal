import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './reset.css';
import './theme.css';
import { LangProvider } from './context/LangContext';
import App from './App.jsx';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
);

// En producción el HTML viene pre-renderizado (scripts/prerender.mjs) y se
// hidrata; en desarrollo #root llega vacío y se renderiza desde cero.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
