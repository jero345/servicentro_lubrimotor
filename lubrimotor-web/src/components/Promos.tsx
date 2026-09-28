import { site } from '../data/site.ts';
import { FacebookIcon, InstagramIcon, TikTokIcon } from './brand/BrandIcons.tsx';
import { ButtonLink } from './ui/Button.tsx';

/** Banda corta. Sin promociones fijas: se comunican en redes. Texto negro sobre rojo (5.3:1, AA). */
export function Promos() {
  const { promos, social } = site;

  return (
    <section aria-labelledby="promos-title" className="on-red relative overflow-hidden bg-brand-red text-brand-black">
      <svg aria-hidden="true" viewBox="0 0 400 200" className="pointer-events-none absolute -top-10 -right-24 h-[140%] opacity-60" preserveAspectRatio="xMaxYMid meet">
        <ellipse cx="200" cy="100" rx="190" ry="80" fill="none" stroke="#020408" strokeOpacity="0.18" strokeWidth="1.5" transform="rotate(-14 200 100)" />
      </svg>
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="tag-mono text-xs">Promociones</p>
          <h2 id="promos-title" className="font-display mt-2 text-[1.9rem] leading-[1.05] font-extrabold uppercase sm:text-4xl">
            {promos.title}
          </h2>
          <p className="mt-2 text-lg font-medium">{promos.text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink variant="dark" href={social.instagram.url} target="_blank" rel="noopener noreferrer" icon={<InstagramIcon className="size-5" />}>
            Instagram
          </ButtonLink>
          <ButtonLink variant="dark" href={social.tiktok.url} target="_blank" rel="noopener noreferrer" icon={<TikTokIcon className="size-5" />}>
            TikTok
          </ButtonLink>
          {social.facebook && (
            <ButtonLink variant="dark" href={social.facebook.url} target="_blank" rel="noopener noreferrer" icon={<FacebookIcon className="size-5" />}>
              Facebook
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
