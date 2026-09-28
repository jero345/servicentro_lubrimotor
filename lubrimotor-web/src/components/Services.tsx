import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { site, type Service } from '../data/site.ts';
import { formatCOP } from '../lib/format.ts';
import { getLowestOffer } from '../lib/offers.ts';
import { openWhatsApp } from '../lib/whatsapp.ts';
import { IN_VIEW, TAP, TAP_TRANSITION, useMotionPresets } from '../motion/presets.ts';
import { WhatsAppIcon } from './brand/BrandIcons.tsx';
import { Button, ButtonLink } from './ui/Button.tsx';
import { ICONS } from './ui/icons.ts';
import { Photo } from './ui/Photo.tsx';
import { SectionHeading } from './ui/SectionHeading.tsx';

export function Services() {
  const { stagger, fadeUpItem } = useMotionPresets();
  const featured = site.services.find((s) => s.featured) ?? site.services[0];
  const rest = site.services.filter((s) => s !== featured);

  return (
    <section id="servicios" aria-labelledby="servicios-title" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="servicios-title"
          eyebrow="Servicios"
          title="Lubricación, filtración y mantenimiento"
          lead="Nuestro servicio principal es el cambio de aceite, acompañado de la revisión de niveles y de los elementos básicos de lubricación y filtración."
        />

        <motion.ul
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
        >
          <motion.li variants={fadeUpItem} className="sm:col-span-2 lg:row-span-2">
            <FeaturedCard service={featured} />
          </motion.li>
          {rest.map((service) => (
            <motion.li key={service.id} variants={fadeUpItem}>
              <ServiceCard service={service} />
            </motion.li>
          ))}
          <motion.li variants={fadeUpItem}>
            <div className="flex h-full flex-col rounded-2xl bg-brand-black p-5 text-white">
              <p className="font-display text-lg font-bold uppercase">¿Necesitas algo más?</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">Escríbenos y te orientamos según tu vehículo.</p>
              <Button
                variant="outline-light"
                size="sm"
                className="mt-auto self-start"
                icon={<WhatsAppIcon className="size-4" />}
                onClick={() => openWhatsApp({ source: 'service' })}
              >
                Escribir
              </Button>
            </div>
          </motion.li>
        </motion.ul>

        <div className="mt-10 rounded-2xl border border-brand-black/10 p-5 sm:p-6">
          <p className="font-display text-lg font-bold uppercase">También encuentras</p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Productos complementarios">
            {site.complementaryProducts.map((p) => (
              <li key={p} className="rounded-full bg-gray-100 px-3.5 py-1.5 text-sm font-medium">
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-gray-600">{site.complementaryNote}</p>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon];
  const lowest = getLowestOffer();
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border-2 border-brand-red bg-white sm:flex-row">
      {/* Foto real del servicio: arriba en móvil, a la derecha desde tablet */}
      <div className="relative aspect-[16/10] shrink-0 bg-ink-700 sm:order-2 sm:aspect-auto sm:w-[42%]">
        <Photo
          photo={site.photos.cambioAceite}
          sizes="(min-width: 1280px) 250px, (min-width: 640px) 42vw, 100vw"
          className="absolute inset-0 size-full"
        />
      </div>

      <div className="relative isolate flex flex-1 flex-col overflow-hidden p-6 sm:p-8">
        <svg aria-hidden="true" viewBox="0 0 200 200" className="pointer-events-none absolute -right-24 -bottom-24 -z-10 size-80">
          <ellipse cx="100" cy="100" rx="96" ry="58" fill="none" className="stroke-brand-red" strokeOpacity="0.18" strokeWidth="1" transform="rotate(-18 100 100)" />
        </svg>
        <div className="flex items-center gap-3">
          <span className="grid size-14 place-items-center rounded-2xl bg-brand-red text-white">
            <Icon className="size-7" aria-hidden="true" />
          </span>
          <p className="tag-mono text-xs text-brand-red-dark">Servicio principal</p>
        </div>
        <h3 className="font-display mt-6 text-3xl leading-[1.05] font-extrabold uppercase sm:text-[2rem]">{service.title}</h3>
        <p className="mt-3 max-w-md leading-relaxed text-gray-600">{service.description}</p>

        <div className="mt-6">
          <p className="tag-mono text-xs text-brand-red-dark">Desde</p>
          <p className="font-display text-5xl leading-none font-extrabold text-brand-red">{formatCOP(lowest.option.priceFrom)}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <Button icon={<WhatsAppIcon className="size-5" />} onClick={() => openWhatsApp({ source: 'service', service: service.title })}>
            Cotizar
          </Button>
          <ButtonLink href="#cotizar" variant="outline-dark">
            Ver precios por marca
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon];
  return (
    <article className="flex h-full gap-4 rounded-2xl border border-brand-black/10 bg-white p-4 transition-colors duration-200 hover:border-brand-black/25 sm:flex-col sm:gap-0 sm:p-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gray-100 text-brand-red-dark">
        <Icon className="size-5.5" aria-hidden="true" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-base leading-snug font-semibold sm:mt-4 sm:text-lg">{service.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-gray-600 sm:mt-1.5">{service.description}</p>
        <motion.button
          type="button"
          whileTap={TAP}
          transition={TAP_TRANSITION}
          onClick={() => openWhatsApp({ source: 'service', service: service.title })}
          className="group mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-2 font-semibold text-brand-red-dark sm:pt-4"
          aria-label={`Cotizar ${service.title} por WhatsApp`}
        >
          Cotizar
          <ArrowRight className="size-4 transition-transform duration-200 ease-(--ease-out) [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5" aria-hidden="true" />
        </motion.button>
      </div>
    </article>
  );
}
