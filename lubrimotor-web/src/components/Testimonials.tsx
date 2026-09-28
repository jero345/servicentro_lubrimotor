import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { site, type Testimonial } from '../data/site.ts';
import { IN_VIEW, useMotionPresets } from '../motion/presets.ts';
import { SectionHeading } from './ui/SectionHeading.tsx';

/**
 * Testimonios. Mientras `site.testimonials.demo` sea true son de ejemplo (ver TODO en site.ts):
 * por eso NO se agregan al schema de Google (reseñas inventadas ahí pueden traer penalizaciones).
 */
export function Testimonials() {
  const { stagger, fadeUpItem } = useMotionPresets();
  const { testimonials } = site;

  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="testimonios-title" eyebrow={testimonials.eyebrow} title={testimonials.title} />

        {/* Móvil: carrusel deslizable (con scroll-snap, sin auto-rotación). Escritorio: cuadrícula. */}
        <div
          role="region"
          aria-label="Testimonios de clientes (desliza para ver más)"
          tabIndex={0}
          className="no-scrollbar -mx-4 mt-10 overflow-x-auto px-4 pb-2 [scroll-padding-inline:1rem] md:mx-0 md:overflow-visible md:px-0"
        >
          <motion.ul
            variants={stagger()}
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            className="flex snap-x snap-mandatory gap-4 md:grid md:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.items.map((t) => (
              <motion.li key={t.name} variants={fadeUpItem} className="w-[85%] shrink-0 snap-start sm:w-[60%] md:w-auto">
                <TestimonialCard testimonial={t} />
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <p className="mt-3 text-sm text-gray-600 md:hidden" aria-hidden="true">
          Desliza para ver más →
        </p>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  const initials = t.name
    .split(' ')
    .filter((w) => /^[A-ZÁÉÍÓÚÑ]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  return (
    <figure className="relative flex h-full flex-col rounded-3xl border border-brand-black/10 bg-white p-6 sm:p-7">
      <span aria-hidden="true" className="font-display absolute top-3 right-6 text-7xl leading-none font-extrabold text-brand-red/15">
        “
      </span>
      <div className="flex gap-0.5" role="img" aria-label={`${t.rating} de 5 estrellas`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            aria-hidden="true"
            className={`size-4.5 ${i < t.rating ? 'fill-brand-red-dark text-brand-red-dark' : 'fill-transparent text-brand-black/20'}`}
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-[1.05rem] leading-relaxed text-brand-black">
        <p>“{t.text}”</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-black/10 pt-5">
        <span aria-hidden="true" className="font-display grid size-11 shrink-0 place-items-center rounded-full bg-brand-black text-sm font-bold text-white">
          {initials}
        </span>
        <span>
          <span className="block font-semibold">{t.name}</span>
          <span className="block text-sm text-gray-600">{t.vehicle}</span>
        </span>
      </figcaption>
    </figure>
  );
}
