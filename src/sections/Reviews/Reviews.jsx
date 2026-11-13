import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { fadeUp, viewport } from '../../animations/variants';
import SectionHeading from '../../components/SectionHeading';
import { useLanguage } from '../../context/LanguageContext';
import { CONTACT_EMAIL } from '../../data/navigation';
import { REVIEWS, SAMPLE_REVIEWS } from '../../data/reviews';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { cn } from '../../utils/cn';

const isDemo = () => {
  try {
    return new URLSearchParams(window.location.search).get('reviews') === 'demo';
  } catch {
    return false;
  }
};

function Stars({ value, className }) {
  return (
    <span className={cn('flex gap-0.5', className)} aria-hidden>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={cn('h-4 w-4', n <= value ? 'fill-amber-400 text-amber-400' : 'text-ink/20 dark:text-white/20')} />
      ))}
    </span>
  );
}

function initials(name) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function ReviewCard({ review, sample }) {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const hue = [...review.name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  const service = review.service ? t(`services.items.${review.service}.name`, { defaultValue: '' }) : '';
  const meta = [t(`reviews.role.${review.role}`), service, review.city].filter(Boolean).join(' · ');

  return (
    <figure
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative flex w-[19rem] shrink-0 flex-col gap-4 rounded-3xl border border-brand-500/15 bg-surface/80 p-6 shadow-soft backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-brand-500/40 sm:w-[23rem]"
    >
      <div className="flex items-center justify-between">
        <Stars value={review.rating} />
        <span className="sr-only">{t('reviews.stars', { count: review.rating })}</span>
        {sample ? (
          <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-300">
            {t('reviews.sample')}
          </span>
        ) : (
          <Quote aria-hidden className="h-6 w-6 text-brand-500/30 rtl:-scale-x-100" />
        )}
      </div>
      <blockquote dir="auto" lang={review.lang} className="flex-1 text-[0.95rem] leading-relaxed text-ink/85 dark:text-white/85">
        {review.text}
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-brand-500/10 pt-4">
        <span
          aria-hidden
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
          style={{ background: `linear-gradient(135deg, hsl(${hue} 80% 62%), hsl(${(hue + 50) % 360} 70% 45%))` }}
        >
          {initials(review.name)}
        </span>
        <span className="min-w-0">
          <span dir="auto" className="block truncate font-semibold">
            {review.name}
          </span>
          <span className="block truncate text-xs text-muted">{meta}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** One endless row; the set is doubled so the loop is seamless, and it pauses on hover. */
function Row({ items, reverse, duration, sample, still }) {
  if (still) {
    return (
      <div className="flex gap-5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:px-8">
        {items.map((r, i) => (
          <ReviewCard key={i} review={r} sample={sample} />
        ))}
      </div>
    );
  }
  return (
    <div className="group flex overflow-hidden" dir="ltr">
      <div
        className={cn(
          'flex w-max gap-5 pe-5 group-hover:[animation-play-state:paused]',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {[...items, ...items].map((r, i) => (
          <div key={i} aria-hidden={i >= items.length}>
            <ReviewCard review={r} sample={sample} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  const { t } = useTranslation();
  const reduced = usePrefersReducedMotion();
  const demo = useMemo(isDemo, []);
  const sample = REVIEWS.length === 0 && demo;
  const list = sample ? SAMPLE_REVIEWS : REVIEWS;

  if (list.length === 0) return null;

  // spread the reviews over two rows moving in opposite directions; repeat short lists so rows stay full
  const filled = list.length < 8 ? Array.from({ length: Math.ceil(8 / list.length) }, () => list).flat() : list;
  const half = Math.ceil(filled.length / 2);
  const rows = [filled.slice(0, half), filled.slice(half)];
  const average = list.reduce((a, r) => a + r.rating, 0) / list.length;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-72 max-w-4xl rounded-full bg-brand-500 blur-[140px]" style={{ opacity: 'calc(var(--glow-strength) * .45)' }} />
      <div className="container">
        <SectionHeading id="reviews-title" eyebrow={t('reviews.eyebrow')} title={t('reviews.title')} description={t('reviews.description')} />
        <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="show" viewport={viewport} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {!sample && (
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-surface/70 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Stars value={Math.round(average)} />
              <span dir="ltr">{average.toFixed(1)}</span>
              <span className="text-muted">· {t('reviews.count', { count: list.length })}</span>
            </span>
          )}
          {sample && (
            <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-700 dark:text-amber-300">
              {t('reviews.sampleBanner')}
            </span>
          )}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t('reviews.mailSubject'))}`}
            className="inline-flex items-center rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            {t('reviews.leave')}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-14 grid gap-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
      >
        <Row items={rows[0]} duration={rows[0].length * 7} sample={sample} still={reduced} />
        {rows[1].length > 0 && <Row items={rows[1]} reverse duration={rows[1].length * 8} sample={sample} still={reduced} />}
      </motion.div>
    </section>
  );
}
