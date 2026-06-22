import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaCar, FaCheck, FaArrowLeft, FaShare, FaHeart } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import PropertyCard from '../components/ui/PropertyCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { properties, formatFullPrice } from '../data/properties';
import { COMPANY_INFO } from '../utils/constants';
import { fadeInUp, fadeInRight } from '../utils/animations';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const found = properties.find((p) => p.id === parseInt(id));
      if (found) {
        setProperty(found);
        const similar = properties
          .filter((p) => p.id !== found.id && (p.location === found.location || p.type === found.type))
          .slice(0, 3);
        setSimilarProperties(similar);
      }
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello, I'm interested in the property: ${property?.title} located in ${property?.location}. Please provide more information.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${message}`, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property?.title,
          text: `Check out this property: ${property?.title}`,
          url: window.location.href,
        });
      } catch {}
    }
  };

  if (isLoading) return <LoadingSpinner fullScreen />;

  if (!property) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-dark mb-4">Property Not Found</h2>
          <p className="text-gray-500 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/properties" className="btn-primary">Browse Properties</Link>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-20 pb-20 bg-light min-h-screen">
      {/* Image Gallery */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <Swiper modules={[Navigation, Pagination, Autoplay]} navigation pagination={{ clickable: true }} autoplay={{ delay: 5000 }} loop className="h-full">
          {property.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`${property.title} - Image ${index + 1}`} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between">
          <Link to="/properties" className="bg-white/90 backdrop-blur-sm text-dark px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white transition-colors">
            <FaArrowLeft /> Back
          </Link>
          <div className="flex gap-2">
            <button onClick={() => setIsLiked(!isLiked)} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isLiked ? 'bg-primary text-white' : 'bg-white/90 text-dark'}`} aria-label="Like property">
              <FaHeart />
            </button>
            <button onClick={handleShare} className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-dark hover:bg-white transition-colors" aria-label="Share property">
              <FaShare />
            </button>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 z-10">
          <div className="bg-primary text-white px-6 py-3 rounded-lg">
            <p className="text-2xl md:text-3xl font-bold font-heading">{formatFullPrice(property.price)}</p>
            {property.status === 'For Rent' && <p className="text-sm opacity-90">per year</p>}
          </div>
        </div>
      </div>

      <div className="container-custom mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${property.status === 'For Sale' ? 'bg-primary text-white' : 'bg-green-600 text-white'}`}>{property.status}</span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{property.type}</span>
                {property.featured && <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">Featured</span>}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-dark mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600"><FaMapMarkerAlt className="text-primary mr-2" />{property.location}</div>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"><FaBed className="text-primary" /></div>
                <div><p className="text-2xl font-bold text-dark">{property.bedrooms}</p><p className="text-sm text-gray-500">Bedrooms</p></div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"><FaBath className="text-primary" /></div>
                <div><p className="text-2xl font-bold text-dark">{property.bathrooms}</p><p className="text-sm text-gray-500">Bathrooms</p></div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"><FaRulerCombined className="text-primary" /></div>
                <div><p className="text-lg font-bold text-dark">{property.area}</p><p className="text-sm text-gray-500">Area</p></div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"><FaCar className="text-primary" /></div>
                <div><p className="text-2xl font-bold text-dark">{property.parking}</p><p className="text-sm text-gray-500">Parking</p></div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-heading font-bold text-dark mb-4">Property Description</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-heading font-bold text-dark mb-6">Amenities & Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2"><FaCheck className="text-primary flex-shrink-0" /><span className="text-gray-700">{amenity}</span></div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-heading font-bold text-dark mb-4">Location</h2>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-4xl text-primary mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">{property.location}</p>
                  <p className="text-sm text-gray-400 mt-1">Coordinates: {property.coordinates.lat}, {property.coordinates.lng}</p>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${property.coordinates.lat},${property.coordinates.lng}`} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-primary font-medium hover:underline">View on Google Maps</a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div variants={fadeInRight} initial="hidden" animate="visible" className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-heading font-bold text-lg text-dark mb-4">Property Agent</h3>
              <div className="flex items-center gap-4 mb-4">
                <img src={property.agent.image} alt={property.agent.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-dark">{property.agent.name}</h4>
                  <p className="text-sm text-gray-500">Real Estate Consultant</p>
                </div>
              </div>
              <div className="space-y-3">
                <a href={`tel:${property.agent.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"><FaPhone className="text-primary" />{property.agent.phone}</a>
                <a href={`mailto:${property.agent.email}`} className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"><FaEnvelope className="text-primary" />{property.agent.email}</a>
              </div>
              <button onClick={handleWhatsApp} className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-green-600 transition-colors">
                <FaWhatsapp /> WhatsApp Agent
              </button>
            </motion.div>

            <motion.div variants={fadeInRight} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-heading font-bold text-lg text-dark mb-4">Send an Inquiry</h3>
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><FaCheck className="text-2xl text-green-600" /></div>
                  <h4 className="font-semibold text-dark mb-2">Inquiry Sent!</h4>
                  <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" placeholder="+234 800 000 0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none" placeholder="I'm interested in this property..." />
                  </div>
                  <button type="submit" className="w-full btn-primary">Send Inquiry</button>
                </form>
              )}
            </motion.div>

            <motion.div variants={fadeInRight} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-heading font-bold text-lg text-dark mb-4">Property Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-500">Property ID</span><span className="font-medium text-dark">#{property.id.toString().padStart(4, '0')}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Year Built</span><span className="font-medium text-dark">{property.yearBuilt}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Property Type</span><span className="font-medium text-dark">{property.type}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Furnishing</span><span className="font-medium text-dark">{property.furnished}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Parking Spaces</span><span className="font-medium text-dark">{property.parking}</span></div>
              </div>
            </motion.div>
          </div>
        </div>

        {similarProperties.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-16">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PropertyDetails;
