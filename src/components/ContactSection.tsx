import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Submitted!",
      description: "Thank you for your interest. We will contact you shortly.",
    });
    setFormData({ name: "", email: "", phone: "", package: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+880 1234-567890", "+880 9876-543210"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@smelitehajj.com", "support@smelitehajj.com"],
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Savar, Dhaka", "Bangladesh"],
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Sat - Thu: 9AM - 8PM", "Friday: Closed"],
    },
  ];

  return (
    <section id="contact" className="py-24 bg-muted geometric-pattern">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Contact Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our packages or need assistance? 
            Reach out to us and our team will be happy to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-muted-foreground text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-card rounded-xl overflow-hidden shadow-elegant h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58399.55577816851!2d90.2227881!3d23.8584712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755eb3a0a09f5b3%3A0x7dfcceb1c4cc3cbb!2sSavar%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SM Elite Hajj Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-elegant">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Interested Package
                </label>
                <select
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                >
                  <option value="">Select a package</option>
                  <option value="hajj-economy">Hajj - Super Economy</option>
                  <option value="hajj-classic">Hajj - Classic</option>
                  <option value="hajj-premium">Hajj - Premium</option>
                  <option value="hajj-vip">Hajj - VIP</option>
                  <option value="umrah-economy">Umrah - Economy</option>
                  <option value="umrah-etekaf">Umrah - Etekaf</option>
                  <option value="umrah-vip">Umrah - VIP</option>
                  <option value="visa">Visa Services</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Message
                </label>
                <Textarea
                  placeholder="Tell us about your requirements..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-primary hover:opacity-90 shadow-gold"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
