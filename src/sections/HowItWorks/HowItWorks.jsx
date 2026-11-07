import { CircleCheckBig, Handshake, Search, Users } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MOTION_OK, gsap } from '../../animations/gsap';
import SectionHeading from '../../components/SectionHeading';
import { useGsap } from '../../hooks/useGsap';
import { cn } from '../../utils/cn';

const ICONS = [Search, Users, Handshake, CircleCheckBig];

export default function HowItWorks() {
  const { t } = useTranslation();
  const steps = t('how.steps');
  const root = useRef(null);
  const [reached, setReached] = useState(-1);
  const reachedRef = useRef(-1);

  useGsap(root, (mm) => {
    mm.add(
      { motion: MOTION_OK, reduce: '(prefers-reduced-motion: reduce)', desktop: '(min-width: 1024px)' },
      (ctx) => {
        const { motion, desktop } = ctx.conditions;
        const q = gsap.utils.selector(root);
        const bar = q(desktop ? '[data-bar-h]' : '[data-bar-v]');
        const cards = q('[data-step]');
        const update = (p) => {
          const i = Math.min(steps.length - 1, Math.floor(p * steps.length + 0.15)) - (p < 0.02 ? 1 : 0);
          if (i !== reachedRef.current) {
            reachedRef.current = i;
            setReached(i);
          }
        };

        if (!motion) {
          gsap.set(bar, desktop ? { scaleX: 1 } : { scaleY: 1 });
          reachedRef.current = steps.length - 1;
          setReached(steps.length - 1);
          return;
        }

        gsap.fromTo(
          bar,
          desktop ? { scaleX: 0 } : { scaleY: 0 },
          {
            ...(desktop ? { scaleX: 1 } : { scaleY: 1 }),
            ease: 'none',
            scrollTrigger: {
              trigger: q('[data-track]')[0],
              start: 'top 75%',
              end: 'bottom 55%',
              scrub: 0.6,
              onUpdate: (self) => update(self.progress),
            },
          },
        );
        gsap.from(cards, {
          y: 60,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: q('[data-track]')[0], start: 'top 80%' },
        });
      },
    );
  }, [steps.length]);

  return (
    <section ref={root} id="how" aria-labelledby="how-title" className="section isolate overflow-hidden bg-bg-soft">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div className="container">
        <SectionHeading id="how-title" eyebrow={t('how.eyebrow')} title={t('how.title')} description={t('how.description')} />

        <ol data-track className="relative mt-16 grid gap-8 ps-14 lg:mt-24 lg:grid-cols-4 lg:gap-6 lg:ps-0 lg:pt-20">
          {/* connecting lines */}
          <div aria-hidden className="absolute bottom-6 start-[1.4rem] top-6 w-[2px] bg-brand-500/15 lg:hidden">
            <div data-bar-v className="h-full w-full origin-top bg-gradient-to-b from-brand-400 to-brand-700" />
          </div>
          <div aria-hidden className="absolute start-[12.5%] end-[12.5%] top-[2.2rem] hidden h-[2px] bg-brand-500/15 lg:block">
            <div data-bar-h className="h-full w-full origin-left bg-gradient-to-r from-brand-400 via-brand-500 to-fuchsia-500 rtl:origin-right rtl:bg-gradient-to-l" />
          </div>

          {steps.map((s, i) => {
            const Icon = ICONS[i];
            const on = i <= reached;
            return (
              <li key={s.label} data-step className="relative lg:text-center">
                <span
                  className={cn(
                    'absolute -start-14 top-0 grid h-11 w-11 place-items-center rounded-full font-display text-sm font-bold transition-all duration-500 lg:-top-[4.2rem] lg:start-1/2 lg:h-14 lg:w-14 lg:-translate-x-1/2 lg:rtl:translate-x-1/2',
                    on ? 'scale-110 bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-glow' : 'glass text-muted',
                  )}
                  dir="ltr"
                >
                  0{i + 1}
                </span>
                <div className={cn('glass h-full rounded-4xl p-6 transition-all duration-500 sm:p-7', on && 'shadow-glow')}>
                  <span
                    className={cn(
                      'grid h-12 w-12 place-items-center rounded-2xl transition-colors duration-500 lg:mx-auto',
                      on ? 'bg-brand-500 text-white' : 'bg-brand-500/10 text-brand-600 dark:text-brand-200',
                    )}
                  >
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
                    <span className="sr-only">{t('how.step')} {i + 1}: </span>
                    {s.label}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold leading-snug">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
