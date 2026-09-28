import { useId, type ReactNode } from 'react';
import { site } from '../data/site.ts';
import type { VehicleFields as Fields } from '../lib/whatsapp.ts';
import { WhatsAppIcon } from './brand/BrandIcons.tsx';
import { Button } from './ui/Button.tsx';

interface Props {
  value: Fields;
  onChange: (next: Fields) => void;
  /** "Otra marca": agrega el campo Marca libre */
  isOther: boolean;
  onQuote: () => void;
}

const input =
  'h-12 w-full rounded-xl border border-brand-black/15 bg-white px-4 text-base text-brand-black placeholder:text-gray-500 transition-colors duration-150 hover:border-brand-black/30 focus:border-brand-red focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-red/25';

/** Mini-formulario opcional. Ningún campo es obligatorio: el botón funciona aunque estén vacíos. */
export function VehicleFields({ value, onChange, isOther, onQuote }: Props) {
  const set = (key: keyof Fields) => (v: string) => onChange({ ...value, [key]: v });

  return (
    <div className="rounded-3xl border border-brand-black/10 bg-gray-100/60 p-5 sm:p-7">
      <fieldset className="min-w-0">
        <legend className="font-display text-lg font-bold uppercase">
          Datos de tu vehículo <span className="font-sans text-sm font-medium text-gray-600 normal-case">(opcional)</span>
        </legend>
        <p className="mt-1 text-sm text-gray-600">Los agregamos a tu mensaje de WhatsApp para responderte más rápido.</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {isOther && (
            <Field label="Marca" className="sm:col-span-2">
              {(id) => (
                <input
                  id={id}
                  className={input}
                  value={value.brandName ?? ''}
                  onChange={(e) => set('brandName')(e.target.value)}
                  placeholder="Ej. Mazda, Suzuki, Peugeot…"
                  autoComplete="off"
                  maxLength={40}
                />
              )}
            </Field>
          )}
          <Field label="Modelo">
            {(id) => (
              <input
                id={id}
                className={input}
                value={value.model ?? ''}
                onChange={(e) => set('model')(e.target.value)}
                placeholder="Ej. Spark GT"
                autoComplete="off"
                maxLength={60}
              />
            )}
          </Field>
          <Field label="Año">
            {(id) => (
              <input
                id={id}
                className={input}
                value={value.year ?? ''}
                onChange={(e) => set('year')(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="Ej. 2018"
                inputMode="numeric"
                autoComplete="off"
              />
            )}
          </Field>
          <Field label="Motor / cilindraje" className="sm:col-span-2">
            {(id) => (
              <input
                id={id}
                className={input}
                value={value.engine ?? ''}
                onChange={(e) => set('engine')(e.target.value)}
                placeholder="Ej. 1.2 · 1.6 · 2.0 turbo"
                autoComplete="off"
                maxLength={30}
              />
            )}
          </Field>
        </div>

        <EngineTypePicker value={value.engineType} onChange={set('engineType')} />
      </fieldset>

      {/* En móvil el botón queda justo después de los campos; en escritorio la tarjeta está al lado */}
      <Button className="mt-6 w-full lg:hidden" size="lg" icon={<WhatsAppIcon className="size-5" />} onClick={onQuote}>
        Enviar por WhatsApp
      </Button>
    </div>
  );
}

function Field({ label, className = '', children }: { label: string; className?: string; children: (id: string) => ReactNode }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-brand-black">
        {label}
      </label>
      {children(id)}
    </div>
  );
}

/** Radios nativos (navegación con flechas incluida). Clic sobre el elegido lo desmarca: el campo es opcional. */
function EngineTypePicker({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
  const name = useId();
  return (
    <fieldset className="mt-5 min-w-0">
      <legend className="mb-1.5 text-sm font-semibold text-brand-black">Tipo de motor</legend>
      <div className="flex flex-wrap gap-2">
        {site.engineTypes.map((type) => {
          const checked = value === type;
          return (
            <label
              key={type}
              className={`pressable relative inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-[0.95rem] font-medium has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-red ${
                checked
                  ? 'border-brand-black bg-brand-black text-white'
                  : 'border-brand-black/15 bg-white text-brand-black hover:border-brand-black/40'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={type}
                checked={checked}
                onChange={() => onChange(type)}
                onClick={() => checked && onChange('')}
                className="sr-only"
              />
              {type}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
