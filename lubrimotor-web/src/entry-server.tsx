import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App.tsx';

/** Usado por scripts/prerender.mjs para generar el HTML estático (SEO + primer pintado rápido). */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
