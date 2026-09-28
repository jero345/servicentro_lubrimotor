import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { initTracking } from './lib/tracking.ts';
import { readCampaignRef } from './lib/whatsapp.ts';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// En producción el HTML viene prerenderizado (scripts/prerender.mjs) → se hidrata.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);

readCampaignRef(); // guarda los UTM de la visita en la sesión
initTracking();
