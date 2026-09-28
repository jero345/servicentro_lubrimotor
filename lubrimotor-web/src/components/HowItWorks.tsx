import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { site } from '../data/site.ts';
import { openWhatsApp } from '../lib/whatsapp.ts';
import { IN_VIEW, useMotionPresets } from '../motion/presets.ts';
import { WhatsAppIcon } from './brand/BrandIcons.tsx';
import { Button, ButtonLink } from './ui/Button.tsx';
import { SectionHeading } from './ui/SectionHeading.tsx';

export function HowItWorks() {
  const { stagger, fadeUpItem } = useMotionPresets();

  return (
    <section aria-labelledby="como-title" className="relative overflow-hidden bg-brand-black py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="como-title" tone="dark" eyebrow="Cómo funciona" title="Tres pasos y sales listo" />

        <motion.ol
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          className="mt-10 grid gap-4 md:grid-cols-3"
        >
          {site.steps.map((step, i) => (
            <motion.li key={step.title} variants={fadeUpItem} className="relative rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-7">
              <span className="font-display block text-5xl leading-none font-extrabold text-brand-red" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display mt-5 text-xl font-bold uppercase">
                <span className="sr-only">Paso {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-white/70">{step.text}</p>
            </motion.li>
          ))}
        </motion.ol>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#cotizar" icon={<ArrowUp className="size-5" aria-hidden="true" />}>
            Ver precios por marca
          </ButtonLink>
          <Button variant="outline-light" icon={<WhatsAppIcon className="size-5" />} onClick={() => openWhatsApp({ source: 'how_it_works' })}>
            Escribir por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
