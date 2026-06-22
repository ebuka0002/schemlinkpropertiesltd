import { motion } from 'framer-motion';
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { COMPANY_INFO } from '../../utils/constants';

/**
 * WhatsApp CTA banner section
 */
const WhatsAppCTA = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello Schemelink Properties! I would like to inquire about your properties."
    );
    window.open(
      `https://wa.me/${COMPANY_INFO.whatsapp}?text=${message}`,
      '_blank'
    );
  };

  return (
    <section className="py-16 bg-light">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-dark rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <FaWhatsapp className="text-3xl text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-heading text-white mb-2">
                Chat With Us on WhatsApp
              </h3>
              <p className="text-gray-400">
                Get instant responses to your property inquiries. Our team is ready to help you find your dream property.
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsApp}
            className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-600 transition-colors duration-300 flex-shrink-0"
          >
            Start Chat
            <FaArrowRight />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsAppCTA;
