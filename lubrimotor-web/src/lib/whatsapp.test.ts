/**
 * Pruebas del helper de WhatsApp (Node, sin dependencias):  npm run test
 * Verifica: mensaje bien armado, sin líneas vacías, tildes/emojis correctos y bien codificados, UTMs.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { site } from '../data/site.ts';
import { buildWhatsAppMessage, buildWhatsAppUrl, readCampaignRef } from './whatsapp.ts';

const chevrolet = site.vehicleBrands.find((b) => b.id === 'chevrolet')!;
const acdelco = chevrolet.options[0];
const mobil = chevrolet.options[1];

test('mensaje completo del cotizador (ejemplo del brief)', () => {
  const msg = buildWhatsAppMessage(
    { source: 'quote', brand: chevrolet, option: acdelco, fields: { model: 'Spark GT', year: '2018', engine: '1.2', engineType: 'Gasolina' } },
    undefined,
  );
  assert.equal(
    msg,
    [
      'Hola Lubrimotor 👋 Quiero cotizar un cambio de aceite.',
      'Marca: Chevrolet · Opción vista en la web: ACDelco 10W-30, filtro original (desde $193.000)',
      'Modelo: Spark GT · Año: 2018 · Motor: 1.2 gasolina',
      '¿Me confirman el valor para mi vehículo?',
    ].join('\n'),
  );
});

test('omite la línea del vehículo si los campos están vacíos (sin líneas vacías)', () => {
  const msg = buildWhatsAppMessage({ source: 'quote', brand: chevrolet, option: mobil, fields: { model: '  ', year: '' } }, undefined);
  assert.equal(msg.split('\n').length, 3);
  assert.ok(!msg.includes('\n\n'));
  assert.ok(msg.includes('Mobil 10W-30, filtro original (desde $204.000)'));
});

test('omite solo los campos vacíos', () => {
  const msg = buildWhatsAppMessage({ source: 'quote', brand: chevrolet, option: acdelco, fields: { year: '2015' } }, undefined);
  assert.ok(msg.includes('\nAño: 2015\n'));
  assert.ok(!msg.includes('Modelo:'));
  assert.ok(!msg.includes('Motor:'));
});

test('filtro homologado en minúscula (Volkswagen)', () => {
  const vw = site.vehicleBrands.find((b) => b.id === 'volkswagen')!;
  const msg = buildWhatsAppMessage({ source: 'quote', brand: vw }, undefined);
  assert.ok(msg.includes('Shell Helix 10W-30, filtro homologado (desde $223.000)'));
});

test('otra marca: marca libre + campos + cierre propio', () => {
  const msg = buildWhatsAppMessage(
    { source: 'quote_other', fields: { brandName: 'Mazda', model: 'CX-5', year: '2020', engineType: 'Híbrido' } },
    undefined,
  );
  assert.equal(
    msg,
    [
      'Hola Lubrimotor 👋 Quiero cotizar un cambio de aceite.',
      'Marca: Mazda',
      'Modelo: CX-5 · Año: 2020 · Motor: híbrido',
      '¿Qué alternativas tienen para mi vehículo?',
    ].join('\n'),
  );
});

test('otra marca sin datos: solo saludo y cierre', () => {
  const msg = buildWhatsAppMessage({ source: 'quote_other', fields: {} }, undefined);
  assert.equal(msg.split('\n').length, 2);
});

test('servicio: "Hola, quiero cotizar: [servicio]"', () => {
  assert.equal(
    buildWhatsAppMessage({ source: 'service', service: 'Cambio de filtro de aire de motor' }, undefined),
    'Hola, quiero cotizar: Cambio de filtro de aire de motor',
  );
});

test('portafolio empresarial: empresa y flota', () => {
  assert.equal(
    buildWhatsAppMessage({ source: 'business', business: { company: 'Transportes El Poblado', fleetSize: '12' } }, undefined),
    [
      'Hola Lubrimotor 👋 Quiero información del portafolio empresarial.',
      'Empresa: Transportes El Poblado · Vehículos: 12',
      '¿Me comparten el portafolio y las condiciones para empresas?',
    ].join('\n'),
  );
});

test('portafolio empresarial sin datos: sin línea vacía', () => {
  const msg = buildWhatsAppMessage({ source: 'business', business: {} }, undefined);
  assert.equal(msg.split('\n').length, 2);
  assert.ok(!msg.includes('\n\n'));
});

test('botón flotante: mensaje por defecto', () => {
  assert.equal(buildWhatsAppMessage({ source: 'floating' }, undefined), 'Hola Lubrimotor, quiero cotizar un cambio de aceite.');
});

test('limpia saltos de línea que escriba el usuario', () => {
  const msg = buildWhatsAppMessage({ source: 'quote', brand: chevrolet, fields: { model: 'Spark\n\nGT' } }, undefined);
  assert.ok(msg.includes('Modelo: Spark GT'));
  assert.ok(!msg.includes('\n\n'));
});

test('UTMs al final como (ref: fuente/campaña)', () => {
  assert.equal(readCampaignRef('?utm_source=instagram&utm_campaign=promo_octubre'), 'instagram/promo_octubre');
  assert.equal(readCampaignRef('?utm_source=tiktok'), 'tiktok');
  assert.equal(readCampaignRef(''), undefined);
  const msg = buildWhatsAppMessage({ source: 'floating' }, 'instagram/promo_octubre');
  assert.ok(msg.endsWith('\n(ref: instagram/promo_octubre)'));
});

test('URL: número correcto y texto codificado (tildes, emoji, saltos de línea)', () => {
  const url = buildWhatsAppUrl({ source: 'quote', brand: chevrolet, option: acdelco }, 'meta/lanzamiento');
  assert.ok(url.startsWith('https://wa.me/573002444093?text='));
  const text = new URL(url).searchParams.get('text')!;
  assert.equal(text, buildWhatsAppMessage({ source: 'quote', brand: chevrolet, option: acdelco }, 'meta/lanzamiento'));
  assert.ok(url.includes('%F0%9F%91%8B'), 'emoji 👋 en UTF-8');
  assert.ok(url.includes('%C2%BFMe'), '¿ en UTF-8');
  assert.ok(url.includes('veh%C3%ADculo'), 'í en UTF-8');
  assert.ok(url.includes('%0A'), 'saltos de línea');
  assert.ok(!url.includes(' '), 'sin espacios sin codificar');
});
