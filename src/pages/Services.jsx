import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaHome, FaKey, FaTools, FaMapMarkedAlt, FaChartLine } from 'react-icons/fa';
import SectionHeading from '../components/ui/SectionHeading';
import { services } from '../data/services';
import { fadeInLeft, fadeInRight } from '../utils/animations';

const Services = () => {
  const iconMap = { FaHome, FaKey, FaTools, FaMapMarkedAlt, FaChartLine };

  return (
    <>
      <section className="relative pt-32 pb-20 bg-dark">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80" alt="Services background" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">Our Services</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">Comprehensive Real Estate Solutions</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">From property sales to investment consulting, we provide end-to-end real estate services tailored to your unique needs.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light">
        <div className="container-custom">
          <SectionHeading title="What We Offer" subtitle="Our Services" />
          <div className="space-y-20">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon];
              const isEven = index % 2 === 0;
              return (
                <motion.div key={service.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div variants={isEven ? fadeInLeft : fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className={!isEven ? 'lg:order-2' : ''}>
                    <div className="relative">
                      <img src={service.image} alt={service.title} className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
                      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-3xl font-bold text-white font-heading">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div variants={isEven ? fadeInRight : fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className={!isEven ? 'lg:order-1' : ''}>
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                      {IconComponent && <IconComponent className="text-2xl text-primary" />}
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-dark mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link to="/contact" className="btn-primary inline-flex items-center gap-2">Get Started <FaArrowRight /></Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">Contact us today to discuss your real estate needs. Our team of experts is ready to help you achieve your property goals.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary text-lg px-8 py-4">Contact Us</Link>
              <Link to="/properties" className="btn-outline border-white text-white hover:bg-white hover:text-dark text-lg px-8 py-4">Browse Properties</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
