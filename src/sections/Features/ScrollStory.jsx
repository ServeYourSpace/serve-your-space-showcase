import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MOTION_OK, gsap } from '../../animations/gsap';
import { fadeUp, viewport } from '../../animations/variants';
import PhoneFrame from '../../components/PhoneFrame';
import ScreenContent from '../../components/ScreenContent';
import SectionHeading from '../../components/SectionHeading';
import SourceBadge from '../../components/SourceBadge';
import { useGsap } from '../../hooks/useGsap';
import { useMediaQuery, usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { cn } from '../../utils/cn';

// The narrative: app → discovery → providers → request & negotiation → ServiBot.
const CHAPTER_SCREENS = [
  { id: 'welcome', real: true },
  { id: 'home', real: true },
  { id: 'dashboard', real: true },
  { id: 'negotiation', real: false, mock: 'negotiation' },
  { id: 'servibot', real: true },
];
const GLOWS = ['#8a47fa', '#6d5dfc', '#c04bf2', '#f0a030', '#8a47fa'];

function PinnedStory({ chapters }) {
  const { t } = useTranslation();
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const n = chapters.length;

  useGsap(
    root,
    (mm) => {
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const phone = q('[data-phone]');
        const screens = q('[data-screen]');
        const texts = q('[data-text]');
        const glow = q('[data-glow]');
        const badges = q('[data-badge]');

        gsap.set(screens.slice(1), { autoAlpha: 0 });
        gsap.set(texts.slice(1), { autoAlpha: 0, y: 50 });
        gsap.set(badges.slice(1), { autoAlpha: 0 });
        gsap.set(phone, { rotationY: -42, rotationX: 22, rotationZ: -8, scale: 0.78, y: 60 });

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: q('[data-pin]')[0],
            start: 'top top',
            end: () => `+=${window.innerHeight * (n + 0.2)}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(n - 1, Math.floor(self.progress * n * 0.999));
              if (i !== activeRef.current) {
                activeRef.current = i;
                setActive(i);
              }
            },
          },
        });

        tl.to(phone, { rotationY: 0, rotationX: 0, rotationZ: 0, scale: 1, y: 0, duration: 1 });
        for (let i = 1; i < n; i += 1) {
          const at = `c${i}`;
          tl.addLabel(at, '+=0.35')
            .to(screens[i - 1], { autoAlpha: 0, scale: 0.94, duration: 0.5 }, at)
            .fromTo(screens[i], { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, at)
            .to(texts[i - 1], { autoAlpha: 0, y: -50, duration: 0.45 }, at)
            .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.5 }, `${at}+=0.15`)
            .to(badges[i - 1], { autoAlpha: 0, duration: 0.3 }, at)
            .to(badges[i], { autoAlpha: 1, duration: 0.3 }, `${at}+=0.2`)
            .to(phone, { rotationY: i % 2 ? 16 : -16, rotationZ: i % 2 ? -2 : 2, duration: 0.5 }, at)
            .to(phone, { rotationY: 0, rotationZ: 0, duration: 0.5 })
            .to(glow, { backgroundColor: GLOWS[i], duration: 1 }, at);
        }
        tl.to({}, { duration: 0.4 });
      });
    },
    [n],
  );

  return (
    <div ref={root}>
      <div data-pin className="relative flex h-[100svh] items-center overflow-hidden">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          {/* chapter copy */}
          <div className="relative">
            <div className="mb-8 flex items-center gap-2" aria-hidden>
              {chapters.map((c, i) => (
                <span
                  key={c.kicker}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-500',
                    i === active ? 'w-10 bg-brand-500' : i < active ? 'w-4 bg-brand-500/60' : 'w-4 bg-brand-500/20',
                  )}
                />
              ))}
            </div>
            <div className="grid">
              {chapters.map((c, i) => (
                <div key={c.kicker} data-text className="[grid-area:1/1]" aria-hidden={i !== active}>
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-500" dir="auto">
                    {c.kicker}
                  </p>
                  <h3 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight xl:text-6xl">{c.title}</h3>
                  <p className="lead mt-6 max-w-lg">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* phone stage */}
          <div className="perspective relative grid h-[78svh] place-items-center">
            <div
              data-glow
              aria-hidden
              className="absolute h-[70%] w-[70%] rounded-full blur-[110px]"
              style={{ backgroundColor: GLOWS[0], opacity: 'var(--glow-strength)' }}
            />
            <div aria-hidden className="absolute h-[86%] w-[86%] rounded-full border border-brand-500/15" />
            <div aria-hidden className="absolute h-[64%] w-[64%] rounded-full border border-dashed border-brand-500/20 animate-spin-slow" />
            <PhoneFrame data-phone className="preserve-3d relative h-[72svh] max-h-[640px] w-auto will-change-transform">
              {CHAPTER_SCREENS.map((s, i) => (
                <div key={s.id} data-screen className="absolute inset-0">
                  <ScreenContent screen={s} eager={i === 0} alt={i === active ? t('a11y.phoneOf', { name: chapters[i].title }) : ''} />
                </div>
              ))}
            </PhoneFrame>
            <div className="absolute bottom-0 grid">
              {CHAPTER_SCREENS.map((s) => (
                <div key={s.id} data-badge className="[grid-area:1/1] flex justify-center">
                  <SourceBadge real={s.real} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StackedStory({ chapters }) {
  return (
    <div className="container grid gap-20 pt-6">
      {chapters.map((c, i) => {
        const s = CHAPTER_SCREENS[i];
        return (
          <motion.article
            key={c.kicker}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid items-center gap-8 sm:grid-cols-2 sm:gap-10"
          >
            <motion.div variants={fadeUp} className={cn(i % 2 && 'sm:order-2')}>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-500" dir="auto">
                {c.kicker}
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{c.title}</h3>
              <p className="lead mt-4">{c.text}</p>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="relative mx-auto flex w-[62%] max-w-[260px] flex-col items-center gap-4 sm:w-[70%]">
              <div aria-hidden className="absolute inset-[10%] rounded-full bg-brand-500 blur-[70px]" style={{ opacity: 'var(--glow-strength)' }} />
              <PhoneFrame className="relative w-full">
                <ScreenContent screen={s} alt={c.title} />
              </PhoneFrame>
              <SourceBadge real={s.real} />
            </motion.div>
          </motion.article>
        );
      })}
    </div>
  );
}

export default function ScrollStory() {
  const { t } = useTranslation();
  const chapters = t('story.chapters');
  const desktop = useMediaQuery('(min-width: 1024px)');
  const reduced = usePrefersReducedMotion();

  return (
    <section id="features" aria-labelledby="story-title" className="relative isolate pt-24 sm:pt-28 lg:pt-36">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg-soft to-bg" />
      <div className="container">
        <SectionHeading id="story-title" eyebrow={t('story.eyebrow')} title={t('story.title')} />
      </div>
      {desktop && !reduced ? <PinnedStory chapters={chapters} /> : <StackedStory chapters={chapters} />}
      <div className="h-16 lg:h-24" />
    </section>
  );
}
