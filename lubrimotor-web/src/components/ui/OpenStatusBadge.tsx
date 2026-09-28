import { useOpenStatus } from '../../lib/hooks.ts';

/** Indicador en vivo con la hora de Colombia. Reserva su espacio antes de montar (sin saltos de layout). */
export function OpenStatusBadge({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  const status = useOpenStatus();
  const dark = tone === 'dark';
  const dot = status?.isOpen ? 'bg-whatsapp' : 'bg-brand-red';

  return (
    <p
      className={`inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium ${
        dark ? 'bg-white/8 text-white ring-1 ring-white/12' : 'bg-white text-brand-black ring-1 ring-brand-black/10'
      } ${className}`}
      aria-live="polite"
    >
      <span className="relative flex size-2.5" aria-hidden="true">
        {status?.isOpen && <span className={`live-ping absolute inset-0 rounded-full ${dot}`} />}
        <span className={`relative size-2.5 rounded-full ${status ? dot : 'bg-gray-500'}`} />
      </span>
      {status ? (
        <span>{status.label}</span>
      ) : (
        <span className="invisible">Abierto ahora · cierra a las 6:00 p. m.</span>
      )}
    </p>
  );
}
