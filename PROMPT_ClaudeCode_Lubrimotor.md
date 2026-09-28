# PROMPT PARA CLAUDE CODE — Landing de cotización · Servicentro Lubrimotor

> Pégalo completo en Claude Code dentro de una carpeta vacía. Antes, pon el logo en `public/logo.png` (y si tienes el logo CAM2, en `public/cam2.png`).

---

## ROL Y OBJETIVO

Actúa como design engineer senior. Vas a construir una **landing page de una sola página** para **Servicentro Lubrimotor** (Medellín), cuyo único objetivo de negocio es: **que el visitante identifique su marca de vehículo, vea un precio "DESDE" y pida su cotización de cambio de aceite por WhatsApp con un mensaje ya diligenciado**.

No es una tienda. No hay carrito ni pasarela. Toda la venta se cierra en WhatsApp. Cada decisión de diseño debe acercar al usuario al botón "Cotizar por WhatsApp".

## SKILL OBLIGATORIA: EMIL KOWALSKI

1. Verifica si la skill `emil-design-eng` está instalada. Si no, ejecuta: `npx skills add emilkowalski/skill`
2. **Lee la skill completa antes de escribir cualquier componente animado** y aplica sus principios en todo el proyecto. Como mínimo:
   - Anima solo `transform` y `opacity` (nunca width/height/top/left).
   - Duraciones cortas: 150–300 ms para UI; entradas de sección máx. ~500 ms.
   - Curvas propias, no las por defecto: ease-out para entradas (`[0.23, 1, 0.32, 1]`), ease-in-out para movimientos en pantalla (`[0.77, 0, 0.175, 1]`). Springs para gestos/drag.
   - Nunca animar desde `scale(0)`: entrar desde `scale(0.95)` + `opacity: 0`.
   - Feedback de press en botones: `whileTap={{ scale: 0.97 }}`.
   - Nada de animaciones en interacciones que el usuario repite muchas veces (ej. cambiar de marca en el cotizador debe sentirse instantáneo, con transición ≤200 ms).
   - Stagger sutil (30–60 ms) en listas y grids.
   - Respetar `prefers-reduced-motion` (usa `useReducedMotion` y degrada a solo opacidad).
   - `transform-origin` coherente con el disparador (dropdowns/acordeones desde su origen).
3. Al terminar, usa la skill para **auditar tus propias animaciones** y corrige lo que no cumpla. Entrégame una lista corta de lo que ajustaste.

## STACK

- React + Vite + TypeScript
- Tailwind CSS v4
- **Motion (Framer Motion)** → `import { motion } from "motion/react"` (paquete `motion`)
- lucide-react para íconos
- Sin backend. Deploy objetivo: Vercel.
- **Todo el contenido editable (precios, marcas, horarios, textos) en un solo archivo `src/data/site.ts`**, para que el cliente cambie precios sin tocar componentes.

## IDENTIDAD VISUAL (colores del logo)

Tokens en CSS / Tailwind theme:

```
--brand-red:      #FE1E39   /* rojo del logo — CTAs, precios, acentos */
--brand-red-dark: #D6122B   /* hover/pressed */
--brand-black:    #020408   /* negro del logo — fondos oscuros, texto principal */
--ink-900:        #0B0E14   /* superficies oscuras secundarias */
--ink-700:        #1A1F29
--gray-500:       #6B7280
--gray-100:       #F3F4F6
--white:          #FFFFFF
--whatsapp:       #25D366   /* SOLO en el botón flotante de WhatsApp */
```

- Estética: taller premium, técnico, deportivo. Contraste negro/rojo/blanco. Alternar secciones claras (blanco) y oscuras (negro del logo).
- Tipografía (Google Fonts): títulos en **Saira** (700–800, ligeramente expandida, en mayúsculas para titulares cortos — coherente con el logotipo); cuerpo en **Inter**; etiquetas técnicas (viscosidades, "EXPERTOS EN LUBRICACIÓN") en **JetBrains Mono** itálica con tracking amplio, igual que el slogan del logo.
- Motivo gráfico: la **gota de aceite** y la **elipse/órbita** del logo. Úsalos como elementos decorativos sutiles (SVG), no como clipart.
- Los precios SIEMPRE en rojo y con la palabra "DESDE" visible encima.
- Los CTAs principales son rojos con texto blanco; el botón flotante de WhatsApp es verde.
- Mobile-first: el 80%+ del tráfico vendrá de Instagram/TikTok/Meta Ads en celular.

## DATOS DEL NEGOCIO (`src/data/site.ts`)

```
nombre: "Servicentro Lubrimotor"  (razón social: Lubrimotor y Cía. S.A.S.)
slogan: "Expertos en lubricación"
whatsapp: "573002444093"   // mostrar como 300 244 4093
direccion: "Carrera 52 # 61-108, Medellín, Antioquia"
referencia: "Al lado de la Facultad de Medicina de la Universidad de Antioquia (UdeA)"
mapsUrl: "https://goo.gl/maps/yywSoPvnvby8KPDKA"
horario:
  lunes-viernes: 07:00–18:00
  sábado:        07:00–17:00
  domingo:       07:00–13:00
cobertura: "Todo el Valle de Aburrá y Antioquia"
domicilio: false   // NO hay servicio a domicilio — decirlo claro
pagos: ["Efectivo", "Tarjeta", "Transferencia"]
instagram: "@Servicentro_lubrimotor"  → https://instagram.com/Servicentro_lubrimotor
tiktok: "@Servicentrolubrimotor"     → https://tiktok.com/@Servicentrolubrimotor
facebook: null   // por definir: si es null, NO mostrar el ícono
email: "lubrimotorgerencia123@gmail.com"
fundacion: 1986
```

### Ofertas por marca de vehículo (precios "DESDE", COP)

| Marca vehículo | Aceite | Viscosidad | Filtro | Desde |
|---|---|---|---|---|
| Renault | ELF | 20W-50 | Original | 237000 |
| Volkswagen | Shell Helix | 10W-30 | Homologado | 223000 |
| Ford | Motorcraft | 5W-30 | Original | 310000 |
| Toyota | Toyota | 15W-40 | Original | 685000 |
| Hyundai / Kia | Kixx | 10W-30 | Original | 215000 |
| Chevrolet | ACDelco | 10W-30 | Original | 193000 |
| Chevrolet | Mobil | 10W-30 | Original | 204000 |
| Nissan | Nissan | 10W-30 | Original | 264000 |

- Chevrolet tiene **dos opciones**: muéstralas dentro de la misma tarjeta/marca como dos alternativas seleccionables (ACDelco / Mobil).
- Formato de precio: `$193.000` (es-CO, sin decimales) → usa `Intl.NumberFormat('es-CO')`.

### Otros datos

- Marcas de lubricante que manejan (multimarca): ELF, Shell Helix, Motorcraft, Toyota, Nissan, Kixx, ACDelco, Mobil, Valvoline, Havoline, Chevron, Oiltec, CAM2 — "entre otras". **No vincularlas a ninguna marca de vehículo.**
- Viscosidades: 5W-20, 5W-30, 10W-30, 10W-40, 20W-50 "y otras según la aplicación".
- **Distribuidor autorizado CAM2** (destacar de forma independiente).
- Tipos de motor: gasolina, diésel, gas, híbridos. Vehículos particulares y de servicio público.
- Servicios: cambio de aceite de motor · cambio de filtro de aceite · cambio de filtro de aire de motor · cambio de filtro de combustible · cambio de filtro de aire acondicionado · cambio de aceite de caja mecánica · revisión de todos los líquidos · lavado en seco del motor.
- Productos complementarios (solo mención, no tienda): aditivos, grasas, ceras, líquido de frenos, refrigerantes, ambientadores, plumillas, estopa y toallas.
- Duración del servicio: 25 a 30 minutos. **Sin cita previa**, por orden de llegada.

## ARQUITECTURA DE LA PÁGINA (en este orden)

### 0. Header sticky
Logo a la izquierda. Links ancla (Cotizar · Servicios · Nosotros · Preguntas · Ubicación). Botón rojo "Cotizar por WhatsApp". En mobile: logo + botón compacto + menú hamburguesa (sheet que entra desde arriba, ease-out, ≤250 ms). El header gana fondo sólido + blur al hacer scroll.

### 1. Hero
- Titular: **"Cambio de aceite en Medellín desde $193.000"** (el "desde" y el precio salen del dato más bajo del array, no hardcodeado).
- Subtítulo: "Multimarca · Filtro original u homologado · Listo en 25–30 minutos · Sin cita previa".
- CTA primario: "Cotizar mi vehículo" → hace scroll al cotizador. CTA secundario: "Escribir por WhatsApp".
- Chips de confianza: "Desde 1986" · "Abrimos domingos" · "Distribuidor autorizado CAM2".
- **Indicador en vivo "Abierto ahora / Cerrado · abre a las 7:00 a. m."** calculado con la zona horaria `America/Bogota` según el horario del negocio.
- Visual: la gota de aceite del logo en SVG, con una animación de entrada (caída + leve rebote con spring) y la órbita roja rotando muy lento. Respeta reduced motion.

### 2. Cotizador por marca (EL CORAZÓN DE LA PÁGINA)
- Título: "Elige la marca de tu vehículo".
- Selector de marcas como grid de "pills"/tarjetas (Renault, Volkswagen, Ford, Toyota, Hyundai/Kia, Chevrolet, Nissan + **"Otra marca"**). Scroll horizontal en mobile.
- Al seleccionar una marca se muestra la tarjeta de oferta con esta estructura exacta:
  ```
  CHEVROLET
  ACDelco 10W-30
  Filtro original
  DESDE
  $193.000
  [ COTIZAR POR WHATSAPP ]
  ```
  (En Chevrolet, toggle entre ACDelco y Mobil.)
- Debajo, **mini-formulario opcional** de 4 campos: Modelo · Año · Motor/cilindraje · Tipo de motor (gasolina/diésel/gas/híbrido). No son obligatorios: el botón funciona aunque estén vacíos.
- El botón abre `https://wa.me/573002444093?text=...` con mensaje codificado, por ejemplo:
  > Hola Lubrimotor 👋 Quiero cotizar un cambio de aceite.
  > Marca: Chevrolet · Opción vista en la web: ACDelco 10W-30, filtro original (desde $193.000)
  > Modelo: Spark GT · Año: 2018 · Motor: 1.2 gasolina
  > ¿Me confirman el valor para mi vehículo?

  Omite las líneas de los campos vacíos.
- **"Otra marca"** muestra el bloque:
  > **¿TU VEHÍCULO UTILIZA OTRA MARCA O VISCOSIDAD?**
  > No te preocupes. **Somos multimarca.** Las referencias mostradas son solo algunas de nuestras opciones más comerciales. Indícanos la marca, modelo, año y motorización de tu vehículo y verificamos las alternativas disponibles para tu próximo cambio de aceite.

  con un campo "Marca" libre + los mismos 4 campos + botón a WhatsApp.
- Justo debajo del cotizador, SIEMPRE visible, el aviso legal:
  > **Precios desde. Aplican términos y condiciones.** El valor definitivo puede variar según marca, referencia, modelo, año, motorización, cilindraje y capacidad de aceite del vehículo; viscosidad y especificación requerida; marca del lubricante seleccionada; cantidad de aceite necesaria y uso de filtro original u homologado. **El precio definitivo se confirma con el cliente antes de realizar el servicio.**
- Animación: el cambio de tarjeta entre marcas usa `AnimatePresence mode="popLayout"` con opacidad + y 8px, ≤200 ms. El indicador de marca activa usa `layoutId` para deslizarse entre pills. El precio puede hacer un conteo corto (≤400 ms) solo la primera vez que aparece, no en cada cambio.

### 3. Multimarca
- Banda oscura con **marquee infinito** de las marcas de lubricante (texto en Saira, no logos de terceros), pausa en hover, y detenido si reduced motion.
- Chips de viscosidades en JetBrains Mono: 5W-20 · 5W-30 · 10W-30 · 10W-40 · 20W-50 · "+ otras".
- Texto: "Manejamos diferentes marcas, viscosidades y especificaciones. Filtros originales y homologados según tu vehículo."

### 4. Distribuidor autorizado CAM2
Bloque destacado independiente (sello/insignia) con `public/cam2.png` si existe; si no, un sello tipográfico "DISTRIBUIDOR AUTORIZADO CAM2".

### 5. Servicios
- Grid de 8 servicios con ícono lucide, título corto y una línea. "Cambio de aceite de motor" es la tarjeta destacada (más grande, borde rojo).
- Cada tarjeta tiene enlace "Cotizar" → WhatsApp con mensaje "Hola, quiero cotizar: [servicio]".
- Fila secundaria: "También encuentras" + chips de productos complementarios (aditivos, grasas, ceras…). Aclarar que se consultan en el local o por WhatsApp.
- Entradas con stagger al entrar en viewport (`whileInView`, `viewport={{ once: true, margin: "-80px" }}`).

### 6. Cómo funciona (3 pasos)
1. Elige tu marca y mira el precio desde. 2. Escríbenos por WhatsApp con modelo, año y motor. 3. Ven sin cita: en 25–30 min sales listo.

### 7. Por qué elegirnos
4–6 bloques: trayectoria desde 1986 · multimarca · filtros originales y homologados · gasolina, diésel, gas e híbridos · particulares y servicio público · asesoría según tu vehículo ("más que un cambio de aceite, te orientamos").

### 8. Nuestra historia
Timeline corta y elegante:
- Origen: pequeño almacén de lubricantes fundado por **Iván Mejía**.
- **1986**: **Carlos Alberto Paniagua Rincón**, Tecnólogo en Mecánica Industrial (Instituto Tecnológico Pedro Justo Berrío), adquiere Lubrimotor y lo fortalece con atención personalizada.
- Hoy: Servicentro Lubrimotor, cerca de cuatro décadas atendiendo a Medellín.
Cierre: "Conservamos la experiencia de años con una atención actual, responsable y personalizada."

### 9. Garantía y respaldo
Resumen de 3 puntos visibles (respaldamos productos y servicios · revisamos el vehículo, el producto y el trabajo si hay una novedad · si es atribuible a nosotros, corregimos o repetimos el servicio sin costo) + acordeón "Ver condiciones completas" con este texto:

> En Servicentro Lubrimotor respaldamos tanto los productos comercializados como los servicios realizados, de conformidad con las disposiciones aplicables en materia de protección al consumidor. En relación con el cambio de aceite y demás servicios efectuados por Lubrimotor, la garantía comprende la correcta ejecución de las labores efectivamente realizadas por nuestro personal, incluyendo, según corresponda, el cambio o instalación de filtros, suministro y aplicación del lubricante contratado y demás actividades que hayan hecho parte del servicio prestado. Cuando un cliente presente alguna novedad que considere relacionada con el servicio realizado, Lubrimotor efectuará la correspondiente revisión del vehículo, del producto suministrado y del trabajo efectuado, con el propósito de establecer el origen de la situación y determinar si esta se encuentra relacionada con la instalación, el producto utilizado o la ejecución del servicio. Cuando se determine que la novedad resulta atribuible al servicio efectuado por Lubrimotor, se procederá conforme a la garantía legal aplicable, incluyendo, cuando corresponda, la corrección o repetición del servicio sin costo para el consumidor. Los productos comercializados cuentan igualmente con la garantía legal correspondiente y, cuando aplique, con las condiciones de garantía establecidas por el fabricante. Para facilitar la atención de una reclamación, el cliente podrá suministrar la factura o cualquier información que permita identificar la compra o el servicio realizado. La garantía se atenderá conforme a la legislación aplicable y no comprenderá situaciones cuya causa corresponda a fuerza mayor o caso fortuito, hechos de terceros, uso indebido del vehículo o producto, o incumplimiento de las instrucciones de uso o mantenimiento, cuando dichas circunstancias sean las causantes de la novedad reclamada.

### 10. Preguntas frecuentes (acordeón accesible)
- ¿Cuánto se demora un cambio de aceite? → En promedio 25 a 30 minutos, según el vehículo y las actividades requeridas.
- ¿Necesito cita previa? → No. Atendemos sin cita, por orden de llegada.
- ¿Qué tipo de vehículos atienden? → Particulares y de servicio público, a gasolina, diésel, gas e híbridos.
- ¿Abren los domingos? → Sí, de 7:00 a. m. a 1:00 p. m.
- ¿Manejan filtros originales y homologados? → Sí, según la marca, referencia del vehículo y la alternativa que elija el cliente.
- ¿Trabajan diferentes marcas de aceite? → Sí. Somos multimarca: diferentes marcas, viscosidades y especificaciones.
- ¿Qué viscosidades manejan? → 5W-20, 5W-30, 10W-30, 10W-40 y 20W-50, además de otras según el vehículo.
- ¿Cómo sé qué aceite usa mi vehículo? → Te orientamos según marca, modelo, año, motorización y especificaciones.
- ¿Los precios publicados son definitivos? → No, son "desde". El valor final depende de referencia, capacidad de aceite, viscosidad, marca de lubricante, tipo de filtro y demás especificaciones. Se confirma antes del servicio.
- ¿Tienen servicio a domicilio? → No, el servicio se presta en nuestro servicentro.
- ¿Qué medios de pago reciben? → Efectivo, tarjeta y transferencia.

Genera también el schema `FAQPage` en JSON-LD con estas preguntas.

### 11. Promociones
Banda corta: "Las promociones cambian cada mes. Síguenos para no perderte ninguna" + botones a Instagram y TikTok. (Sin promociones hardcodeadas.)

### 12. Ubicación y horarios
- Dirección + referencia UdeA, botón "Cómo llegar" (mapsUrl) y un `iframe` de Google Maps embebido con `loading="lazy"` (query por dirección).
- Tabla de horario con el día actual resaltado y el estado "Abierto ahora / Cerrado".
- Medios de pago, cobertura, y "No contamos con servicio a domicilio".

### 13. Footer
Logo, slogan, datos de contacto, redes (ocultar Facebook si es null), aviso "Precios desde. Aplican términos y condiciones.", © año dinámico Lubrimotor y Cía. S.A.S., crédito discreto "Sitio por Markfusion".

### Global
- **Botón flotante de WhatsApp** (verde) abajo a la derecha, aparece tras 300 px de scroll con scale 0.95→1 + opacity; mensaje por defecto: "Hola Lubrimotor, quiero cotizar un cambio de aceite."
- En mobile, **barra inferior fija** con dos acciones: "Cotizar" (scroll al cotizador) y "WhatsApp".

## TRACKING (dejarlo listo para Meta Ads)

- Meta Pixel cargado solo si existe `VITE_META_PIXEL_ID`. PageView al cargar.
- En **cada** clic a WhatsApp dispara `fbq('track', 'Contact', { content_name: <marca o servicio>, content_category: 'cambio_aceite', value: <precio desde si aplica>, currency: 'COP' })` y, si existe `VITE_GA4_ID`, `gtag('event','generate_lead', {...})`.
- Centraliza esto en un helper `src/lib/whatsapp.ts` → `openWhatsApp({ source, brand?, option?, fields? })` que arma el mensaje, dispara los eventos y abre el link. Ningún componente arma URLs de WhatsApp por su cuenta.
- Conserva UTMs de la URL y agrégalos al final del mensaje de WhatsApp como `(ref: utm_source/utm_campaign)` para saber de qué campaña llegó cada lead.
- Crea `.env.example` con `VITE_META_PIXEL_ID=` y `VITE_GA4_ID=`.

## SEO LOCAL Y RENDIMIENTO

- `<title>`: "Cambio de aceite en Medellín desde $193.000 | Servicentro Lubrimotor". Meta description con "multimarca", "sin cita", "25–30 min", "cerca a la UdeA".
- JSON-LD `AutoRepair` (LocalBusiness) con dirección, geo aproximada, teléfono, horario (`openingHoursSpecification`), `priceRange`, redes en `sameAs`.
- Open Graph + favicon a partir del logo.
- `lang="es-CO"`, HTML semántico, un solo `h1`, contraste AA, foco visible, navegación por teclado en pills, tabs y acordeones.
- Lighthouse mobile ≥ 90 en Performance, Accesibilidad y SEO. Fuentes con `display=swap` y preconnect. Imágenes en WebP con width/height.
- Nada de librerías extra para animación: solo Motion.

## ESTRUCTURA DE CÓDIGO

```
src/
  data/site.ts            ← TODO el contenido y precios
  lib/whatsapp.ts         ← builder de mensaje + tracking
  lib/tracking.ts
  lib/hours.ts            ← lógica "abierto ahora" con America/Bogota
  components/
    Header.tsx  Hero.tsx  QuoteSelector.tsx  OfferCard.tsx  OtherBrandForm.tsx
    MultiBrand.tsx  Cam2Badge.tsx  Services.tsx  HowItWorks.tsx  WhyUs.tsx
    History.tsx  Warranty.tsx  Faq.tsx  Promos.tsx  Location.tsx  Footer.tsx
    FloatingWhatsApp.tsx  MobileCtaBar.tsx
  motion/presets.ts       ← curvas, duraciones y variants compartidas (una sola fuente de verdad)
```

## FORMA DE TRABAJO

1. Instala/lee la skill de Emil Kowalski.
2. Scaffold + tokens de marca + `site.ts` + `motion/presets.ts`.
3. Construye sección por sección en el orden de arriba. Tras el cotizador, levanta el dev server y verifica en viewport 390 px y 1440 px (usa Playwright para screenshots si está disponible).
4. Prueba el helper de WhatsApp: que el mensaje salga bien codificado, sin líneas vacías, con tildes y emojis correctos.
5. Auditoría final con la skill de Emil + Lighthouse. Corrige.
6. Entrégame: comando para correr local, pasos para deploy en Vercel, la lista de ajustes de la auditoría de animación y cómo cambiar un precio en `site.ts`.

**No inventes datos**: si algo no está en este prompt (testimonios, número de clientes, logos de terceros, fotos del local), deja un placeholder claramente marcado con `TODO:` en vez de fabricarlo.
