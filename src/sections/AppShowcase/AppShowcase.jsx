import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ease } from '../../animations/variants';
import AmbientGlow from '../../components/AmbientGlow';
import PhoneFrame from '../../components/PhoneFrame';
import ScreenContent from '../../components/ScreenContent';
import SectionHeading from '../../components/SectionHeading';
import SourceBadge from '../../components/SourceBadge';
import { useLanguage } from '../../context/LanguageContext';
import { SHOWCASE_SCREENS } from '../../data/screens';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { cn } from '../../utils/cn';

const N = SHOWCASE_SCREENS.length;
const wrap = (i) => (i + N) % N;

export default function AppShowcase() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);
  const dir = isRTL ? -1 : 1;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'center center'] });
  const stageRotate = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 28, 0]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 0.86, 1]);

  const go = useCallback((delta) => setIndex((i) => wrap(i + delta)), []);
  const current = SHOWCASE_SCREENS[index];
  const info = t(`showcase.screens.${current.id}`);

  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(isRTL ? -1 : 1);
    if (e.key === 'ArrowLeft') go(isRTL ? 1 : -1);
  };

  const side = (offset) => SHOWCASE_SCREENS[wrap(index + offset)];

  return (
    <section id="showcase" ref={sectionRef} aria-labelledby="showcase-title" className="section isolate overflow-hidden">
      <AmbientGlow variant="center" />
      <div className="container">
        <SectionHeading id="showcase-title" eyebrow={t('showcase.eyebrow')} title={t('showcase.title')} description={t('showcase.description')} />

        <motion.div
          style={{ rotateX: stageRotate, scale: stageScale, transformPerspective: 1400 }}
          className="relative mt-14 lg:mt-20"
        >
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label={t('showcase.title')}
            tabIndex={0}
            onKeyDown={onKey}
            className="perspective relative mx-auto flex h-[480px] max-w-5xl items-center justify-center rounded-4xl sm:h-[600px] lg:h-[660px]"
          >
            {/* floor reflection */}
            <div aria-hidden className="absolute bottom-0 h-24 w-[70%] rounded-[100%] bg-brand-500/25 blur-3xl" />

            {[-2, -1, 1, 2].map((o) => {
              const s = side(o);
              const abs = Math.abs(o);
              return (
                <motion.button
                  key={`${o}-${s.id}`}
                  type="button"
                  aria-label={t(`showcase.screens.${s.id}.title`)}
                  tabIndex={-1}
                  onClick={() => go(o)}
                  initial={false}
                  animate={{
                    x: `${o * dir * (abs === 1 ? 62 : 108)}%`,
                    rotateY: -o * dir * 26,
                    scale: abs === 1 ? 0.8 : 0.64,
                    opacity: abs === 1 ? 0.75 : 0.32,
                  }}
                  transition={{ duration: 0.7, ease }}
                  className={cn('absolute w-[42%] max-w-[230px] sm:w-[240px] lg:w-[270px]', abs === 2 && 'hidden md:block')}
                  style={{ zIndex: 10 - abs }}
                >
                  <PhoneFrame className="pointer-events-none w-full">
                    <ScreenContent screen={s} alt="" />
                  </PhoneFrame>
                </motion.button>
              );
            })}

            <motion.div
              className="relative z-20 w-[54%] max-w-[270px] cursor-grab active:cursor-grabbing sm:w-[280px] lg:w-[300px]"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info2) => {
                if (Math.abs(info2.offset.x) > 60) go(info2.offset.x < 0 ? dir : -dir);
              }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, rotateY: 40 * dir, scale: 0.9 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: -40 * dir, scale: 0.9 }}
                  transition={{ duration: 0.55, ease }}
                >
                  <PhoneFrame className="w-full" label={info.title}>
                    <ScreenContent screen={current} alt={info.title} />
                  </PhoneFrame>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t('showcase.prev')}
              className="glass-strong absolute start-0 z-30 grid h-12 w-12 place-items-center rounded-full text-ink shadow-soft transition hover:scale-105 hover:text-brand-500 sm:start-4"
            >
              <ChevronLeft aria-hidden className="h-5 w-5 rtl:-scale-x-100" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t('showcase.next')}
              className="glass-strong absolute end-0 z-30 grid h-12 w-12 place-items-center rounded-full text-ink shadow-soft transition hover:scale-105 hover:text-brand-500 sm:end-4"
            >
              <ChevronRight aria-hidden className="h-5 w-5 rtl:-scale-x-100" />
            </button>
          </div>
        </motion.div>

        {/* caption */}
        <div className="mx-auto mt-6 min-h-[120px] max-w-xl text-center" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <SourceBadge real={current.real} />
              <h3 className="mt-3 font-display text-2xl font-bold">{info.title}</h3>
              <p className="mt-2 text-muted">{info.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* screen picker */}
        <div className="no-scrollbar -mx-4 mt-6 overflow-x-auto px-4">
          <ul className="mx-auto flex w-max gap-2 pb-2">
            {SHOWCASE_SCREENS.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className={cn(
                    'min-h-[44px] whitespace-nowrap rounded-full px-4 text-sm font-medium transition',
                    i === index ? 'bg-brand-500 text-white shadow-glow' : 'glass text-muted hover:text-ink',
                  )}
                >
                  {t(`showcase.screens.${s.id}.title`)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
