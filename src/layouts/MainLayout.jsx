import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import IntroSplash from '../components/IntroSplash';
import Navbar from '../components/Navbar';
import ScrollProgress from '../components/ScrollProgress';
import ClickSpark from '../components/reactbits/ClickSpark';
import Footer from '../sections/Footer';
import { scrollToId } from '../utils/scroll';
import { startSmoothScroll, stopSmoothScroll } from '../utils/smoothScroll';
import 'lenis/dist/lenis.css';

export default function MainLayout({ children }) {
  const { pathname } = useLocation();

  // Lenis smooth scrolling for the whole site (off for reduced-motion visitors)
  useEffect(() => {
    startSmoothScroll();
    return () => stopSmoothScroll();
  }, []);

  // in-page links (/#section) glide with Lenis instead of jumping
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href]');
      if (!a) return;
      const m = a.getAttribute('href').match(/^\/?#([\w-]+)$/);
      if (!m || pathname !== '/') return;
      const el = document.getElementById(m[1]);
      if (!el) return;
      e.preventDefault();
      scrollToId(m[1]);
      window.history.replaceState(null, '', `#${m[1]}`);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [pathname]);

  return (
    <ClickSpark sparkColor={['#8a47fa', '#c04bf2', '#f0a030']} sparkSize={9} sparkRadius={22} sparkCount={8} duration={420} className="!h-auto">
      <IntroSplash />
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </ClickSpark>
  );
}
