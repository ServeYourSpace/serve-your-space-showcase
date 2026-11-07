import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const KEY = 'sys-intro-seen';
const BRAND_BG = '#5e15ea'; // background colour of the logo animation
// soft edges so the video blends into the page even if the browser shifts its colours slightly
const MASK = 'radial-gradient(closest-side, #000 62%, transparent 100%)';

function shouldPlay() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return window.sessionStorage.getItem(KEY) !== '1';
  } catch {
    return false;
  }
}

/** The SERVE YOUR SPACE logo reveal, played once per visit before the site slides in. */
export default function IntroSplash() {
  const { t } = useTranslation();
  const [show, setShow] = useState(shouldPlay);
  const videoRef = useRef(null);

  const close = useCallback(() => {
    try {
      window.sessionStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
    setShow(false);
  }, []);

  useEffect(() => {
    if (!show) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const safety = window.setTimeout(close, 6500); // never trap the visitor
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    videoRef.current?.play().catch(() => close());
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(safety);
      window.removeEventListener('keydown', onKey);
    };
  }, [show, close]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] grid place-items-center"
          style={{ backgroundColor: BRAND_BG }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <video
            ref={videoRef}
            aria-hidden
            className="w-[min(78vmin,560px)]"
            style={{ maskImage: MASK, WebkitMaskImage: MASK }}
            muted
            playsInline
            autoPlay
            preload="auto"
            poster="/video/sys-intro-poster.jpg"
            onEnded={() => window.setTimeout(close, 350)}
            onError={close}
          >
            <source src="/video/sys-intro.webm" type="video/webm" />
            <source src="/video/sys-intro.mp4" type="video/mp4" />
          </video>
          <button
            type="button"
            onClick={close}
            className="absolute bottom-8 end-8 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
          >
            {t('intro.skip')}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
