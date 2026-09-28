import { AnimatePresence, motion } from 'motion/react';
import { Info, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site.ts';
import { findBrand, getLowestOffer } from '../lib/offers.ts';
import { openWhatsApp, type VehicleFields as Fields } from '../lib/whatsapp.ts';
import { useMotionPresets } from '../motion/presets.ts';
import { OfferCard } from './OfferCard.tsx';
import { OtherBrandForm } from './OtherBrandForm.tsx';
import { VehicleFields } from './VehicleFields.tsx';
import { SectionHeading } from './ui/SectionHeading.tsx';

const OTHER = 'otra';

export function QuoteSelector() {
  const defaultBrand = getLowestOffer().brand.id;
  const [selected, setSelected] = useState<string>(defaultBrand);
  const [optionByBrand, setOptionByBrand] = useState<Record<string, string>>({});
  const [fields, setFields] = useState<Fields>({});
  // Cambios hechos con teclado → sin animación (acción repetida, debe sentirse instantánea)
  const [instant, setInstant] = useState(false);
  const [priceCounted, setPriceCounted] = useState(false);
  const keyboard = useRef(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { slide } = useMotionPresets();

  // Anuncios por marca: ?marca=renault preselecciona la marca (útil en Meta Ads).
  // En móvil, deja la pill elegida a la vista dentro del scroll horizontal.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('marca')?.toLowerCase();
    const target = param === OTHER ? OTHER : (findBrand(param)?.id ?? defaultBrand);
    setSelected(target);

    const scroller = scrollerRef.current;
    const pill = scroller?.querySelector(`input[value="${target}"]`)?.parentElement;
    if (!scroller || !pill || scroller.scrollWidth <= scroller.clientWidth) return;
    const box = scroller.getBoundingClientRect();
    const rect = pill.getBoundingClientRect();
    scroller.scrollLeft += rect.left - box.left - (box.width - rect.width) / 2;
  }, [defaultBrand]);

  const isOther = selected === OTHER;
  const brand = findBrand(selected);
  const option = brand ? (brand.options.find((o) => o.id === optionByBrand[brand.id]) ?? brand.options[0]) : undefined;

  const select = (id: string) => {
    setInstant(keyboard.current);
    setSelected(id);
  };

  const quote = () => {
    if (brand && option) openWhatsApp({ source: 'quote', brand, option, fields });
    else openWhatsApp({ source: 'quote_other', fields });
  };

  const pills = [...site.vehicleBrands.map((b) => ({ id: b.id, label: b.name })), { id: OTHER, label: site.otherBrand.label }];

  return (
    <section id="cotizar" aria-labelledby="cotizar-title" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="cotizar-title"
          eyebrow="Cotizador"
          title="Elige la marca de tu vehículo"
          lead="Te mostramos el precio desde con la referencia más comercial para tu marca. El valor exacto te lo confirmamos por WhatsApp."
        />

        {/* Pills: radios nativos → flechas del teclado incluidas. Scroll horizontal en móvil. */}
        <fieldset className="mt-8 min-w-0">
          <legend className="sr-only">Marca de tu vehículo</legend>
          <motion.div
            ref={scrollerRef}
            layoutScroll
            className="no-scrollbar -mx-4 overflow-x-auto px-4 pb-1 [mask-image:linear-gradient(to_right,black_88%,transparent)] sm:mx-0 sm:overflow-visible sm:px-0 sm:[mask-image:none]"
            onKeyDown={() => (keyboard.current = true)}
            onPointerDown={() => (keyboard.current = false)}
          >
            <div className="flex w-max gap-2 pr-10 sm:grid sm:w-auto sm:grid-cols-4 sm:pr-0 lg:grid-cols-8">
              {pills.map((pill) => {
                const active = pill.id === selected;
                const other = pill.id === OTHER;
                return (
                  <label
                    key={pill.id}
                    className={`relative flex min-h-13 cursor-pointer items-center justify-center gap-1.5 rounded-xl px-5 text-center select-none has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-red ${
                      active
                        ? 'text-white'
                        : other
                          ? 'border-2 border-dashed border-brand-black/20 text-brand-black hover:border-brand-black/45'
                          : 'bg-gray-100 text-brand-black transition-colors duration-150 hover:bg-[#e8e9ec]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="marca"
                      value={pill.id}
                      checked={active}
                      onChange={() => select(pill.id)}
                      className="sr-only"
                    />
                    {active && (
                      <motion.span
                        layoutId="brand-pill"
                        transition={slide(instant)}
                        className="absolute inset-0 rounded-xl bg-brand-red-dark"
                        aria-hidden="true"
                      />
                    )}
                    {other && <Plus className="relative size-4" aria-hidden="true" />}
                    <span className="font-display relative text-[0.95rem] font-bold whitespace-nowrap uppercase">
                      {pill.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </motion.div>
        </fieldset>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-5" aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              {brand && option ? (
                <OfferCard
                  key={brand.id}
                  brand={brand}
                  option={option}
                  instant={instant}
                  onOptionChange={(id, fromKeyboard) => {
                    setInstant(fromKeyboard);
                    setOptionByBrand((prev) => ({ ...prev, [brand.id]: id }));
                  }}
                  onQuote={quote}
                  countPrice={!priceCounted}
                  onPriceCounted={() => setPriceCounted(true)}
                />
              ) : (
                <OtherBrandForm key={OTHER} instant={instant} onQuote={quote} />
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-7">
            <VehicleFields value={fields} onChange={setFields} isOther={isOther} onQuote={quote} />
          </div>
        </div>

        <LegalNotice />
      </div>
    </section>
  );
}

/** Aviso legal: SIEMPRE visible justo debajo del cotizador. */
function LegalNotice() {
  const { legalNotice } = site;
  return (
    <aside
      aria-label="Condiciones de los precios"
      className="mt-6 flex gap-3 rounded-2xl border border-brand-black/10 bg-gray-100 p-4 text-sm leading-relaxed text-gray-600 sm:p-5"
    >
      <Info className="mt-0.5 size-5 shrink-0 text-brand-red-dark" aria-hidden="true" />
      <p>
        <strong className="font-semibold text-brand-black">{legalNotice.short}</strong> {legalNotice.body}{' '}
        <strong className="font-semibold text-brand-black">{legalNotice.closing}</strong>
      </p>
    </aside>
  );
}
