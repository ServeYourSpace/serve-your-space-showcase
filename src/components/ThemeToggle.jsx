import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

export default function ThemeToggle({ className, withLabel = false }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const label = isDark ? t('nav.toLight') : t('nav.toDark');

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        'glass relative inline-flex h-11 min-w-[44px] items-center justify-center gap-2 overflow-hidden rounded-full px-3 text-ink transition hover:text-brand-500',
        className,
      )}
    >
      <span className="relative grid h-5 w-5 place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 grid place-items-center"
          >
            {isDark ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
          </motion.span>
        </AnimatePresence>
      </span>
      {withLabel && <span className="text-sm font-medium">{isDark ? t('nav.dark') : t('nav.light')}</span>}
    </button>
  );
}
