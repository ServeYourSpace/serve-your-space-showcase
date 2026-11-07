import { motion } from 'framer-motion';
import { Accessibility, Cpu, Eye, Feather, Lightbulb, ShieldCheck, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fadeUp, stagger, viewport } from '../../animations/variants';
import AmbientGlow from '../../components/AmbientGlow';
import AnimatedWords from '../../components/AnimatedWords';

const VALUE_ICONS = [Lightbulb, Feather, ShieldCheck, Accessibility, Cpu];

function Pillar({ icon: Icon, label, text, index }) {
  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      className="glass group relative isolate overflow-hidden rounded-4xl p-7 sm:p-9"
    >
      <div aria-hidden className="absolute -end-16 -top-16 -z-10 h-56 w-56 rounded-full bg-brand-500/25 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      <Icon aria-hidden className="absolute -bottom-6 -end-4 -z-10 h-40 w-40 text-brand-500/[0.07]" strokeWidth={1} />
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-glow">
        <Icon aria-hidden className="h-6 w-6" />
      </span>
      <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">{label}</h3>
      <p className="mt-3 font-display text-xl font-semibold leading-snug sm:text-2xl">{text}</p>
    </motion.article>
  );
}

export default function Vision() {
  const { t } = useTranslation();
  const values = t('vision.values');

  return (
    <section id="vision" aria-labelledby="vision-title" className="section isolate overflow-hidden">
      <AmbientGlow variant="left" />
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="eyebrow">
              {t('vision.eyebrow')}
            </motion.p>
            <AnimatedWords
              id="vision-title"
              text={t('vision.title')}
              className="mt-5 font-display text-[2.3rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            />
          </div>
          <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={viewport} className="lead lg:pb-3">
            {t('vision.intro')}
          </motion.p>
        </div>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20"
        >
          <Pillar index={0} icon={Target} label={t('vision.mission.label')} text={t('vision.mission.text')} />
          <Pillar index={1} icon={Eye} label={t('vision.vision.label')} text={t('vision.vision.text')} />
        </motion.div>

        <div className="mt-20 lg:mt-28">
          <motion.h3 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="eyebrow">
            {t('vision.valuesTitle')}
          </motion.h3>
          <motion.ul variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport} className="mt-6 border-t border-brand-500/15">
            {values.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <motion.li
                  key={v.name}
                  variants={fadeUp}
                  className="group relative grid gap-2 border-b border-brand-500/15 py-6 transition-colors sm:grid-cols-[4rem_1fr_1.1fr] sm:items-center sm:gap-6 sm:py-8"
                >
                  <span aria-hidden className="absolute inset-y-0 start-0 -z-10 w-0 bg-gradient-to-r from-brand-500/10 to-transparent transition-all duration-700 group-hover:w-full rtl:bg-gradient-to-l" />
                  <span className="flex items-center gap-3 font-display text-sm font-semibold text-brand-500" dir="ltr">
                    0{i + 1}
                  </span>
                  <p className="flex items-center gap-4 font-display text-3xl font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 sm:text-4xl lg:text-5xl">
                    <Icon aria-hidden className="h-7 w-7 shrink-0 text-brand-500 transition-transform duration-500 group-hover:rotate-12" />
                    {v.name}
                  </p>
                  <p className="text-muted sm:text-lg">{v.text}</p>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
