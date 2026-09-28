import { motion } from 'motion/react';
import { site } from '../data/site.ts';
import { IN_VIEW, useMotionPresets } from '../motion/presets.ts';
import { Photo } from './ui/Photo.tsx';
import { SectionHeading } from './ui/SectionHeading.tsx';

/*
 * Mosaico sin huecos (2 columnas en móvil, 3 en escritorio). Cada posición define su tamaño;
 * si se agregan más fotos en site.ts, el patrón se repite y `grid-flow-dense` rellena.
 */
const BIG = '(min-width: 1280px) 810px, (min-width: 1024px) 66vw, 100vw';
const SMALL = '(min-width: 1280px) 400px, (min-width: 1024px) 33vw, 50vw';

const TILES = [
  { span: 'col-span-2 row-span-2', sizes: BIG },
  { span: 'row-span-2', sizes: SMALL },
  { span: '', sizes: SMALL },
  { span: '', sizes: SMALL },
  { span: 'col-span-2 row-span-2 lg:col-span-1 lg:row-span-1', sizes: '(min-width: 1280px) 400px, (min-width: 1024px) 33vw, 100vw' },
];

export function Gallery() {
  const { stagger, fadeUpItem } = useMotionPresets();
  const { gallery } = site;

  return (
    <section aria-labelledby="galeria-title" className="bg-gray-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="galeria-title" eyebrow="Nuestro servicentro" title={gallery.title} lead={gallery.lead} />

        <motion.ul
          variants={stagger(0.04)}
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          className="mt-10 grid grid-flow-dense auto-rows-[8.5rem] grid-cols-2 gap-2 sm:auto-rows-[12rem] sm:gap-3 lg:auto-rows-[13rem] lg:grid-cols-3"
        >
          {gallery.photos.map((photo, i) => {
            const tile = TILES[i % TILES.length];
            return (
              <motion.li
                key={photo.file}
                variants={fadeUpItem}
                className={`group relative overflow-hidden rounded-2xl bg-ink-700 ${tile.span}`}
              >
                {/* Zoom sutil solo con mouse (en táctil el hover da falsos positivos) */}
                <Photo
                  photo={photo}
                  sizes={tile.sizes}
                  className="size-full transition-transform duration-300 ease-(--ease-out) [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
