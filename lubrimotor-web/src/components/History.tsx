import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { site } from '../data/site.ts';
import { IN_VIEW, useMotionPresets } from '../motion/presets.ts';
import { Photo } from './ui/Photo.tsx';
import { SectionHeading } from './ui/SectionHeading.tsx';

export function History() {
  const { stagger, fadeUpItem, fadeUp } = useMotionPresets();
  const { history, foundedYear } = site;

  return (
    <section aria-labelledby="historia-title" className="relative isolate overflow-hidden bg-brand-black py-16 text-white sm:py-24">
      {/* Año gigante como textura (SVG decorativo, no es texto de lectura) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 560 200"
        className="font-display pointer-events-none absolute -right-6 -bottom-8 -z-10 w-[26rem] select-none sm:w-[44rem]"
      >
        <text x="560" y="180" textAnchor="end" fontSize="200" fontWeight="800" fill="white" fillOpacity="0.03">
          {foundedYear}
        </text>
      </svg>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <SectionHeading id="historia-title" tone="dark" eyebrow="Nuestra historia" title="Cerca de cuatro décadas en Medellín" />
          <motion.figure variants={fadeUp} initial="hidden" whileInView="show" viewport={IN_VIEW} className="mt-8">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-ink-700 ring-1 ring-white/10">
              <Photo photo={site.photos.historia} sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw" className="size-full" />
            </div>
            <figcaption className="tag-mono mt-3 text-[0.68rem] text-white/60">{site.name} · hoy</figcaption>
          </motion.figure>
        </div>

        <div className="lg:col-span-7">
          <motion.ol
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            className="relative space-y-10 border-l border-white/15 pl-8"
          >
            {history.items.map((item) => (
              <motion.li key={item.mark} variants={fadeUpItem} className="relative">
                <span aria-hidden="true" className="absolute top-2 -left-[calc(2rem+5.5px)] size-2.5 rounded-full bg-brand-red ring-4 ring-brand-black" />
                <p className="font-display text-2xl leading-none font-extrabold text-brand-red uppercase">{item.mark}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-white/70">{item.text}</p>
              </motion.li>
            ))}
          </motion.ol>

          <motion.blockquote variants={fadeUp} initial="hidden" whileInView="show" viewport={IN_VIEW} className="mt-12 flex gap-4">
            <Quote className="size-8 shrink-0 text-brand-red" aria-hidden="true" />
            <p className="text-xl leading-snug font-semibold sm:text-2xl">{history.closing}</p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
