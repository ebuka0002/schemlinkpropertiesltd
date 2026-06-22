import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { COMPANY_INFO } from '../../utils/constants';

/**
 * Floating WhatsApp button for quick contact
 */
const WhatsAppButton = () => {
  const handleClick = () => {
    const message = encodeURIComponent(
      "Hello Schemelink Properties! I'm interested in learning more about your properties."
    );
    window.open(
      `https://wa.me/${COMPANY_INFO.whatsapp}?text=${message}`,
      '_blank'
    );
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
      aria-label="Chat on WhatsApp"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp className="text-2xl" />
    </motion.button>
  );
};

export default WhatsAppButton;
