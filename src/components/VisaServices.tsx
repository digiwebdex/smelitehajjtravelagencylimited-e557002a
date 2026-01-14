import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const VisaServices = () => {
  const countries = [
    { name: "Thailand", flag: "🇹🇭", processingTime: "5-7 days" },
    { name: "Paris, France", flag: "🇫🇷", processingTime: "15-20 days" },
    { name: "Italy", flag: "🇮🇹", processingTime: "15-20 days" },
    { name: "United States", flag: "🇺🇸", processingTime: "Interview based" },
    { name: "Cuba", flag: "🇨🇺", processingTime: "10-15 days" },
    { name: "Japan", flag: "🇯🇵", processingTime: "7-10 days" },
    { name: "Australia", flag: "🇦🇺", processingTime: "20-25 days" },
    { name: "Malaysia", flag: "🇲🇾", processingTime: "3-5 days" },
  ];

  return (
    <section id="visa" className="py-24 bg-muted">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider">
            Global Services
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Visa Processing Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide hassle-free visa processing services for various countries. 
            Our experienced team ensures smooth documentation and timely processing.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {countries.map((country) => (
            <div
              key={country.name}
              className="group bg-card rounded-xl p-6 shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="text-4xl mb-4">{country.flag}</div>
              <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {country.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Processing: {country.processingTime}
              </p>
              <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Visa Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VisaServices;
