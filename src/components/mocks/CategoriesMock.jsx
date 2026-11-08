import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';
import MockShell from './MockShell';

const IMAGES = ['plombier', 'electricien', 'menuisier', 'peintre', 'menage', 'jardinier'];

export default function CategoriesMock({ dark }) {
  const { t } = useTranslation();
  const items = t('mock.categories.items');
  return (
    <MockShell dark={dark}>
      <p className="text-[1.45em] font-bold leading-tight">{t('mock.categories.title')}</p>
      <div
        className={cn(
          'mt-[0.8em] flex items-center gap-[0.5em] rounded-[0.9em] px-[0.8em] py-[0.65em] text-[0.8em]',
          dark ? 'bg-white/8 text-white/60 ring-1 ring-white/10' : 'bg-white text-black/45 shadow-sm',
        )}
      >
        <Search className="h-[1.1em] w-[1.1em]" aria-hidden />
        {t('mock.categories.search')}
      </div>
      <div className="mt-[0.9em] grid flex-1 grid-cols-2 gap-[0.6em] overflow-hidden">
        {IMAGES.map((img, i) => (
          <div key={img} className="relative overflow-hidden rounded-[0.9em]">
            <img src={`/images/app-categories/${img}.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute bottom-[0.55em] start-[0.6em] text-[0.85em] font-bold text-white">{items[i]}</span>
          </div>
        ))}
      </div>
    </MockShell>
  );
}
