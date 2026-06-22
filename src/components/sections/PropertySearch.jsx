import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaHome, FaDollarSign, FaBed } from 'react-icons/fa';
import { locations, propertyTypes, bedroomOptions } from '../../data/properties';

/**
 * Property search bar component for the homepage
 */
const PropertySearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: 'All Locations',
    type: 'All Types',
    status: 'All Status',
    bedrooms: 'Any',
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchParams.location !== 'All Locations') params.set('location', searchParams.location);
    if (searchParams.type !== 'All Types') params.set('type', searchParams.type);
    if (searchParams.status !== 'All Status') params.set('status', searchParams.status);
    if (searchParams.bedrooms !== 'Any') params.set('bedrooms', searchParams.bedrooms);

    navigate(`/properties?${params.toString()}`);
  };

  const selectClass = "w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none cursor-pointer";

  return (
    <section className="relative -mt-20 z-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Location */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Location</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              <select
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                className={`${selectClass} pl-10`}
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Property Type */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Property Type</label>
            <div className="relative">
              <FaHome className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              <select
                value={searchParams.type}
                onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
                className={`${selectClass} pl-10`}
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Status</label>
            <div className="relative">
              <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              <select
                value={searchParams.status}
                onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
                className={`${selectClass} pl-10`}
              >
                <option>All Status</option>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Bedrooms</label>
            <div className="relative">
              <FaBed className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              <select
                value={searchParams.bedrooms}
                onChange={(e) => setSearchParams({ ...searchParams, bedrooms: e.target.value })}
                className={`${selectClass} pl-10`}
              >
                {bedroomOptions.map((opt) => (
                  <option key={opt.value} value={opt.label}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3.5"
            >
              <FaSearch />
              Search
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PropertySearch;
