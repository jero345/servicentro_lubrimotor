import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { IN_VIEW, useMotionPresets } from '../../motion/presets.ts';

interface Props {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ eyebrow, title, lead, id, tone = 'light', align = 'left', className = '' }: Props) {
  const { fadeUp } = useMotionPresets();
  const dark = tone === 'dark';
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}
    >
      <p className={`tag-mono text-xs ${dark ? 'text-brand-red' : 'text-brand-red-dark'}`}>{eyebrow}</p>
      <h2
        id={id}
        className={`font-display mt-3 text-[2rem] leading-[1.05] font-extrabold uppercase sm:text-[2.5rem] lg:text-5xl ${dark ? 'text-white' : 'text-brand-black'}`}
      >
        {title}
      </h2>
      {lead && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? 'text-white/70' : 'text-gray-600'}`}>{lead}</p>}
    </motion.div>
  );
}
