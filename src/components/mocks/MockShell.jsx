import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../utils/cn';

/**
 * Shared shell for illustrative screens. Sizes are expressed in `em`
 * against a container-relative root size, so mocks scale with the phone.
 */
export default function MockShell({ dark, children, className }) {
  const { dir } = useLanguage();
  return (
    <div className="absolute inset-0" style={{ containerType: 'inline-size' }}>
      <div
        dir={dir}
        style={{ fontSize: '4.1cqw' }}
        className={cn(
          'flex h-full w-full flex-col px-[1.1em] pb-[1.2em] pt-[3.4em] font-sans',
          dark ? 'bg-[#120b1f] text-white' : 'bg-[#f6f3fd] text-[#1d1230]',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
