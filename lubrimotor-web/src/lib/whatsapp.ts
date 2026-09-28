/**
 * ÚNICO lugar donde se arman mensajes y URLs de WhatsApp.
 * Ningún componente construye un link de wa.me por su cuenta: todos llaman a openWhatsApp().
 */
import { site, type OilOption, type VehicleBrand } from '../data/site.ts';
import { formatCOP } from './format.ts';
import { trackWhatsAppLead } from './tracking.ts';

export type WhatsAppSource =
  | 'header'
  | 'mobile_menu'
  | 'hero'
  | 'quote'
  | 'quote_other'
  | 'cam2'
  | 'business'
  | 'service'
  | 'how_it_works'
  | 'location'
  | 'faq'
  | 'floating'
  | 'mobile_bar'
  | 'footer';

export interface VehicleFields {
  /** Solo para "Otra marca" */
  brandName?: string;
  model?: string;
  year?: string;
  engine?: string;
  engineType?: string;
}

/** Portafolio empresarial */
export interface BusinessFields {
  company?: string;
  fleetSize?: string;
}

export interface WhatsAppRequest {
  source: WhatsAppSource;
  brand?: VehicleBrand;
  option?: OilOption;
  fields?: VehicleFields;
  /** Nombre del servicio (tarjetas de servicios) */
  service?: string;
  /** Datos del formulario empresarial */
  business?: BusinessFields;
}

/* ───────────── UTMs ───────────── */

const UTM_KEY = 'lm_utm';

/** Devuelve "utm_source/utm_campaign" (o solo uno) si llegaron en la URL. Se guarda en la sesión. */
export function readCampaignRef(search?: string): string | undefined {
  const fromUrl = (() => {
    const query = search ?? (typeof window !== 'undefined' ? window.location.search : '');
    const params = new URLSearchParams(query);
    const parts = [params.get('utm_source'), params.get('utm_campaign')]
      .map((v) => clean(v ?? '', 40))
      .filter(Boolean);
    return parts.length ? parts.join('/') : undefined;
  })();

  if (search !== undefined || typeof window === 'undefined') return fromUrl;

  try {
    if (fromUrl) {
      sessionStorage.setItem(UTM_KEY, fromUrl);
      return fromUrl;
    }
    return sessionStorage.getItem(UTM_KEY) ?? undefined;
  } catch {
    return fromUrl;
  }
}

/* ───────────── Mensaje ───────────── */

/** Quita saltos de línea y espacios repetidos; limita el largo de lo que escribe el usuario. */
function clean(value: string | undefined, max = 60): string {
  return (value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function vehicleLine(fields: VehicleFields = {}): string | undefined {
  const motor = [clean(fields.engine, 30), clean(fields.engineType, 20).toLowerCase()].filter(Boolean).join(' ');
  const parts = [
    clean(fields.model) && `Modelo: ${clean(fields.model)}`,
    clean(fields.year, 4) && `Año: ${clean(fields.year, 4)}`,
    motor && `Motor: ${motor}`,
  ].filter(Boolean);
  return parts.length ? parts.join(' · ') : undefined;
}

export function buildWhatsAppMessage(req: WhatsAppRequest, ref: string | undefined = readCampaignRef()): string {
  const { whatsapp } = site;
  let lines: (string | undefined)[];

  if (req.service) {
    lines = [`${whatsapp.servicePrefix} ${req.service}`];
  } else if (req.brand) {
    const option = req.option ?? req.brand.options[0];
    lines = [
      whatsapp.quoteGreeting,
      `Marca: ${req.brand.name} · Opción vista en la web: ${option.oil} ${option.viscosity}, filtro ${option.filter.toLowerCase()} (desde ${formatCOP(option.priceFrom)})`,
      vehicleLine(req.fields),
      whatsapp.quoteClosing,
    ];
  } else if (req.source === 'business') {
    const company = clean(req.business?.company, 60);
    const fleet = clean(req.business?.fleetSize, 6);
    const details = [company && `Empresa: ${company}`, fleet && `Vehículos: ${fleet}`].filter(Boolean).join(' · ');
    lines = [site.business.whatsappGreeting, details || undefined, site.business.whatsappClosing];
  } else if (req.source === 'quote_other') {
    const brandName = clean(req.fields?.brandName, 40);
    lines = [
      whatsapp.quoteGreeting,
      brandName ? `Marca: ${brandName}` : undefined,
      vehicleLine(req.fields),
      whatsapp.otherBrandClosing,
    ];
  } else {
    lines = [whatsapp.defaultMessage];
  }

  if (ref) lines.push(`(ref: ${ref})`);
  return lines.filter((l): l is string => Boolean(l && l.trim())).join('\n');
}

export function buildWhatsAppUrl(req: WhatsAppRequest, ref?: string): string {
  const text = buildWhatsAppMessage(req, ref ?? readCampaignRef());
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(text)}`;
}

/* ───────────── Acción ───────────── */

/** Arma el mensaje, dispara Pixel/GA4 y abre WhatsApp. */
export function openWhatsApp(req: WhatsAppRequest): void {
  const option = req.brand ? (req.option ?? req.brand.options[0]) : undefined;
  trackWhatsAppLead({
    source: req.source,
    contentName:
      req.service ??
      req.brand?.name ??
      (req.source === 'business'
        ? 'Portafolio empresarial'
        : req.source === 'quote_other'
          ? clean(req.fields?.brandName) || 'Otra marca'
          : 'General'),
    value: option?.priceFrom,
  });

  const url = buildWhatsAppUrl(req);
  const win = window.open(url, '_blank');
  if (win) win.opener = null;
  else window.location.href = url; // bloqueador de pop-ups / webviews de Instagram
}
