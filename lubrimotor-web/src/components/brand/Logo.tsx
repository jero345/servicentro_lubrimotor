import { DROP, MARK_BOX, ORBIT_BLACK, ORBIT_RED, WORD_BLACK, WORD_BOX, WORD_RED } from './logoPaths.ts';

/**
 * Logo horizontal construido con los trazos del vectorial oficial:
 * marca (gota + órbitas) a la izquierda y logotipo a la derecha.
 * Las partes negras usan currentColor → sirve en fondo claro (negro) y oscuro (blanco).
 */
const MARK_SCALE = WORD_BOX.h / MARK_BOX.h;
const GAP = 14;
const MARK_W = MARK_BOX.w * MARK_SCALE;
const VIEW_W = MARK_W + GAP + WORD_BOX.w;

export function Logo({ className, title = 'Servicentro Lubrimotor' }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W.toFixed(1)} ${WORD_BOX.h}`}
      className={className}
      role="img"
      aria-label={title}
      fill="currentColor"
    >
      <g transform={`scale(${MARK_SCALE.toFixed(4)}) translate(${-MARK_BOX.x} ${-MARK_BOX.y})`}>
        {ORBIT_RED.map((d) => (
          <path key={d} d={d} className="fill-brand-red" />
        ))}
        {ORBIT_BLACK.map((d) => (
          <path key={d} d={d} />
        ))}
        <path d={DROP} />
      </g>
      <g transform={`translate(${(MARK_W + GAP - WORD_BOX.x).toFixed(1)} ${-WORD_BOX.y})`}>
        {WORD_RED.map((d) => (
          <path key={d} d={d} className="fill-brand-red" />
        ))}
        {WORD_BLACK.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}
