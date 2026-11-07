export const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 32, rotateX: 14, transformPerspective: 900 },
  show: (i = 0) => ({ opacity: 1, y: 0, rotateX: 0, transformPerspective: 900, transition: { duration: 0.8, ease, delay: i * 0.08 } }),
};

export const stagger = (step = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

export const wordReveal = {
  hidden: { opacity: 0, y: '0.7em', rotateX: -70, filter: 'blur(6px)', transformPerspective: 600 },
  show: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transformPerspective: 600, transition: { duration: 0.9, ease } },
};

export const viewport = { once: true, margin: '0px 0px -12% 0px' };

// 3D entrance: the element swings up from a tilted plane.
export const flipIn = {
  hidden: { opacity: 0, rotateX: 38, y: 50, transformPerspective: 900 },
  show: (i = 0) => ({
    opacity: 1,
    rotateX: 0,
    y: 0,
    transformPerspective: 900,
    transition: { duration: 0.9, ease, delay: i * 0.08 },
  }),
};
