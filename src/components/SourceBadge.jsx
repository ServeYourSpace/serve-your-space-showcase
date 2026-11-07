import { Camera, PenTool } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils/cn';

/** Honest labelling: real screenshot vs. illustration of an existing feature. */
export default function SourceBadge({ real, className }) {
  const { t } = useTranslation();
  const Icon = real ? Camera : PenTool;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold',
        real
          ? 'bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-300'
          : 'bg-amber-500/12 text-amber-700 ring-1 ring-amber-500/30 dark:text-amber-300',
        className,
      )}
    >
      <Icon aria-hidden className="h-3 w-3" />
      {real ? t('showcase.real') : t('showcase.illustration')}
    </span>
  );
}
