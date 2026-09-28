import { motion } from 'motion/react';
import { RotateCcw, Search, ShieldCheck } from 'lucide-react';
import { site } from '../data/site.ts';
import { IN_VIEW, useMotionPresets } from '../motion/presets.ts';
import { AccordionItem } from './ui/Accordion.tsx';
import { SectionHeading } from './ui/SectionHeading.tsx';

const POINT_ICONS = [ShieldCheck, Search, RotateCcw];

export function Warranty() {
  const { stagger, fadeUpItem } = useMotionPresets();
  const { warranty } = site;

  return (
    <section aria-labelledby="garantia-title" className="bg-gray-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="garantia-title" eyebrow="Garantía y respaldo" title="Respaldamos nuestro trabajo" />

        <motion.ul
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          className="mt-10 grid gap-4 md:grid-cols-3"
        >
          {warranty.points.map((point, i) => {
            const Icon = POINT_ICONS[i % POINT_ICONS.length];
            return (
              <motion.li key={point} variants={fadeUpItem} className="rounded-2xl bg-white p-6 ring-1 ring-brand-black/5">
                <Icon className="size-7 text-brand-red-dark" aria-hidden="true" />
                <p className="mt-4 text-lg leading-snug font-semibold">{point}</p>
              </motion.li>
            );
          })}
        </motion.ul>

        <div className="mt-6 rounded-2xl bg-white px-5 ring-1 ring-brand-black/5 sm:px-6">
          <AccordionItem title="Ver condiciones completas">
            <p className="text-[0.95rem]">{warranty.full}</p>
          </AccordionItem>
        </div>
      </div>
    </section>
  );
}
