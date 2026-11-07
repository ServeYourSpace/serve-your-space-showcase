import { Send, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';
import MockShell from './MockShell';

export default function ChatMock({ dark }) {
  const { t } = useTranslation();
  const them = dark ? 'bg-white/[0.08] ring-1 ring-white/10' : 'bg-white shadow-sm';
  return (
    <MockShell dark={dark} className="px-0 pb-0">
      <div className={cn('flex items-center gap-[0.6em] px-[1.1em] pb-[0.8em]', dark ? 'border-b border-white/10' : 'border-b border-black/5')}>
        <span className="grid h-[2.3em] w-[2.3em] place-items-center rounded-full bg-gradient-to-br from-[#ffb020] to-[#ff7a00] text-white">
          <Zap className="h-[1.1em] w-[1.1em]" aria-hidden />
        </span>
        <div>
          <p className="text-[0.95em] font-bold">{t('mock.chat.title')}</p>
          <p className="flex items-center gap-[0.3em] text-[0.68em] text-emerald-500">
            <span className="h-[0.5em] w-[0.5em] rounded-full bg-emerald-500" />
            {t('mock.chat.status')}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-[0.6em] px-[1.1em] py-[1em] text-[0.8em] leading-snug">
        <p className={cn('max-w-[82%] self-start rounded-[1.1em] rounded-ss-[0.3em] px-[0.9em] py-[0.6em]', them)}>{t('mock.chat.m1')}</p>
        <p className="max-w-[82%] self-end rounded-[1.1em] rounded-se-[0.3em] bg-[#8a47fa] px-[0.9em] py-[0.6em] text-white">{t('mock.chat.m2')}</p>
        <p className={cn('max-w-[82%] self-start rounded-[1.1em] rounded-ss-[0.3em] px-[0.9em] py-[0.6em]', them)}>{t('mock.chat.m3')}</p>
      </div>
      <div className={cn('flex items-center gap-[0.5em] px-[1em] pb-[1.4em] pt-[0.6em]', dark ? 'bg-white/[0.03]' : 'bg-white')}>
        <span className={cn('flex-1 rounded-full px-[0.9em] py-[0.6em] text-[0.75em]', dark ? 'bg-white/[0.06] text-white/50' : 'bg-[#f4effd] text-black/40')}>
          {t('mock.chat.input')}
        </span>
        <span className="grid h-[2.2em] w-[2.2em] place-items-center rounded-full bg-[#8a47fa] text-white">
          <Send className="h-[1em] w-[1em] rtl:-scale-x-100" aria-hidden />
        </span>
      </div>
    </MockShell>
  );
}
