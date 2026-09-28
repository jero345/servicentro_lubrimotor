import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import { buildHead, buildRobots, buildSitemap } from './seo/head.ts';

/** Inyecta <title>, metas y JSON-LD desde site.ts; genera sitemap.xml y robots.txt. */
function seo(): Plugin {
  return {
    name: 'lubrimotor-seo',
    transformIndexHtml: (html) => html.replace('<!--seo-head-->', buildHead()),
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap() });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobots() });
    },
  };
}

// Logo CAM2: si el cliente pone public/cam2.webp (o .png/.svg) se usa; si no, sello tipográfico.
const cam2 = ['cam2.webp', 'cam2.png', 'cam2.svg'].find((f) => existsSync(fileURLToPath(new URL(`./public/${f}`, import.meta.url))));

export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
  define: {
    __CAM2_LOGO__: JSON.stringify(cam2 ? `/${cam2}` : null),
  },
});
