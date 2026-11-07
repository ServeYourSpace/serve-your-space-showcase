import { cn } from '../utils/cn';

/** Soft purple light pools behind a section. Pure CSS, GPU cheap. */
export default function AmbientGlow({ className, variant = 'center' }) {
  const presets = {
    center: [
      'start-1/2 top-1/3 h-[38rem] w-[38rem] -translate-x-1/2 rtl:translate-x-1/2 bg-brand-500',
      'end-[-10rem] bottom-0 h-[26rem] w-[26rem] bg-brand-900',
    ],
    left: ['-start-40 top-10 h-[34rem] w-[34rem] bg-brand-500', 'end-0 bottom-0 h-[22rem] w-[22rem] bg-fuchsia-500'],
    right: ['-end-40 top-0 h-[34rem] w-[34rem] bg-brand-500', 'start-0 bottom-10 h-[22rem] w-[22rem] bg-indigo-500'],
  };
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      {presets[variant].map((c) => (
        <div
          key={c}
          className={cn('absolute rounded-full blur-[120px]', c)}
          style={{ opacity: 'var(--glow-strength)' }}
        />
      ))}
    </div>
  );
}
