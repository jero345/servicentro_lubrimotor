import { site } from '../data/site.ts';
import { openWhatsApp } from '../lib/whatsapp.ts';
import { WhatsAppIcon } from './brand/BrandIcons.tsx';
import { AccordionItem } from './ui/Accordion.tsx';
import { Button } from './ui/Button.tsx';
import { SectionHeading } from './ui/SectionHeading.tsx';

/** Las mismas preguntas alimentan el JSON-LD FAQPage (ver seo/head.ts). */
export function Faq() {
  return (
    <section id="preguntas" aria-labelledby="preguntas-title" className="bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <SectionHeading id="preguntas-title" eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" />
            <p className="mt-4 text-gray-600">¿No encuentras tu respuesta?</p>
            <Button variant="dark" size="sm" className="mt-3" icon={<WhatsAppIcon className="size-4" />} onClick={() => openWhatsApp({ source: 'faq' })}>
              Pregúntanos por WhatsApp
            </Button>
          </div>
        </div>

        <div className="divide-y divide-brand-black/10 border-y border-brand-black/10 lg:col-span-8">
          {site.faq.map((item) => (
            <AccordionItem key={item.q} title={item.q}>
              <p>{item.a}</p>
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
}
