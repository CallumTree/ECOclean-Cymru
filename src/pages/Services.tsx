import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Home, Sparkles, Building2, HardHat, Briefcase, Calendar, Refrigerator, Layers, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { whatsappLink } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    icon: HardHat,
    title: "Post Construction Cleans",
    description: "Specialist cleaning for building sites and new-builds, removing dust, debris and residue ready for handover. Quoted after a site visit or photos.",
    included: [
      "Dust and debris removal",
      "Surface, window sill and skirting wipe-down",
      "Floor sweep, vacuum and wash",
      "Kitchen and bathroom fixture clean",
      "Removal of stickers and protective film",
      "Final touch-up clean before handover",
    ],
    excluded: [
      "Waste/skip removal (can be arranged separately)",
      "Exterior render or window cleaning",
    ],
  },
  {
    icon: Home,
    title: "Holiday Let Turnovers",
    description: "Fast, reliable changeover cleans between guests so your holiday let is spotless and guest-ready every time.",
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
    title: "Deep Cleans: Domestic and Commercial",
    description: "A thorough top-to-bottom clean beyond a normal tidy-up — ideal for homes needing extra attention or commercial spaces before or after a big push.",
    included: [
      "Detailed kitchen cleaning",
      "Bathroom deep cleaning",
      "Skirting boards, doors and frames",
      "Light switches and sockets",
      "High dusting areas",
      "Detailed floor cleaning",
    ],
    excluded: [
      "Specialist equipment cleaning",
      "Exterior work",
    ],
  },
  {
    icon: Calendar,
    title: "Regular Weekly/Biweekly Cleans",
    description: "Ongoing scheduled cleaning to keep your home or workplace consistently fresh, on a routine that suits you.",
    included: [
      "Kitchen and bathroom clean",
      "Dusting and surface wipe-down",
      "Vacuuming and mopping floors",
      "Bin emptying",
      "Tidying of common areas",
    ],
    excluded: [
      "Deep-clean tasks (available as an occasional add-on)",
      "Laundry and ironing",
    ],
  },
  {
    icon: Briefcase,
    title: "Commercial Office Cleans",
    description: "Reliable cleaning for offices and workspaces, keeping things presentable for staff and clients.",
    included: [
      "Desk and surface wipe-down",
      "Kitchen/break room clean",
      "Washroom clean and restock",
      "Vacuuming and mopping floors",
      "Bin emptying and recycling",
    ],
    excluded: [
      "IT/electronics cleaning",
      "Out-of-hours access arrangements (agreed in advance)",
    ],
  },
  {
    icon: Refrigerator,
    title: "Appliance Cleans",
    description: "Deep cleans for ovens, fridges, washing machines and other appliances that build up grime regular cleaning misses.",
    included: [
      "Oven interior and door clean",
      "Fridge/freezer interior clean",
      "Washing machine drum and seal clean",
      "Extractor fan and filter clean",
      "Microwave clean",
    ],
    excluded: [
      "Appliance repairs",
      "Dismantling of fixed appliances",
    ],
  },
  {
    icon: Layers,
    title: "Carpets",
    description: "Carpet and rug cleaning to lift dirt, stains and odours and refresh tired flooring.",
    included: [
      "Pre-vacuum",
      "Stain treatment",
      "Deep carpet/rug clean",
      "Deodorising",
    ],
    excluded: [
      "Carpet repairs or re-fitting",
      "Upholstery cleaning (available as extra)",
    ],
  },
  {
    icon: Building2,
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
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-eco-charcoal py-24 md:py-32">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-5xl md:text-6xl font-light text-white mb-4 leading-[1.05]">
              Our Services
            </h1>
            <p className="text-white/70 text-lg">
              Professional cleaning solutions for homes and businesses across Pembrokeshire.
              We use eco-friendly products as standard — though tougher dirt and stains occasionally need extra product or a different method to shift.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground mb-3">
              What We Offer
            </h2>
            <p className="text-muted-foreground">
              Tap a service to see what's included.
            </p>
          </motion.div>

          <Accordion type="multiple" className="space-y-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.05, 0.3) }}
              >
                <AccordionItem
                  value={service.title}
                  className="bg-card border border-border px-4 sm:px-6"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-4 text-left">
                      <service.icon className="w-8 h-8 sm:w-9 sm:h-9 text-primary shrink-0" strokeWidth={1.25} />
                      <div>
                        <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground hidden sm:block">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground mb-4 sm:hidden">
                      {service.description}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-5">
                      <div>
                        <h4 className="font-heading font-semibold text-sm text-foreground mb-2">
                          What's Included
                        </h4>
                        <ul className="space-y-1.5">
                          {service.included.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-sm text-foreground mb-2">
                          Not Included
                        </h4>
                        <ul className="space-y-1.5">
                          {service.excluded.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0 mt-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="pill" asChild>
                        <Link to="/contact">
                          Get a Quote
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="whatsapp" className="rounded-full uppercase text-xs tracking-wider" asChild>
                        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                          <Phone className="w-4 h-4" />
                          WhatsApp Us
                        </a>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
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
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground mb-4">
              Optional Extras
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Add any of these services to your clean for a tailored result. Select extras when building your quote.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Kitchen Extras",
                items: ["Inside kitchen cupboards", "Double oven or range cooker clean"],
              },
              {
                title: "Interior Cleaning Extras",
                items: ["Interior window cleaning", "Skirting board deep clean", "Tile and grout cleaning", "Limescale removal"],
              },
              {
                title: "Upholstery Extras",
                items: ["Sofa or upholstery cleaning", "Mattress sanitation"],
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
                className="bg-card p-6 border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <h3 className="font-heading font-semibold text-foreground">{group.title}</h3>
                <div className="w-8 h-0.5 bg-eco-gold mt-2 mb-4" />
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
      <section className="section-padding bg-eco-charcoal text-white">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-medium mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Get in touch today for a free, no-obligation quote. We'll discuss your needs and provide a fair, transparent price.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="pill" asChild>
              <Link to="/contact">
                Get a Quote
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="whatsapp" className="rounded-full uppercase text-xs tracking-wider" asChild>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
