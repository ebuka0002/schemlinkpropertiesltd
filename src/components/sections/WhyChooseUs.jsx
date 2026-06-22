import { motion } from 'framer-motion';
import { FaShieldAlt, FaHandshake, FaChartLine, FaUsers, FaClock, FaAward } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';
import { staggerContainer, staggerItem } from '../../utils/animations';

/**
 * Why Choose Us section with feature cards
 */
const WhyChooseUs = () => {
  const features = [
    {
      icon: FaShieldAlt,
      title: 'Verified Properties',
      description: 'Every property in our portfolio undergoes rigorous verification to ensure legal compliance and accurate documentation.',
    },
    {
      icon: FaHandshake,
      title: 'Trusted Partnerships',
      description: 'We build lasting relationships with clients through transparency, integrity, and exceptional service delivery.',
    },
    {
      icon: FaChartLine,
      title: 'Market Expertise',
      description: 'Our deep understanding of the Nigerian real estate market helps you make informed investment decisions.',
    },
    {
      icon: FaUsers,
      title: 'Expert Agents',
      description: 'Our team of certified real estate professionals brings decades of combined experience to serve you better.',
    },
    {
      icon: FaClock,
      title: '24/7 Support',
      description: 'We are always available to answer your questions, schedule viewings, and provide updates on your transactions.',
    },
    {
      icon: FaAward,
      title: 'Award Winning',
      description: 'Recognized as one of Nigeria\'s top real estate firms with multiple industry awards for excellence and innovation.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <SectionHeading
          title="Why Choose Schemelink"
          subtitle="Our Advantages"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              className="group p-8 bg-light rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <feature.icon className="text-2xl text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
