import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaHome, FaUsers, FaTrophy, FaHandshake } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';

/**
 * Animated statistics counter section
 */
const Statistics = () => {
  const stats = [
    { icon: FaHome, value: 500, suffix: '+', label: 'Properties Sold' },
    { icon: FaUsers, value: 1200, suffix: '+', label: 'Happy Clients' },
    { icon: FaTrophy, value: 15, suffix: '+', label: 'Years Experience' },
    { icon: FaHandshake, value: 50, suffix: '+', label: 'Expert Agents' },
  ];

  return (
    <section className="py-20 bg-primary text-white">
      <div className="container-custom">
        <SectionHeading
          title="Our Track Record"
          subtitle="By The Numbers"
          light
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Individual stat card with animated counter
 */
const StatCard = ({ stat, index }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setCount(stat.value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="text-center"
    >
      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
        <stat.icon className="text-3xl text-white" />
      </div>
      <p className="text-4xl md:text-5xl font-bold font-heading mb-2">
        {count.toLocaleString()}{stat.suffix}
      </p>
      <p className="text-white/80 font-medium">{stat.label}</p>
    </motion.div>
  );
};

export default Statistics;
