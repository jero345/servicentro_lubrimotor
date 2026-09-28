import { Mail, MapPin } from 'lucide-react';
import { site } from '../data/site.ts';
import { openWhatsApp } from '../lib/whatsapp.ts';
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from './brand/BrandIcons.tsx';
import { Logo } from './brand/Logo.tsx';

export function Footer() {
  const { social } = site;
  const networks = [
    { name: 'Instagram', handle: social.instagram.handle, url: social.instagram.url, Icon: InstagramIcon },
    { name: 'TikTok', handle: social.tiktok.handle, url: social.tiktok.url, Icon: TikTokIcon },
    // Facebook solo aparece cuando se defina en site.ts
    ...(social.facebook ? [{ name: 'Facebook', handle: social.facebook.handle, url: social.facebook.url, Icon: FacebookIcon }] : []),
  ];

  return (
    <footer className="border-t border-white/10 bg-brand-black pt-14 pb-28 text-white md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-5">
          <Logo className="h-12 w-auto" title={`${site.name} — ${site.slogan}`} />
          <p className="mt-5 max-w-sm text-sm text-white/60">
            Cambio de aceite multimarca en Medellín desde {site.foundedYear}. {site.legalNotice.short}
          </p>
        </div>

        <div className="md:col-span-4">
          <h2 className="font-display text-base font-bold uppercase">Contacto</h2>
          <ul className="mt-4 space-y-3 text-[0.95rem] text-white/80">
            <li>
              <button
                type="button"
                onClick={() => openWhatsApp({ source: 'footer' })}
                className="inline-flex min-h-6 items-center gap-2.5 hover:text-white"
              >
                <WhatsAppIcon className="size-4.5 text-white/60" />
                WhatsApp {site.whatsapp.display}
              </button>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 break-all hover:text-white">
                <Mail className="size-4.5 shrink-0 text-white/60" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4.5 shrink-0 text-white/60" aria-hidden="true" />
              <span>
                {site.address.full}
                <br />
                <span className="text-white/60">{site.address.reference}</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-display text-base font-bold uppercase">Síguenos</h2>
          <ul className="mt-4 space-y-3">
            {networks.map(({ name, handle, url, Icon }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[0.95rem] text-white/80 hover:text-white"
                  aria-label={`${name} ${handle} (se abre en una pestaña nueva)`}
                >
                  <Icon className="size-4.5 text-white/60" />
                  {handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 px-4 pt-6 text-xs text-white/55 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.legalName} · {site.legalNotice.short}
        </p>
        <p>{site.credits.label}</p>
      </div>
    </footer>
  );
}
