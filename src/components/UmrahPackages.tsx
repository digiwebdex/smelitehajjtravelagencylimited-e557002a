import PackageCard from "./PackageCard";
import medinaImage from "@/assets/medina-mosque.jpg";

const UmrahPackages = () => {
  const packages = [
    {
      name: "Economy",
      price: "1,42,000/-",
      flightDate: "Dec 15, 2025",
      features: [
        "5-Star Hotels near Haram",
        "Adjacent to Haram in Mecca",
        "Adjacent to Masjid Nabawi in Medina",
        "4 people per room",
        "Laundry and other services",
        "Saudi Airlines (Business Class)",
        "Private Transport Service",
        "Buffet food arrangement",
        "Complete Ziyarah",
        "Visa, Ticket, Transport included",
      ],
    },
    {
      name: "Etekaf Package",
      price: "1,20,000/-",
      flightDate: "March 15, 2025",
      isPopular: true,
      features: [
        "5-Star Hotels near Haram",
        "Adjacent to Haram in Mecca",
        "Adjacent to Masjid Nabawi in Medina",
        "4 people per room",
        "Laundry and other services",
        "Saudi Airlines (Business Class)",
        "Private Transport Service",
        "Buffet food arrangement",
        "Complete Ziyarah",
        "Visa, Ticket, Transport included",
      ],
    },
    {
      name: "VIP",
      price: "2,50,000/-",
      flightDate: "Customizable",
      features: [
        "5-Star Premium Hotels",
        "Adjacent to Haram in Mecca",
        "Adjacent to Masjid Nabawi in Medina",
        "4 people per room (upgradeable)",
        "Full concierge service",
        "Saudi Airlines (Business Class)",
        "Private VIP Transport",
        "Premium Buffet arrangement",
        "Exclusive Ziyarah experience",
        "Visa, Ticket, Transport included",
      ],
    },
  ];

  return (
    <section id="umrah" className="py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <span className="text-secondary font-semibold uppercase tracking-wider">
              Spiritual Journey
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              Umrah Packages
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Embark on your spiritual journey with our exclusive Umrah packages. 
              We provide premium accommodation, transportation, and guidance to ensure 
              your Umrah is a peaceful and memorable experience.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-xl p-4">
                <div className="font-heading text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Umrah Trips/Year</div>
              </div>
              <div className="bg-muted rounded-xl p-4">
                <div className="font-heading text-2xl font-bold text-primary">3000+</div>
                <div className="text-sm text-muted-foreground">Umrah Pilgrims</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src={medinaImage}
              alt="Masjid al-Nabawi in Medina"
              className="rounded-2xl shadow-lg w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground p-4 rounded-xl shadow-gold">
              <div className="font-heading text-2xl font-bold">100%</div>
              <div className="text-sm">Visa Success Rate</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.name} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UmrahPackages;
