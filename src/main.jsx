import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
import './theme.css';
import { LangProvider } from './context/LangContext';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
);
