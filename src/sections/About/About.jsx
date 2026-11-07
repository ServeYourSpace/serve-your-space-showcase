import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Briefcase, Check, UserRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fadeUp, flipIn, stagger, viewport } from '../../animations/variants';
import AmbientGlow from '../../components/AmbientGlow';
import PhoneFrame from '../../components/PhoneFrame';
import ScreenImage from '../../components/ScreenImage';
import SectionHeading from '../../components/SectionHeading';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

function SideCard({ data, icon: Icon, screen, accent, index }) {
  const { isDark } = useTheme();
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 16 });
  const phoneRotY = useTransform(ry, (v) => v * 1.8 - 14);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="glass group relative isolate overflow-hidden rounded-4xl p-7 shadow-soft sm:p-9"
    >
      <div aria-hidden className={cn('absolute -top-24 end-[-4rem] -z-10 h-72 w-72 rounded-full blur-[90px] transition-opacity duration-500 group-hover:opacity-100', accent)} style={{ opacity: 'var(--glow-strength)' }} />
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/12 px-3 py-1.5 text-sm font-semibold text-brand-600 dark:text-brand-200">
            <Icon aria-hidden className="h-4 w-4" />
            {data.label}
          </span>
          <h3 className="mt-5 font-display text-2xl font-bold leading-snug sm:text-3xl">{data.title}</h3>
          <motion.ul variants={stagger(0.07, 0.2)} className="mt-6 grid gap-3">
            {data.items.map((item) => (
              <motion.li key={item} variants={fadeUp} className="flex items-start gap-3 text-[0.98rem]">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-glow">
                  <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <motion.div style={{ rotateY: phoneRotY }} className="perspective mx-auto w-[150px] sm:w-[170px] md:-mb-24 md:w-[180px]">
          <PhoneFrame className="w-full transition-transform duration-700 group-hover:-translate-y-3">
            <ScreenImage src={screen(isDark)} alt="" />
          </PhoneFrame>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" aria-labelledby="about-title" className="section isolate overflow-hidden">
      <AmbientGlow variant="left" />
      <div className="container">
        <SectionHeading id="about-title" eyebrow={t('about.eyebrow')} title={t('about.title')} description={t('about.description')} />
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8"
        >
          <SideCard
            index={0}
            data={t('about.customers')}
            icon={UserRound}
            accent="bg-brand-500"
            screen={(dark) => (dark ? '/screenshots/home.webp' : '/screenshots/home_fr.webp')}
          />
          <SideCard
            index={1}
            data={t('about.providers')}
            icon={Briefcase}
            accent="bg-fuchsia-500"
            screen={(dark) => (dark ? '/screenshots/dash_dark.webp' : '/screenshots/dash_light.webp')}
          />
        </motion.div>

        {/* everyday moments: why the app exists, in plain words */}
        <div className="mt-24 lg:mt-32">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{t('about.momentsTitle')}</h3>
            <p className="text-sm text-muted">{t('about.momentsNote')}</p>
          </div>
          <motion.ul
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mt-10 grid gap-6 md:grid-cols-3"
          >
            {t('about.moments').map((m, i) => (
              <motion.li
                key={m.time}
                variants={flipIn}
                custom={i}
                whileHover={{ rotate: 0, y: -6, rotateX: 0 }}
                style={{ rotate: [-2, 1.5, -1][i] }}
                className="relative rounded-3xl bg-surface p-7 shadow-soft ring-1 ring-brand-500/10"
              >
                <span aria-hidden className="absolute -top-3 start-8 h-6 w-16 -rotate-3 rounded-sm bg-brand-300/50 dark:bg-brand-500/40" />
                <p className="font-hand text-3xl text-brand-600 dark:text-brand-300">{m.time}</p>
                <p className="mt-3 text-lg leading-relaxed">{m.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
