import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { fadeUp, flipIn, stagger, viewport } from '../animations/variants';
import AmbientGlow from '../components/AmbientGlow';
import HandNote from '../components/HandNote';
import PhoneFrame from '../components/PhoneFrame';
import ServiceIcon from '../components/ServiceIcon';
import StoreBadges from '../components/StoreBadges';
import CategoriesMock from '../components/mocks/CategoriesMock';
import { useTheme } from '../context/ThemeContext';
import { loadProviderStats, providerCountFor } from '../data/providerStats';
import { SERVICES, getService, servicePath } from '../data/services';
import NotFoundPage from './NotFoundPage';

function ProvidersCard({ service }) {
  const { t } = useTranslation();
  const [count, setCount] = useState(null);

  useEffect(() => {
    let alive = true;
    loadProviderStats().then((stats) => alive && setCount(providerCountFor(stats, service)));
    return () => {
      alive = false;
    };
  }, [service]);

  return (
    <div className="glass flex items-center gap-4 rounded-3xl p-4 sm:p-5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-500 text-white shadow-glow">
        <Users className="h-6 w-6" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted">{t('detail.providers')}</p>
        {count !== null ? (
          <>
            <p className="font-display text-xl font-bold">{t('detail.providersCount', { count })}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">{t('detail.providersLive')}</p>
          </>
        ) : (
          <>
            <p className="font-display text-lg font-bold">{t('detail.providersSoon')}</p>
            <p className="text-sm text-muted">{t('detail.providersHint')}</p>
          </>
        )}
      </div>
    </div>
  );
}

function TiltPhoto({ service, name }) {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -25, rotateX: 10, scale: 0.92 }}
      animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200 }}
      className="relative mx-auto w-full max-w-xl"
    >
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, '--h': service.hue }}
        className="preserve-3d relative aspect-[4/3.4] overflow-hidden rounded-[2.25rem] shadow-soft"
      >
        {service.image ? (
          <img src={service.image} alt={t('detail.photo', { name })} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,hsl(var(--h)_90%_70%),hsl(var(--h)_70%_28%))] text-white">
            <ServiceIcon name={service.icon} className="h-40 w-40 opacity-40" strokeWidth={1} />
          </div>
        )}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `linear-gradient(200deg, transparent 40%, hsl(${service.hue} 70% 20% / .55))` }}
        />
        <span className="absolute bottom-5 start-5 grid h-14 w-14 place-items-center rounded-2xl border border-white/25 bg-white/15 text-white backdrop-blur-md">
          <ServiceIcon name={service.icon} className="h-7 w-7" />
        </span>
      </motion.div>

      {/* floating phone with the categories screen */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateY: 30 }}
        animate={{ opacity: 1, y: 0, rotateY: -14 }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1000 }}
        className="absolute -bottom-10 -end-3 w-[34%] max-w-[170px] animate-float sm:-end-8"
      >
        <PhoneFrame className="w-full">
          <CategoriesMock dark={isDark} />
        </PhoneFrame>
      </motion.div>
    </motion.div>
  );
}

export default function ServiceDetailPage() {
  const { serviceKey } = useParams();
  const { t } = useTranslation();
  const service = getService(serviceKey);
  const name = service ? t(`services.items.${service.key}.name`) : '';

  useEffect(() => {
    if (!service) return undefined;
    const id = window.setTimeout(() => {
      document.title = `${name} · ServeYourSpace`;
    }, 0);
    return () => window.clearTimeout(id);
  }, [service, name]);

  if (!service) return <NotFoundPage />;

  const item = t(`services.items.${service.key}`);
  const steps = t('how.steps');
  const related = SERVICES.filter((s) => s.key !== service.key);

  return (
    <article className="relative isolate overflow-hidden pt-[calc(var(--nav-h)+2.5rem)]">
      <AmbientGlow variant="right" />
      <div aria-hidden className="grid-bg absolute inset-x-0 top-0 -z-10 h-[50rem]" />

      {/* intro */}
      <section className="container grid items-center gap-14 pb-24 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <div>
          <Link to="/#services" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-muted transition hover:text-brand-500">
            <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            {t('detail.back')}
          </Link>
          <motion.div variants={stagger(0.08)} initial="hidden" animate="show">
            <motion.span
              variants={fadeUp}
              className="mt-6 inline-grid h-14 w-14 place-items-center rounded-2xl text-white shadow-glow"
              style={{ background: `linear-gradient(135deg, hsl(${service.hue} 85% 65%), #5b22bd)` }}
            >
              <ServiceIcon name={service.icon} className="h-7 w-7" />
            </motion.span>
            <motion.h1 variants={fadeUp} className="mt-5 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {name}
            </motion.h1>
            <motion.p variants={fadeUp} className="lead mt-6 max-w-xl">
              {item.long}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 max-w-md">
              <ProvidersCard service={service} />
            </motion.div>
            <motion.div variants={fadeUp} className="mt-6">
              <StoreBadges />
            </motion.div>
          </motion.div>
        </div>
        <div className="relative">
          <TiltPhoto service={service} name={name} />
          <HandNote arrow="down-end" rotate={-6} className="absolute -top-12 start-2 hidden sm:flex">
            {t('notes.hero')}
          </HandNote>
        </div>
      </section>

      {/* what's included */}
      <section className="bg-bg-soft py-20 sm:py-24">
        <div className="container">
          <h2 className="eyebrow">{t('detail.includes')}</h2>
          <motion.ul
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {item.tasks.map((task, i) => (
              <motion.li key={task} variants={flipIn} custom={i} className="glass flex min-h-[150px] flex-col justify-between rounded-3xl p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-500/12 text-brand-600 dark:text-brand-200">
                  <Check className="h-5 w-5" strokeWidth={3} aria-hidden />
                </span>
                <p className="mt-6 font-display text-lg font-semibold leading-snug">{task}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* how it works + ServiBot */}
      <section className="container grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div>
          <h2 className="eyebrow">{t('detail.how')}</h2>
          <ol className="mt-8 grid gap-4">
            {steps.map((s, i) => (
              <motion.li
                key={s.label}
                variants={flipIn}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                className="flex gap-5 rounded-3xl border border-brand-500/15 p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-sm font-bold text-white" dir="ltr">
                  0{i + 1}
                </span>
                <div>
                  <p className="font-display text-lg font-bold">{s.label}</p>
                  <p className="mt-1 text-muted">{s.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
        <motion.div
          variants={flipIn}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-50 to-brand-100 p-7 ring-1 ring-brand-500/15 dark:from-[#1a0f30] dark:to-[#251046]"
        >
          <h2 className="font-display text-2xl font-bold">{t('detail.askBot')}</h2>
          <div className="mt-6 flex flex-col gap-3">
            <p className="max-w-[90%] self-end rounded-3xl rounded-ee-md bg-gradient-to-br from-brand-400 to-brand-700 px-4 py-3 text-white">
              {item.ask}
            </p>
            <p className="flex items-center gap-2 self-start rounded-3xl rounded-es-md bg-white/70 px-4 py-3 ring-1 ring-brand-500/15 dark:bg-white/5">
              <MapPin className="h-4 w-4 text-brand-500" aria-hidden />
              {t('servibot.chat.suggestions.1.text')}
            </p>
          </div>
          <img src="/images/servibot/servibot_2.png" alt="" aria-hidden className="ms-auto mt-4 h-36 w-auto animate-float" />
        </motion.div>
      </section>

      {/* related */}
      <section className="pb-20">
        <div className="container">
          <h2 className="eyebrow">{t('detail.related')}</h2>
        </div>
        <div className="no-scrollbar mt-8 overflow-x-auto">
          <ul className="container flex w-max gap-4 pb-4 sm:w-auto">
            {related.map((s) => (
              <li key={s.key} className="w-56 shrink-0">
                <Link
                  to={servicePath(s.key)}
                  className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-3xl p-5 text-white shadow-soft"
                  style={{ '--h': s.hue }}
                >
                  {s.image ? (
                    <img src={s.image} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  ) : (
                    <span className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--h)_90%_70%),hsl(var(--h)_70%_28%))]" />
                  )}
                  <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <ServiceIcon name={s.icon} className="mb-auto h-6 w-6" />
                  <span className="flex items-center justify-between gap-2 font-display text-lg font-bold">
                    {t(`services.items.${s.key}.name`)}
                    <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-gradient-to-br from-brand-500 via-brand-700 to-[#1d0942] p-8 text-white shadow-glow sm:p-10 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold">{t('detail.ctaTitle')}</h2>
            <p className="mt-2 max-w-xl text-white/80">{t('detail.ctaText')}</p>
          </div>
          <StoreBadges />
        </div>
      </section>
    </article>
  );
}
