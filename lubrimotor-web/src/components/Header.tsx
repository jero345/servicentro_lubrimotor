import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site.ts';
import { useScrolledPast } from '../lib/hooks.ts';
import { openWhatsApp } from '../lib/whatsapp.ts';
import { DURATION, EASE_OUT, TAP, TAP_TRANSITION, useMotionPresets } from '../motion/presets.ts';
import { WhatsAppIcon } from './brand/BrandIcons.tsx';
import { Logo } from './brand/Logo.tsx';
import { Button } from './ui/Button.tsx';

export function Header() {
  const scrolled = useScrolledPast(8);
  const [open, setOpen] = useState(false);
  const { reduce } = useMotionPresets();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Escape cierra y devuelve el foco al botón; foco al primer enlace al abrir.
  useEffect(() => {
    if (!open) return;
    sheetRef.current?.querySelector<HTMLElement>('a,button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Cerrar el menú si se pasa a escritorio
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Fondo sólido + blur: se anima solo su opacidad */}
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-white/10 bg-brand-black/85 backdrop-blur-md transition-opacity duration-200 ease-(--ease-out)"
        style={{ opacity: solid ? 1 : 0 }}
      />

      <div className="relative z-10 mx-auto flex h-(--header-h) max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="-m-1 shrink-0 p-1 text-white" aria-label="Servicentro Lubrimotor — inicio">
          <Logo className="h-8.5 w-auto lg:h-10" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-[0.95rem] font-medium text-white/80 transition-colors duration-150 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="lg:hidden">
            <Button
              size="sm"
              icon={<WhatsAppIcon className="size-4.5" />}
              onClick={() => openWhatsApp({ source: 'header' })}
              aria-label="Cotizar por WhatsApp"
            >
              Cotizar
            </Button>
          </div>
          <div className="hidden lg:block">
            <Button size="sm" icon={<WhatsAppIcon className="size-4.5" />} onClick={() => openWhatsApp({ source: 'header' })}>
              Cotizar por WhatsApp
            </Button>
          </div>

          <motion.button
            ref={toggleRef}
            type="button"
            whileTap={TAP}
            transition={TAP_TRANSITION}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 grid size-11 place-items-center rounded-xl text-white lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </motion.button>
        </div>
      </div>

      {/* Sheet móvil: entra desde arriba (por debajo de la barra), ease-out, 250 ms; sale más rápido */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              aria-hidden="true"
              className="fixed inset-0 top-(--header-h) bg-brand-black/60 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: DURATION.sheet, ease: EASE_OUT } }}
              exit={{ opacity: 0, transition: { duration: DURATION.exit, ease: EASE_OUT } }}
              onClick={() => setOpen(false)}
            />
            <div key="sheet-wrap" className="absolute inset-x-0 top-full overflow-hidden lg:hidden">
              <motion.div
                key="sheet"
                id="menu-movil"
                ref={sheetRef}
                className="border-b border-white/10 bg-brand-black px-4 pt-2 pb-6 sm:px-6"
                initial={reduce ? { opacity: 0 } : { transform: 'translateY(-100%)' }}
                animate={
                  reduce
                    ? { opacity: 1, transition: { duration: DURATION.ui } }
                    : { transform: 'translateY(0%)', transition: { duration: DURATION.sheet, ease: EASE_OUT } }
                }
                exit={
                  reduce
                    ? { opacity: 0, transition: { duration: DURATION.exit } }
                    : { transform: 'translateY(-100%)', transition: { duration: 0.18, ease: EASE_OUT } }
                }
              >
                <nav aria-label="Menú móvil">
                  <ul className="divide-y divide-white/10">
                    {site.nav.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="font-display flex min-h-14 items-center text-xl font-bold text-white uppercase"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <Button
                  className="mt-4 w-full"
                  icon={<WhatsAppIcon className="size-5" />}
                  onClick={() => {
                    setOpen(false);
                    openWhatsApp({ source: 'mobile_menu' });
                  }}
                >
                  Escribir por WhatsApp
                </Button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
