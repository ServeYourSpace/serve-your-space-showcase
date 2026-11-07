import { cn } from '../utils/cn';

/** A real app screenshot, cropped to fill the phone screen from the top. */
export default function ScreenImage({ src, alt = '', className, eager = false }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable="false"
      className={cn('absolute inset-0 h-full w-full object-cover object-top', className)}
    />
  );
}
