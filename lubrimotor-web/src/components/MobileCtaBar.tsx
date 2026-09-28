import { AnimatePresence, motion } from 'motion/react';
import { Droplet } from 'lucide-react';
import { useScrolledPast } from '../lib/hooks.ts';
import { openWhatsApp } from '../lib/whatsapp.ts';
import { DURATION, EASE_DRAWER, EASE_OUT, useMotionPresets } from '../motion/presets.ts';
import { WhatsAppIcon } from './brand/BrandIcons.tsx';
import { Button, ButtonLink } from './ui/Button.tsx';

/** Barra inferior fija en móvil: "Cotizar" (scroll al cotizador) + "WhatsApp". Entra desde abajo. */
export function MobileCtaBar() {
  const visible = useScrolledPast(300);
  const { reduce } = useMotionPresets();
  const hidden = reduce ? { opacity: 0 } : { transform: 'translateY(100%)' };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="bar"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-brand-black/95 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
          initial={hidden}
          animate={{ opacity: 1, transform: 'translateY(0%)', transition: { duration: DURATION.sheet, ease: EASE_DRAWER } }}
          exit={{ ...hidden, transition: { duration: 0.18, ease: EASE_OUT } }}
        >
          <div className="grid grid-cols-2 gap-2">
            <ButtonLink href="#cotizar" className="w-full px-3!" icon={<Droplet className="size-5" aria-hidden="true" />}>
              Cotizar
            </ButtonLink>
            <Button
              variant="outline-light"
              className="w-full px-3!"
              icon={<WhatsAppIcon className="size-5 text-whatsapp" />}
              onClick={() => openWhatsApp({ source: 'mobile_bar' })}
            >
              WhatsApp
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
