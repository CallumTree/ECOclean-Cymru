import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ChevronRight, ArrowRight, Leaf, BadgeCheck, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { whatsappLink } from "@/lib/constants";
import logo from "@/assets/logo-mark.png";
import heroImg from "@/assets/hero-cleaning.jpg";
import serviceDomestic from "@/assets/real-photos/bathroom-after.jpg";
import serviceCommercial from "@/assets/real-photos/pub-bar.jpg";
// Photo credit: MChe Lee, via Unsplash — stacked modular welfare cabins,
// directly representative of the site welfare units this pillar covers.
const servicePostConstruction = "https://images.unsplash.com/photo-1789784145518-68a9deec9d61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
import { beforeAfterPairs } from "@/lib/beforeAfterGallery";

// Shown in place of customer reviews until we have real, verifiable
// Google reviews to display instead of asking people to take our word for it.
const whyChooseUs = [
  {
    icon: Leaf,
    title: "Eco-Friendly as Standard",
    description: "Non-toxic, environmentally responsible products, safe for family and pets.",
  },
  {
    icon: BadgeCheck,
    title: "DBS Checked",
    description: "Every team member is DBS checked before they set foot in your home or business.",
  },
  {
    icon: MapPin,
    title: "Pembrokeshire Local",
    description: "Based here, serving here — not a franchise or a call centre miles away.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Early mornings, evenings, or weekends — we work around you.",
  },
];

const servicePillars = [
  {
    id: "domestic-residential",
    title: "Domestic Residential",
    image: serviceDomestic,
    description:
      "From regular weekly home cleans and 5-star holiday let changeovers to thorough end-of-tenancy cleans, deep oven restorations, and targeted anti-fungal mould treatments. We keep private homes and letting properties spotless with safe, eco-friendly products.",
    cta: "See Domestic Residential",
  },
  {
    id: "commercial",
    title: "Commercial",
    image: serviceCommercial,
    description:
      "Tailored contract cleaning for offices, retail units, pubs, restaurants, and community venues across Pembrokeshire. Flexible early morning, evening, or weekend routines with keyholder options keeping your workspace fresh for staff and clients.",
    cta: "See Commercial",
  },
  {
    id: "construction-welfare",
    title: "Construction & Welfare",
    image: servicePostConstruction,
    description:
      "Dedicated cleaning operatives for scheduled site cabin, canteen, and welfare facility hygiene maintenance, plus multi-stage post-construction builder cleans and sparkle finishes ready for client handover. DBS checked, working towards CSCS accreditation.",
    cta: "See Construction & Welfare",
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

      {/* HERO — full-bleed image, clean editorial presentation */}
      <section className="relative min-h-[90svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Professional cleaner wiping a marble worktop in a sunlit kitchen"
            className="w-full h-full object-cover scale-105"
            width={1920}
            height={1280}
          />
          <div className="absolute inset-0 eco-gradient-overlay" />
        </div>

        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 relative pt-32 pb-20 md:pt-40 md:pb-28 w-full">
          <div className="max-w-3xl">
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
        </div>
      </section>

      {/* Trust Strip — clean single row of plain text */}
      <section className="bg-eco-dark py-5 border-y border-white/5">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs md:text-sm uppercase tracking-widest text-white/70 font-medium">
            Eco-Friendly Products &nbsp;&bull;&nbsp; Reliable Local Cleaners &nbsp;&bull;&nbsp; DBS Checked &nbsp;&bull;&nbsp; Working Towards CSCS
          </p>
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

      {/* Services — 3 Pillar Teasers */}
      <section className="section-padding bg-muted/40">
        <div className="container-wide mx-auto">
          <motion.div className="max-w-3xl mb-14" {...fadeInUp}>
            <span className="text-eco-gold text-xs tracking-[0.3em] uppercase">Targeted Cleaning Solutions</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mt-4 leading-[1.05]">
              Professional cleaning tailored across <em className="italic text-primary">3 core pillars.</em>
            </h2>
            <p className="text-muted-foreground mt-4 text-base md:text-lg">
              Delivering reliable, eco-conscious cleaning for Pembrokeshire homes, holiday lettings, commercial premises, and construction site facilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicePillars.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                className="group flex flex-col bg-card border border-border/60 rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-muted">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-2xl font-normal text-foreground group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <div className="w-10 h-px bg-eco-gold/80 my-3" />
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {pillar.description}
                  </p>

                  <Button variant="pill" size="sm" className="w-full justify-center" asChild>
                    <Link to={`/services#${pillar.id}`}>
                      {pillar.cta}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Button variant="pillOutline" size="lg" asChild>
              <Link to="/services">
                View All Inclusions & Specifications
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

      {/* Why Choose Us — replaces customer reviews until we have real,
          verifiable Google reviews to show instead */}
      <section className="section-padding bg-eco-charcoal text-white">
        <div className="container-wide mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-medium mb-3">
              Why Pembrokeshire Chooses Us
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              No gimmicks — just reliable, well-done cleaning from a local team.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-white/5 border border-white/10 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <item.icon className="w-6 h-6 text-eco-gold mb-3" />
                <h3 className="font-heading font-semibold mb-1.5">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
