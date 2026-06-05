import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
import AboutSection from "@/components/AboutSection";
import ScopeOfWorkSection from "@/components/ScopeOfWorkSection";
import KomitmenSection from "@/components/KomitmenSection";
import GroupCompaniesSection from "@/components/GroupCompaniesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProductsSection />
        <AboutSection />
        <ScopeOfWorkSection />
        <KomitmenSection />
        <GroupCompaniesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
