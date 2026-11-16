import { smoothScrollTo } from './smoothScroll';

// The navbar offset comes from `scroll-padding-top` on <html> (used by Lenis and the browser alike).
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  smoothScrollTo(el);
}
