import Navbar from "@/components/hotel/Navbar";
import HeroExpansion from "@/components/blocks/HeroExpansion";
import PopularDestinations from "@/components/hotel/PopularDestinations";
import FeaturedProperties from "@/components/hotel/FeaturedProperties";
import ServicesSection from "@/components/hotel/ServicesSection";
import SpecialOffers from "@/components/hotel/SpecialOffers";
import Testimonials from "@/components/hotel/Testimonials";
import Newsletter from "@/components/hotel/Newsletter";
import Footer from "@/components/hotel/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroExpansion>
        <div className="space-y-0">
          <PopularDestinations />
          <FeaturedProperties />
          <ServicesSection />
          <SpecialOffers />
          <Testimonials />
          <Newsletter />
        </div>
      </HeroExpansion>
      <Footer />
    </div>
  );
};

export default Index;
