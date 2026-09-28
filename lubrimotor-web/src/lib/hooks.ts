import { useEffect, useState } from 'react';
import { getOpenStatus, type OpenStatus } from './hours.ts';

/** true cuando el scroll supera `px`. Solo re-renderiza al cruzar el umbral. */
export function useScrolledPast(px: number): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      setPast(window.scrollY > px);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [px]);
  return past;
}

/**
 * Estado "Abierto ahora / Cerrado" en hora de Colombia, recalculado cada minuto.
 * Devuelve null en el render del servidor (prerender) para no romper la hidratación.
 */
export function useOpenStatus(): OpenStatus | null {
  const [status, setStatus] = useState<OpenStatus | null>(null);
  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}
