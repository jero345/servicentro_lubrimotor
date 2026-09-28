import { motion } from 'motion/react';
import { FileDown } from 'lucide-react';
import { useId, useState } from 'react';
import { site } from '../data/site.ts';
import { openWhatsApp, type BusinessFields } from '../lib/whatsapp.ts';
import { IN_VIEW, useMotionPresets } from '../motion/presets.ts';
import { WhatsAppIcon } from './brand/BrandIcons.tsx';
import { Button, ButtonLink } from './ui/Button.tsx';
import { ICONS } from './ui/icons.ts';
import { SectionHeading } from './ui/SectionHeading.tsx';

/**
 * Portafolio empresarial. Todo el contenido sale de site.business:
 * - el botón de PDF aparece solo si `pdf` tiene ruta;
 * - la franja de empresas cliente aparece solo si `clients` tiene elementos.
 */
export function BusinessPortfolio() {
  const { stagger, fadeUpItem, fadeUp } = useMotionPresets();
  const { business } = site;

  return (
    <section id="empresas" aria-labelledby="empresas-title" className="bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="lg:col-span-7">
          <SectionHeading id="empresas-title" eyebrow={business.eyebrow} title={business.title} lead={business.lead} />

          <motion.ul
            variants={stagger()}
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4"
          >
            {business.items.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <motion.li key={item.title} variants={fadeUpItem} className="flex gap-4 rounded-2xl border border-brand-black/10 p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-black text-white">
                    <Icon className="size-5.5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-base leading-tight font-bold uppercase">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{item.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={IN_VIEW} className="lg:col-span-5 lg:self-center">
          <BusinessForm />
        </motion.div>
      </div>

      {business.clients.length > 0 && <ClientsStrip clients={business.clients} />}
    </section>
  );
}

const input =
  'h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-base text-white placeholder:text-white/45 transition-colors duration-150 hover:border-white/30 focus:border-brand-red focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-red/30';

function BusinessForm() {
  const { form, pdf } = site.business;
  const [fields, setFields] = useState<BusinessFields>({});
  const companyId = useId();
  const fleetId = useId();

  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-brand-black p-6 text-white sm:p-8">
      <svg aria-hidden="true" viewBox="0 0 200 200" className="pointer-events-none absolute -top-24 -right-24 -z-10 size-80">
        <ellipse cx="100" cy="100" rx="96" ry="58" fill="none" className="stroke-brand-red" strokeOpacity="0.35" transform="rotate(-18 100 100)" />
      </svg>

      <h3 className="font-display text-2xl font-extrabold uppercase">{form.title}</h3>
      <p className="mt-2 leading-relaxed text-white/70">{form.text}</p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor={companyId} className="mb-1.5 block text-sm font-semibold">
            Empresa <span className="font-normal text-white/60">(opcional)</span>
          </label>
          <input
            id={companyId}
            className={input}
            value={fields.company ?? ''}
            onChange={(e) => setFields({ ...fields, company: e.target.value })}
            placeholder="Nombre de tu empresa"
            autoComplete="organization"
            maxLength={60}
          />
        </div>
        <div>
          <label htmlFor={fleetId} className="mb-1.5 block text-sm font-semibold">
            Número de vehículos <span className="font-normal text-white/60">(opcional)</span>
          </label>
          <input
            id={fleetId}
            className={input}
            value={fields.fleetSize ?? ''}
            onChange={(e) => setFields({ ...fields, fleetSize: e.target.value.replace(/\D/g, '').slice(0, 5) })}
            placeholder="Ej. 12"
            inputMode="numeric"
            autoComplete="off"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Button
          size="lg"
          className="w-full"
          icon={<WhatsAppIcon className="size-5" />}
          onClick={() => openWhatsApp({ source: 'business', business: fields })}
        >
          {form.cta}
        </Button>
        {pdf && (
          <ButtonLink
            href={pdf}
            download
            variant="outline-light"
            className="w-full"
            icon={<FileDown className="size-5" aria-hidden="true" />}
          >
            Descargar portafolio (PDF)
          </ButtonLink>
        )}
      </div>
    </div>
  );
}

function ClientsStrip({ clients }: { clients: { name: string; logo?: string }[] }) {
  return (
    <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="tag-mono text-center text-xs text-gray-600">Empresas que confían en nosotros</p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {clients.map((c) =>
          c.logo ? (
            <li key={c.name}>
              <img src={c.logo} alt={c.name} loading="lazy" decoding="async" className="h-10 w-auto opacity-70 grayscale" />
            </li>
          ) : (
            <li key={c.name} className="font-display text-lg font-bold text-brand-black/60 uppercase">
              {c.name}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
