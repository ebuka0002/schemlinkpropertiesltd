import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';
import { services } from '../../data/services';
import { staggerContainer, staggerItem } from '../../utils/animations';

/**
 * Services overview section for homepage
 */
const ServicesOverview = () => {
  return (
    <section className="py-20 bg-dark text-white">
      <div className="container-custom">
        <SectionHeading
          title="Our Services"
          subtitle="What We Offer"
          light
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              className="group p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <span className="text-2xl font-bold text-primary group-hover:text-white transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3">
                {service.description}
              </p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
              >
                Learn More
                <FaArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className="btn-primary inline-flex items-center gap-2"
          >
            View All Services
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
