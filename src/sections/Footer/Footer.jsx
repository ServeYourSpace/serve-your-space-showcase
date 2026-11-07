import { ArrowUp, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSelector from '../../components/LanguageSelector';
import Wordmark from '../../components/Wordmark';
import SocialLinks from '../../components/SocialLinks';
import { activeSocials } from '../../data/links';
import StoreBadges from '../../components/StoreBadges';
import ThemeToggle from '../../components/ThemeToggle';
import { CONTACT_EMAIL, NAV_ITEMS } from '../../data/navigation';
import { SERVICES, servicePath } from '../../data/services';

const linkCls = 'inline-flex min-h-[34px] items-center text-muted transition hover:translate-x-0.5 hover:text-brand-500 rtl:hover:-translate-x-0.5';
const headCls = 'text-sm font-bold uppercase tracking-[0.12em] text-ink';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const hasSocials = activeSocials().length > 0;

  return (
    <footer id="contact" className="relative isolate overflow-hidden border-t border-brand-500/15 bg-bg-soft pt-16">
      <div aria-hidden className="absolute -bottom-40 start-1/2 -z-10 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-brand-500 blur-[140px] rtl:translate-x-1/2" style={{ opacity: 'calc(var(--glow-strength) * .5)' }} />
      <div className="container">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.4fr_1fr_1.1fr]">
          <div>
            <Wordmark className="h-[4.5rem]" />
            <p className="mt-5 max-w-sm leading-relaxed text-muted">{t('footer.description')}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-5 inline-flex items-center gap-2 font-semibold transition hover:text-brand-500">
              <Mail className="h-4 w-4 text-brand-500" aria-hidden />
              <span dir="ltr">{CONTACT_EMAIL}</span>
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>

          <nav aria-label={t('footer.services')}>
            <h2 className={headCls}>{t('footer.services')}</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-0.5">
              {SERVICES.map((s) => (
                <li key={s.key}>
                  <Link to={servicePath(s.key)} className={linkCls}>
                    {t(`services.items.${s.key}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t('footer.explore')}>
            <h2 className={headCls}>{t('footer.explore')}</h2>
            <ul className="mt-5 grid gap-0.5">
              {NAV_ITEMS.filter((n) => n.id !== 'contact').map((n) => (
                <li key={n.id}>
                  <a href={`/#${n.id}`} className={linkCls}>
                    {t(n.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="ServeYourSpace">
            <h2 className={headCls}>ServeYourSpace</h2>
            <ul className="mt-5 grid gap-0.5">
              <li>
                <a href="/#about" className={`${linkCls} gap-2`}>
                  {t('footer.becomePro')}
                  <span className="-rotate-6 rounded-md bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold text-white">{t('footer.pro')}</span>
                </a>
              </li>
              <li>
                <a href="/#about" className={linkCls}>{t('footer.aboutUs')}</a>
              </li>
              <li>
                <a href="/#showcase" className={linkCls}>{t('footer.app')}</a>
              </li>
              <li>
                <a href="/#vision" className={linkCls}>{t('nav.vision')}</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 grid gap-8 border-t border-brand-500/15 pt-8 md:grid-cols-2">
          <div>
            <p className="font-semibold">{t('footer.downloadTitle')}</p>
            <StoreBadges size="sm" className="mt-4" />
          </div>
          {hasSocials && (
            <div className="md:justify-self-end">
              <p className="font-semibold">{t('footer.follow')}</p>
              <SocialLinks className="mt-4" />
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-brand-500/15 py-8 text-sm text-muted sm:flex-row">
          <p>
            © {year} ServeYourSpace. {t('footer.rights')}
          </p>
          <a href="#main" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex min-h-[44px] items-center gap-2 transition hover:text-brand-500">
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
