import { motion, type HTMLMotionProps } from 'motion/react';
import type { ReactNode } from 'react';
import { TAP, TAP_TRANSITION } from '../../motion/presets.ts';

type Variant = 'primary' | 'outline-light' | 'outline-dark' | 'dark' | 'white';
type Size = 'md' | 'lg' | 'sm';

/*
 * Texto de CTA en 19 px bold = "texto grande" WCAG → el blanco sobre #FE1E39 cumple AA (3:1).
 * El tamaño 'sm' usa rojo oscuro (#D6122B, 5.3:1) para cumplir AA con texto normal.
 */
const base =
  'inline-flex select-none items-center justify-center gap-2.5 rounded-xl text-center sm:whitespace-nowrap font-display font-bold uppercase tracking-wide [font-stretch:100%] [transition:background-color_200ms_ease,border-color_200ms_ease,color_200ms_ease] disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-red text-white hover:bg-brand-red-dark',
  'outline-light': 'border-2 border-white/30 text-white hover:border-white hover:bg-white/5',
  'outline-dark': 'border-2 border-brand-black/20 text-brand-black hover:border-brand-black',
  dark: 'bg-brand-black text-white hover:bg-ink-700',
  white: 'bg-white text-brand-black hover:bg-gray-100',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-11 px-4 text-[0.95rem]',
  md: 'min-h-13 px-5 text-[1.1875rem]',
  lg: 'min-h-14 px-5 sm:px-7 text-[1.1875rem]',
};

function variantClass(variant: Variant, size: Size) {
  if (variant === 'primary' && size === 'sm') return 'bg-brand-red-dark text-white hover:bg-brand-black';
  return variants[variant];
}

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', icon, className = '', children, ...rest }: ButtonProps) {
  return (
    <motion.button
      type="button"
      whileTap={TAP}
      transition={TAP_TRANSITION}
      className={`${base} ${variantClass(variant, size)} ${sizes[size]} ${className}`}
      {...rest}
    >
      {icon}
      <span>{children}</span>
    </motion.button>
  );
}

/** Enlace con aspecto de botón (para navegación real: mapas, redes). */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  children,
  ...rest
}: Omit<HTMLMotionProps<'a'>, 'children'> & { variant?: Variant; size?: Size; icon?: ReactNode; children: ReactNode }) {
  return (
    <motion.a
      whileTap={TAP}
      transition={TAP_TRANSITION}
      className={`${base} ${variantClass(variant, size)} ${sizes[size]} ${className}`}
      {...rest}
    >
      {icon}
      <span>{children}</span>
    </motion.a>
  );
}
