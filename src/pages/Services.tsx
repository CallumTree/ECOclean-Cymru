import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Home, Sparkles, Building2, HardHat, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";

const services = [
  {
    icon: Home,
    title: "Domestic Cleaning",
    description: "Regular cleaning to keep your home fresh, tidy, and welcoming. Tailored to your schedule and preferences.",
    included: [
      "General dusting and surface cleaning",
      "Vacuuming and mopping floors",
      "Kitchen cleaning (surfaces, appliances exterior)",
      "Bathroom cleaning and sanitisation",
      "Bed making and tidying",
      "Emptying bins",
    ],
    excluded: [
      "Deep cleaning tasks",
      "Laundry and ironing",
      "Exterior window cleaning",
    ],
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    description: "Thorough top-to-bottom cleaning for homes that need extra attention. Perfect for spring cleans or pre-event prep.",
    included: [
      "Everything in domestic cleaning",
      "Inside oven and appliances",
      "Inside cupboards and wardrobes",
      "Skirting boards and door frames",
      "Light fixtures and switches",
      "Detailed bathroom descaling",
      "Behind and under furniture",
    ],
    excluded: [
      "Specialist equipment cleaning",
      "Exterior work",
    ],
  },
  {
    icon: Building2,
    title: "End of Tenancy Cleaning",
    description: "Professional cleans designed to help you secure your deposit. We know what landlords and agents look for.",
    included: [
      "Full property deep clean",
      "Oven and hob cleaning",
      "Fridge and freezer cleaning",
      "All cupboards cleaned inside and out",
      "Windows cleaned (interior)",
      "Carpets vacuumed thoroughly",
      "Bathroom limescale removal",
    ],
    excluded: [
      "Carpet steam cleaning (available on request)",
      "Exterior windows",
      "Garden or outdoor areas",
    ],
  },
  {
    icon: HardHat,
    title: "Post-Construction Cleaning",
    description: "Specialist cleaning for building sites and new builds. Our team holds CSCS cards and understands construction environments.",
    included: [
      "Dust and debris removal",
      "Surface cleaning throughout",
      "Window and glass cleaning",
      "Floor cleaning and polishing",
      "Fixture and fitting cleaning",
      "Rubbish removal",
    ],
    excluded: [
      "Hazardous waste removal",
      "Specialist industrial cleaning",
    ],
    note: "Site visit or photos required before quoting.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-eco-secondary py-16 md:py-24">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Our Services
            </h1>
            <p className="text-white/90 text-lg max-w-2xl">
              Professional cleaning solutions for homes and commercial properties across Pembrokeshire. 
              Every service uses eco-friendly products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-wide mx-auto space-y-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="grid lg:grid-cols-2 gap-8 items-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                    {service.title}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                {service.note && (
                  <div className="flex items-start gap-2 p-4 bg-eco-gold/10 rounded-lg border border-eco-gold/20 mb-6">
                    <AlertCircle className="w-5 h-5 text-eco-gold-muted shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{service.note}</p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild>
                    <Link to="/contact">Get a Quote</Link>
                  </Button>
                  <Button variant="whatsapp" asChild>
                    <a href="https://wa.me/447432670535" target="_blank" rel="noopener noreferrer">
                      <Phone className="w-4 h-4" />
                      WhatsApp Us
                    </a>
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {service.included.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-muted rounded-xl p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Not Included
                  </h3>
                  <ul className="space-y-2">
                    {service.excluded.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0 mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-eco-dark text-white">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Get in touch today for a free, no-obligation quote. We'll discuss your needs and provide a fair, transparent price.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="gold" asChild>
              <Link to="/contact">Get a Quote</Link>
            </Button>
            <Button size="lg" variant="whatsapp" asChild>
              <a href="https://wa.me/447432670535" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
