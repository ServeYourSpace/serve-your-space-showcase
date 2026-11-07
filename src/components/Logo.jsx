import { cn } from '../utils/cn';

/** SYS mark (from the app's own logo assets) + wordmark. */
export default function Logo({ className, compact = false, onDark = false }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)} dir="ltr">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-800 shadow-glow">
        <img src="/logo/sys-icon-white.png" alt="" width="20" height="23" className="h-[22px] w-auto" />
      </span>
      {!compact && (
        <span
          className={cn(
            'font-display text-[1.05rem] font-bold tracking-tight',
            onDark ? 'text-white' : 'text-ink',
          )}
          style={{ fontFamily: 'Sora, system-ui, sans-serif' }}
        >
          Serve<span className="text-brand-500">Your</span>Space
        </span>
      )}
    </span>
  );
}
