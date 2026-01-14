import PackageCard from "./PackageCard";

const HajjPackages = () => {
  const packages = [
    {
      name: "Super Economy",
      price: "6,35,000/-",
      features: [
        "Hotels in Makkah and Medina",
        "800m from Haram in Mecca",
        "900m from Masjid Nabawi in Medina",
        "5-6 people per room",
        "Saudi / Biman Bangladesh Airlines",
        "AC Bus Transportation",
        "Three meals daily (Local food)",
        "Ziyarah in Makkah & Madinah",
      ],
    },
    {
      name: "Classic",
      price: "7,40,000/-",
      features: [
        "3-Star Hotels in Makkah and Medina",
        "700m from Haram in Mecca",
        "600m from Masjid Nabawi in Medina",
        "5-6 people per room",
        "Saudi / Biman Bangladesh Airlines",
        "AC Bus Transportation",
        "Three meals daily (Local food)",
        "Ziyarah in Makkah & Madinah",
      ],
    },
    {
      name: "Premium",
      price: "8,90,000/-",
      isPopular: true,
      features: [
        "3-Star Hotels in Makkah and Medina",
        "500m from Haram in Mecca",
        "300m from Masjid Nabawi in Medina",
        "4-5 people per room",
        "Laundry service included",
        "Saudi / Biman Bangladesh Airlines",
        "AC Bus Transportation",
        "Three meals daily",
        "Ziyarah in Makkah & Madinah",
      ],
    },
    {
      name: "VIP",
      price: "14,50,000/-",
      features: [
        "5-Star Hotels in Makkah and Medina",
        "Adjacent to Haram in Mecca",
        "Adjacent to Masjid Nabawi in Medina",
        "4 people per room",
        "Full laundry and concierge service",
        "Saudi Airlines (Business Class)",
        "Private Transport Service",
        "Buffet food arrangement",
        "Complete Ziyarah in Makkah & Madinah",
      ],
    },
  ];

  return (
    <section id="hajj" className="py-24 bg-muted geometric-pattern">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider">Our Packages</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Hajj Packages 2026
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully curated Hajj packages designed to provide you with a comfortable 
            and spiritually enriching experience on this sacred journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.name} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HajjPackages;
