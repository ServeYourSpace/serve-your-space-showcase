import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { fadeUp, viewport } from '../../animations/variants';
import AnimatedWords from '../../components/AnimatedWords';
import Button from '../../components/Button';
import Wordmark from '../../components/Wordmark';
import { CONTACT_EMAIL } from '../../data/navigation';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { useAudienceT } from '../../context/AudienceContext';

export default function FinalCTA() {
  const { t } = useTranslation();
  const at = useAudienceT();
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const tilt = useTransform(scrollYProgress, [0, 1], [reduced ? 62 : 75, reduced ? 62 : 50]);
  const spin = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);

  return (
    <section ref={ref} id="get-started" aria-labelledby="cta-title" className="section isolate overflow-hidden">
      <div className="container">
        <div className="noise relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-500 via-brand-800 to-[#140726] px-6 py-20 text-center text-white shadow-glow sm:px-12 lg:py-28">
          {/* 3D orbit rings */}
          <div aria-hidden className="absolute inset-0 -z-10 grid place-items-center [perspective:900px]">
            <motion.div style={{ rotateX: tilt, rotateZ: spin }} className="preserve-3d relative h-[46rem] w-[46rem]">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-white/20"
                  style={{ inset: `${i * 14}%`, boxShadow: '0 0 40px rgba(185,143,255,.25) inset' }}
                >
                  <span className="absolute -top-1.5 start-1/2 h-3 w-3 rounded-full bg-white shadow-[0_0_20px_6px_rgba(200,160,255,.8)]" />
                </div>
              ))}
            </motion.div>
          </div>
          <div aria-hidden className="absolute -top-40 start-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-fuchsia-400/40 blur-[120px] rtl:translate-x-1/2" />

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="mx-auto w-max animate-float">
            <Wordmark variant="white" className="h-24 drop-shadow-[0_20px_40px_rgba(0,0,0,.35)] sm:h-28" />
          </motion.div>
          <AnimatedWords id="cta-title" text={t('cta.title')} className="mx-auto mt-8 max-w-4xl font-display text-[2.4rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl" />
          <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={viewport} className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            {at('cta.description')}
          </motion.p>
          <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="show" viewport={viewport} className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button href="#download" variant="light">
              {t('cta.primary')}
            </Button>
            <Button href={`mailto:${CONTACT_EMAIL}`} variant="ghost" icon={false} className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20">
              {t('cta.secondary')}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
