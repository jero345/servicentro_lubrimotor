# Servicentro Lubrimotor · Landing de cotización

Landing de una sola página cuyo objetivo es que el visitante elija la marca de su vehículo, vea un precio **DESDE** y pida su cotización de cambio de aceite por **WhatsApp** con el mensaje ya diligenciado.

React + Vite + TypeScript · Tailwind CSS v4 · Motion · lucide-react. Sin backend.

## Correr en local

```bash
npm install
npm run dev        # http://localhost:5173
```

Otros comandos:

```bash
npm test           # pruebas del mensaje de WhatsApp y del "Abierto ahora"
npm run build      # typecheck + build + prerender del HTML (dist/)
npm run preview    # sirve dist/ en http://localhost:4173
```

## Cambiar un precio

Todo el contenido está en **`src/data/site.ts`**. Busca la marca en `vehicleBrands` y cambia `priceFrom`
(número entero en pesos, sin puntos ni `$`):

```ts
{
  id: 'renault',
  name: 'Renault',
  options: [{ id: 'elf', oil: 'ELF', viscosity: '20W-50', filter: 'Original', priceFrom: 237000 }],
},
```

`priceFrom: 245000` se mostrará como `$245.000`. El precio "desde" del titular, del `<title>` y del
schema se recalcula solo (toma el menor). Guarda, haz commit y Vercel publica el cambio.

En el mismo archivo están horarios, textos, servicios, preguntas frecuentes, redes y el número de WhatsApp.

## Deploy en Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. En Vercel: **Add New → Project** e importa el repositorio.
3. Si el repositorio contiene la carpeta completa del cliente, en **Root Directory** elige `lubrimotor-web`.
4. Vercel detecta Vite y usa `vercel.json` (build `npm run build`, salida `dist`).
5. En **Settings → Environment Variables** agrega (opcional) `VITE_META_PIXEL_ID` y `VITE_GA4_ID`, y vuelve a desplegar.
6. Con el dominio definitivo, actualiza `siteUrl` en `src/data/site.ts` (canonical, Open Graph y sitemap).

Alternativa por consola: `npx vercel` (preview) y `npx vercel --prod` desde esta carpeta.

## Tracking (Meta Ads / GA4)

- Copia `.env.example` a `.env` y llena los IDs. Si están vacíos, no se carga ningún píxel.
- Cada clic a WhatsApp dispara `fbq('track', 'Contact', …)` y `gtag('event', 'generate_lead', …)`.
- Los UTM de la visita se agregan al final del mensaje: `(ref: instagram/promo_octubre)`.
- Todo pasa por `src/lib/whatsapp.ts → openWhatsApp()`. Ningún componente arma URLs de WhatsApp.
- **Anuncios por marca:** `?marca=renault` (o `volkswagen`, `ford`, `toyota`, `hyundai-kia`, `chevrolet`, `nissan`, `otra`) abre el cotizador con esa marca seleccionada.

## Fotos del servicentro

Están en `public/fotos/` en WebP, con varios anchos por foto (`fachada-esquina-640.webp`, `fachada-esquina-1280.webp`…).
Se registran en `src/data/site.ts` → `hero.background` y `hero.photo` (hero), `photos` (ubicación, historia, servicio destacado, CAM2) y `gallery.photos` (galería "Así trabajamos").

- **Fondo del hero:** `hero-movil-480/750.webp` (recorte vertical 3:4 centrado en el letrero) y `hero-960/1600.webp` (fachada completa). Van muy comprimidos porque se muestran oscurecidos; si los cambias, mantén el peso bajo (≈30–60 KB en móvil) para no afectar la velocidad.

- **Cambiar una foto:** reemplaza sus `.webp` manteniendo nombre y proporción (horizontal 4:3 → 640 y 1280 px; vertical 3:4 → 320, 480 y 960 px).
- **Agregar a la galería:** crea los `.webp` y añade una línea `landscape('nombre', 'descripción')` o `portrait(...)` en `gallery.photos`.
- `alt` describe la foto (accesibilidad y SEO); `focus` ajusta el encuadre cuando se recorta (ej. `'60% 40%'`).

## Logo CAM2

Pon el archivo en `public/cam2.webp` (o `.png` / `.svg`) y vuelve a compilar: el sello lo usa automáticamente.
Si no existe, se muestra el sello tipográfico "DISTRIBUIDOR AUTORIZADO CAM2".

## Portafolio empresarial (`site.business`)

- Textos, beneficios (`items`) y formulario de la sección `#empresas`. El formulario abre WhatsApp con empresa y número de vehículos.
- **PDF:** pon el archivo en `public/` (ej. `public/portafolio-lubrimotor.pdf`) y escribe `pdf: '/portafolio-lubrimotor.pdf'`. Aparece el botón "Descargar portafolio (PDF)".
- **Empresas cliente:** agrega `{ name: 'Empresa S.A.S.', logo: '/clientes/empresa.webp' }` en `clients` (solo con autorización). Aparece la franja "Empresas que confían en nosotros".

## Testimonios (`site.testimonials`)

- Hoy son **de ejemplo** (`demo: true`) y cada build muestra un aviso. Antes de publicar o pautar, reemplázalos por opiniones reales (con autorización del cliente) y cambia `demo` a `false`.
- A propósito no se agregan al schema de Google.

## Pendientes (TODO)

- **Testimonios reales** en `site.testimonials` (hoy son de ejemplo).
- **Portafolio empresarial:** condiciones/beneficios que defina el cliente, PDF y empresas cliente.
- `siteUrl` en `src/data/site.ts`: poner el dominio final.
- `address.geo` en `src/data/site.ts`: confirmar coordenadas exactas con el pin de Google Maps.
- `social.facebook`: está en `null` (el ícono no se muestra hasta definirlo).

## Estructura

```
src/
  data/site.ts          ← TODO el contenido y precios
  lib/whatsapp.ts       ← builder de mensaje + tracking + apertura
  lib/tracking.ts       ← Meta Pixel / GA4 (solo si hay IDs)
  lib/hours.ts          ← "Abierto ahora" con America/Bogota
  motion/presets.ts     ← curvas, duraciones y variants (única fuente de verdad)
  components/           ← una sección por archivo
seo/head.ts             ← <title>, metas, Open Graph, JSON-LD AutoRepair + FAQPage, sitemap, robots
scripts/prerender.mjs   ← genera el HTML estático (SEO + carga rápida)
```

El logo del sitio (header, hero, footer, favicon, OG) se construyó con los trazos del vectorial oficial `LUBRIMOTOR.pdf`.
