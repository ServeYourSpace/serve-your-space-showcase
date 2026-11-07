import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils/cn';

/** Accessible dropdown (desktop) or segmented control (mobile menu). */
export default function LanguageSelector({ variant = 'dropdown', className }) {
  const { language, languages, changeLanguage, current } = useLanguage();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(0);
  const ref = useRef(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  useEffect(() => {
    if (open) ref.current?.querySelectorAll('[role="option"]')[focus]?.focus();
  }, [open, focus]);

  if (variant === 'segmented') {
    return (
      <div role="radiogroup" aria-label={t('nav.language')} className={cn('glass grid grid-cols-3 gap-1 rounded-2xl p-1', className)}>
        {languages.map((l) => (
          <button
            key={l.code}
            type="button"
            role="radio"
            aria-checked={language === l.code}
            lang={l.code}
            onClick={() => changeLanguage(l.code)}
            className={cn(
              'min-h-[44px] rounded-xl px-3 text-sm font-semibold transition',
              language === l.code ? 'bg-brand-500 text-white shadow-glow' : 'text-muted hover:text-ink',
            )}
          >
            {l.label}
          </button>
        ))}
      </div>
    );
  }

  const openList = () => {
    setFocus(Math.max(0, languages.findIndex((l) => l.code === language)));
    setOpen(true);
  };

  const onListKey = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
      ref.current?.querySelector('button')?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocus((f) => (f + 1) % languages.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocus((f) => (f - 1 + languages.length) % languages.length);
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t('nav.language')}: ${current.label}`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' && !open) {
            e.preventDefault();
            openList();
          }
        }}
        className="glass inline-flex h-11 items-center gap-1.5 rounded-full ps-3 pe-2.5 text-sm font-semibold text-ink transition hover:text-brand-500"
      >
        <Globe aria-hidden className="h-[17px] w-[17px]" />
        <span lang={current.code}>{current.short}</span>
        <ChevronDown aria-hidden className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label={t('nav.language')}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            onKeyDown={onListKey}
            className="glass-strong absolute end-0 top-[calc(100%+10px)] z-50 w-48 origin-top overflow-hidden rounded-2xl p-1.5 shadow-soft"
          >
            {languages.map((l) => {
              const selected = l.code === language;
              return (
                <li
                  key={l.code}
                  role="option"
                  tabIndex={-1}
                  aria-selected={selected}
                  lang={l.code}
                  dir={l.dir}
                  onClick={() => {
                    changeLanguage(l.code);
                    setOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      changeLanguage(l.code);
                      setOpen(false);
                    }
                  }}
                  className={cn(
                    'flex min-h-[44px] cursor-pointer items-center justify-between gap-3 rounded-xl px-3 text-sm outline-none transition',
                    selected ? 'bg-brand-500/15 font-semibold text-brand-600 dark:text-brand-200' : 'text-ink hover:bg-brand-500/10 focus:bg-brand-500/10',
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-500/10 text-[11px] font-bold text-brand-600 dark:text-brand-200">
                      {l.short}
                    </span>
                    {l.label}
                  </span>
                  {selected && <Check aria-hidden className="h-4 w-4" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
