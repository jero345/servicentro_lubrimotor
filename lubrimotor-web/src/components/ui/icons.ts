import {
  Bus,
  Cog,
  Compass,
  Droplet,
  Filter,
  FlaskConical,
  Flame,
  Fuel,
  History,
  Layers,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Wind,
  type LucideIcon,
} from 'lucide-react';
import type { IconKey } from '../../data/site.ts';

/** site.ts guarda solo la clave del ícono; aquí se resuelve al componente de lucide. */
export const ICONS: Record<IconKey, LucideIcon> = {
  droplet: Droplet,
  filter: Filter,
  wind: Wind,
  fuel: Fuel,
  snowflake: Snowflake,
  cog: Cog,
  flask: FlaskConical,
  sparkles: Sparkles,
  history: History,
  layers: Layers,
  shield: ShieldCheck,
  flame: Flame,
  bus: Bus,
  compass: Compass,
};
