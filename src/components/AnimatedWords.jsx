import { motion } from 'framer-motion';
import { Fragment } from 'react';
import { stagger, viewport, wordReveal } from '../animations/variants';
import { cn } from '../utils/cn';

/** Word-by-word reveal. Splitting on spaces keeps Arabic ligatures intact. */
export default function AnimatedWords({ id, text, as = 'h2', className, wordClassName, delay = 0, immediate = false }) {
  const Tag = motion[as];
  const words = String(text).split(' ');
  return (
    <Tag
      id={id}
      className={className}
      variants={stagger(0.06, delay)}
      initial="hidden"
      {...(immediate ? { animate: 'show' } : { whileInView: 'show', viewport })}
    >
      <span>
        {words.map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span variants={wordReveal} className={cn('inline-block', wordClassName)}>
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
