import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatTime, getOpenStatus } from './hours.ts';

// Colombia = UTC-5 todo el año. 2026-09-28 es lunes.
const bogota = (iso: string) => new Date(`${iso}-05:00`);

test('formato 12 h es-CO', () => {
  assert.equal(formatTime('07:00'), '7:00 a. m.');
  assert.equal(formatTime('18:00'), '6:00 p. m.');
  assert.equal(formatTime('13:00'), '1:00 p. m.');
  assert.equal(formatTime('12:30'), '12:30 p. m.');
});

test('lunes 10:00 → abierto, cierra 6:00 p. m.', () => {
  const s = getOpenStatus(bogota('2026-09-28T10:00:00'));
  assert.equal(s.isOpen, true);
  assert.equal(s.today, 1);
  assert.equal(s.label, 'Abierto ahora · cierra a las 6:00 p. m.');
});

test('lunes 06:30 → cerrado, abre hoy 7:00 a. m.', () => {
  assert.equal(getOpenStatus(bogota('2026-09-28T06:30:00')).label, 'Cerrado · abre a las 7:00 a. m.');
});

test('lunes 18:00 en punto → cerrado, abre mañana', () => {
  const s = getOpenStatus(bogota('2026-09-28T18:00:00'));
  assert.equal(s.isOpen, false);
  assert.equal(s.label, 'Cerrado · abre mañana a las 7:00 a. m.');
});

test('sábado 16:59 abierto; 17:00 cerrado', () => {
  assert.equal(getOpenStatus(bogota('2026-10-03T16:59:00')).isOpen, true);
  assert.equal(getOpenStatus(bogota('2026-10-03T17:00:00')).isOpen, false);
});

test('domingo 12:00 abierto (cierra 1:00 p. m.); 14:00 cerrado', () => {
  assert.equal(getOpenStatus(bogota('2026-10-04T12:00:00')).label, 'Abierto ahora · cierra a las 1:00 p. m.');
  assert.equal(getOpenStatus(bogota('2026-10-04T14:00:00')).label, 'Cerrado · abre mañana a las 7:00 a. m.');
});

test('usa la hora de Bogotá aunque el reloj esté en UTC (lunes 02:00 UTC = domingo 21:00)', () => {
  const s = getOpenStatus(new Date('2026-09-28T02:00:00Z'));
  assert.equal(s.today, 0);
  assert.equal(s.isOpen, false);
});
