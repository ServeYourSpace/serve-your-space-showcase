import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { MapPin, Zap } from 'lucide-react';
import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ease } from '../../animations/variants';
import AnimatedWords from '../../components/AnimatedWords';
import Button from '../../components/Button';
import HandNote from '../../components/HandNote';
import PhoneFrame from '../../components/PhoneFrame';
import ScreenImage from '../../components/ScreenImage';
import { useScreenSrc } from '../../hooks/useScreenSrc';
import { useTheme } from '../../context/ThemeContext';
import { useInView } from '../../hooks/useInView';
import { useMediaQuery, usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { cn } from '../../utils/cn';

const HeroScene = lazy(() => import('./HeroScene'));

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

/** If WebGL fails at runtime, fall back to the CSS phone instead of a blank hero. */
class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function StaticPhone() {
  const src = useScreenSrc();
  return (
    <div className="absolute inset-0 grid place-items-center">
      <PhoneFrame className="w-[46%] max-w-[260px] animate-float">
        <ScreenImage eager src={src('home')} alt="" />
      </PhoneFrame>
    </div>
  );
}

function FloatCard({ children, className, depth = 20, mx, my, delay = 0 }) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease, delay }}
      className={cn('glass-strong absolute z-10 rounded-2xl p-3 shadow-soft', className)}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const reduced = usePrefersReducedMotion();
  const compact = useMediaQuery('(max-width: 767px)');
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const inView = useInView(visualRef);
  const [webgl, setWebgl] = useState(true);
  const cards = t('hero.cards');

  useEffect(() => setWebgl(hasWebGL()), []);

  // pointer parallax for the DOM cards
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  useEffect(() => {
    if (reduced) return undefined;
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my, reduced]);

  // scroll-out parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -90]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const fallback = <StaticPhone />;

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="noise relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-[calc(var(--nav-h)+2rem)] lg:pb-10"
    >
      {/* backdrop */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-b from-bg-soft via-bg to-bg dark:from-[#140a24] dark:via-night dark:to-night" />
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 end-[-10%] h-[44rem] w-[44rem] rounded-full bg-brand-500 blur-[140px]" style={{ opacity: 'var(--glow-strength)' }} />
        <div className="absolute bottom-[-20%] start-[-10%] h-[34rem] w-[34rem] rounded-full bg-brand-900 blur-[140px] dark:bg-brand-700" style={{ opacity: 'var(--glow-strength)' }} />
      </div>

      <div className="container grid items-center gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-4">
        {/* copy */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 text-center lg:text-start">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="eyebrow-pill"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            {t('hero.badge')}
          </motion.p>

          <h1 id="hero-title" className="mt-6 font-display text-[2.75rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.4rem] xl:text-[5.2rem]">
            <AnimatedWords as="span" immediate text={t('hero.title1')} className="block" delay={0.1} />
            <AnimatedWords as="span" immediate text={t('hero.title2')} className="block" delay={0.3} />
            <AnimatedWords as="span" immediate text={t('hero.title3')} className="block" wordClassName="text-gradient" delay={0.5} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.75 }}
            className="lead mx-auto mt-6 max-w-xl lg:mx-0"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.9 }}
            className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
          >
            <Button href="#about">{t('hero.ctaPrimary')}</Button>
            <Button href="#features" variant="ghost">
              {t('hero.ctaSecondary')}
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.15 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted lg:justify-start"
          >
            {t('hero.trust').map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="h-1 w-1 rounded-full bg-brand-500" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* 3D visual */}
        <motion.div
          ref={visualRef}
          style={{ y: visualY }}
          className="relative mx-auto aspect-[4/5] w-full max-w-[560px] sm:aspect-square lg:aspect-[5/6] lg:max-w-none"
          role="img"
          aria-label={t('hero.sceneLabel')}
        >
          <div aria-hidden className="absolute inset-[12%] rounded-full bg-brand-500/30 blur-[90px] animate-pulseglow" />
          <div className="absolute inset-y-0 -inset-x-[14%]" dir="ltr">
            {webgl ? (
              <SceneBoundary fallback={fallback}>
                <Suspense fallback={fallback}>
                  <HeroScene isDark={isDark} lang={i18n.language} compact={compact} reduced={reduced} active={inView} />
                </Suspense>
              </SceneBoundary>
            ) : (
              fallback
            )}
          </div>

          <HandNote arrow="down-end" rotate={-7} className="absolute -top-4 start-[22%] z-20 hidden lg:flex">
            {t('notes.hero')}
          </HandNote>

          {/* floating UI cards (DOM, so text stays crisp and translatable) */}
          <div aria-hidden>
            <FloatCard mx={mx} my={my} depth={-18} delay={1.0} className="start-0 top-[12%] w-[44%] max-w-[200px] sm:start-[2%]">
              <div className="relative h-16 overflow-hidden rounded-xl sm:h-20">
                <img src="/images/services/plombier.webp" alt="" className="h-full w-full object-cover" />
                <span className="absolute start-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                  {cards.categoryLabel}
                </span>
              </div>
              <p className="mt-2 text-sm font-bold">{cards.categoryName}</p>
              <p className="flex items-center gap-1 text-[11px] text-muted">
                <MapPin className="h-3 w-3 text-brand-500" />
                {cards.categoryMeta}
              </p>
            </FloatCard>

            <FloatCard mx={mx} my={my} depth={26} delay={1.15} className="bottom-[16%] start-[1%] hidden w-[230px] sm:block">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                  <Zap className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{cards.providerLabel}</p>
                  <p className="text-sm font-bold">{cards.providerName}</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {cards.providerMeta}
                  </p>
                </div>
              </div>
            </FloatCard>

            <FloatCard mx={mx} my={my} depth={22} delay={1.3} className="end-0 top-[8%] w-[46%] max-w-[210px] sm:end-[2%]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{cards.offerLabel}</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-brand-500" dir="auto">
                {cards.offerPrice}
              </p>
              <p className="mt-1 inline-flex rounded-full bg-brand-500/12 px-2 py-0.5 text-[11px] font-semibold text-brand-600 dark:text-brand-200" dir="auto">
                {cards.offerMeta}
              </p>
            </FloatCard>

            <FloatCard mx={mx} my={my} depth={-24} delay={1.45} className="bottom-[6%] end-0 flex w-[58%] max-w-[260px] items-center gap-2 sm:end-[3%]">
              <img src="/images/servibot/servibot_2.png" alt="" className="h-12 w-auto shrink-0" />
              <div>
                <p className="text-xs font-bold text-brand-600 dark:text-brand-200">{cards.botName}</p>
                <p className="text-[12px] leading-snug">{cards.botMsg}</p>
              </div>
            </FloatCard>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 start-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium text-muted transition hover:text-ink rtl:translate-x-1/2 lg:flex"
      >
        {t('hero.scroll')}
        <span className="flex h-9 w-5 justify-center rounded-full border border-current pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-current"
            animate={reduced ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </span>
      </a>
    </section>
  );
}
