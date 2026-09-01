import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Shield, Leaf, Users, BadgeCheck, UserCheck, ChevronRight, Sparkles, HardHat, Briefcase, ArrowRight, Key, Home, Building2, ShieldCheck, CalendarClock, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { whatsappLink } from "@/lib/constants";
import logo from "@/assets/logo-mark.png";
import heroImg from "@/assets/hero-cleaning.jpg";
import serviceDomestic from "@/assets/service-domestic.jpg";
import serviceDeep from "@/assets/service-deep.jpg";
import serviceCommercial from "@/assets/service-commercial.jpg";
import servicePostConstruction from "@/assets/service-postconstruction.jpg";
import serviceHolidayLet from "@/assets/service-holidaylet.jpg";
import serviceEot from "@/assets/service-eot.jpg";
import afterKitchen from "@/assets/after-kitchen.jpg";
import { beforeAfterPairs } from "@/lib/beforeAfterGallery";
import Testimonials from "@/components/Testimonials";

const trustItems = [
  { icon: Shield, text: "Fully Insured" },
  { icon: Leaf, text: "Eco-Friendly Products" },
  { icon: Users, text: "Reliable Local Cleaners" },
  { icon: BadgeCheck, text: "CSCS Card Holders" },
  { icon: UserCheck, text: "DBS Checks in Progress" },
];

const services = [
  {
    icon: ShieldCheck,
    title: "Construction Site Welfare Facility Cleans",
    tag: "Construction & Site Welfare",
    targetMarket: "Site Cabins, Canteens & Welfare Units",
    schedule: "Scheduled Weekly / Bi-Weekly & Daily Cleans",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=1200&auto=format",
    description: "Regular, scheduled weekly or bi-weekly cleans (plus daily maintenance & deep cleans) for site cabins, canteens, drying rooms, and office welfare facilities. CSCS card-holding crew adhering to strict site PPE & hygiene protocols.",
  },
  {
    icon: Key,
    title: "Holiday Let & Airbnb Turnovers",
    tag: "Pembrokeshire Hospitality",
    targetMarket: "Holiday Cottages & Coastal BNBs",
    schedule: "Changeover & Regular Seasonal Schedules",
    image: serviceHolidayLet,
    description: "Fast, reliable changeover cleans between guests so your holiday let is spotless and guest-ready every time. Maintain 5-star host reviews across Pembrokeshire.",
  },
  {
    icon: HardHat,
    title: "Post-Construction & Builder Cleans",
    tag: "Builders & Developers",
    targetMarket: "New Builds & Property Extensions",
    schedule: "Phased & Final Handover Cleans",
    image: heroImg,
    description: "Specialist post-build cleans for building sites, extensions, and renovations. Removing dust, paint overspray, and film ready for client handover.",
  },
  {
    icon: Building2,
    title: "Commercial & Office Cleans",
    tag: "Commercial & Workspaces",
    targetMarket: "Offices, Pubs, Retail & Childcare",
    schedule: "Scheduled Weekly / Bi-Weekly Cleans",
    image: serviceCommercial,
    description: "Reliable regular weekly or bi-weekly scheduled cleaning for offices, hospitality venues, and business premises. Flexible out-of-hours routines keeping workspaces fresh for staff and clients.",
  },
  {
    icon: Sparkles,
    title: "Deep Cleans & Oven Restoration",
    tag: "Residential & Commercial",
    targetMarket: "Homeowners & Commercial Kitchens",
    schedule: "One-Off Deep or Scheduled Maintenance",
    image: afterKitchen,
    description: "Thorough top-to-bottom restorative cleaning for homes and businesses. High dusting, tile grout, appliances, and stubborn oven grime removal.",
  },
  {
    icon: BadgeCheck,
    title: "End of Tenancy Cleans",
    tag: "Property & Lettings",
    targetMarket: "Tenants, Landlords & Estate Agents",
    schedule: "Scheduled Move-In / Move-Out Cleans",
    image: serviceEot,
    description: "Deposit-standard deep cleaning for rental properties. Comprehensive inventory check-list ready for landlords and letting agents across Pembrokeshire.",
  },
  {
    icon: Home,
    title: "Regular Domestic Cleans",
    tag: "Home Care",
    targetMarket: "Homeowners & Busy Families",
    schedule: "Scheduled Weekly / Bi-Weekly Cleans",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1200&auto=format",
    description: "Scheduled weekly or bi-weekly home cleans on a custom schedule. Trusted local cleaners using non-toxic, family and pet-safe eco-friendly products.",
  },
  {
    icon: Droplets,
    title: "Mould Cleaning & Removal",
    tag: "Specialist Hygiene",
    targetMarket: "Damp-Prone Homes, Lettings & Site Cabins",
    schedule: "Targeted Treatment & Preventative Care",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format",
    description: "Specialist anti-fungal mould treatment, black mould eradication, and spore removal for walls, ceilings, tiles, and window frames. Safe biocidal treatment preventing regrowth.",
  },
];

const workingWith = [
  "Property Developers",
  "Local Builders",
  "Pubs & Hospitality",
  "Childcare & Education",
  "Domestic Clients",
  "Small Businesses",
];

const steps = [
  { number: "01", title: "Get in Touch", description: "Send us a message or give us a call" },
  { number: "02", title: "We Confirm the Scope", description: "We'll discuss your needs and provide a quote" },
  { number: "03", title: "We Clean – Properly", description: "Our team arrives and delivers excellent results" },
];

const beforeAfter = beforeAfterPairs;

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const Index = () => {
  return (
    <Layout>
      {/* Brand Banner */}
      <section className="bg-background py-12 md:py-16">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left">
          <motion.img
            src={logo}
            alt="ECOclean Cymru logo"
            className="h-24 md:h-32 w-auto shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-foreground leading-none">
              ECO<span className="font-normal text-primary">clean</span>{" "}
              <span className="italic text-eco-gold">Cymru</span>
            </h2>
            <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-muted-foreground mt-3">
              Pembrokeshire's Eco-Friendly Cleaning Specialists
            </p>
          </motion.div>
        </div>
      </section>

      {/* HERO — full-bleed image, asymmetric */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Professional cleaner wiping a marble worktop in a sunlit kitchen"
            className="w-full h-full object-cover scale-105"
            width={1920}
            height={1280}
          />
          <div className="absolute inset-0 eco-gradient-overlay" />
          <div className="absolute inset-0 grain-overlay opacity-60" />
        </div>

        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 relative pt-32 pb-20 md:pt-40 md:pb-28 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 xl:col-span-6">
              <motion.span
                className="inline-flex items-center gap-2 text-eco-gold/90 text-xs tracking-[0.3em] uppercase mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="w-8 h-px bg-eco-gold/70" />
                Pembrokeshire · Est. Local
              </motion.span>

              <motion.h1
                className="font-display text-white leading-[0.95] tracking-tight mb-8 text-[clamp(2.75rem,7vw,5.75rem)] font-light"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Complete{" "}
                <em className="italic text-eco-gold/95 font-light">cleaning</em>
                <br />
                solutions,{" "}
                <span className="whitespace-nowrap">done properly.</span>
              </motion.h1>

              <motion.p
                className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed max-w-xl font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                Domestic, deep cleans, end of tenancy and holiday-let turnovers across Pembrokeshire. Eco-friendly products. Trusted by homes and businesses.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
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
              </motion.div>
            </div>

            <motion.div
              className="hidden lg:block lg:col-span-5 lg:col-start-8 xl:col-start-9"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              <div className="border-l border-eco-gold/40 pl-6 space-y-6 text-white/70 text-sm">
                <div>
                  <div className="text-eco-gold text-3xl font-display font-light">100%</div>
                  <div className="uppercase tracking-widest text-xs mt-1">Eco-friendly by default</div>
                </div>
                <div>
                  <div className="text-eco-gold text-3xl font-display font-light">CSCS</div>
                  <div className="uppercase tracking-widest text-xs mt-1">Card-holding crew</div>
                </div>
                <div>
                  <div className="text-eco-gold text-3xl font-display font-light">7 Day</div>
                  <div className="uppercase tracking-widest text-xs mt-1">Fast quote turnaround</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-[10px] tracking-[0.4em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Scroll ↓
        </motion.div>
      </section>

      {/* Trust Strip — dark band */}
      <section className="bg-eco-dark py-6 border-y border-white/5">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {trustItems.map((item, index) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-2 text-white/70"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <item.icon className="w-4 h-4 text-eco-gold" strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-widest font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro / Manifesto — asymmetric two-column */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div className="lg:col-span-5 lg:col-start-1" {...fadeInUp}>
            <span className="text-eco-gold text-xs tracking-[0.3em] uppercase">Our approach</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mt-4 leading-[1.05]">
              Cleaning that actually feels <em className="italic text-primary">clean.</em>
            </h2>
          </motion.div>
          <motion.div className="lg:col-span-6 lg:col-start-7 space-y-5 text-muted-foreground leading-relaxed text-lg" {...fadeInUp}>
            <p>
              We're a small, accountable Pembrokeshire team who care about the finish. No corner-cutting, no rushed jobs, no chemical stink lingering after we leave.
            </p>
            <p>
              Every clean is quoted honestly, competitively priced, and delivered with eco-friendly products as standard — the tougher jobs get the tougher tools when they need them.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-primary font-medium mt-2 group">
              More about us
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services — image-forward cards */}
      <section className="section-padding bg-muted/40">
        <div className="container-wide mx-auto">
          <motion.div className="max-w-3xl mb-14" {...fadeInUp}>
            <span className="text-eco-gold text-xs tracking-[0.3em] uppercase">Targeted Cleaning Solutions</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mt-4 leading-[1.05]">
              Professional cleaning tailored to your <em className="italic text-primary">industry & home.</em>
            </h2>
            <p className="text-muted-foreground mt-4 text-base md:text-lg">
              From CSCS-accredited construction site welfare cleans to fast 5-star holiday let turnovers and commercial office maintenance across Pembrokeshire.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                className="group flex flex-col bg-card border border-border/60 rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-muted">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = serviceDomestic;
                    }}
                    className="w-full h-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur shadow flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>

                  <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full backdrop-blur">
                    {service.tag}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">
                    <span className="text-eco-gold font-semibold">Target:</span> {service.targetMarket}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {service.schedule && (
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 px-2.5 py-1 rounded-md mb-2.5 border border-emerald-200/60 dark:border-emerald-800/40 w-fit">
                      <CalendarClock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{service.schedule}</span>
                    </div>
                  )}
                  <h3 className="font-display text-xl md:text-2xl font-normal text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <div className="w-10 h-px bg-eco-gold/80 my-3" />
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                  >
                    View Details & Requirements
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Button variant="pillOutline" size="lg" asChild>
              <Link to="/services">
                View All Services & Specifications
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER — full-bleed dark */}
      <section className="relative section-padding bg-eco-charcoal text-white overflow-hidden">
        <div className="container-wide mx-auto">
          <motion.div className="max-w-2xl mb-12" {...fadeInUp}>
            <span className="text-eco-gold text-xs tracking-[0.3em] uppercase">The Transformation</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mt-4 leading-[1.05]">
              Before &amp; <em className="italic text-eco-gold/95">after.</em>
            </h2>
            <p className="text-white/60 mt-4 max-w-lg">
              Real difference, real detail. Slide your eye across — these are the moments that matter.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {beforeAfter.map((pair, i) => (
              <motion.div
                key={pair.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <div className="grid grid-cols-2 gap-1 aspect-[16/9]">
                  <div className="relative overflow-hidden">
                    <img src={pair.before} alt={`${pair.label} before`} loading="lazy" className="w-full h-full object-cover grayscale-[30%]" />
                    <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] tracking-widest uppercase px-2 py-1">Before</span>
                  </div>
                  <div className="relative overflow-hidden">
                    <img src={pair.after} alt={`${pair.label} after`} loading="lazy" className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-eco-gold text-eco-charcoal text-[10px] tracking-widest uppercase px-2 py-1 font-semibold">After</span>
                  </div>
                </div>
                <p className="mt-4 font-display text-xl text-white/90">{pair.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Alongside — scrolling marquee, lighter */}
      <section className="py-14 bg-background border-y border-border">
        <div className="container-wide mx-auto px-4 mb-6">
          <p className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Working Alongside
          </p>
        </div>
        <div className="overflow-hidden relative">
          <div className="flex scroll-banner">
            {[...workingWith, ...workingWith].map((item, index) => (
              <div key={index} className="flex-shrink-0 mx-6 flex items-center gap-6">
                <span className="font-display text-2xl md:text-3xl font-light text-foreground/80 whitespace-nowrap">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-eco-gold" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <Testimonials />

      {/* How It Works — editorial numbered */}
      <section className="section-padding bg-background">
        <div className="container-wide mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <span className="text-eco-gold text-xs tracking-[0.3em] uppercase">Simple, from day one</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mt-4 leading-[1.05]">
              How it works.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-4 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative md:px-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 w-6 h-px bg-border" />
                )}
                <span className="font-display text-7xl md:text-8xl font-light text-eco-gold/30 leading-none">
                  {step.number}
                </span>
                <h3 className="font-display text-2xl font-light mt-3 mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button size="lg" variant="pill" asChild>
              <Link to="/contact">
                Get Started Today
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
