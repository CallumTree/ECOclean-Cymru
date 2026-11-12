import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { whatsappLink } from "@/lib/constants";
import heroCleaning from "@/assets/hero-cleaning.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ServiceItem {
  title: string;
  summary: string;
  description: string;
  included: string[];
  excluded: string[];
}

interface ServicePillar {
  id: string;
  pillarTitle: string;
  pillarDescription: string;
  services: ServiceItem[];
}

const extrasGroups = [
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
];

const servicePillars: ServicePillar[] = [
  {
    id: "domestic-residential",
    pillarTitle: "Domestic Residential",
    pillarDescription: "Regular domestic cleaning, holiday let turnovers, deep cleans and end of tenancy cleans across Pembrokeshire.",
    services: [
      {
        title: "Regular Domestic Cleans",
        summary: "Scheduled weekly or bi-weekly home cleaning from a dedicated, vetted local cleaner using family-safe eco products.",
        description: "Reliable, consistent home cleaning on a weekly or bi-weekly routine. You get the same vetted cleaner each visit, using eco-friendly products that are safe around kids and pets.",
        included: [
          "Same dedicated cleaner each visit",
          "Kitchen surfaces, hob and sink cleaned",
          "Bathroom clean including limescale and mirrors",
          "Dusting of surfaces and skirting boards",
          "Vacuuming and mopping of all floors",
          "Bed making, bin emptying and general tidying",
        ],
        excluded: [
          "Heavy oven degreasing (available as an add-on)",
          "Laundry and ironing",
        ],
      },
      {
        title: "Holiday Let & Airbnb Turnovers",
        summary: "Fast, reliable changeover cleans between guests, scheduled around check-in and check-out.",
        description: "Quick turnaround cleaning for holiday cottages, apartments and lets, scheduled flexibly around your guest check-in and check-out times.",
        included: [
          "Flexible scheduling around guest changeovers",
          "Full kitchen clean and appliance wipe-down",
          "Bathroom clean and limescale treatment",
          "Bed linen change and bed-making (on request)",
          "High-touch surface cleaning (handles, remotes, switches)",
          "Vacuuming and mopping of all floors",
          "Damage check and lost property reporting",
          "Bin emptying and fresh liners before the next guest",
        ],
        excluded: [
          "Off-site laundry service (available as an add-on)",
          "Welcome pack sourcing",
        ],
      },
      {
        title: "Deep Cleans & Oven Cleans",
        summary: "A thorough top-to-bottom clean for homes or kitchens that need a proper reset.",
        description: "An intensive clean beyond a normal visit — for homes or commercial kitchens needing a full reset. Tackles built-up grime, limescale and the spots regular cleaning misses.",
        included: [
          "Oven, hob and extractor deep clean",
          "Fridge, freezer, dishwasher and washing machine clean",
          "High dusting of light fittings and curtain poles",
          "Tile grout and limescale treatment",
          "Furniture moved to clean behind and underneath",
          "Doors, frames and radiators cleaned",
        ],
        excluded: [
          "Appliance repairs",
          "Wall painting or plaster repair",
        ],
      },
      {
        title: "End of Tenancy Cleans",
        summary: "Deposit-standard cleaning for rental properties, move-in or move-out.",
        description: "A full deep clean for rental properties, designed to meet letting agent and landlord checklists so tenants can move out with confidence.",
        included: [
          "Full clean of bedrooms, living areas, kitchen and bathroom",
          "Internal window, sill and frame cleaning",
          "Inside cupboards, wardrobes and drawers",
          "Oven and built-in appliance deep clean",
          "Limescale removal from taps, grout and glass",
          "Skirting boards, door frames and switches wiped down",
        ],
        excluded: [
          "Carpet steam cleaning (available as an add-on)",
          "Garden or outdoor clearance",
        ],
      },
    ],
  },
  {
    id: "commercial",
    pillarTitle: "Commercial",
    pillarDescription: "Reliable contract cleaning for offices, retail units and hospitality venues across Pembrokeshire.",
    services: [
      {
        title: "Commercial & Office Cleans",
        summary: "Scheduled contract cleaning for offices and commercial premises, in or out of hours.",
        description: "Dependable commercial cleaning for offices, retail units, pubs and venues, on a schedule that suits you — including early morning, evening or weekend slots with keyholder options.",
        included: [
          "Custom weekly, bi-weekly or daily schedules",
          "Desks, workstations and reception areas cleaned",
          "Staff kitchen and breakroom cleaned",
          "Washroom cleaning and consumable restocking",
          "Floor vacuuming and mopping",
          "Bin emptying and recycling sorted",
          "Keyholder options for out-of-hours access",
        ],
        excluded: [
          "IT/server room maintenance",
          "Exterior high-level window cleaning",
        ],
      },
    ],
  },
  {
    id: "construction-welfare",
    pillarTitle: "Construction & Welfare",
    pillarDescription: "DBS-checked cleaning teams, working towards CSCS accreditation, covering site welfare units and post-build handover cleans.",
    services: [
      {
        title: "Construction Site Welfare Facility Cleans",
        summary: "Scheduled hygiene cleaning for site cabins, canteens and welfare facilities by DBS-checked crew.",
        description: "Scheduled cleaning for site cabins, canteens, drying rooms and welfare units, carried out by DBS-checked operatives working towards CSCS accreditation and following site safety protocols.",
        included: [
          "Scheduled weekly, bi-weekly or daily rotations",
          "Canteen and mess room cleaned",
          "Drying rooms and locker areas cleaned",
          "Welfare toilets and shower blocks cleaned and restocked",
          "High-touch point disinfection",
          "Site office cleaning",
          "Crew in full site PPE, working towards CSCS accreditation",
        ],
        excluded: [
          "Hazardous waste or asbestos removal",
          "Structural site clearance (see Post-Construction Cleans)",
        ],
      },
      {
        title: "Post-Construction & Builder Cleans",
        summary: "Phased builder cleans removing dust, debris and residue ready for handover.",
        description: "Multi-stage cleaning for building sites, extensions and renovations — from an initial builder clean through to a final sparkle clean ready for handover.",
        included: [
          "Builder clean, sparkle clean and pre-handover touch-up",
          "Dust and debris removal with HEPA filtration",
          "Paint overspray and adhesive removal from glass and tiles",
          "Internal window and sill cleaning",
          "Kitchen units and sanitaryware cleaned",
          "Hard floor clean and carpet protection",
        ],
        excluded: [
          "Skip loading or rubbish removal",
          "Exterior scaffolding or render cleaning",
        ],
      },
    ],
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative -mt-16 md:-mt-20 pt-40 md:pt-48 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCleaning} alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 eco-gradient-overlay" />
        </div>
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-eco-gold text-xs tracking-[0.3em] uppercase">Our craft</span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-white mt-4 mb-6 leading-[0.95]">
              Our <em className="italic text-eco-gold/95">services.</em>
            </h1>
            <p className="text-white/80 text-lg font-light max-w-xl">
              Professional cleaning solutions across 3 dedicated service pillars in Pembrokeshire.
              Eco-friendly products as standard — tougher dirt occasionally gets a tougher tool.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Breakdown by Pillar */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto space-y-16">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground mb-3">
              Explore Our 3 Core Service Pillars
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              Select any service below to view detailed specifications, inclusions, and exclusions.
            </p>
          </motion.div>

          {servicePillars.map((pillar) => (
            <div key={pillar.id} id={pillar.id} className="space-y-6 pt-6 first:pt-0 border-t first:border-t-0 border-border/70">
              {/* Pillar Header */}
              <div className="pb-2">
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
                  {pillar.pillarTitle}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                  {pillar.pillarDescription}
                </p>
              </div>

              {/* Pillar Accordion */}
              <Accordion type="multiple" className="space-y-4">
                {pillar.services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(index * 0.05, 0.2) }}
                  >
                    <AccordionItem
                      value={service.title}
                      className="bg-card border border-border px-4 sm:px-6 rounded-lg overflow-hidden shadow-sm hover:border-border transition-colors"
                    >
                      <AccordionTrigger className="hover:no-underline py-5 text-left">
                        <div className="flex-1 pr-4">
                          <h4 className="font-heading font-semibold text-lg md:text-xl text-foreground">
                            {service.title}
                          </h4>
                          <p className="text-xs md:text-sm text-muted-foreground mt-1 font-normal">
                            {service.summary}
                          </p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-6 border-t border-border/60">
                        <p className="text-sm text-foreground/90 leading-relaxed mb-6">
                          {service.description}
                        </p>

                        <div className="bg-background p-4 rounded-md border border-border/60 mb-4">
                          <h5 className="font-heading font-semibold text-sm text-foreground mb-3">
                            What's Included
                          </h5>
                          <ul className="list-disc list-inside space-y-1.5 text-xs md:text-sm text-muted-foreground">
                            {service.included.map((item) => (
                              <li key={item} className="leading-relaxed">
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <p className="text-xs text-muted-foreground/80 leading-relaxed">
                          <span className="font-medium text-muted-foreground">Not included:</span>{" "}
                          {service.excluded.join(" • ")} — ask about add-ons.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}

                {/* Optional Extras - folded in here since every category
                    below is domestic-flavoured (kitchen/interior/upholstery/
                    holiday let/exterior); doesn't fit Commercial or
                    Construction & Welfare, so no standalone page section */}
                {pillar.id === "domestic-residential" && (
                  <AccordionItem
                    value="optional-extras"
                    className="bg-card border border-border px-4 sm:px-6 rounded-lg overflow-hidden shadow-sm hover:border-border transition-colors"
                  >
                    <AccordionTrigger className="hover:no-underline py-5 text-left">
                      <div className="flex-1 pr-4">
                        <h4 className="font-heading font-semibold text-lg md:text-xl text-foreground">
                          Optional Extras & Add-Ons
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1 font-normal">
                          Add any of these to your clean — select extras when building your quote.
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6 border-t border-border/60">
                      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mt-4">
                        {extrasGroups.map((group) => (
                          <div key={group.title}>
                            <h5 className="font-heading font-semibold text-sm text-foreground mb-1.5">
                              {group.title}
                            </h5>
                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                              {group.items.join(" • ")}
                            </p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          ))}
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
