import { motion } from 'framer-motion';
import { fadeUp, viewport } from '../animations/variants';
import { cn } from '../utils/cn';
import AnimatedWords from './AnimatedWords';

export default function SectionHeading({ eyebrow, title, description, align = 'center', className, titleClassName, id }) {
  return (
    <div className={cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-start', className)}>
      {eyebrow && (
        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="eyebrow">
          {eyebrow}
        </motion.p>
      )}
      <AnimatedWords id={id} text={title} className={cn('h-section mt-5', titleClassName)} />
      {description && (
        <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={viewport} className="lead mt-5">
          {description}
        </motion.p>
      )}
    </div>
  );
}
