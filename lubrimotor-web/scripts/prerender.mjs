/**
 * Prerender: renderiza <App /> a HTML estático dentro de dist/index.html.
 * El navegador pinta el contenido sin esperar el JS (mejor LCP y SEO) y React luego hidrata.
 */
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ssrDir = path.join(root, 'dist-ssr');
const indexFile = path.join(root, 'dist', 'index.html');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const html = readFileSync(indexFile, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('No se encontró <div id="root"></div> en dist/index.html');

// CSS crítico en línea (≈9 KB gz): evita una petición que bloquea el primer pintado.
const inlined = html.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (_, href) => {
  const css = readFileSync(path.join(root, 'dist', href), 'utf8');
  return `<style>${css}</style>`;
});

writeFileSync(indexFile, inlined.replace('<div id="root"></div>', `<div id="root">${render()}</div>`));
rmSync(ssrDir, { recursive: true, force: true });

console.log('✓ Prerender listo: dist/index.html');
