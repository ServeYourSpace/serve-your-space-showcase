import { Clock3, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';
import MockShell from './MockShell';

// Mirrors the app's IncreasePriceModal: three suggested raises, "+25" marked popular.
const BASE = 150;
const DELTAS = [10, 25, 50];

export default function NegotiationMock({ dark }) {
  const { t } = useTranslation();
  const cur = t('mock.negotiation.currency');
  const card = dark ? 'bg-white/[0.06] ring-1 ring-white/10' : 'bg-white shadow-[0_8px_24px_-12px_rgba(60,20,120,.25)]';
  return (
    <MockShell dark={dark}>
      <p className="text-[1.45em] font-bold">{t('mock.negotiation.title')}</p>
      <div className={cn('mt-[0.8em] rounded-[1em] p-[0.9em]', card)}>
        <div className="flex items-center gap-[0.6em]">
          <span className="grid h-[2.2em] w-[2.2em] place-items-center rounded-[0.7em] bg-[#8a47fa] text-white">
            <Wrench className="h-[1.1em] w-[1.1em]" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[0.85em] font-semibold">{t('mock.negotiation.service')}</p>
            <p className="flex items-center gap-[0.3em] text-[0.7em] opacity-60">
              <Clock3 className="h-[1em] w-[1em]" aria-hidden />
              {t('mock.negotiation.status')}
            </p>
          </div>
        </div>
        <div className="mt-[0.8em] flex items-end justify-between">
          <span className="text-[0.72em] opacity-60">{t('mock.negotiation.current')}</span>
          <span className="text-[1.5em] font-extrabold text-[#8a47fa]" dir="ltr">
            {BASE} <span className="text-[0.55em]">{cur}</span>
          </span>
        </div>
      </div>

      {/* waiting for providers: radar + timer, as in the app's SearchingAnimation / WaitingTimer */}
      <div className="relative my-[0.8em] grid flex-1 place-items-center">
        {[1, 0.72, 0.44].map((k) => (
          <span
            key={k}
            aria-hidden
            className="absolute aspect-square rounded-full border border-[#8a47fa]/30"
            style={{ width: `${k * 9}em` }}
          />
        ))}
        <span aria-hidden className="absolute aspect-square w-[9em] animate-ping rounded-full bg-[#8a47fa]/10" />
        <span className="relative grid h-[3.2em] w-[3.2em] place-items-center rounded-full bg-gradient-to-br from-[#a06bfc] to-[#5b22bd] text-white shadow-[0_0_30px_#8a47fa]">
          <Wrench className="h-[1.4em] w-[1.4em]" aria-hidden />
        </span>
        <span className="absolute bottom-0 rounded-full bg-[#8a47fa]/15 px-[0.8em] py-[0.25em] text-[0.75em] font-bold tabular-nums text-[#8a47fa]" dir="ltr">
          02:45
        </span>
      </div>

      <div className={cn('rounded-t-[1.3em] p-[1em]', dark ? 'bg-[#1e1430] ring-1 ring-white/10' : 'bg-white shadow-[0_-10px_30px_-15px_rgba(60,20,120,.3)]')}>
        <div className={cn('mx-auto mb-[0.8em] h-[0.25em] w-[2.6em] rounded-full', dark ? 'bg-white/20' : 'bg-black/10')} />
        <p className="text-[1.05em] font-bold">{t('mock.negotiation.raise')}</p>
        <p className="mt-[0.2em] text-[0.7em] opacity-60">{t('mock.negotiation.hint')}</p>
        <div className="mt-[0.8em] grid grid-cols-3 gap-[0.45em]">
          {DELTAS.map((d) => {
            const popular = d === 25;
            return (
              <div
                key={d}
                className={cn(
                  'relative rounded-[0.8em] px-[0.3em] py-[0.7em] text-center',
                  popular ? 'bg-[#8a47fa] text-white shadow-[0_8px_20px_-8px_#8a47fa]' : dark ? 'bg-white/[0.06] ring-1 ring-white/10' : 'bg-[#f4effd] ring-1 ring-[#8a47fa]/15',
                )}
              >
                {popular && (
                  <span className="absolute -top-[0.75em] start-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#ffb020] px-[0.5em] py-[0.1em] text-[0.55em] font-bold text-[#2b1700] rtl:translate-x-1/2">
                    {t('mock.negotiation.popular')}
                  </span>
                )}
                <p className="text-[0.95em] font-extrabold" dir="ltr">{BASE + d}</p>
                <p className={cn('text-[0.62em]', popular ? 'text-white/80' : 'opacity-60')} dir="ltr">
                  +{d} {cur}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-[0.9em] rounded-[0.8em] bg-gradient-to-r from-[#8a47fa] to-[#5b22bd] py-[0.75em] text-center text-[0.8em] font-semibold text-white">
          {t('mock.negotiation.confirm')}
        </div>
      </div>
    </MockShell>
  );
}
