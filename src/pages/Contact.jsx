import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPaperPlane, FaCheck } from 'react-icons/fa';
import SectionHeading from '../components/ui/SectionHeading';
import { COMPANY_INFO } from '../utils/constants';
import { fadeInLeft, fadeInRight } from '../utils/animations';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hello Schemelink Properties! I would like to get in touch with you.');
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${message}`, '_blank');
  };

  const contactInfo = [
    { icon: FaPhone, label: 'Phone', value: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phone}` },
    { icon: FaPhone, label: 'Phone 2', value: COMPANY_INFO.phone2, href: `tel:${COMPANY_INFO.phone2}` },
    { icon: FaEnvelope, label: 'Email', value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
    { icon: FaMapMarkerAlt, label: 'Address', value: COMPANY_INFO.address, href: '#' },
    { icon: FaClock, label: 'Business Hours', value: COMPANY_INFO.hours, href: '#' },
  ];

  return (
    <>
      <section className="relative pt-32 pb-20 bg-dark">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80" alt="Contact background" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">Get in Touch</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">Contact Us</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Have a question or need assistance? Our team is here to help you with all your real estate needs.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h3 className="font-heading font-bold text-xl text-dark mb-6">Contact Information</h3>
                <div className="space-y-5">
                  {contactInfo.map((info, index) => (
                    <a key={index} href={info.href} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                        <info.icon className="text-primary group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-0.5">{info.label}</p>
                        <p className="text-dark font-medium group-hover:text-primary transition-colors">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-4">Follow Us</p>
                  <div className="flex gap-3">
                    <a href={COMPANY_INFO.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all duration-300" aria-label="Facebook"><FaFacebookF size={16} /></a>
                    <a href={COMPANY_INFO.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all duration-300" aria-label="Instagram"><FaInstagram size={16} /></a>
                    <a href={COMPANY_INFO.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all duration-300" aria-label="Twitter"><FaTwitter size={16} /></a>
                    <a href={COMPANY_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all duration-300" aria-label="LinkedIn"><FaLinkedinIn size={16} /></a>
                  </div>
                </div>
              </div>
              <div className="bg-green-500 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center"><FaWhatsapp className="text-3xl" /></div>
                  <div>
                    <h4 className="font-heading font-bold text-lg">Chat on WhatsApp</h4>
                    <p className="text-white/80 text-sm">Get instant responses</p>
                  </div>
                </div>
                <p className="text-white/90 text-sm mb-6">Prefer messaging? Reach out to us on WhatsApp for quick inquiries and property updates.</p>
                <button onClick={handleWhatsApp} className="w-full bg-white text-green-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Start Chat</button>
              </div>
            </motion.div>

            <motion.div variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
                <h3 className="font-heading font-bold text-2xl text-dark mb-2">Send Us a Message</h3>
                <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
                {formSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><FaCheck className="text-3xl text-green-600" /></div>
                    <h4 className="text-2xl font-heading font-bold text-dark mb-3">Message Sent Successfully!</h4>
                    <p className="text-gray-500 max-w-md mx-auto">Thank you for reaching out. Our team will review your message and respond within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="+234 800 000 0000" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                        <select required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none cursor-pointer bg-white">
                          <option value="">Select a subject</option>
                          <option value="buy">I want to buy a property</option>
                          <option value="rent">I want to rent a property</option>
                          <option value="sell">I want to sell my property</option>
                          <option value="invest">Investment inquiry</option>
                          <option value="general">General inquiry</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <textarea required rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none" placeholder="Tell us about your requirements..." />
                    </div>
                    <button type="submit" className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4 w-full md:w-auto"><FaPaperPlane /> Send Message</button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <SectionHeading title="Find Us" subtitle="Our Location" />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gray-100 rounded-2xl overflow-hidden aspect-[21/9] flex items-center justify-center">
            <div className="text-center">
              <FaMapMarkerAlt className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold text-dark mb-2">Schemelink Properties Ltd</h3>
              <p className="text-gray-600 mb-4">{COMPANY_INFO.address}</p>
              <a href="https://www.google.com/maps/search/?api=1&query=123+Admiralty+Way+Lekki+Phase+1+Lagos+Nigeria" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">Open in Google Maps</a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
