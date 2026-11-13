import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { fadeUp, viewport } from '../../animations/variants';
import HandNote from '../../components/HandNote';
import PhoneFrame from '../../components/PhoneFrame';
import ScreenImage from '../../components/ScreenImage';
import StoreBadges from '../../components/StoreBadges';
import { useLanguage } from '../../context/LanguageContext';
import { useScreenSrc } from '../../hooks/useScreenSrc';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

/** "Download the app" band: store badges + a fan of three phones that opens in 3D on scroll. */
export default function Download() {
  const { t } = useTranslation();
  const src = useScreenSrc();
  const { isRTL } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const dir = isRTL ? -1 : 1;

  // the fan opens as the band scrolls into view
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 35%'] });
  const open = useSpring(useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 0, 1]), { stiffness: 80, damping: 20 });
  const sideX = useTransform(open, (v) => `${v * 92}%`);
  const sideXNeg = useTransform(open, (v) => `${-v * 92}%`);
  const sideRot = useTransform(open, (v) => v * 28);
  const sideRotNeg = useTransform(open, (v) => -v * 28);
  const centerY = useTransform(open, (v) => `${(1 - v) * 18}%`);

  // pointer tilt of the whole group
  const rx = useSpring(useMotionValue(0), { stiffness: 90, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 90, damping: 16 });
  const onMove = (e) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <section id="download" ref={ref} aria-labelledby="download-title" className="relative isolate pb-24 pt-32 sm:pt-40 lg:pb-32">
      <div className="container">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-brand-50 via-[#f3ecff] to-brand-100 ring-1 ring-brand-500/15 dark:from-[#1d0f36] dark:via-[#160b28] dark:to-[#2a1150]">
          <div aria-hidden className="grid-bg absolute inset-0 rounded-[2.5rem] opacity-60" />
          <div className="relative grid items-center gap-10 px-6 py-12 sm:px-12 lg:grid-cols-[1.15fr_1fr] lg:py-14">
            <div className="relative z-10">
              <HandNote arrow="down-end" rotate={-5} className="mb-5">
                {t('notes.download')}
              </HandNote>
              <motion.h2
                id="download-title"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                className="text-gradient font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl"
              >
                {t('download.title')}
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={viewport} className="lead mt-4 max-w-lg">
                {t('download.description')}
              </motion.p>
              <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={viewport} className="mt-8">
                <StoreBadges />
              </motion.div>
            </div>

            {/* phones fan: overflows above the band on large screens */}
            <div
              className="relative h-[360px] sm:h-[420px] lg:-mt-48 lg:h-[520px]"
              onPointerMove={onMove}
              onPointerLeave={reset}
              role="img"
              aria-label={t('download.phonesLabel')}
            >
              <motion.div
                style={{ rotateX: rx, rotateY: ry, transformPerspective: 1300 }}
                className="preserve-3d absolute inset-0 flex items-end justify-center"
              >
                <motion.div
                  style={{ x: dir === 1 ? sideXNeg : sideX, rotateY: dir === 1 ? sideRot : sideRotNeg, transformPerspective: 1000 }}
                  className="absolute bottom-6 w-[30%] max-w-[170px] opacity-90"
                >
                  <PhoneFrame className="w-full">
                    <ScreenImage src={src('servibot')} alt="" />
                  </PhoneFrame>
                </motion.div>
                <motion.div
                  style={{ x: dir === 1 ? sideX : sideXNeg, rotateY: dir === 1 ? sideRotNeg : sideRot, transformPerspective: 1000 }}
                  className="absolute bottom-6 w-[30%] max-w-[170px] opacity-90"
                >
                  <PhoneFrame className="w-full">
                    <ScreenImage src={src('dashboard')} alt="" />
                  </PhoneFrame>
                </motion.div>
                <motion.div style={{ y: centerY }} className="relative z-10 w-[40%] max-w-[230px]">
                  <PhoneFrame className="w-full">
                    <ScreenImage src={src('home')} alt="" />
                  </PhoneFrame>
                </motion.div>
              </motion.div>
              <div aria-hidden className="absolute bottom-0 start-1/2 h-10 w-[60%] -translate-x-1/2 rounded-[100%] bg-brand-900/30 blur-2xl rtl:translate-x-1/2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
