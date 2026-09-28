import { CreditCard, MapPin, Navigation, Route, Store } from 'lucide-react';
import type { ReactNode } from 'react';
import { site } from '../data/site.ts';
import { useOpenStatus } from '../lib/hooks.ts';
import { formatTime } from '../lib/hours.ts';
import { openWhatsApp } from '../lib/whatsapp.ts';
import { WhatsAppIcon } from './brand/BrandIcons.tsx';
import { Button, ButtonLink } from './ui/Button.tsx';
import { OpenStatusBadge } from './ui/OpenStatusBadge.tsx';
import { Photo } from './ui/Photo.tsx';
import { SectionHeading } from './ui/SectionHeading.tsx';

export function Location() {
  const status = useOpenStatus();
  const { address, hours } = site;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address.mapsEmbedQuery)}&output=embed`;

  return (
    <section id="ubicacion" aria-labelledby="ubicacion-title" className="bg-ink-900 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="ubicacion-title" tone="dark" eyebrow="Ubicación y horarios" title="Ven sin cita" lead="Atendemos por orden de llegada. En 25–30 minutos sales listo." />

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="flex gap-3">
              <MapPin className="mt-1 size-6 shrink-0 text-brand-red" aria-hidden="true" />
              <address className="not-italic">
                <p className="text-xl font-semibold">{address.full}</p>
                <p className="mt-1 text-white/70">{address.reference}</p>
              </address>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={address.mapsUrl} target="_blank" rel="noopener noreferrer" icon={<Navigation className="size-5" aria-hidden="true" />}>
                Cómo llegar
              </ButtonLink>
              <Button variant="outline-light" icon={<WhatsAppIcon className="size-5" />} onClick={() => openWhatsApp({ source: 'location' })}>
                WhatsApp
              </Button>
            </div>

            <div className="mt-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-xl font-bold uppercase">Horario</h3>
                <OpenStatusBadge />
              </div>
              <table className="mt-4 w-full text-left">
                <caption className="sr-only">Horario de atención (hora de Colombia)</caption>
                <tbody>
                  {hours.map((h) => {
                    const isToday = status !== null && h.days.includes(status.today);
                    return (
                      <tr key={h.label} className={isToday ? 'bg-white/[0.07]' : ''} aria-current={isToday ? 'date' : undefined}>
                        <th
                          scope="row"
                          className={`rounded-l-xl border-l-3 py-3.5 pl-4 font-medium ${isToday ? 'border-brand-red' : 'border-transparent'}`}
                        >
                          {h.label}
                          {isToday && (
                            <span className="tag-mono ml-2 rounded bg-white/10 px-1.5 py-0.5 text-[0.65rem] text-white">Hoy</span>
                          )}
                        </th>
                        <td className="rounded-r-xl py-3.5 pr-4 text-right font-mono text-[0.95rem] text-white/85 tabular-nums">
                          {formatTime(h.open)} – {formatTime(h.close)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <ul className="mt-8 space-y-4 border-t border-white/10 pt-8">
              <InfoRow icon={<CreditCard className="size-5" />} title="Medios de pago" text={site.payments.join(' · ')} />
              <InfoRow icon={<Route className="size-5" />} title="Cobertura" text={site.coverage} />
              {!site.homeService && (
                <InfoRow icon={<Store className="size-5" />} title="No contamos con servicio a domicilio" text="El servicio se presta en nuestro servicentro." />
              )}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            {/* Foto de la fachada para reconocer el lugar al llegar */}
            <figure className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-ink-700 ring-1 ring-white/10">
              <Photo photo={site.photos.ubicacion} sizes="(min-width: 1280px) 590px, (min-width: 1024px) 46vw, 100vw" className="size-full" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-black/85 to-transparent px-5 pt-10 pb-4">
                <span className="tag-mono text-[0.7rem] text-white">Así nos encuentras</span>
              </figcaption>
            </figure>
            <div className="min-h-[300px] flex-1 overflow-hidden rounded-3xl bg-ink-700 ring-1 ring-white/10">
              <iframe
                title={`Mapa: ${site.name}, ${address.full}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block size-full min-h-[300px] border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 text-brand-red" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-white/70">{text}</p>
      </div>
    </li>
  );
}
