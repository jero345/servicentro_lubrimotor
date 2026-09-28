/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CONTENIDO EDITABLE DEL SITIO · Servicentro Lubrimotor
 * ─────────────────────────────────────────────────────────────────────────────
 *  Todo lo que el cliente puede querer cambiar vive aquí: precios, marcas,
 *  horarios, textos, redes. Los componentes solo leen de este archivo.
 *
 *  ¿Cómo cambio un precio?  Busca la marca en `vehicleBrands` y edita
 *  `priceFrom` (número entero en pesos, sin puntos ni signo $).
 *  Ej.: priceFrom: 199000  →  se muestra como "$199.000".
 *  El precio "desde" del titular y del <title> se recalcula solo (toma el menor).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type FilterType = 'Original' | 'Homologado';

export interface OilOption {
  /** Identificador interno (minúsculas, sin espacios) */
  id: string;
  /** Marca del aceite, ej. "ACDelco" */
  oil: string;
  viscosity: string;
  filter: FilterType;
  /** Precio DESDE en COP, número entero */
  priceFrom: number;
}

export interface VehicleBrand {
  /** Identificador interno; también sirve para preseleccionar con ?marca=<id> */
  id: string;
  name: string;
  /** Una o varias alternativas de aceite (Chevrolet tiene dos) */
  options: OilOption[];
}

/** Días: 0 = domingo, 1 = lunes … 6 = sábado. Horas en formato 24 h, hora de Colombia. */
export interface OpeningHours {
  days: number[];
  label: string;
  open: string;
  close: string;
}

export type IconKey =
  | 'droplet'
  | 'filter'
  | 'wind'
  | 'fuel'
  | 'snowflake'
  | 'cog'
  | 'flask'
  | 'sparkles'
  | 'history'
  | 'layers'
  | 'shield'
  | 'flame'
  | 'bus'
  | 'compass'
  | 'truck'
  | 'wrench';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
  featured?: boolean;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Testimonial {
  name: string;
  /** Vehículo o contexto, ej. "Chevrolet Spark GT" */
  vehicle: string;
  text: string;
  /** 1 a 5 */
  rating: number;
}

/**
 * Foto del servicentro. Los archivos viven en public/fotos/<file>-<ancho>.webp
 * (uno por cada ancho de `widths`). Para cambiar una foto, reemplaza esos .webp
 * manteniendo el nombre, o agrega nuevos y actualiza aquí.
 */
export interface Photo {
  file: string;
  alt: string;
  /** Anchos disponibles en px (srcset) */
  widths: number[];
  /** Tamaño del archivo más grande (evita saltos de layout) */
  width: number;
  height: number;
  /** Punto de encuadre cuando la foto se recorta (CSS object-position) */
  focus?: string;
}

const landscape = (file: string, alt: string, focus?: string): Photo => ({ file, alt, widths: [640, 1280], width: 1280, height: 960, focus });
const portrait = (file: string, alt: string, focus?: string): Photo => ({ file, alt, widths: [320, 480, 960], width: 960, height: 1280, focus });

export const site = {
  name: 'Servicentro Lubrimotor',
  legalName: 'Lubrimotor y Cía. S.A.S.',
  slogan: 'Expertos en lubricación',
  foundedYear: 1986,

  // TODO: reemplazar por el dominio final (se usa en canonical, Open Graph y sitemap).
  siteUrl: 'https://lubrimotor.vercel.app',

  whatsapp: {
    number: '573002444093',
    display: '300 244 4093',
    /** Mensaje del botón flotante y de los CTA genéricos */
    defaultMessage: 'Hola Lubrimotor, quiero cotizar un cambio de aceite.',
    /** Primera línea del mensaje del cotizador */
    quoteGreeting: 'Hola Lubrimotor 👋 Quiero cotizar un cambio de aceite.',
    /** Última línea del mensaje del cotizador */
    quoteClosing: '¿Me confirman el valor para mi vehículo?',
    /** Última línea cuando el cliente elige "Otra marca" */
    otherBrandClosing: '¿Qué alternativas tienen para mi vehículo?',
    /** Prefijo del mensaje de las tarjetas de servicios */
    servicePrefix: 'Hola, quiero cotizar:',
  },

  email: 'lubrimotorgerencia123@gmail.com',

  address: {
    street: 'Carrera 52 # 61-108',
    city: 'Medellín',
    region: 'Antioquia',
    country: 'CO',
    full: 'Carrera 52 # 61-108, Medellín, Antioquia',
    reference: 'Al lado de la Facultad de Medicina de la Universidad de Antioquia (UdeA)',
    mapsUrl: 'https://goo.gl/maps/yywSoPvnvby8KPDKA',
    /** Búsqueda usada por el mapa embebido */
    mapsEmbedQuery: 'Carrera 52 # 61-108, Medellín, Antioquia, Colombia',
    // TODO: confirmar coordenadas exactas con el pin de Google Maps (valor aproximado).
    geo: { lat: 6.2636, lng: -75.5657 },
  },

  hours: [
    { days: [1, 2, 3, 4, 5], label: 'Lunes a viernes', open: '07:00', close: '18:00' },
    { days: [6], label: 'Sábado', open: '07:00', close: '17:00' },
    { days: [0], label: 'Domingo', open: '07:00', close: '13:00' },
  ] satisfies OpeningHours[],

  coverage: 'Todo el Valle de Aburrá y Antioquia',
  homeService: false,
  payments: ['Efectivo', 'Tarjeta', 'Transferencia'],
  serviceDuration: '25–30 minutos',

  social: {
    instagram: { handle: '@Servicentro_lubrimotor', url: 'https://instagram.com/Servicentro_lubrimotor' },
    tiktok: { handle: '@Servicentrolubrimotor', url: 'https://tiktok.com/@Servicentrolubrimotor' },
    // Por definir. Mientras sea null, el ícono de Facebook no se muestra.
    facebook: null as { handle: string; url: string } | null,
  },

  /* ─────────────── MENÚ ─────────────── */
  nav: [
    { label: 'Cotizar', href: '#cotizar' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Empresas', href: '#empresas' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Preguntas', href: '#preguntas' },
    { label: 'Ubicación', href: '#ubicacion' },
  ],

  /* ─────────────── HERO ─────────────── */
  hero: {
    eyebrow: 'Expertos en lubricación · Medellín',
    subtitle: 'Multimarca · Filtro original u homologado · Listo en 25–30 minutos · Sin cita previa',
    chips: ['Desde 1986', 'Abrimos domingos', 'Distribuidor autorizado CAM2'],
    /** Fondo: fachada oscurecida (decorativa). En móvil un recorte vertical centrado en el letrero. */
    background: {
      mobile: { file: 'hero-movil', alt: '', widths: [480, 750], width: 750, height: 1000 } satisfies Photo,
      desktop: { file: 'hero', alt: '', widths: [960, 1600], width: 1600, height: 1200 } satisfies Photo,
    },
    /** Foto principal del visual del hero */
    photo: portrait('tecnico-revision', 'Técnico de Lubrimotor revisando el motor de un vehículo', '40% 50%'),
    photoLabel: 'Sin cita · listo en 25–30 minutos',
  },

  /* ─────────────── COTIZADOR ─────────────── */
  vehicleBrands: [
    {
      id: 'renault',
      name: 'Renault',
      options: [{ id: 'elf', oil: 'ELF', viscosity: '20W-50', filter: 'Original', priceFrom: 237000 }],
    },
    {
      id: 'volkswagen',
      name: 'Volkswagen',
      options: [{ id: 'shell', oil: 'Shell Helix', viscosity: '10W-30', filter: 'Homologado', priceFrom: 223000 }],
    },
    {
      id: 'ford',
      name: 'Ford',
      options: [{ id: 'motorcraft', oil: 'Motorcraft', viscosity: '5W-30', filter: 'Original', priceFrom: 310000 }],
    },
    {
      id: 'toyota',
      name: 'Toyota',
      options: [{ id: 'toyota', oil: 'Toyota', viscosity: '15W-40', filter: 'Original', priceFrom: 685000 }],
    },
    {
      id: 'hyundai-kia',
      name: 'Hyundai / Kia',
      options: [{ id: 'kixx', oil: 'Kixx', viscosity: '10W-30', filter: 'Original', priceFrom: 215000 }],
    },
    {
      id: 'chevrolet',
      name: 'Chevrolet',
      options: [
        { id: 'acdelco', oil: 'ACDelco', viscosity: '10W-30', filter: 'Original', priceFrom: 193000 },
        { id: 'mobil', oil: 'Mobil', viscosity: '10W-30', filter: 'Original', priceFrom: 204000 },
      ],
    },
    {
      id: 'nissan',
      name: 'Nissan',
      options: [{ id: 'nissan', oil: 'Nissan', viscosity: '10W-30', filter: 'Original', priceFrom: 264000 }],
    },
  ] satisfies VehicleBrand[],

  otherBrand: {
    label: 'Otra marca',
    title: '¿Tu vehículo utiliza otra marca o viscosidad?',
    leadIntro: 'No te preocupes.',
    leadStrong: 'Somos multimarca.',
    body: 'Las referencias mostradas son solo algunas de nuestras opciones más comerciales. Indícanos la marca, modelo, año y motorización de tu vehículo y verificamos las alternativas disponibles para tu próximo cambio de aceite.',
  },

  engineTypes: ['Gasolina', 'Diésel', 'Gas', 'Híbrido'],

  legalNotice: {
    short: 'Precios desde. Aplican términos y condiciones.',
    body: 'El valor definitivo puede variar según marca, referencia, modelo, año, motorización, cilindraje y capacidad de aceite del vehículo; viscosidad y especificación requerida; marca del lubricante seleccionada; cantidad de aceite necesaria y uso de filtro original u homologado.',
    closing: 'El precio definitivo se confirma con el cliente antes de realizar el servicio.',
  },

  /* ─────────────── MULTIMARCA ─────────────── */
  lubricantBrands: [
    'ELF', 'Shell Helix', 'Motorcraft', 'Toyota', 'Nissan', 'Kixx', 'ACDelco',
    'Mobil', 'Valvoline', 'Havoline', 'Chevron', 'Oiltec', 'CAM2',
  ],
  viscosities: ['5W-20', '5W-30', '10W-30', '10W-40', '20W-50'],
  multiBrandText:
    'Manejamos diferentes marcas, viscosidades y especificaciones. Filtros originales y homologados según tu vehículo.',

  /* ─────────────── CAM2 ─────────────── */
  // Si existe public/cam2.webp o public/cam2.png se muestra el logo; si no, un sello tipográfico.
  cam2: {
    title: 'Distribuidor autorizado CAM2',
    text: 'Somos distribuidores autorizados CAM2. Pregúntanos por las referencias disponibles para tu vehículo.',
    cta: 'Preguntar por CAM2',
    whatsappTopic: 'Lubricantes CAM2',
  },

  /* ─────────────── SERVICIOS ─────────────── */
  services: [
    {
      id: 'aceite-motor',
      title: 'Cambio de aceite de motor',
      description: 'Lubricante según la especificación de tu vehículo, con filtro original u homologado.',
      icon: 'droplet',
      featured: true,
    },
    { id: 'filtro-aceite', title: 'Cambio de filtro de aceite', description: 'Filtro original u homologado según la referencia de tu vehículo.', icon: 'filter' },
    { id: 'filtro-aire', title: 'Cambio de filtro de aire de motor', description: 'Para que el motor respire aire limpio.', icon: 'wind' },
    { id: 'filtro-combustible', title: 'Cambio de filtro de combustible', description: 'Protege el sistema de alimentación del motor.', icon: 'fuel' },
    { id: 'filtro-ac', title: 'Cambio de filtro de aire acondicionado', description: 'Aire más limpio dentro de la cabina.', icon: 'snowflake' },
    { id: 'aceite-caja', title: 'Cambio de aceite de caja mecánica', description: 'Lubricación adecuada para tu transmisión manual.', icon: 'cog' },
    { id: 'liquidos', title: 'Revisión de todos los líquidos', description: 'Verificamos los niveles de los líquidos de tu vehículo.', icon: 'flask' },
    { id: 'lavado-motor', title: 'Lavado en seco del motor', description: 'Limpieza del compartimiento del motor.', icon: 'sparkles' },
  ] satisfies Service[],

  complementaryProducts: [
    'Aditivos', 'Grasas', 'Ceras', 'Líquido de frenos', 'Refrigerantes',
    'Ambientadores', 'Plumillas', 'Estopa y toallas',
  ],
  complementaryNote: 'Consúltalos en el servicentro o por WhatsApp.',

  /* ─────────────── CÓMO FUNCIONA ─────────────── */
  steps: [
    { title: 'Elige tu marca', text: 'Mira el precio desde de la referencia más comercial para tu vehículo.' },
    { title: 'Escríbenos por WhatsApp', text: 'Envíanos modelo, año y motor. Te confirmamos el valor para tu vehículo.' },
    { title: 'Ven sin cita', text: 'Atendemos por orden de llegada. En 25–30 minutos sales listo.' },
  ],

  /* ─────────────── POR QUÉ ELEGIRNOS ─────────────── */
  whyUs: [
    { icon: 'history', title: 'Trayectoria desde 1986', text: 'Cerca de cuatro décadas en lubricación y mantenimiento automotriz en Medellín.' },
    { icon: 'layers', title: 'Multimarca', text: 'Diferentes marcas, viscosidades y especificaciones de lubricantes.' },
    { icon: 'filter', title: 'Filtros originales y homologados', text: 'Según la marca, la referencia de tu vehículo y la alternativa que elijas.' },
    { icon: 'flame', title: 'Gasolina, diésel, gas e híbridos', text: 'Atendemos las distintas motorizaciones.' },
    { icon: 'bus', title: 'Particulares y servicio público', text: 'Vehículos de uso particular y de servicio público.' },
    { icon: 'compass', title: 'Asesoría según tu vehículo', text: 'Más que un cambio de aceite: te orientamos para elegir la lubricación y filtración adecuadas.' },
  ] satisfies { icon: IconKey; title: string; text: string }[],

  /* ─────────────── HISTORIA ─────────────── */
  history: {
    items: [
      {
        mark: 'Origen',
        title: 'Un pequeño almacén de lubricantes',
        text: 'Fundado por Iván Mejía, quien con su experiencia en mecánica automotriz inició la comercialización de diferentes marcas de lubricantes.',
      },
      {
        mark: '1986',
        title: 'Una nueva etapa',
        text: 'Carlos Alberto Paniagua Rincón, Tecnólogo en Mecánica Industrial del Instituto Tecnológico Pedro Justo Berrío, adquiere Lubrimotor y lo fortalece con atención personalizada.',
      },
      {
        mark: 'Hoy',
        title: 'Servicentro Lubrimotor',
        text: 'Cerca de cuatro décadas atendiendo a Medellín: vehículos particulares y de servicio público, a gasolina, diésel, gas e híbridos.',
      },
    ],
    closing: 'Conservamos la experiencia de años con una atención actual, responsable y personalizada.',
  },

  /* ─────────────── GARANTÍA ─────────────── */
  warranty: {
    points: [
      'Respaldamos los productos que comercializamos y los servicios que realizamos.',
      'Si hay una novedad, revisamos el vehículo, el producto y el trabajo efectuado.',
      'Si es atribuible a nosotros, corregimos o repetimos el servicio sin costo.',
    ],
    full: 'En Servicentro Lubrimotor respaldamos tanto los productos comercializados como los servicios realizados, de conformidad con las disposiciones aplicables en materia de protección al consumidor. En relación con el cambio de aceite y demás servicios efectuados por Lubrimotor, la garantía comprende la correcta ejecución de las labores efectivamente realizadas por nuestro personal, incluyendo, según corresponda, el cambio o instalación de filtros, suministro y aplicación del lubricante contratado y demás actividades que hayan hecho parte del servicio prestado. Cuando un cliente presente alguna novedad que considere relacionada con el servicio realizado, Lubrimotor efectuará la correspondiente revisión del vehículo, del producto suministrado y del trabajo efectuado, con el propósito de establecer el origen de la situación y determinar si esta se encuentra relacionada con la instalación, el producto utilizado o la ejecución del servicio. Cuando se determine que la novedad resulta atribuible al servicio efectuado por Lubrimotor, se procederá conforme a la garantía legal aplicable, incluyendo, cuando corresponda, la corrección o repetición del servicio sin costo para el consumidor. Los productos comercializados cuentan igualmente con la garantía legal correspondiente y, cuando aplique, con las condiciones de garantía establecidas por el fabricante. Para facilitar la atención de una reclamación, el cliente podrá suministrar la factura o cualquier información que permita identificar la compra o el servicio realizado. La garantía se atenderá conforme a la legislación aplicable y no comprenderá situaciones cuya causa corresponda a fuerza mayor o caso fortuito, hechos de terceros, uso indebido del vehículo o producto, o incumplimiento de las instrucciones de uso o mantenimiento, cuando dichas circunstancias sean las causantes de la novedad reclamada.',
  },

  /* ─────────────── PREGUNTAS FRECUENTES ─────────────── */
  // Si cambias el horario arriba, actualiza también la respuesta de "¿Abren los domingos?".
  faq: [
    { q: '¿Cuánto se demora un cambio de aceite?', a: 'En promedio 25 a 30 minutos, según el vehículo y las actividades requeridas.' },
    { q: '¿Necesito cita previa?', a: 'No. Atendemos sin cita, por orden de llegada.' },
    { q: '¿Qué tipo de vehículos atienden?', a: 'Particulares y de servicio público, a gasolina, diésel, gas e híbridos.' },
    { q: '¿Abren los domingos?', a: 'Sí, de 7:00 a. m. a 1:00 p. m.' },
    { q: '¿Manejan filtros originales y homologados?', a: 'Sí, según la marca, referencia del vehículo y la alternativa que elija el cliente.' },
    { q: '¿Trabajan diferentes marcas de aceite?', a: 'Sí. Somos multimarca: diferentes marcas, viscosidades y especificaciones.' },
    { q: '¿Qué viscosidades manejan?', a: '5W-20, 5W-30, 10W-30, 10W-40 y 20W-50, además de otras según el vehículo.' },
    { q: '¿Cómo sé qué aceite usa mi vehículo?', a: 'Te orientamos según marca, modelo, año, motorización y especificaciones.' },
    { q: '¿Los precios publicados son definitivos?', a: 'No, son "desde". El valor final depende de referencia, capacidad de aceite, viscosidad, marca de lubricante, tipo de filtro y demás especificaciones. Se confirma antes del servicio.' },
    { q: '¿Tienen servicio a domicilio?', a: 'No, el servicio se presta en nuestro servicentro.' },
    { q: '¿Qué medios de pago reciben?', a: 'Efectivo, tarjeta y transferencia.' },
  ] satisfies Faq[],

  /* ─────────────── PROMOCIONES ─────────────── */
  promos: {
    title: 'Las promociones cambian cada mes',
    text: 'Síguenos para no perderte ninguna.',
  },

  /* ─────────────── PORTAFOLIO EMPRESARIAL ─────────────── */
  // TODO: completar con la información que entregue el cliente (condiciones, convenios, facturación, etc.).
  // Los textos actuales solo usan datos ya confirmados del negocio.
  business: {
    eyebrow: 'Portafolio empresarial',
    title: 'Soluciones para empresas y flotas',
    lead: 'Atendemos vehículos de empresa, flotas y servicio público con la misma asesoría y respaldo de siempre. Cuéntanos sobre tu flota y te compartimos nuestro portafolio.',
    items: [
      { icon: 'truck', title: 'Flotas y servicio público', text: 'Vehículos de empresa, particulares y de servicio público.' },
      { icon: 'flame', title: 'Todas las motorizaciones', text: 'Gasolina, diésel, gas e híbridos.' },
      { icon: 'wrench', title: 'Mantenimiento preventivo', text: 'Cambio de aceite, filtros, aceite de caja y revisión de líquidos.' },
      { icon: 'compass', title: 'Asesoría técnica', text: 'Te orientamos según la especificación de cada vehículo de tu flota.' },
    ] satisfies { icon: IconKey; title: string; text: string }[],
    form: {
      title: 'Solicita el portafolio',
      text: 'Déjanos el nombre de tu empresa y cuántos vehículos tienes; te respondemos por WhatsApp.',
      cta: 'Solicitar portafolio',
    },
    // TODO: poner el PDF en public/ (ej. public/portafolio-lubrimotor.pdf) y escribir aquí '/portafolio-lubrimotor.pdf'.
    // Mientras sea null, el botón de descarga no se muestra.
    pdf: null as string | null,
    // TODO: empresas cliente (solo con autorización). Logo opcional en public/clientes/. Si está vacío, la franja no se muestra.
    clients: [] as { name: string; logo?: string }[],
    whatsappGreeting: 'Hola Lubrimotor 👋 Quiero información del portafolio empresarial.',
    whatsappClosing: '¿Me comparten el portafolio y las condiciones para empresas?',
  },

  /* ─────────────── TESTIMONIOS ─────────────── */
  // ⚠ TODO: TESTIMONIOS DE EJEMPLO (ficticios). Reemplazar por opiniones reales de clientes
  // (con su autorización) antes de publicar la página o pautar en Meta Ads, y cambiar demo a false.
  // Publicar reseñas inventadas puede considerarse publicidad engañosa.
  testimonials: {
    demo: true,
    eyebrow: 'Testimonios',
    title: 'Lo que dicen nuestros clientes',
    items: [
      { name: 'Andrés M.', vehicle: 'Chevrolet Spark GT', rating: 5, text: 'Llegué sin cita un sábado y en media hora tenía el cambio de aceite listo. Me explicaron qué aceite usa mi carro.' },
      { name: 'Carolina R.', vehicle: 'Renault Sandero', rating: 5, text: 'Muy buena asesoría. Me mostraron las opciones de filtro original y homologado y me confirmaron el precio antes de empezar.' },
      { name: 'Jhon Fredy G.', vehicle: 'Taxi · Hyundai i10', rating: 5, text: 'Con el taxi no puedo perder tiempo y aquí me atienden rápido. Que abran el domingo me salva la semana.' },
      { name: 'Luis E.', vehicle: 'Toyota Fortuner', rating: 5, text: 'Buscaba una referencia específica para mi camioneta y la tenían. Además revisaron todos los líquidos.' },
      { name: 'Valentina P.', vehicle: 'Kia Picanto', rating: 5, text: 'Me queda cerca a la universidad. Coticé por WhatsApp, el precio fue claro y la atención muy amable.' },
      { name: 'Gustavo H.', vehicle: 'Ford Ranger · diésel', rating: 5, text: 'Llevo años haciendo aquí el mantenimiento de mi camioneta. Son serios, cumplidos y conocen de lubricación.' },
    ] satisfies Testimonial[],
  },

  /* ─────────────── FOTOS ─────────────── */
  photos: {
    ubicacion: landscape('fachada-esquina', 'Fachada de Servicentro Lubrimotor con su letrero, vista desde la esquina', '50% 45%'),
    historia: landscape('fachada-frontal', 'Frente de Servicentro Lubrimotor hoy'),
    cambioAceite: portrait('cambio-aceite', 'Aplicación del aceite en el motor durante un cambio de aceite', '60% 40%'),
    cam2: portrait('tecnico-cam2', 'Técnico en el servicentro junto a tambores de lubricante CAM2', '75% 65%'),
  },

  /** Galería "Así trabajamos" (el orden define el mosaico). La panorámica y el técnico revisando van en el hero. */
  gallery: {
    title: 'Así trabajamos',
    lead: 'Llega sin cita a la Carrera 52 # 61-108, al lado de la Facultad de Medicina de la UdeA. Te atendemos por orden de llegada.',
    photos: [
      landscape('marquesina', 'Zona de atención bajo la marquesina de Lubrimotor'),
      portrait('tecnico-motor', 'Técnico de Lubrimotor trabajando en el compartimiento del motor'),
      landscape('fachada-calle', 'Entrada de Servicentro Lubrimotor sobre la vía, con un vehículo en servicio'),
      landscape('fachada-letrero', 'Letrero y zona de servicio de Servicentro Lubrimotor'),
      landscape('bahia-servicio', 'Vehículo en la bahía de servicio bajo la marquesina'),
    ],
  },

  credits: { label: 'Sitio por Markfusion' },
};

export type Site = typeof site;
