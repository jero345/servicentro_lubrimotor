import { motion } from 'motion/react';
import { ArrowDown, Check } from 'lucide-react';
import { site, type Photo as PhotoData } from '../data/site.ts';
import { formatCOP } from '../lib/format.ts';
import { getLowestOffer } from '../lib/offers.ts';
import { openWhatsApp } from '../lib/whatsapp.ts';
import { DROP_SPRING, EASE_OUT, STAGGER, useMotionPresets } from '../motion/presets.ts';
import { WhatsAppIcon } from './brand/BrandIcons.tsx';
import { DROP, ORBIT_BLACK, ORBIT_RED } from './brand/logoPaths.ts';
import { Button, ButtonLink } from './ui/Button.tsx';
import { OpenStatusBadge } from './ui/OpenStatusBadge.tsx';
import { Photo } from './ui/Photo.tsx';

export function Hero() {
  const lowest = getLowestOffer();
  const subtitle = site.hero.subtitle.split(' · ');

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-brand-black pt-(--header-h) text-white"
    >
      <HeroBackdrop />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 pt-8 pb-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10 lg:px-8 lg:pt-14 lg:pb-24">
        <div>
          <OpenStatusBadge />

          <p className="tag-mono mt-6 text-[0.7rem] text-brand-red sm:text-xs">{site.hero.eyebrow}</p>

          {/* Único h1. El precio sale del menor valor en site.ts (no está escrito a mano). */}
          <h1
            id="hero-title"
            className="font-display mt-3 text-[2.55rem] leading-[0.95] font-extrabold uppercase sm:text-6xl lg:text-[4.6rem]"
          >
            Cambio de aceite en Medellín{' '}
            <span className="mt-5 block">
              <span className="tag-mono block text-sm font-medium text-white/70 sm:text-base">desde</span>
              <span className="mt-1 block text-[3.6rem] leading-none text-brand-red sm:text-[5.2rem] lg:text-[6rem]">
                {formatCOP(lowest.option.priceFrom)}
              </span>
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            {subtitle.map((part, i) => (
              <span key={part}>
                {i > 0 && (
                  <span className="px-1.5 text-brand-red" aria-hidden="true">
                    ·
                  </span>
                )}
                {i > 0 && <span className="sr-only">, </span>}
                {part}
              </span>
            ))}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="#cotizar" size="lg" icon={<ArrowDown className="size-5" aria-hidden="true" />}>
              Cotizar mi vehículo
            </ButtonLink>
            <Button
              variant="outline-light"
              size="lg"
              icon={<WhatsAppIcon className="size-5" />}
              onClick={() => openWhatsApp({ source: 'hero' })}
            >
              Escribir por WhatsApp
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Por qué confiar en nosotros">
            {site.hero.chips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/85"
              >
                <Check className="size-4 text-brand-red" aria-hidden="true" />
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

/* ───────────── Visual: foto real + sello del logo (gota que cae) + órbita ───────────── */

// Caja cuadrada centrada en las órbitas del logo (coordenadas del PDF)
const CX = 322.4;
const CY = 221.15;
const S = 300;
const VIEWBOX = `${CX - S / 2} ${CY - S / 2} ${S} ${S}`;

function HeroVisual() {
  const { reduce } = useMotionPresets();
  const { photo, photoLabel } = site.hero;

  // Entradas: scale(0.95) + opacidad, ease-out, escalonadas; la gota cae al final con spring.
  const enter = (delay: number) => ({
    initial: { opacity: 0, transform: reduce ? 'scale(1)' : 'scale(0.95)' },
    whileInView: { opacity: 1, transform: 'scale(1)' },
    viewport: { once: true },
    transition: { duration: 0.45, ease: EASE_OUT, delay },
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px]">
      {/* Resplandor */}
      <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-brand-red/25 blur-3xl" />

      {/* Órbita roja decorativa: rotación muy lenta y lineal, en CSS (fuera del hilo principal). Se detiene con reduced motion. */}
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute -inset-[8%] overflow-visible">
        <g className="orbit-spin" style={{ transformOrigin: '50px 50px' }}>
          <ellipse cx="50" cy="50" rx="49" ry="31" fill="none" className="stroke-brand-red" strokeOpacity="0.6" strokeWidth="0.35" transform="rotate(-18 50 50)" />
          <circle cx="96.6" cy="34.9" r="1.3" className="fill-brand-red" />
        </g>
        <ellipse cx="50" cy="50" rx="44" ry="26" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="0.3" transform="rotate(-18 50 50)" />
      </svg>

      {/* Foto real del servicentro */}
      <motion.figure
        {...enter(0)}
        className="absolute top-[4%] right-[4%] bottom-[4%] w-[66%] overflow-hidden rounded-[1.75rem] bg-ink-700 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.85)] ring-1 ring-white/15"
      >
        <Photo photo={photo} sizes="(min-width: 1024px) 330px, (min-width: 640px) 280px, 230px" className="size-full" />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-black/90 to-transparent px-4 pt-12 pb-4">
          <span className="tag-mono text-[0.6rem] leading-relaxed text-white sm:text-[0.66rem]">
            {photoLabel.split(' · ').map((part, i) => (
              <span key={part}>
                {i > 0 && ' · '}
                <span className="whitespace-nowrap">{part}</span>
              </span>
            ))}
          </span>
        </figcaption>
      </motion.figure>

      {/* Sello con la marca del logo: las órbitas entran y la gota cae con un rebote leve */}
      <div aria-hidden="true" className="absolute top-[10%] left-0 aspect-square w-[46%]">
        <motion.div
          {...enter(0.08)}
          className="absolute inset-0 rounded-full bg-brand-black/90 shadow-[0_20px_50px_-15px_rgb(0_0_0/0.9)] ring-1 ring-white/15 backdrop-blur-sm"
        />
        <motion.svg {...enter(0.12)} viewBox={VIEWBOX} className="absolute inset-[13%] size-[74%]">
          {ORBIT_RED.map((d) => (
            <path key={d} d={d} className="fill-brand-red" />
          ))}
          {ORBIT_BLACK.map((d) => (
            <path key={d} d={d} fill="#fff" />
          ))}
        </motion.svg>
        <motion.svg
          viewBox={VIEWBOX}
          className="absolute inset-[13%] size-[74%]"
          initial={{ opacity: 0, transform: reduce ? 'translateY(0%)' : 'translateY(-60%)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0%)' }}
          viewport={{ once: true }}
          transition={
            reduce
              ? { duration: 0.3 }
              : { transform: { ...DROP_SPRING, delay: STAGGER * 5 }, opacity: { duration: 0.15, delay: STAGGER * 5 } }
          }
        >
          <path d={DROP} fill="#fff" />
        </motion.svg>
      </div>
    </div>
  );
}

/** Fondo: foto de la fachada oscurecida con degradados (el texto siempre se lee) + órbitas sutiles. */
function HeroBackdrop() {
  const { mobile, desktop } = site.hero.background;
  const srcSet = (p: PhotoData) => p.widths.map((w) => `/fotos/${p.file}-${w}.webp ${w}w`).join(', ');

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-x-0 top-0 h-[40rem] lg:inset-0 lg:h-auto">
        {/* Móvil/tablet: recorte vertical centrado en el letrero · Escritorio: fachada completa */}
        <picture>
          <source media="(max-width: 1023px)" srcSet={srcSet(mobile)} sizes="100vw" width={mobile.width} height={mobile.height} />
          <img
            src={`/fotos/${desktop.file}-${desktop.widths[desktop.widths.length - 1]}.webp`}
            srcSet={srcSet(desktop)}
            sizes="100vw"
            width={desktop.width}
            height={desktop.height}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="size-full object-cover object-[50%_30%]"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/80 to-brand-black lg:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,var(--brand-black)_0%,rgb(2_4_8/0.9)_38%,rgb(2_4_8/0.6)_70%,rgb(2_4_8/0.5)_100%)] lg:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-48 bg-gradient-to-t from-brand-black to-transparent lg:block" />
      </div>

      <div className="absolute -right-40 -bottom-40 size-[36rem] rounded-full bg-brand-red/12 blur-3xl" />
      <svg className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 1440 800">
        <ellipse cx="900" cy="520" rx="980" ry="300" fill="none" stroke="white" strokeOpacity="0.05" transform="rotate(-10 900 520)" />
        <ellipse cx="900" cy="520" rx="820" ry="230" fill="none" className="stroke-brand-red" strokeOpacity="0.14" transform="rotate(-10 900 520)" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
}
