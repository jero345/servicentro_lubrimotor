import { motion } from 'motion/react';
import { site } from '../data/site.ts';
import { openWhatsApp } from '../lib/whatsapp.ts';
import { IN_VIEW, useMotionPresets } from '../motion/presets.ts';
import { WhatsAppIcon } from './brand/BrandIcons.tsx';
import { Button } from './ui/Button.tsx';
import { Photo } from './ui/Photo.tsx';

/** Ruta del logo CAM2 si existe en /public al compilar (ver vite.config.ts); si no, sello tipográfico. */
const CAM2_LOGO = __CAM2_LOGO__;

export function Cam2Badge() {
  const { fadeUp } = useMotionPresets();
  const { cam2 } = site;

  return (
    <section aria-labelledby="cam2-title" className="bg-gray-100 py-14 sm:py-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={IN_VIEW}
        className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[auto_1fr] md:gap-12 lg:grid-cols-[auto_1fr_auto] lg:px-8"
      >
        <Seal />
        <div>
          <p className="tag-mono text-xs text-brand-red-dark">Respaldo de marca</p>
          <h2 id="cam2-title" className="font-display mt-3 text-[2rem] leading-[1.05] font-extrabold uppercase sm:text-5xl">
            {cam2.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">{cam2.text}</p>
          <Button
            variant="dark"
            className="mt-6"
            icon={<WhatsAppIcon className="size-5" />}
            onClick={() => openWhatsApp({ source: 'cam2', service: cam2.whatsappTopic })}
          >
            {cam2.cta}
          </Button>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-ink-700 md:col-span-2 lg:col-span-1 lg:aspect-[3/4] lg:w-64">
          <Photo photo={site.photos.cam2} sizes="(min-width: 1024px) 256px, 100vw" className="size-full" />
        </div>
      </motion.div>
    </section>
  );
}

function Seal() {
  const ring = 'DISTRIBUIDOR AUTORIZADO • DISTRIBUIDOR AUTORIZADO • ';
  return (
    <div className="relative mx-auto size-52 sm:size-60" role="img" aria-label="Sello: distribuidor autorizado CAM2">
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full" aria-hidden="true">
        <circle cx="100" cy="100" r="98" className="fill-brand-black" />
        <circle cx="100" cy="100" r="68" fill="none" className="stroke-brand-red" strokeWidth="1.5" />
        <defs>
          <path id="cam2-ring" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
        </defs>
        <text className="fill-white" style={{ fontFamily: 'var(--font-mono)', fontStyle: 'italic', fontSize: 11.2, letterSpacing: '0.22em' }}>
          <textPath href="#cam2-ring">{ring}</textPath>
        </text>
      </svg>
      <div className="absolute inset-[22%] grid place-items-center rounded-full bg-white">
        {CAM2_LOGO ? (
          <img src={CAM2_LOGO} alt="" width={160} height={160} loading="lazy" decoding="async" className="size-[78%] object-contain" />
        ) : (
          <span className="font-display text-[2.6rem] leading-none font-extrabold text-brand-black sm:text-5xl" aria-hidden="true">
            CAM<span className="text-brand-red">2</span>
          </span>
        )}
      </div>
    </div>
  );
}
