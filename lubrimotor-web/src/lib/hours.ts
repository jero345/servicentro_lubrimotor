import { site, type OpeningHours } from '../data/site.ts';

export const TIME_ZONE = 'America/Bogota';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_NAMES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

const partsFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

/** Día (0 = domingo) y minutos desde medianoche, en hora de Colombia. */
export function bogotaNow(date: Date = new Date()): { day: number; minutes: number } {
  const parts = partsFormatter.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  const day = WEEKDAYS.indexOf(get('weekday'));
  const hour = Number(get('hour')) % 24;
  return { day, minutes: hour * 60 + Number(get('minute')) };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export function hoursForDay(day: number, hours: OpeningHours[] = site.hours): OpeningHours | undefined {
  return hours.find((h) => h.days.includes(day));
}

/** "07:00" → "7:00 a. m." · "18:00" → "6:00 p. m." */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h < 12 ? 'a. m.' : 'p. m.';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}

export interface OpenStatus {
  isOpen: boolean;
  /** Texto listo para mostrar: "Abierto ahora · cierra a las 6:00 p. m." */
  label: string;
  /** Día de hoy en Colombia (0 = domingo) */
  today: number;
}

export function getOpenStatus(date: Date = new Date(), hours: OpeningHours[] = site.hours): OpenStatus {
  const { day, minutes } = bogotaNow(date);
  const todayHours = hoursForDay(day, hours);

  if (todayHours) {
    const open = toMinutes(todayHours.open);
    const close = toMinutes(todayHours.close);
    if (minutes >= open && minutes < close) {
      return { isOpen: true, today: day, label: `Abierto ahora · cierra a las ${formatTime(todayHours.close)}` };
    }
    if (minutes < open) {
      return { isOpen: false, today: day, label: `Cerrado · abre a las ${formatTime(todayHours.open)}` };
    }
  }

  // Buscar el próximo día con horario
  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7;
    const h = hoursForDay(next, hours);
    if (h) {
      const when = i === 1 ? 'mañana' : `el ${DAY_NAMES[next]}`;
      return { isOpen: false, today: day, label: `Cerrado · abre ${when} a las ${formatTime(h.open)}` };
    }
  }
  return { isOpen: false, today: day, label: 'Cerrado' };
}
