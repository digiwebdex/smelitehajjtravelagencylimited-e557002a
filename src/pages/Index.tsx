import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HajjPackages from "@/components/HajjPackages";
import UmrahPackages from "@/components/UmrahPackages";
import VisaServices from "@/components/VisaServices";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HajjPackages />
        <UmrahPackages />
        <VisaServices />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
