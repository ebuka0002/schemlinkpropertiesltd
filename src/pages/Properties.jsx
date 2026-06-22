import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaSort, FaThLarge, FaList, FaTimes } from 'react-icons/fa';
import PropertyCard from '../components/ui/PropertyCard';
import SectionHeading from '../components/ui/SectionHeading';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { properties as allProperties, locations, propertyTypes, priceRanges, bedroomOptions } from '../data/properties';
import { staggerContainer } from '../utils/animations';

/**
 * Properties listing page with advanced filtering
 */
const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  // FIX: Track if we're on desktop using state + effect instead of window.innerWidth in render
  const [isDesktop, setIsDesktop] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    status: searchParams.get('status') || 'All Status',
    location: searchParams.get('location') || 'All Locations',
    type: searchParams.get('type') || 'All Types',
    priceRange: 'All Prices',
    bedrooms: searchParams.get('bedrooms') || 'Any',
  });

  // FIX: Check window size safely in useEffect only
  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Apply URL params to filters
  useEffect(() => {
    const newFilters = { ...filters };
    if (searchParams.get('location')) newFilters.location = searchParams.get('location');
    if (searchParams.get('type')) newFilters.type = searchParams.get('type');
    if (searchParams.get('status')) newFilters.status = searchParams.get('status');
    if (searchParams.get('bedrooms')) newFilters.bedrooms = searchParams.get('bedrooms');
    setFilters(newFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProperties = useMemo(() => {
    let result = [...allProperties];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.location.toLowerCase().includes(searchLower) ||
          p.type.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status !== 'All Status') {
      result = result.filter((p) => p.status === filters.status);
    }

    if (filters.location !== 'All Locations') {
      result = result.filter((p) => p.location === filters.location);
    }

    if (filters.type !== 'All Types') {
      result = result.filter((p) => p.type === filters.type);
    }

    if (filters.priceRange !== 'All Prices') {
      const range = priceRanges.find((r) => r.label === filters.priceRange);
      if (range) {
        result = result.filter((p) => p.price >= range.min && p.price <= range.max);
      }
    }

    if (filters.bedrooms !== 'Any') {
      const minBeds = bedroomOptions.find((b) => b.label === filters.bedrooms)?.value || 0;
      result = result.filter((p) => p.bedrooms >= minBeds);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.yearBuilt - a.yearBuilt);
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: 'All Status',
      location: 'All Locations',
      type: 'All Types',
      priceRange: 'All Prices',
      bedrooms: 'Any',
    });
    setSearchParams({});
  };

  const hasActiveFilters =
    filters.status !== 'All Status' ||
    filters.location !== 'All Locations' ||
    filters.type !== 'All Types' ||
    filters.priceRange !== 'All Prices' ||
    filters.bedrooms !== 'Any' ||
    filters.search !== '';

  if (isLoading) return <LoadingSpinner fullScreen />;

  return (
    <section className="pt-24 pb-20 bg-light min-h-screen">
      <div className="container-custom">
        <SectionHeading
          title="Our Properties"
          subtitle="Browse Listings"
        />

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, location, or type..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn-outline flex items-center justify-center gap-2"
            >
              <FaFilter />
              Filters
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full lg:w-48 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <FaSort className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="hidden lg:flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'
                }`}
                aria-label="Grid view"
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'
                }`}
                aria-label="List view"
              >
                <FaList />
              </button>
            </div>
          </div>

          {/* Filters Row - FIX: use isDesktop state instead of window.innerWidth */}
          <AnimatePresence>
            {(showFilters || isDesktop) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 mt-4 border-t border-gray-100">
                  <select
                    value={filters.status}
                    onChange={(e) => updateFilter('status', e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer bg-white"
                  >
                    <option>All Status</option>
                    <option>For Sale</option>
                    <option>For Rent</option>
                  </select>

                  <select
                    value={filters.location}
                    onChange={(e) => updateFilter('location', e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer bg-white"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>

                  <select
                    value={filters.type}
                    onChange={(e) => updateFilter('type', e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer bg-white"
                  >
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>

                  <select
                    value={filters.priceRange}
                    onChange={(e) => updateFilter('priceRange', e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer bg-white"
                  >
                    {priceRanges.map((range) => (
                      <option key={range.label} value={range.label}>{range.label}</option>
                    ))}
                  </select>

                  <select
                    value={filters.bedrooms}
                    onChange={(e) => updateFilter('bedrooms', e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer bg-white"
                  >
                    {bedroomOptions.map((opt) => (
                      <option key={opt.value} value={opt.label}>{opt.label} Bedrooms</option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters & Clear */}
          {hasActiveFilters && (
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-100 flex-wrap">
              <span className="text-sm text-gray-500">Active filters:</span>
              {Object.entries(filters).map(
                ([key, value]) =>
                  value &&
                  value !== 'All Status' &&
                  value !== 'All Locations' &&
                  value !== 'All Types' &&
                  value !== 'All Prices' &&
                  value !== 'Any' &&
                  key !== 'search' && (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {value}
                      <button
                        onClick={() => updateFilter(key, key === 'bedrooms' ? 'Any' : `All ${key.charAt(0).toUpperCase() + key.slice(1)}s`)}
                        className="hover:text-red-600"
                      >
                        <FaTimes size={10} />
                      </button>
                    </span>
                  )
              )}
              {filters.search && (
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                  Search: {filters.search}
                  <button onClick={() => updateFilter('search', '')} className="hover:text-red-600">
                    <FaTimes size={10} />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-primary font-medium hover:underline ml-auto"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing {filteredProperties.length} of {allProperties.length} properties
        </p>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className={`grid gap-8 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            <AnimatePresence>
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-dark mb-2">
              No properties found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your filters or search criteria
            </p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
