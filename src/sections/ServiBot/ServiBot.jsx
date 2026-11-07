import { AnimatePresence, motion, useInView } from 'framer-motion';
import { MapPin, MessageSquareText, Search, Send, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fadeUp, stagger, viewport } from '../../animations/variants';
import AnimatedWords from '../../components/AnimatedWords';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { cn } from '../../utils/cn';

const CAP_ICONS = [MessageSquareText, Search, MapPin, UserRound];
const SUGGESTION_ICONS = [UserRound, MapPin, MessageSquareText];
// Conversation script: who speaks, and when (ms after the chat scrolls into view).
const SCRIPT = [
  { from: 'user', key: 'user1', at: 600 },
  { from: 'bot', key: 'bot1', at: 2300 },
  { from: 'user', key: 'user2', at: 3900 },
  { from: 'bot', key: 'bot2', at: 5600 },
];

function Typing() {
  return (
    <span className="inline-flex items-center gap-1 px-1 py-1" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-1.5 w-1.5 animate-typing rounded-full bg-brand-400" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
  );
}

function ChatWindow() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const suggestions = t('servibot.chat.suggestions');

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setShown(SCRIPT.length);
      return undefined;
    }
    const timers = [];
    SCRIPT.forEach((m, i) => {
      if (m.from === 'bot') timers.push(setTimeout(() => setTyping(true), m.at - 900));
      timers.push(
        setTimeout(() => {
          setTyping(false);
          setShown(i + 1);
        }, m.at),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [inView, reduced]);

  return (
    <div ref={ref} className="glass-strong relative overflow-hidden rounded-4xl shadow-soft">
      <div className="flex items-center justify-between border-b border-brand-500/15 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-brand-300 to-brand-700">
            <img src="/images/servibot/servibot_1.png" alt="" className="mt-3 h-12 w-auto" />
          </span>
          <div>
            <p className="font-display font-bold">{t('servibot.chat.name')}</p>
            <p className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {t('servibot.chat.status')}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-brand-500/10 px-3 py-1 text-[11px] font-semibold text-brand-600 dark:text-brand-200">
          {t('servibot.chat.example')}
        </span>
      </div>

      <div className="flex min-h-[340px] flex-col gap-3 px-5 py-5" aria-live="polite">
        {/* quick suggestions, as in the app */}
        <div className="grid gap-2 sm:grid-cols-3">
          {suggestions.map((s, i) => {
            const Icon = SUGGESTION_ICONS[i];
            return (
              <div
                key={s.title}
                className={cn(
                  'rounded-2xl p-3 text-start text-xs ring-1 transition',
                  i === 0 ? 'bg-brand-500 text-white ring-brand-500' : 'bg-brand-500/5 ring-brand-500/20',
                )}
              >
                <Icon aria-hidden className="mb-1.5 h-4 w-4" />
                <p className="font-semibold">{s.title}</p>
                <p className={cn('mt-0.5 leading-snug', i === 0 ? 'text-white/80' : 'text-muted')}>{s.text}</p>
              </div>
            );
          })}
        </div>

        <AnimatePresence initial={false}>
          {SCRIPT.slice(0, shown).map((m) => (
            <motion.p
              key={m.key}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35 }}
              className={cn(
                'max-w-[85%] rounded-3xl px-4 py-2.5 text-[0.92rem] leading-relaxed',
                m.from === 'user'
                  ? 'self-end rounded-ee-md bg-gradient-to-br from-brand-400 to-brand-700 text-white'
                  : 'self-start rounded-es-md bg-brand-500/10 text-ink ring-1 ring-brand-500/15',
              )}
            >
              {t(`servibot.chat.${m.key}`)}
            </motion.p>
          ))}
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="self-start rounded-3xl rounded-es-md bg-brand-500/10 px-4 py-2 ring-1 ring-brand-500/15"
            >
              <Typing />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 border-t border-brand-500/15 px-4 py-3">
        <span className="flex-1 rounded-full bg-brand-500/8 px-4 py-2.5 text-sm text-muted">{t('servibot.chat.placeholder')}</span>
        <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-white shadow-glow">
          <Send className="h-4 w-4 rtl:-scale-x-100" />
        </span>
      </div>
    </div>
  );
}

export default function ServiBot() {
  const { t } = useTranslation();
  const caps = t('servibot.capabilities');

  return (
    <section id="servibot" aria-labelledby="servibot-title" className="section isolate overflow-hidden">
      <div className="container">
        <div className="noise relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50 via-white to-brand-100 px-5 py-14 ring-1 ring-brand-500/15 dark:from-[#1a0f30] dark:via-[#0f0819] dark:to-[#251046] sm:px-10 lg:px-14 lg:py-20">
          {/* AI ambience */}
          <div aria-hidden className="grid-bg absolute inset-0 -z-10 opacity-70" />
          <div aria-hidden className="absolute -top-32 start-1/4 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand-500 blur-[130px]" style={{ opacity: 'var(--glow-strength)' }} />
          <div aria-hidden className="absolute -bottom-40 end-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-fuchsia-500 blur-[130px]" style={{ opacity: 'calc(var(--glow-strength) * .6)' }} />

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div>
              <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                {t('servibot.eyebrow')}
              </motion.p>
              <h2 id="servibot-title" className="h-section mt-5">
                <AnimatedWords as="span" text={t('servibot.title1')} className="block" />
                <AnimatedWords as="span" text={t('servibot.title2')} className="block" wordClassName="text-gradient" delay={0.2} />
              </h2>
              <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={viewport} className="lead mt-5 max-w-xl">
                {t('servibot.description')}
              </motion.p>

              <motion.ul
                variants={stagger(0.08)}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                className="mt-10 grid gap-3 sm:grid-cols-2"
              >
                {caps.map((c, i) => {
                  const Icon = CAP_ICONS[i];
                  return (
                    <motion.li key={c.title} variants={fadeUp} className="glass flex gap-3 rounded-3xl p-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-500/12 text-brand-600 dark:text-brand-200">
                        <Icon aria-hidden className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-semibold">{c.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{c.text}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>

            <div className="relative pt-36 sm:pt-40">
              {/* robot floating above the chat */}
              <div className="absolute end-2 top-0 grid h-52 w-52 place-items-center sm:end-8 sm:h-60 sm:w-60">
                <div aria-hidden className="absolute inset-0 rounded-full border border-brand-500/25" />
                <div aria-hidden className="absolute inset-5 animate-spin-slow rounded-full border border-dashed border-brand-500/40" />
                <div aria-hidden className="absolute inset-12 animate-pulseglow rounded-full bg-brand-500/40 blur-2xl" />
                <span aria-hidden className="absolute start-2 top-10 h-2.5 w-2.5 rounded-full bg-brand-400 shadow-glow" />
                <span aria-hidden className="absolute bottom-12 end-1 h-2 w-2 rounded-full bg-fuchsia-400 shadow-glow" />
                <img
                  src="/images/servibot/servibot_2.png"
                  alt="ServiBot"
                  loading="lazy"
                  className="relative h-[82%] w-auto animate-float drop-shadow-[0_30px_40px_rgba(70,20,160,.45)]"
                />
              </div>
              <div className="relative z-10">
                <ChatWindow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
