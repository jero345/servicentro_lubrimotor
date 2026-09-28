/**
 * Meta Pixel + GA4. Solo se cargan si existen las variables de entorno
 * VITE_META_PIXEL_ID / VITE_GA4_ID (ver .env.example).
 */

type Fn = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fn & { callMethod?: Fn; queue?: unknown[]; loaded?: boolean; version?: string; push?: Fn };
    _fbq?: unknown;
    dataLayer?: unknown[];
    gtag?: Fn;
  }
}

// `import.meta.env` no existe fuera de Vite (p. ej. en las pruebas con Node).
const env: Record<string, string | undefined> =
  (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env ?? {};

const META_PIXEL_ID = env.VITE_META_PIXEL_ID?.trim() || undefined;
const GA4_ID = env.VITE_GA4_ID?.trim() || undefined;

function injectScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadMetaPixel(id: string) {
  if (window.fbq) return;
  // Snippet oficial de Meta, tipado. Las llamadas se encolan hasta que carga fbevents.js.
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  } as NonNullable<Window['fbq']>;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  injectScript('https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', id);
  fbq('track', 'PageView');
}

function loadGa4(id: string) {
  window.dataLayer = window.dataLayer || [];
  // gtag.js exige el objeto `arguments`, no un array.
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id);
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
}

let started = false;

/** Carga los píxeles cuando el navegador está libre, para no afectar el rendimiento. */
export function initTracking() {
  if (started || typeof window === 'undefined') return;
  started = true;
  if (!META_PIXEL_ID && !GA4_ID) return;

  const start = () => {
    if (META_PIXEL_ID) loadMetaPixel(META_PIXEL_ID);
    if (GA4_ID) loadGa4(GA4_ID);
  };
  const idle = () =>
    'requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 3000 }) : setTimeout(start, 1500);

  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
}

export interface LeadEvent {
  /** Dónde se hizo clic: 'quote', 'hero', 'service', 'floating'… */
  source: string;
  /** Marca de vehículo o servicio */
  contentName: string;
  /** Precio "desde" cuando aplica */
  value?: number;
}

/** Se dispara en CADA clic a WhatsApp (lo llama openWhatsApp). */
export function trackWhatsAppLead({ source, contentName, value }: LeadEvent) {
  if (typeof window === 'undefined') return;
  const withValue = typeof value === 'number' ? { value } : {};

  window.fbq?.('track', 'Contact', {
    content_name: contentName,
    content_category: 'cambio_aceite',
    ...withValue,
    currency: 'COP',
  });

  window.gtag?.('event', 'generate_lead', {
    currency: 'COP',
    ...withValue,
    content_name: contentName,
    lead_source: source,
    method: 'whatsapp',
  });
}
