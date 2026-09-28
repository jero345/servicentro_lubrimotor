import type { Photo as PhotoData } from '../../data/site.ts';

interface Props {
  photo: PhotoData;
  /** Ancho que ocupa en pantalla, para que el navegador elija el archivo justo */
  sizes: string;
  className?: string;
  /** Fotos del primer pantallazo: 'eager' */
  loading?: 'lazy' | 'eager';
}

/** Foto WebP responsive, perezosa y con ancho/alto fijos (sin saltos de layout). */
export function Photo({ photo, sizes, className = '', loading = 'lazy' }: Props) {
  const src = (w: number) => `/fotos/${photo.file}-${w}.webp`;
  return (
    <img
      src={src(photo.widths[photo.widths.length - 1])}
      srcSet={photo.widths.map((w) => `${src(w)} ${w}w`).join(', ')}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      loading={loading}
      decoding="async"
      className={`object-cover ${className}`}
      style={photo.focus ? { objectPosition: photo.focus } : undefined}
    />
  );
}
