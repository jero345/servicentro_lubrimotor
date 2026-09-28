const cop = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0, minimumFractionDigits: 0 });

/** 193000 → "$193.000" (es-CO, sin decimales, sin espacio tras el signo) */
export function formatCOP(value: number): string {
  return `$${cop.format(Math.round(value))}`;
}
