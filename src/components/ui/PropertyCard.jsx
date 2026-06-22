import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaMapMarkerAlt, FaRulerCombined } from 'react-icons/fa';
import { formatPrice } from '../../data/properties';
import { staggerItem } from '../../utils/animations';

/**
 * Property card component for listing properties
 */
const PropertyCard = ({ property }) => {
  const statusColor = property.status === 'For Sale' ? 'bg-primary' : 'bg-green-600';

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className={`${statusColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
            {property.status}
          </span>
        </div>
        {property.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white font-heading font-bold text-xl">
            {formatPrice(property.price)}
            {property.status === 'For Rent' && <span className="text-sm font-normal">/year</span>}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading font-semibold text-lg text-dark mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <FaMapMarkerAlt className="text-primary mr-1.5 flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 text-gray-600 text-sm border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1">
            <FaBed className="text-primary" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBath className="text-primary" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRulerCombined className="text-primary" />
            <span>{property.area}</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          to={`/properties/${property.id}`}
          className="mt-4 block text-center bg-primary text-white py-2.5 rounded-md font-medium hover:bg-red-700 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
