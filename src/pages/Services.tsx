import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Home, Sparkles, Building2, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import logo from "@/assets/logo.jpeg";

const services = [
  {
    icon: Home,
    title: "Holiday Let / Airbnb Changeover Clean",
    description: "Cleaning service between guest stays for holiday cottages and short-term lets. We ensure your property is guest-ready every time.",
    included: [
      "Kitchen clean",
      "Bathroom clean",
      "Surface dusting",
      "Vacuuming and mopping floors",
      "Bin emptying",
      "Property check for damage or missing items",
    ],
    excluded: [
      "Bed linen changes (available as extra)",
      "Towel replacement (available as extra)",
      "Linen laundry service (available as extra)",
      "Welcome pack setup (available as extra)",
    ],
  },
  {
    icon: Sparkles,
    title: "End of Tenancy Clean",
    description: "A full deep clean carried out when tenants move out of a property. Designed to help you secure your deposit.",
    included: [
      "Full kitchen deep clean",
      "Bathroom deep clean",
      "Interior windows",
      "Skirting boards and door frames",
      "Cupboards and drawers cleaned",
      "Floors vacuumed and mopped",
    ],
    excluded: [
      "Carpet steam cleaning (available as extra)",
      "Exterior windows",
      "Garden or outdoor areas",
    ],
  },
  {
    icon: Sparkles,
    title: "Deep Clean",
    description: "A detailed cleaning service beyond a normal domestic clean. Perfect for spring cleans or when your home needs extra attention.",
    included: [
      "Detailed kitchen cleaning",
      "Bathroom deep cleaning",
      "Skirting boards",
      "Doors and frames",
      "Light switches and sockets",
      "High dusting areas",
      "Detailed floor cleaning",
    ],
    excluded: [
      "Specialist equipment cleaning",
      "Exterior work",
    ],
  },
];

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
            <img src={logo} alt="ECOclean Cymru" className="h-16 md:h-20 w-auto mb-4 bg-white rounded-lg p-2" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Our Services
            </h1>
            <p className="text-white/90 text-lg max-w-2xl">
              Professional cleaning solutions for homes and holiday properties across Pembrokeshire. 
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
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild>
                    <Link to="/pricing">Get a Quote</Link>
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

      {/* Extras Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Optional Extras
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Add any of these services to your clean for a tailored result. Select extras when building your quote.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Kitchen & Appliance Extras",
                items: ["Oven deep clean", "Double oven or range cooker clean", "Fridge interior clean", "Microwave clean", "Extractor fan and filter clean", "Inside kitchen cupboards"],
              },
              {
                title: "Interior Cleaning Extras",
                items: ["Interior window cleaning", "Skirting board deep clean", "Tile and grout cleaning", "Limescale removal", "Washing machine deep clean", "Dishwasher clean"],
              },
              {
                title: "Carpet & Upholstery Extras",
                items: ["Carpet cleaning (per room)", "Rug cleaning", "Sofa or upholstery cleaning", "Mattress sanitation"],
              },
              {
                title: "Holiday Let Specific Extras",
                items: ["Bed linen change (per bed)", "Towel replacement", "Linen laundry service", "Welcome pack setup", "Toiletries restocking", "Bin management between guests"],
              },
              {
                title: "Exterior Cleaning Extras",
                items: ["Patio pressure washing", "Driveway pressure washing", "Render soft wash", "Roof moss removal", "Gutter clearing"],
              },
            ].map((group, index) => (
              <motion.div
                key={group.title}
                className="bg-card rounded-xl p-6 border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <h3 className="font-heading font-semibold text-foreground mb-4">{group.title}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
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
              <Link to="/pricing">Get a Quote</Link>
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
