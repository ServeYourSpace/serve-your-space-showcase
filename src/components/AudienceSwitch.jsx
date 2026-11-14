import { motion } from 'framer-motion';
import { Briefcase, UserRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAudience } from '../context/AudienceContext';
import { cn } from '../utils/cn';

const OPTIONS = [
  { id: 'client', icon: UserRound },
  { id: 'provider', icon: Briefcase },
];

/** "I am a customer / a provider" segmented control. Changes the texts and app screens across the page. */
export default function AudienceSwitch({ className, size = 'md' }) {
  const { t } = useTranslation();
  const { audience, setAudience } = useAudience();

  return (
    <div className={cn('inline-flex flex-col items-center gap-2 lg:items-start', className)}>
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{t('audience.label')}</span>
      <div role="radiogroup" aria-label={t('audience.label')} className="relative inline-flex rounded-full border border-brand-500/25 bg-surface/70 p-1 shadow-soft backdrop-blur">
        {OPTIONS.map(({ id, icon: Icon }) => {
          const on = audience === id;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setAudience(id)}
              className={cn(
                'relative inline-flex items-center gap-2 rounded-full font-semibold transition-colors',
                size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm sm:px-5',
                on ? 'text-white' : 'text-muted hover:text-ink dark:hover:text-white',
              )}
            >
              {on && (
                <motion.span
                  layoutId={`audience-pill-${size}`}
                  className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500 shadow-glow"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <Icon aria-hidden className="relative h-4 w-4" />
              <span className="relative">{t(`audience.${id}`)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
