import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <section className="pt-24 pb-20 min-h-screen flex items-center justify-center bg-light">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg mx-auto px-4"
      >
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaExclamationTriangle className="text-4xl text-primary" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold font-heading text-dark mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-4">
          Page Not Found
        </h2>
        <h3 className="text-lg md:text-xl text-gray-500 mb-8">
          Oops! The page you're looking for doesn't exist.
        </h3>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
        >
          <FaHome />
          Back to Home
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFound;
