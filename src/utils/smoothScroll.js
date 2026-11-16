import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../animations/gsap';

let lenis = null;

/** Starts Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function startSmoothScroll() {
  if (lenis || typeof window === 'undefined') return lenis;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true, autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  lenis.__tick = tick;
  return lenis;
}

export function stopSmoothScroll() {
  if (!lenis) return;
  gsap.ticker.remove(lenis.__tick);
  lenis.destroy();
  lenis = null;
}

/** Pause / resume while an overlay (intro, mobile menu) locks the page. */
export function lockScroll(locked) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

/** Smooth scroll to an element or a y position; falls back to the browser when Lenis is off. */
export function smoothScrollTo(target, { offset = 0, immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate });
    return;
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = immediate || reduce ? 'auto' : 'smooth';
  if (typeof target === 'number') window.scrollTo({ top: target, behavior });
  else target?.scrollIntoView({ behavior, block: 'start' });
}
