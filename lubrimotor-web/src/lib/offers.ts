import { site, type OilOption, type VehicleBrand } from '../data/site.ts';

export interface Offer {
  brand: VehicleBrand;
  option: OilOption;
}

/** La oferta con el precio "desde" más bajo de todo el cotizador (titular, <title>, schema). */
export function getLowestOffer(): Offer {
  let best: Offer | null = null;
  for (const brand of site.vehicleBrands) {
    for (const option of brand.options) {
      if (!best || option.priceFrom < best.option.priceFrom) best = { brand, option };
    }
  }
  if (!best) throw new Error('site.vehicleBrands está vacío');
  return best;
}

export function findBrand(id: string | null | undefined): VehicleBrand | undefined {
  if (!id) return undefined;
  const key = id.trim().toLowerCase();
  return site.vehicleBrands.find((b) => b.id === key);
}

/** Precio mínimo de una marca (útil cuando tiene varias opciones). */
export function lowestOption(brand: VehicleBrand): OilOption {
  return brand.options.reduce((a, b) => (b.priceFrom < a.priceFrom ? b : a));
}
