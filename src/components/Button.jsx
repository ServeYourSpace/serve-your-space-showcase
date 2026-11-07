import { ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

const styles = {
  primary:
    'text-white bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 shadow-glow hover:shadow-[0_0_0_1px_rgb(138_71_250/.4),0_24px_70px_-15px_rgb(138_71_250/.8)]',
  ghost: 'glass text-ink hover:bg-brand-500/10',
  light: 'bg-white text-brand-900 hover:bg-brand-50',
};

export default function Button({ href, onClick, variant = 'primary', icon = true, className, children, ...rest }) {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={cn(
        'group relative inline-flex min-h-[48px] items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0',
        styles[variant],
        className,
      )}
      {...rest}
    >
      {variant === 'primary' && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -start-1/2 w-1/2 -skew-x-12 bg-white/25 opacity-0 blur-md transition-all duration-700 group-hover:start-full group-hover:opacity-100"
        />
      )}
      <span className="relative">{children}</span>
      {icon && (
        <ArrowRight
          aria-hidden
          className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
        />
      )}
    </Tag>
  );
}
