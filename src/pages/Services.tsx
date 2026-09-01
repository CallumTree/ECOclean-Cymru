import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Home, Sparkles, Building2, HardHat, Briefcase, CalendarClock, Refrigerator, Layers, Check, ChevronRight, ShieldCheck, Key, BadgeCheck, Users, Droplets } from "lucide-react";
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

const services = [
  {
    icon: ShieldCheck,
    title: "Construction Site Welfare Facility Cleans",
    tag: "Construction & Site Welfare",
    targetMarket: "Site Cabins, Canteens, Drying Rooms & Welfare Units",
    schedule: "Scheduled Weekly, Bi-Weekly or Daily Rotations",
    description: "Scheduled and deep hygiene maintenance for site cabins, canteens, drying rooms, showers, and site management offices across Pembrokeshire. Fully trained CSCS card-holding operatives adhering strictly to site safety protocols, PPE requirements, RAMS, and HSE welfare hygiene standards.",
    consultation: true,
    included: [
      "Scheduled weekly, bi-weekly, or daily shift-tailored cleaning rotations",
      "Site canteen & mess room tables, benches, counters, and microwave/fridge sanitization",
      "Drying rooms, locker areas & boot washdowns with disinfectant wash",
      "Welfare toilets, shower blocks, and washroom sanitization & paper product restocking",
      "High-touch point disinfectant wipes (door handles, light switches, keypads, handrails)",
      "Site manager offices, desks, computer monitors & filing equipment dust & wipe",
      "100% CSCS card-holding crew wearing mandatory site PPE (hard hat, boots, hi-vis, gloves)",
      "Custom site safety briefing & RAMS compliance provided prior to starting work",
    ],
    excluded: [
      "Hazardous chemical waste or asbestos removal",
      "Structural site clearance (covered under Post-Construction / Builder Cleans)",
    ],
  },
  {
    icon: Key,
    title: "Holiday Let & Airbnb Turnovers",
    tag: "Pembrokeshire Hospitality",
    targetMarket: "Holiday Cottages, Coastal Apartments & Airbnb BNBs",
    schedule: "Changeover & Regular Seasonal Schedules",
    description: "Fast, reliable, and meticulous turnover cleaning tailored for Pembrokeshire holiday homeowners and letting agents. We guarantee 5-star cleanliness standards between guest stays, ensuring seamless check-ins and glowing guest reviews.",
    consultation: false,
    included: [
      "Flexible changeover scheduling aligned with guest check-in / check-out windows",
      "Full kitchen deep sanitization, appliance wipe-downs, and cutlery/crockery checks",
      "Sparkling bathroom deep clean, anti-limescale treatment, and mirror polishing",
      "Bed stripping, fresh linen fitting, and hotel-style bed dressing (on request)",
      "High-touch surface disinfection (remotes, door handles, key safes, light switches)",
      "Thorough vacuuming and mopping of all floors, patios, and entryways",
      "Pre-arrival damage check, lost property reporting, and welcome pack placement",
      "Bin emptying & fresh liner installation prior to new guest arrival",
    ],
    excluded: [
      "Off-site commercial laundry processing (available as a dedicated extra)",
      "Welcome pack hamper sourcing & purchasing",
    ],
  },
  {
    icon: HardHat,
    title: "Post-Construction & Builder Cleans",
    tag: "Builders & Developers",
    targetMarket: "New Builds, Renovation Projects & Property Extensions",
    schedule: "Phased (Sparkle/Builder) & Final Handover Cleans",
    description: "Specialist multi-stage post-construction cleaning for building sites, extensions, and commercial renovations. We eliminate fine plaster dust, paint overspray, silicone film, and grout haze, ensuring a pristine finish ready for client handover.",
    consultation: true,
    included: [
      "Phased cleaning options: Initial builder clean, sparkle clean, and pre-handover touch-up",
      "Fine plaster dust, sawdust, and residual building debris vacuuming with HEPA filtration",
      "Paint overspray, sticker adhesive, and grout haze removal from glass and tiles",
      "Internal glass window polishing, frame cleaning, sills, and skirting board deep wipes",
      "Sanitizing built-in appliances, kitchen units, sanitaryware, and chrome fittings",
      "Hard floor scrub, wash, and carpet protective vacuuming",
      "Mould assessment and damp diagnosis on request before final decorating",
    ],
    excluded: [
      "Waste skip loading or heavy rubbish removal",
      "Exterior high-reach scaffolding or render jet washing",
    ],
  },
  {
    icon: Briefcase,
    title: "Commercial & Office Cleans",
    tag: "Commercial & Workspaces",
    targetMarket: "Offices, Retail Stores, Pubs, Restaurants & Childcare Facilities",
    schedule: "Scheduled Weekly, Bi-Weekly or Daily Out-of-Hours",
    description: "Dependable, high-grade commercial cleaning for offices, hospitality venues, and business premises across Pembrokeshire. We offer flexible early morning, evening, or weekend slots to keep your workplace immaculate without disrupting operations.",
    consultation: true,
    included: [
      "Custom weekly, bi-weekly, or daily contract cleaning packages",
      "Workstation, desk, keyboard, phone, and reception area sanitization",
      "Staff kitchen & breakroom deep cleans including microwaves, kettles, and sinks",
      "Washroom & toilet block deep sanitization, mirror polishing, and consumable restocking",
      "Commercial floor vacuuming, hard floor mopping, and entrance matting care",
      "Waste bin emptying, liner replacement, and eco-friendly recycling sorting",
      "Keyholder options and fully insured out-of-hours cleaning teams",
    ],
    excluded: [
      "Server room deep technical hardware maintenance",
      "Exterior window abseiling / cradle cleaning",
    ],
  },
  {
    icon: Sparkles,
    title: "Deep Cleans & Oven Cleans",
    tag: "Residential & Commercial",
    targetMarket: "Homeowners, Commercial Kitchens & Restorative Care",
    schedule: "One-Off Deep Cleans or Periodic Maintenance",
    description: "A comprehensive, intensive top-to-bottom restorative clean for homes or commercial kitchens needing a total reset. Tackles heavy grime, stubborn limescale, oven grease, and hidden dust traps that regular cleaning misses.",
    consultation: false,
    included: [
      "Heavy-duty oven, range cooker, hob, and extractor filter deep degreasing",
      "Refrigerator, freezer, dishwasher, and washing machine drum & seal hygiene wash",
      "High-level dusting of light fittings, ceiling corners, and curtain poles",
      "Tile grout scrubbing, hard water deposit scaling, and silicone line treatment",
      "Moving movable furniture to clean underneath and behind",
      "Detailed door, frame, architrave, and radiator deep cleaning",
    ],
    excluded: [
      "Appliance electrical repairs",
      "Structural wall painting or plaster repair",
    ],
  },
  {
    icon: Building2,
    title: "End of Tenancy Cleans",
    tag: "Property & Lettings",
    targetMarket: "Tenants, Landlords, Letting Agents & Estate Agents",
    schedule: "Scheduled Move-In & Move-Out Deep Cleans",
    description: "Comprehensive, deposit-guaranteed deep cleaning for rental properties across Pembrokeshire. Designed to meet strict letting agent inventory checklists, ensuring tenants secure their full deposit return and landlords have properties ready for immediate re-letting.",
    consultation: false,
    included: [
      "Full property deep clean covering bedrooms, living areas, kitchens, and bathrooms",
      "Internal window cleaning, frame, sill, and track wipe-downs",
      "Inside and outside cupboard, wardrobe, and drawer sanitization",
      "Oven, hob, extractor fan, and built-in appliance deep degreasing",
      "Limescale removal from taps, shower heads, tile grout, and glass screens",
      "Skirting boards, door frames, light switches, and socket faceplate wipe-downs",
      "Detailed move-out inventory checklist provided for agent sign-off",
    ],
    excluded: [
      "Professional carpet steam extraction (available as a specialized add-on)",
      "Garden clearance or outdoor shed emptying",
    ],
  },
  {
    icon: Home,
    title: "Regular Domestic Cleans",
    tag: "Home Care",
    targetMarket: "Homeowners, Busy Families & Private Residences",
    schedule: "Scheduled Weekly or Bi-Weekly Custom Routines",
    description: "Consistent, friendly, and trustworthy domestic home cleaning on a fixed weekly or bi-weekly routine. Our vetted local cleaning staff use family and pet-safe eco-friendly products to maintain a healthy, spotless living environment.",
    consultation: false,
    included: [
      "Dedicated regular cleaner for personal consistency and trust",
      "Kitchen counter wiping, hobs, sink sanitization, and exterior appliance cleaning",
      "Bathroom & shower deep scrubbing, limescale control, and mirror polishing",
      "Dusting all surfaces, picture frames, ornaments, and skirting boards",
      "Vacuuming carpets & rug areas; mopping hard floors throughout the house",
      "Bed making, bin emptying, and gentle tidying of living spaces",
      "Non-toxic, eco-friendly plant-based cleaning chemicals safe for kids & pets",
    ],
    excluded: [
      "Heavy oven degreasing (available as an occasional add-on)",
      "Off-site laundry & ironing",
    ],
  },
  {
    icon: Droplets,
    title: "Mould Cleaning & Removal",
    tag: "Specialist Hygiene",
    targetMarket: "Damp-Prone Homes, Rental Properties, Bathrooms & Site Welfare Cabins",
    schedule: "Targeted Treatment & Preventative Retreatment",
    description: "Specialist anti-fungal mould treatment, black mould eradication, and spore removal for walls, ceilings, silicone seals, and window frames. Safe biocidal treatment eliminating mould at the root and helping prevent recurrence.",
    consultation: true,
    included: [
      "Surface stain eradication & deep anti-fungal biocidal wash on affected walls & ceilings",
      "Black mould treatment on bathroom tile grout, silicone sealants & window frames",
      "Airborne spore control preparation and safe sanitizing wipe-down of surrounding areas",
      "On-site diagnostic assessment for underlying damp causes (condensation, cold bridging, ventilation)",
      "Application of anti-mould preventative barrier spray following cleaning treatment",
      "Operatives equipped with full specialist PPE and respiratory protection",
      "Post-treatment care guidelines and moisture control recommendations for property owners",
    ],
    excluded: [
      "Structural damp-proofing tanking or major building repairs (roofing, guttering)",
      "Replacing severely rotted timber or water-damaged structural plasterboard",
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
              Professional cleaning solutions for homes and businesses across Pembrokeshire.
              Eco-friendly products as standard — tougher dirt occasionally gets a tougher tool.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List - Deep Dive */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-xs font-semibold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Comprehensive Service Breakdown
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground mt-3 mb-3">
              Full Service Specifications & Inclusions
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              Select any service below for an in-depth breakdown of schedules, targeted client facilities, included checklist tasks, and available consultation options.
            </p>
          </motion.div>

          <Accordion type="multiple" className="space-y-4">
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
                  className="bg-card border border-border px-4 sm:px-6 rounded-lg overflow-hidden shadow-sm"
                >
                  <AccordionTrigger className="hover:no-underline py-5">
                    <div className="flex items-start sm:items-center gap-4 text-left w-full pr-2">
                      <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5 sm:mt-0">
                        <service.icon className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-primary/15 text-primary">
                            {service.tag}
                          </span>
                          {service.schedule && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/40">
                              <CalendarClock className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              {service.schedule}
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading font-semibold text-lg md:text-xl text-foreground">
                          {service.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground mt-0.5 line-clamp-1 hidden sm:block">
                          {service.targetMarket}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-6 border-t border-border/60">
                    {/* Target market & deeper description */}
                    <div className="mb-5 bg-muted/40 p-4 rounded-md border border-border/40">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
                        <Users className="w-3.5 h-3.5 shrink-0" />
                        <span>Target Clients & Facilities: {service.targetMarket}</span>
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed mt-1">
                        {service.description}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div className="bg-background p-4 rounded-md border border-border/60">
                        <h4 className="font-heading font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          What's Included
                        </h4>
                        <ul className="space-y-2">
                          {service.included.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-background p-4 rounded-md border border-border/60">
                        <h4 className="font-heading font-semibold text-sm text-foreground mb-3 text-muted-foreground">
                          Not Included / Special Add-Ons
                        </h4>
                        <ul className="space-y-2">
                          {service.excluded.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground/80">
                              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 shrink-0 mt-1.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button variant="pill" size="sm" asChild>
                        <Link to="/contact">
                          Get a Quote
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="whatsapp" size="sm" className="rounded-full uppercase text-xs tracking-wider" asChild>
                        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                          <Phone className="w-4 h-4" />
                          WhatsApp Us
                        </a>
                      </Button>
                      {service.consultation && (
                        <Button variant="pillOutline" size="sm" asChild>
                          <Link to="/book-consultation">
                            <CalendarClock className="w-4 h-4" />
                            Book a Site Consultation
                          </Link>
                        </Button>
                      )}
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
