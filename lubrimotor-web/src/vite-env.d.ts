/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_META_PIXEL_ID?: string;
  readonly VITE_GA4_ID?: string;
}

/** Ruta pública del logo CAM2 si existe en /public al compilar; si no, null. */
declare const __CAM2_LOGO__: string | null;
