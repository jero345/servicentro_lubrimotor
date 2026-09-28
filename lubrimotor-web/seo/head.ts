/**
 * SEO generado en build a partir de src/data/site.ts (una sola fuente de verdad):
 * <title>, meta description, Open Graph, JSON-LD AutoRepair + FAQPage, sitemap y robots.
 * Lo inyecta el plugin de vite.config.ts en el comentario <!--seo-head--> de index.html.
 */
import { site } from '../src/data/site.ts';
import { formatCOP } from '../src/lib/format.ts';
import { getLowestOffer } from '../src/lib/offers.ts';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const jsonLd = (data: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
const abs = (path: string) => new URL(path, site.siteUrl.replace(/\/?$/, '/')).href;

export function seoTexts() {
  const from = formatCOP(getLowestOffer().option.priceFrom);
  return {
    title: `Cambio de aceite en Medellín desde ${from} | ${site.name}`,
    description: `Cambio de aceite multimarca en Medellín, sin cita y listo en 25–30 min. Filtro original u homologado, cerca a la UdeA. Cotiza por WhatsApp desde ${from}.`,
    from,
  };
}

function businessSchema() {
  const { title, description, from } = seoTexts();
  const sameAs = [site.social.instagram.url, site.social.tiktok.url, site.social.facebook?.url].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': abs('#negocio'),
    name: site.name,
    legalName: site.legalName,
    slogan: site.slogan,
    alternateName: title,
    description,
    url: abs('/'),
    image: [abs('og-image.jpg'), ...[site.photos.ubicacion, site.photos.historia].map((p) => abs(`fotos/${p.file}-${p.width}.webp`))],
    logo: abs('logo.png'),
    telephone: `+57 ${site.whatsapp.display}`,
    email: site.email,
    foundingDate: String(site.foundedYear),
    priceRange: `Desde ${from} COP`,
    currenciesAccepted: 'COP',
    paymentAccepted: site.payments.join(', '),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.address.geo.lat, longitude: site.address.geo.lng },
    hasMap: site.address.mapsUrl,
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Valle de Aburrá' },
      { '@type': 'State', name: 'Antioquia' },
    ],
    openingHoursSpecification: site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => DAY_NAMES[d]),
      opens: h.open,
      closes: h.close,
    })),
    makesOffer: site.vehicleBrands.flatMap((brand) =>
      brand.options.map((o) => ({
        '@type': 'Offer',
        name: `Cambio de aceite ${brand.name} — ${o.oil} ${o.viscosity}, filtro ${o.filter.toLowerCase()}`,
        priceSpecification: { '@type': 'PriceSpecification', minPrice: o.priceFrom, priceCurrency: 'COP' },
        itemOffered: { '@type': 'Service', name: 'Cambio de aceite de motor' },
      })),
    ),
    sameAs,
  };
}

function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: site.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function heroPreloads(): string[] {
  const { mobile, desktop } = site.hero.background;
  const set = (p: { file: string; widths: number[] }) => p.widths.map((w) => `/fotos/${p.file}-${w}.webp ${w}w`).join(', ');
  return [
    `<link rel="preload" as="image" media="(max-width: 1023px)" imagesrcset="${set(mobile)}" imagesizes="100vw" fetchpriority="high" />`,
    `<link rel="preload" as="image" media="(min-width: 1024px)" imagesrcset="${set(desktop)}" imagesizes="100vw" fetchpriority="high" />`,
  ];
}

export function buildHead(): string {
  const { title, description } = seoTexts();
  const url = abs('/');
  const image = abs('og-image.jpg');
  return [
    ...heroPreloads(),
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="theme-color" content="#020408" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="es_CO" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(site.name)} — ${esc(site.slogan)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    jsonLd(businessSchema()),
    jsonLd(faqSchema()),
  ].join('\n    ');
}

export function buildSitemap(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${abs('/')}</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>
`;
}

export function buildRobots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${abs('sitemap.xml')}\n`;
}
