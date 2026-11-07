import { useTranslation } from 'react-i18next';
import { STORE_LINKS } from '../data/links';
import { cn } from '../utils/cn';

function AppleLogo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.37 12.6c-.03-2.77 2.26-4.1 2.36-4.17-1.29-1.88-3.29-2.14-4-2.17-1.7-.17-3.32 1-4.18 1-.87 0-2.2-.98-3.61-.95-1.86.03-3.57 1.08-4.53 2.74-1.93 3.35-.49 8.31 1.39 11.03.92 1.33 2.01 2.82 3.44 2.77 1.38-.06 1.9-.89 3.57-.89 1.66 0 2.14.89 3.6.86 1.49-.03 2.43-1.35 3.34-2.69 1.05-1.54 1.48-3.03 1.51-3.11-.03-.01-2.9-1.11-2.93-4.42zM13.62 4.47c.76-.92 1.28-2.2 1.14-3.47-1.1.04-2.43.73-3.22 1.65-.71.82-1.33 2.13-1.16 3.38 1.22.1 2.47-.62 3.24-1.56z" />
    </svg>
  );
}

function PlayLogo(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M3.6 1.8 13.4 12l-9.8 10.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1z" fill="#2196f3" />
      <path d="m3.6 1.8 13.3 7.6-3.5 2.6z" fill="#00e676" />
      <path d="m3.6 22.2 9.8-10.2 3.5 2.6z" fill="#ff3d44" />
      <path d="m16.9 9.4 3.7 2.1c.6.3.6.7 0 1l-3.7 2.1-3.5-2.6z" fill="#ffc400" />
    </svg>
  );
}

function Badge({ href, top, name, logo, soonLabel, size }) {
  const Tag = href ? 'a' : 'span';
  const small = size === 'sm';
  return (
    <Tag
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { 'aria-disabled': 'true' })}
      className={cn(
        'group relative inline-flex items-center gap-2.5 rounded-xl bg-black text-start text-white ring-1 ring-white/15 transition duration-300',
        small ? 'h-11 px-3' : 'h-[3.4rem] px-4',
        href ? 'hover:-translate-y-0.5 hover:shadow-glow' : 'cursor-default',
      )}
      dir="ltr"
    >
      {logo}
      <span className="flex flex-col leading-none">
        <span className={cn('font-medium', small ? 'text-[9px]' : 'text-[10px]')}>{top}</span>
        <span className={cn('mt-0.5 font-semibold tracking-tight', small ? 'text-base' : 'text-[1.25rem]')}>{name}</span>
      </span>
      {!href && (
        <span className="absolute -end-2 -top-2.5 rotate-6 rounded-md bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold text-amber-950 shadow">
          {soonLabel}
        </span>
      )}
    </Tag>
  );
}

/** App Store + Google Play badges. Links come from src/data/links.js. */
export default function StoreBadges({ className, size = 'md' }) {
  const { t } = useTranslation();
  const icon = size === 'sm' ? 'h-6 w-6' : 'h-7 w-7';
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <Badge
        size={size}
        href={STORE_LINKS.appStore}
        top={t('download.appStoreTop')}
        name="App Store"
        soonLabel={t('download.soon')}
        logo={<AppleLogo className={icon} />}
      />
      <Badge
        size={size}
        href={STORE_LINKS.googlePlay}
        top={t('download.playTop')}
        name="Google Play"
        soonLabel={t('download.soon')}
        logo={<PlayLogo className={icon} />}
      />
    </div>
  );
}
