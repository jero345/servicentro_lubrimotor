import { animate, motion, useInView } from 'motion/react';
import { Filter } from 'lucide-react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import type { OilOption, VehicleBrand } from '../data/site.ts';
import { formatCOP } from '../lib/format.ts';
import { EASE_OUT, useMotionPresets } from '../motion/presets.ts';
import { WhatsAppIcon } from './brand/BrandIcons.tsx';
import { DROP } from './brand/logoPaths.ts';
import { Button } from './ui/Button.tsx';

interface Props {
  brand: VehicleBrand;
  option: OilOption;
  onOptionChange: (optionId: string, fromKeyboard: boolean) => void;
  onQuote: () => void;
  /** El cambio vino del teclado → sin animación */
  instant: boolean;
  /** true solo la primera vez que aparece un precio en la página */
  countPrice: boolean;
  onPriceCounted: () => void;
}

/**
 * Tarjeta de oferta. Estructura:
 *   MARCA · Aceite + viscosidad · Filtro · DESDE · $precio · [COTIZAR POR WHATSAPP]
 */
export const OfferCard = forwardRef<HTMLElement, Props>(function OfferCard(
  { brand, option, onOptionChange, onQuote, instant, countPrice, onPriceCounted },
  ref,
) {
  const { swap } = useMotionPresets();

  return (
    <motion.article
      ref={ref}
      {...swap(instant)}
      aria-label={`Oferta ${brand.name}`}
      className="relative isolate overflow-hidden rounded-3xl bg-brand-black p-5 text-white shadow-[0_24px_60px_-24px_rgb(2_4_8/0.55)] sm:p-8"
    >
      <CardDecor />

      <h3 className="font-display text-[2rem] leading-none font-extrabold uppercase sm:text-4xl">{brand.name}</h3>

      {brand.options.length > 1 && (
        <OptionToggle brand={brand} selected={option.id} onChange={onOptionChange} instant={instant} />
      )}

      <p className="mt-4 text-xl font-semibold">
        {option.oil} <span className="font-mono font-medium text-white/90">{option.viscosity}</span>
      </p>
      <p className="mt-1.5 flex items-center gap-2 text-white/70">
        <Filter className="size-4 text-brand-red" aria-hidden="true" />
        Filtro {option.filter.toLowerCase()}
      </p>

      <div className="mt-7">
        <p className="tag-mono text-xs text-white/65">Desde</p>
        <p className="font-display mt-1 text-[3.25rem] leading-none font-extrabold text-brand-red sm:text-6xl">
          <PriceCounter value={option.priceFrom} count={countPrice} onDone={onPriceCounted} />
        </p>
      </div>

      <Button className="mt-7 w-full" size="lg" icon={<WhatsAppIcon className="size-5" />} onClick={onQuote}>
        Cotizar por WhatsApp
      </Button>
    </motion.article>
  );
});

/* ───────────── Toggle entre opciones (Chevrolet: ACDelco / Mobil) ───────────── */

function OptionToggle({
  brand,
  selected,
  onChange,
  instant,
}: {
  brand: VehicleBrand;
  selected: string;
  onChange: (id: string, fromKeyboard: boolean) => void;
  instant: boolean;
}) {
  const { slide } = useMotionPresets();
  const keyboard = useRef(false);

  return (
    <fieldset className="mt-5">
      <legend className="tag-mono mb-2 text-[0.68rem] text-white/60">Elige el aceite</legend>
      <div
        className="inline-flex rounded-xl bg-white/8 p-1 ring-1 ring-white/10"
        onKeyDown={() => (keyboard.current = true)}
        onPointerDown={() => (keyboard.current = false)}
      >
        {brand.options.map((opt) => {
          const active = opt.id === selected;
          return (
            <label
              key={opt.id}
              className={`relative cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-red ${
                active ? 'text-brand-black' : 'text-white/80 hover:text-white'
              }`}
            >
              <input
                type="radio"
                name={`opcion-${brand.id}`}
                value={opt.id}
                checked={active}
                onChange={() => onChange(opt.id, keyboard.current)}
                className="sr-only"
              />
              {active && (
                <motion.span
                  layoutId={`option-${brand.id}`}
                  transition={slide(instant || keyboard.current)}
                  className="absolute inset-0 rounded-lg bg-white"
                  aria-hidden="true"
                />
              )}
              <span className="relative">{opt.oil}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ───────────── Precio con conteo corto (solo la primera vez) ───────────── */

function PriceCounter({ value, count, onDone }: { value: number; count: boolean; onDone: () => void }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const { reduce } = useMotionPresets();
  const [display, setDisplay] = useState<number | null>(null);
  const controls = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    if (!count || reduce || !inView) return;
    controls.current = animate(Math.round(value * 0.72), value, {
      duration: 0.4,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(Math.round(v / 1000) * 1000),
      onComplete: () => {
        controls.current = null;
        setDisplay(null);
        onDone();
      },
    });
    return () => controls.current?.stop();
    // Solo al entrar en viewport por primera vez
  }, [inView]);

  // Si el precio cambia durante el conteo (p. ej. ACDelco → Mobil), se muestra el nuevo al instante.
  useEffect(() => {
    if (!controls.current) return;
    controls.current.stop();
    controls.current = null;
    setDisplay(null);
    onDone();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatCOP(display ?? value)}
    </span>
  );
}

function CardDecor() {
  return (
    <>
      <svg aria-hidden="true" viewBox="0 0 200 200" className="pointer-events-none absolute -right-20 -bottom-24 -z-10 size-72">
        <ellipse cx="100" cy="100" rx="96" ry="58" fill="none" className="stroke-brand-red" strokeOpacity="0.35" strokeWidth="1" transform="rotate(-18 100 100)" />
      </svg>
      <svg aria-hidden="true" viewBox="276 187 70 100" className="pointer-events-none absolute top-6 right-6 -z-10 h-24 w-auto fill-white/[0.06] sm:h-28">
        <path d={DROP} />
      </svg>
    </>
  );
}
