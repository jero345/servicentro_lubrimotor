import { motion } from 'motion/react';
import { site } from '../data/site.ts';
import { IN_VIEW, useMotionPresets } from '../motion/presets.ts';
import { ICONS } from './ui/icons.ts';
import { SectionHeading } from './ui/SectionHeading.tsx';

export function WhyUs() {
  const { stagger, fadeUpItem } = useMotionPresets();

  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="nosotros-title"
          eyebrow="Por qué elegirnos"
          title="Más que un cambio de aceite"
          lead="Te orientamos para identificar la lubricación y filtración acordes con las características de tu vehículo."
        />

        <motion.ul
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {site.whyUs.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.li key={item.title} variants={fadeUpItem} className="flex gap-4 border-t border-brand-black/10 pt-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-black text-white">
                  <Icon className="size-5.5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg leading-tight font-bold uppercase">{item.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-gray-600">{item.text}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
