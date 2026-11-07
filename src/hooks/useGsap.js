import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../animations/gsap';

/**
 * Runs GSAP code inside a scoped context and reverts it on unmount / dependency change.
 * `setup` receives gsap.matchMedia() so animations can differ per breakpoint and
 * be skipped entirely for reduced-motion visitors.
 */
export function useGsap(scopeRef, setup, deps = []) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scopeRef.current || undefined);
    setup(mm);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => {
      window.clearTimeout(id);
      mm.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
