import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '../data/navigation';
import { useActiveSection } from '../hooks/useActiveSection';
import { cn } from '../utils/cn';
import Button from './Button';
import LanguageSelector from './LanguageSelector';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

// Sections without their own nav entry highlight their parent item (or none).
const ALIASES = { showcase: 'features', how: null, 'get-started': null };
const ids = [...NAV_ITEMS.map((n) => n.id), ...Object.keys(ALIASES)];

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const seen = useActiveSection(ids);
  const active = seen in ALIASES ? ALIASES[seen] : seen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="fixed start-4 top-3 z-[100] -translate-y-24 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition focus:translate-y-0"
      >
        {t('nav.skip')}
      </a>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            'mx-auto mt-0 flex h-[var(--nav-h)] max-w-[1400px] items-center justify-between gap-3 px-4 transition-all duration-500 sm:px-6',
            scrolled && 'mt-2 h-[62px] w-[calc(100%-1rem)] rounded-full glass-strong shadow-soft sm:mt-3 sm:w-[calc(100%-2rem)]',
          )}
        >
          <a href="#home" aria-label="ServeYourSpace" className="shrink-0 rounded-xl">
            <Logo className="hidden sm:inline-flex" />
            <Logo compact className="sm:hidden" />
          </a>

          <nav aria-label={t('nav.primary')} className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={cn(
                      'relative block rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors',
                      active === item.id ? 'text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    {active === item.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-brand-500/12 ring-1 ring-brand-500/25"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSelector className="hidden sm:block" />
            <ThemeToggle className="hidden sm:inline-flex" />
            <Button href="#showcase" className="hidden !min-h-[44px] !px-5 !py-2.5 text-sm lg:inline-flex">
              {t('nav.cta')}
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t('nav.openMenu')}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="glass grid h-11 w-11 place-items-center rounded-full text-ink xl:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.primary')}
            className="fixed inset-0 z-[60] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-bg/70 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong absolute inset-x-2 top-2 flex max-h-[calc(100dvh-1rem)] flex-col overflow-y-auto rounded-[2rem] p-5 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  autoFocus
                  onClick={() => setOpen(false)}
                  aria-label={t('nav.closeMenu')}
                  className="glass grid h-11 w-11 place-items-center rounded-full text-ink"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <nav aria-label={t('nav.primary')} className="mt-6">
                <ul className="grid gap-1">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'flex min-h-[52px] items-center justify-between rounded-2xl px-4 font-display text-xl font-semibold transition',
                          active === item.id ? 'bg-brand-500/12 text-brand-600 dark:text-brand-200' : 'text-ink hover:bg-brand-500/8',
                        )}
                      >
                        {t(item.key)}
                        <span className="text-xs font-medium text-muted" dir="ltr">
                          0{i + 1}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 grid gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">{t('nav.language')}</p>
                <LanguageSelector variant="segmented" />
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">{t('nav.theme')}</p>
                  <ThemeToggle withLabel />
                </div>
                <Button href="#showcase" onClick={() => setOpen(false)} className="mt-2 w-full">
                  {t('nav.cta')}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
