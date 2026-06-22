import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import PropertyCard from '../ui/PropertyCard';
import SectionHeading from '../ui/SectionHeading';
import { properties } from '../../data/properties';
import { staggerContainer } from '../../utils/animations';

/**
 * Featured properties section for homepage
 */
const FeaturedProperties = () => {
  const featuredProperties = properties.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-20 bg-light">
      <div className="container-custom">
        <SectionHeading
          title="Featured Properties"
          subtitle="Premium Selection"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
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
            to="/properties"
            className="btn-outline inline-flex items-center gap-2"
          >
            View All Properties
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
