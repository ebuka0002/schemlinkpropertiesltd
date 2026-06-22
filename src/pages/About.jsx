import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaHandshake, FaLightbulb } from 'react-icons/fa';
import SectionHeading from '../components/ui/SectionHeading';
import Statistics from '../components/sections/Statistics';
import { CORE_VALUES } from '../utils/constants';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '../utils/animations';

/**
 * About page with company story, mission, vision, and values
 */
const About = () => {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-dark">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="About background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">
              Building Trust, Delivering Homes
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Since 2009, Schemelink Properties Ltd has been at the forefront of Nigeria's real estate industry, connecting people with exceptional properties.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-dark mb-6">
                A Legacy of Excellence in Nigerian Real Estate
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Schemelink Properties Ltd was founded in 2009 with a simple mission: to transform the way Nigerians buy, sell, and rent properties. What started as a small agency in Lagos has grown into one of Nigeria's most trusted real estate firms.
                </p>
                <p>
                  Over the past 15 years, we have facilitated over 500 property transactions, helped more than 1,200 families find their dream homes, and built a reputation for integrity, professionalism, and exceptional service.
                </p>
                <p>
                  Our team of 50+ expert agents brings deep market knowledge, legal expertise, and a genuine passion for helping clients achieve their real estate goals. We understand that every property transaction is significant, and we treat each one with the care and attention it deserves.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Our office"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-xl shadow-lg">
                <p className="text-4xl font-bold font-heading">15+</p>
                <p className="text-sm opacity-90">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-sm"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <FaLightbulb className="text-2xl text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-dark mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide exceptional real estate services that exceed our clients' expectations through integrity, innovation, and personalized attention. We aim to be the most trusted partner in every property journey, ensuring seamless transactions and lasting relationships.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-sm"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <FaAward className="text-2xl text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-dark mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be Nigeria's leading real estate company, recognized for transforming the property market through technology-driven solutions, unparalleled customer service, and a commitment to making quality housing accessible to all Nigerians.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <SectionHeading
            title="Our Core Values"
            subtitle="What Drives Us"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {CORE_VALUES.map((value, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -5 }}
                className="group p-8 bg-light rounded-2xl hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-300">
                  {index === 0 && <FaHandshake className="text-2xl text-primary group-hover:text-white transition-colors" />}
                  {index === 1 && <FaAward className="text-2xl text-primary group-hover:text-white transition-colors" />}
                  {index === 2 && <FaLightbulb className="text-2xl text-primary group-hover:text-white transition-colors" />}
                  {index === 3 && <FaUsers className="text-2xl text-primary group-hover:text-white transition-colors" />}
                </div>
                <h3 className="font-heading font-semibold text-xl text-dark mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <Statistics />

      {/* Team Section */}
      <section className="py-20 bg-light">
        <div className="container-custom">
          <SectionHeading
            title="Meet Our Leadership"
            subtitle="Our Team"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { name: 'Chukwuemeka Obi', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
              { name: 'Ngozi Adeleke', role: 'Managing Director', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
              { name: 'Tunde Bakare', role: 'Head of Sales', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
              { name: 'Amina Yusuf', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h4 className="font-heading font-semibold text-lg text-dark">{member.name}</h4>
                  <p className="text-primary text-sm font-medium mt-1">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
