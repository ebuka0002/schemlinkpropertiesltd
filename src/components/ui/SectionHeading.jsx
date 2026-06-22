import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';

/**
 * Reusable section heading component with animation
 */
const SectionHeading = ({ title, subtitle, align = 'center', light = false }) => {
  const alignClass = align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right';

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`mb-12 ${alignClass}`}
    >
      {subtitle && (
        <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-2">
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold font-heading ${light ? 'text-white' : 'text-dark'}`}>
        {title}
      </h2>
      <div className={`mt-4 h-1 w-20 ${align === 'center' ? 'mx-auto' : ''} bg-primary rounded-full`} />
    </motion.div>
  );
};

export default SectionHeading;
