import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  flightDate?: string;
}

const PackageCard = ({ name, price, features, isPopular, flightDate }: PackageCardProps) => {
  return (
    <div
      className={cn(
        "relative bg-card rounded-2xl shadow-elegant overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 group",
        isPopular && "ring-2 ring-secondary"
      )}
    >
      {isPopular && (
        <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-gold">
          <Star className="w-4 h-4 fill-current" />
          Popular
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-primary p-6 text-primary-foreground">
        <h3 className="font-heading text-xl font-semibold mb-2">{name}</h3>
        {flightDate && (
          <p className="text-sm text-primary-foreground/80 mb-2">
            Flight Date: {flightDate}
          </p>
        )}
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-3xl font-bold">{price}</span>
          <span className="text-primary-foreground/70">BDT</span>
        </div>
      </div>

      {/* Features */}
      <div className="p-6">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-foreground/80 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          className={cn(
            "w-full",
            isPopular
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-gold"
              : "bg-gradient-primary hover:opacity-90"
          )}
        >
          Book This Package
        </Button>
      </div>
    </div>
  );
};

export default PackageCard;
