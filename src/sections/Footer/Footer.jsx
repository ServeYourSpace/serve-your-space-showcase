import { ArrowUp, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/LanguageSelector';
import Logo from '../../components/Logo';
import ThemeToggle from '../../components/ThemeToggle';
import { CONTACT_EMAIL, NAV_ITEMS } from '../../data/navigation';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const company = [
    { href: '#about', label: t('footer.aboutUs') },
    { href: '#features', label: t('footer.features') },
    { href: '#showcase', label: t('footer.app') },
    { href: '#vision', label: t('nav.vision') },
  ];

  return (
    <footer id="contact" className="relative isolate overflow-hidden border-t border-brand-500/15 bg-bg-soft pt-16">
      <div aria-hidden className="absolute -bottom-40 start-1/2 -z-10 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-brand-500 blur-[140px] rtl:translate-x-1/2" style={{ opacity: 'calc(var(--glow-strength) * .5)' }} />
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm leading-relaxed text-muted">{t('footer.description')}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>

          <nav aria-label={t('footer.explore')}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink">{t('footer.explore')}</h2>
            <ul className="mt-5 grid gap-1">
              {NAV_ITEMS.filter((n) => n.id !== 'contact').map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="inline-flex min-h-[36px] items-center text-muted transition hover:text-brand-500">
                    {t(n.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t('footer.company')}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink">{t('footer.company')}</h2>
            <ul className="mt-5 grid gap-1">
              {company.map((c) => (
                <li key={c.href}>
                  <a href={c.href} className="inline-flex min-h-[36px] items-center text-muted transition hover:text-brand-500">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink">{t('footer.contact')}</h2>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="glass mt-5 flex items-center gap-3 rounded-2xl p-4 transition hover:shadow-glow"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500 text-white">
                <Mail aria-hidden className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-muted">{t('footer.email')}</span>
                <span className="block truncate font-semibold" dir="ltr">{CONTACT_EMAIL}</span>
              </span>
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-brand-500/15 py-8 text-sm text-muted sm:flex-row">
          <p>
            © {year} ServeYourSpace. {t('footer.rights')}
          </p>
          <a href="#home" className="inline-flex min-h-[44px] items-center gap-2 transition hover:text-brand-500">
            {t('footer.backToTop')}
            <ArrowUp aria-hidden className="h-4 w-4" />
          </a>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none select-none text-center font-display text-[10.4vw] font-extrabold leading-[0.8] tracking-tighter text-ink/[0.04] dark:text-white/[0.04]" dir="ltr">
        SERVEYOURSPACE
      </p>
    </footer>
  );
}
