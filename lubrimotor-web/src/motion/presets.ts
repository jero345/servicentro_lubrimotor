/**
 * Única fuente de verdad del movimiento (principios de Emil Kowalski):
 * - Solo transform y opacity.
 * - Curvas propias: ease-out para entradas, ease-in-out para movimientos en pantalla.
 * - UI ≤ 300 ms; entradas de sección ≤ 500 ms.
 * - Nunca desde scale(0): scale(0.95) + opacity 0.
 * - Con prefers-reduced-motion se degrada a solo opacidad.
 * - Se usan cadenas `transform` completas (aceleradas por GPU) en vez de los atajos x/y.
 */
import { useReducedMotion, type Transition, type Variants } from 'motion/react';

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

export const DURATION = {
  press: 0.16,
  exit: 0.12,
  swap: 0.18,
  ui: 0.2,
  sheet: 0.25,
  section: 0.45,
} as const;

/** Stagger sutil para listas y grids (30–60 ms) */
export const STAGGER = 0.05;

/** Feedback de press en botones */
export const TAP = { scale: 0.97 } as const;
export const TAP_TRANSITION: Transition = { duration: DURATION.press, ease: EASE_OUT };

/** Gota del hero: caída con rebote leve */
export const DROP_SPRING: Transition = { type: 'spring', duration: 0.6, bounce: 0.3 };

/** Viewport para entradas de sección */
export const IN_VIEW = { once: true, margin: '-80px' } as const;

const ty = (px: number) => `translateY(${px}px)`;

/** Variants compartidas. Con reduced motion se quita el movimiento y se deja la opacidad. */
export function useMotionPresets() {
  const reduce = useReducedMotion() ?? false;

  const fadeUp: Variants = {
    hidden: { opacity: 0, transform: ty(reduce ? 0 : 16) },
    show: { opacity: 1, transform: ty(0), transition: { duration: DURATION.section, ease: EASE_OUT } },
  };

  const fadeUpItem: Variants = {
    hidden: { opacity: 0, transform: ty(reduce ? 0 : 12) },
    show: { opacity: 1, transform: ty(0), transition: { duration: 0.35, ease: EASE_OUT } },
  };

  const stagger = (step: number = STAGGER, delay = 0): Variants => ({
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : step, delayChildren: delay } },
  });

  /** Tarjeta del cotizador al cambiar de marca: opacidad + 8 px, ≤ 200 ms */
  const swap = (instant: boolean) => ({
    initial: { opacity: 0, transform: ty(reduce || instant ? 0 : 8) },
    animate: {
      opacity: 1,
      transform: ty(0),
      transition: instant ? { duration: 0 } : { duration: DURATION.swap, ease: EASE_OUT },
    },
    exit: {
      opacity: 0,
      transform: ty(reduce || instant ? 0 : -4),
      transition: instant ? { duration: 0 } : { duration: DURATION.exit, ease: EASE_OUT },
    },
  });

  /** Indicador que se desliza entre pills (layoutId): movimiento en pantalla → ease-in-out */
  const slide = (instant: boolean): Transition =>
    instant || reduce ? { duration: 0 } : { duration: DURATION.ui, ease: EASE_IN_OUT };

  return { reduce, fadeUp, fadeUpItem, stagger, swap, slide };
}
