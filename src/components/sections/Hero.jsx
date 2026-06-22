import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaPhone } from 'react-icons/fa';
import { fadeInUp } from '../../utils/animations';

/**
 * Hero section with background image, headline, and CTAs
 */
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Luxury property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center pt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="max-w-4xl mx-auto"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-primary font-medium text-sm uppercase tracking-widest mb-4"
          >
            Welcome to Schemelink Properties
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-white leading-tight mb-6"
          >
            Connecting You to
            <span className="block text-primary">Exceptional Properties</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Buy, sell, rent, and invest with confidence through Schemelink Properties Ltd.
            Your trusted partner in Nigerian real estate since 2009.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/properties"
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
            >
              <FaSearch />
              Explore Properties
            </Link>
            <Link
              to="/contact"
              className="btn-outline border-white text-white hover:bg-white hover:text-dark flex items-center gap-2 text-lg px-8 py-4"
            >
              <FaPhone />
              Contact an Agent
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: '500+', label: 'Properties Sold' },
            { value: '1,200+', label: 'Happy Clients' },
            { value: '15+', label: 'Years Experience' },
            { value: '50+', label: 'Expert Agents' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary font-heading">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
