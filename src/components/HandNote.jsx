import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const ARROWS = {
  // hand-drawn curved arrows, drawn pointing toward the end side / bottom
  'down-end': 'M6 8 C 30 4, 58 14, 62 46 M50 36 L62 48 L70 34',
  'down-start': 'M70 8 C 44 4, 18 16, 14 46 M4 34 L14 48 L26 36',
  end: 'M4 30 C 22 8, 46 8, 70 22 M58 12 L71 23 L56 30',
  start: 'M72 30 C 54 8, 30 8, 6 22 M20 12 L5 23 L20 30',
};

/** A handwritten annotation with a sketched arrow. Purely decorative. */
export default function HandNote({ children, arrow = 'down-end', className, rotate = -4, arrowClassName }) {
  const arrowFirst = arrow === 'start';
  const svg = (
    <motion.svg
      viewBox="0 0 76 54"
      fill="none"
      className={cn('flip-rtl h-10 w-14 shrink-0 text-brand-500', arrowClassName)}
      aria-hidden
    >
      <motion.path
        d={ARROWS[arrow]}
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.4 }}
      />
    </motion.svg>
  );
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{ rotate }}
      className={cn('pointer-events-none flex select-none items-end gap-1 text-brand-600 dark:text-brand-200', className)}
    >
      {arrowFirst && svg}
      <span className="font-hand text-[1.45rem] sm:text-[1.65rem]">{children}</span>
      {!arrowFirst && svg}
    </motion.div>
  );
}
