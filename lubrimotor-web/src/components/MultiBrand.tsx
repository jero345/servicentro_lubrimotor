import { site } from '../data/site.ts';
import { DROP } from './brand/logoPaths.ts';
import { SectionHeading } from './ui/SectionHeading.tsx';

export function MultiBrand() {
  const brands = site.lubricantBrands;

  return (
    <section aria-labelledby="multimarca-title" className="relative overflow-hidden bg-brand-black py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="multimarca-title" tone="dark" eyebrow="Multimarca" title="Trabajamos muchas marcas" lead={site.multiBrandText} />
      </div>

      {/* Marquee infinito (CSS, lineal). Se pausa con hover y se detiene con reduced motion. */}
      <div className="marquee mt-10 overflow-hidden border-y border-white/10 py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:py-8">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
              aria-label={copy === 0 ? 'Marcas de lubricante que manejamos' : undefined}
              className="marquee-copy flex shrink-0 items-center"
            >
              {brands.map((b) => (
                <li key={b} className="flex items-center">
                  <span className="font-display px-6 text-[2.5rem] leading-none font-extrabold whitespace-nowrap text-white/90 uppercase sm:px-9 sm:text-6xl">
                    {b}
                  </span>
                  <DropGlyph />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mt-4 text-sm text-white/60">…entre otras. Las marcas no están ligadas a una marca de vehículo: depende de la aplicación y la especificación.</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <p className="tag-mono text-xs text-brand-red">Viscosidades</p>
          <ul className="flex flex-wrap gap-2" aria-label="Viscosidades que manejamos">
            {site.viscosities.map((v) => (
              <li key={v} className="tag-mono rounded-lg border border-white/15 px-3.5 py-2 text-sm tracking-[0.12em] text-white">
                {v}
              </li>
            ))}
            <li className="tag-mono rounded-lg border border-dashed border-white/25 px-3.5 py-2 text-sm tracking-[0.12em] text-white/70">
              + otras
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function DropGlyph() {
  return (
    <svg viewBox="276 187 70 100" className="size-5 shrink-0 fill-brand-red sm:size-6" aria-hidden="true">
      <path d={DROP} />
    </svg>
  );
}
