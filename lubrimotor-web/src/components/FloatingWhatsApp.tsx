import { AnimatePresence, motion } from 'motion/react';
import { useScrolledPast } from '../lib/hooks.ts';
import { openWhatsApp } from '../lib/whatsapp.ts';
import { DURATION, EASE_OUT, TAP } from '../motion/presets.ts';
import { WhatsAppIcon } from './brand/BrandIcons.tsx';

/**
 * Botón flotante verde (único uso del verde WhatsApp). Aparece tras 300 px de scroll.
 * En móvil lo reemplaza la barra inferior fija (MobileCtaBar), para no duplicar acciones.
 */
export function FloatingWhatsApp() {
  const visible = useScrolledPast(300);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="wa"
          type="button"
          onClick={() => openWhatsApp({ source: 'floating' })}
          aria-label="Escribir por WhatsApp"
          className="fixed right-6 bottom-6 z-40 hidden size-15 place-items-center rounded-full bg-whatsapp text-white shadow-[0_12px_32px_-8px_rgb(37_211_102/0.6)] md:grid"
          style={{ transformOrigin: 'bottom right' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: DURATION.ui, ease: EASE_OUT } }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: DURATION.exit, ease: EASE_OUT } }}
          whileTap={{ ...TAP, transition: { duration: DURATION.press, ease: EASE_OUT } }}
        >
          <WhatsAppIcon className="size-7.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
