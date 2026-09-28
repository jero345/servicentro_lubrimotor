import { motion } from 'motion/react';
import { forwardRef } from 'react';
import { site } from '../data/site.ts';
import { useMotionPresets } from '../motion/presets.ts';
import { WhatsAppIcon } from './brand/BrandIcons.tsx';
import { Button } from './ui/Button.tsx';

/**
 * Bloque "Otra marca". Los campos (Marca + los 4 del vehículo) viven en <VehicleFields isOther />
 * para compartir el mismo estado con el resto del cotizador.
 */
export const OtherBrandForm = forwardRef<HTMLElement, { instant: boolean; onQuote: () => void }>(
  function OtherBrandForm({ instant, onQuote }, ref) {
    const { swap } = useMotionPresets();
    const { otherBrand, viscosities } = site;

    return (
      <motion.article
        ref={ref}
        {...swap(instant)}
        aria-label={otherBrand.label}
        className="relative isolate overflow-hidden rounded-3xl bg-brand-black p-5 text-white sm:p-8"
      >
        <svg aria-hidden="true" viewBox="0 0 200 200" className="pointer-events-none absolute -top-20 -right-20 -z-10 size-64">
          <ellipse cx="100" cy="100" rx="96" ry="58" fill="none" className="stroke-brand-red" strokeOpacity="0.35" transform="rotate(-18 100 100)" />
        </svg>

        <h3 className="font-display text-2xl leading-tight font-extrabold uppercase sm:text-[1.75rem]">{otherBrand.title}</h3>
        <p className="mt-4 text-lg">
          {otherBrand.leadIntro} <strong className="font-bold text-brand-red">{otherBrand.leadStrong}</strong>
        </p>
        <p className="mt-3 leading-relaxed text-white/75">{otherBrand.body}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Algunas viscosidades que manejamos">
          {viscosities.map((v) => (
            <li key={v} className="tag-mono rounded-md bg-white/8 px-2.5 py-1 text-[0.7rem] tracking-[0.12em] text-white/85">
              {v}
            </li>
          ))}
          <li className="tag-mono rounded-md px-2.5 py-1 text-[0.7rem] tracking-[0.12em] text-white/60">+ otras</li>
        </ul>

        <Button className="mt-7 w-full" size="lg" icon={<WhatsAppIcon className="size-5" />} onClick={onQuote}>
          Cotizar por WhatsApp
        </Button>
      </motion.article>
    );
  },
);
