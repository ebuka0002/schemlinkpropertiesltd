import Hero from '../components/sections/Hero';
import PropertySearch from '../components/sections/PropertySearch';
import FeaturedProperties from '../components/sections/FeaturedProperties';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ServicesOverview from '../components/sections/ServicesOverview';
import Testimonials from '../components/sections/Testimonials';
import Statistics from '../components/sections/Statistics';
import WhatsAppCTA from '../components/sections/WhatsAppCTA';

/**
 * Homepage with all sections
 */
const Home = () => {
  return (
    <>
      <Hero />
      <PropertySearch />
      <FeaturedProperties />
      <WhyChooseUs />
      <ServicesOverview />
      <Testimonials />
      <Statistics />
      <WhatsAppCTA />
    </>
  );
};

export default Home;
