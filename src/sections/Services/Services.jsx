import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Dumbbell, GraduationCap, Hammer, House, PaintRoller, Scissors, Sparkles, Sprout, Wrench, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import HandNote from '../../components/HandNote';
import { fadeUp, stagger, viewport } from '../../animations/variants';
import AmbientGlow from '../../components/AmbientGlow';
import SectionHeading from '../../components/SectionHeading';
import { SERVICES, servicePath } from '../../data/services';

const MotionLink = motion.create(Link);
import { cn } from '../../utils/cn';

const ICONS = { Wrench, Zap, PaintRoller, Sparkles, Hammer, Sprout, House, GraduationCap, Scissors, Dumbbell };

// Bento placement on large screens (4 columns).
const LAYOUT = {
  plumbing: 'lg:col-span-2 lg:row-span-2',
  maintenance: 'sm:col-span-2',
};

function ServiceCard({ item, index, t }) {
  const Icon = ICONS[item.icon];
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const shine = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,.22), transparent 45%)`;
  const big = item.key === 'plumbing';

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 12);
    rx.set(-(py - 0.5) * 12);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <MotionLink
      to={servicePath(item.key)}
      variants={fadeUp}
      custom={index % 4}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, '--h': item.hue }}
      className={cn(
        'group relative isolate flex min-h-[230px] flex-col justify-end overflow-hidden rounded-4xl p-6 text-white shadow-soft',
        big ? 'min-h-[320px] sm:col-span-2 lg:min-h-[480px]' : '',
        LAYOUT[item.key],
      )}
    >
      {item.image ? (
        <img
          src={item.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--h)_90%_70%),hsl(var(--h)_70%_30%))]">
          <Icon aria-hidden className="absolute -end-6 -top-6 h-48 w-48 opacity-15" strokeWidth={1} />
        </div>
      )}
      {/* per-service colour wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: `linear-gradient(180deg, hsl(${item.hue} 80% 40% / .05) 0%, hsl(${item.hue} 75% 18% / .55) 55%, rgb(11 7 18 / .92) 100%)` }}
      />
      <motion.div aria-hidden style={{ background: shine }} className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span
        className="absolute start-5 top-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]"
        style={{ boxShadow: `0 10px 30px -10px hsl(${item.hue} 90% 60% / .8)` }}
      >
        <Icon aria-hidden className="h-6 w-6" />
      </span>
      <span aria-hidden className="absolute end-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/0 opacity-0 transition-all duration-500 group-hover:bg-white/15 group-hover:opacity-100">
        <ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" />
      </span>

      <h3 className={cn('font-display font-bold leading-tight', big ? 'text-3xl sm:text-4xl' : 'text-xl')}>{t(`services.items.${item.key}.name`)}</h3>
      <p className={cn('mt-2 max-w-sm leading-relaxed text-white/80', big ? 'text-base' : 'text-sm')}>{t(`services.items.${item.key}.desc`)}</p>
    </MotionLink>
  );
}

export default function Services() {
  const { t } = useTranslation();
  const names = SERVICES.map((s) => t(`services.items.${s.key}.name`));

  return (
    <section id="services" aria-labelledby="services-title" className="section isolate overflow-hidden">
      <AmbientGlow variant="right" />
      <div className="container">
        <div className="relative">
          <SectionHeading id="services-title" eyebrow={t('services.eyebrow')} title={t('services.title')} description={t('services.description')} />
          <HandNote arrow="down-end" rotate={5} className="absolute -bottom-14 end-0 hidden lg:flex">
            {t('notes.services')}
          </HandNote>
        </div>

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid grid-flow-row-dense gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-5"
        >
          {SERVICES.map((item, i) => (
            <ServiceCard key={item.key} item={item} index={i} t={t} />
          ))}
          <motion.div
            variants={fadeUp}
            className="relative flex min-h-[230px] flex-col justify-center overflow-hidden rounded-4xl bg-gradient-to-br from-brand-400 via-brand-600 to-brand-900 p-7 text-white shadow-glow sm:col-span-2"
          >
            <div aria-hidden className="absolute -end-10 -top-10 h-48 w-48 rounded-full border border-white/20" />
            <div aria-hidden className="absolute -end-2 -top-2 h-32 w-32 rounded-full border border-white/20" />
            <img src="/logo/sys-icon-white.png" alt="" aria-hidden className="absolute bottom-6 end-7 h-16 w-auto opacity-25" />
            <p className="font-display text-2xl font-bold sm:text-3xl">{t('services.more')}</p>
            <a href="#download" className="mt-4 inline-flex w-max items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/25">
              {t('nav.cta')}
              <ArrowUpRight aria-hidden className="h-4 w-4 rtl:-scale-x-100" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* marquee of categories */}
      <div aria-hidden className="relative mt-16 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]" dir="ltr">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-4xl font-bold text-ink/10 sm:text-6xl dark:text-white/10">
          {[...names, ...names].map((n, i) => (
            <span key={`${n}-${i}`} className="flex items-center gap-10">
              {n}
              <span className="text-brand-500/40">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
