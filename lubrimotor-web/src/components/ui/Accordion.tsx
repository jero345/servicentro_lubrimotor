import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';
import { EASE_OUT, useMotionPresets } from '../../motion/presets.ts';

interface Props {
  title: ReactNode;
  children: ReactNode;
  headingLevel?: 'h3' | 'h4';
  tone?: 'light' | 'dark';
  className?: string;
  buttonClassName?: string;
}

/**
 * Acordeón accesible (botón + región, aria-expanded/controls, operable con Enter/Espacio).
 * Se abre muchas veces → la altura cambia al instante (no se anima height) y solo el
 * contenido entra con opacidad + 4 px desde arriba (su origen). Al cerrar, desaparece sin demora.
 */
export function AccordionItem({ title, children, headingLevel = 'h3', tone = 'light', className = '', buttonClassName = '' }: Props) {
  const [open, setOpen] = useState(false);
  const { reduce } = useMotionPresets();
  const id = useId();
  const Heading = headingLevel;
  const dark = tone === 'dark';

  return (
    <div className={className}>
      <Heading className="m-0">
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((v) => !v)}
          className={`flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold sm:text-lg ${buttonClassName}`}
        >
          <span>{title}</span>
          <ChevronDown
            aria-hidden="true"
            className={`size-5 shrink-0 transition-transform duration-200 ease-(--ease-out) ${open ? 'rotate-180' : ''} ${
              dark ? 'text-white/70' : 'text-brand-red-dark'
            }`}
          />
        </button>
      </Heading>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            style={{ transformOrigin: 'top' }}
            initial={{ opacity: 0, transform: reduce ? 'translateY(0px)' : 'translateY(-4px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)', transition: { duration: 0.18, ease: EASE_OUT } }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
          >
            <div className={`pb-5 leading-relaxed ${dark ? 'text-white/75' : 'text-gray-600'}`}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
