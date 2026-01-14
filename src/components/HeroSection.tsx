import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-kaaba.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="The Holy Kaaba in Mecca"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center text-primary-foreground pt-32 pb-20">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <span className="inline-block px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full text-secondary font-medium mb-6">
            ✨ Govt. Approved Hajj & Umrah Agency
          </span>
          
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Your Sacred Journey
            <span className="block text-gradient-gold">Begins Here</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience the spiritual journey of a lifetime with SM Elite Hajj. 
            We provide premium Hajj & Umrah packages with complete care and guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-gold text-lg px-8 py-6 font-semibold"
            >
              Explore Hajj Packages
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/10 text-lg px-8 py-6"
            >
              View Umrah Packages
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-primary-foreground/20">
            {[
              { number: "10+", label: "Years Experience" },
              { number: "5000+", label: "Happy Pilgrims" },
              { number: "100%", label: "Satisfaction Rate" },
              { number: "24/7", label: "Support Available" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/80 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#hajj"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float"
        >
          <ChevronDown className="w-8 h-8 text-primary-foreground/70" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
