import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Shield, Leaf, Users, BadgeCheck, UserCheck, ChevronRight, Sparkles, HardHat, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { whatsappLink } from "@/lib/constants";
import heroImg from "@/assets/hero-cleaning.jpg";
import serviceDomestic from "@/assets/service-domestic.jpg";
import serviceDeep from "@/assets/service-deep.jpg";
import serviceEot from "@/assets/service-eot.jpg";
import serviceHolidayLet from "@/assets/service-holidaylet.jpg";
import beforeKitchen from "@/assets/before-kitchen.jpg";
import afterKitchen from "@/assets/after-kitchen.jpg";
import beforeBathroom from "@/assets/before-bathroom.jpg";
import afterBathroom from "@/assets/after-bathroom.jpg";
import testimonialsBg from "@/assets/testimonials-bg.jpg";

const trustItems = [
  { icon: Shield, text: "Fully Insured" },
  { icon: Leaf, text: "Eco-Friendly Products" },
  { icon: Users, text: "Reliable Local Cleaners" },
  { icon: BadgeCheck, text: "CSCS Card Holders" },
  { icon: UserCheck, text: "DBS Checks in Progress" },
];

const services = [
  { icon: Sparkles, title: "Deep Cleans", image: serviceDeep, description: "Thorough top-to-bottom cleaning for homes and businesses that need extra attention." },
  { icon: Users, title: "Regular Cleans", image: serviceDomestic, description: "Weekly or biweekly cleans to keep your space consistently fresh, on a routine that suits you." },
  { icon: Briefcase, title: "Commercial Office Cleans", image: serviceEot, description: "Reliable cleaning for offices and workspaces, keeping things presentable for staff and clients." },
  { icon: HardHat, title: "Post Construction Cleans", image: serviceHolidayLet, description: "Specialist cleaning for building sites. Quoted only after site visit or photos." },
];

const workingWith = [
  "Property Developers",
  "Local Builders",
  "Pubs & Hospitality",
  "Childcare & Education",
  "Domestic Clients",
  "Small Businesses",
];

const testimonials = [
  { name: "Callum Tree", role: "Construction Manager", company: "Developments & Site Welfare", quote: "ECOclean Cymru consistently deliver quality work on our construction sites. Professional, reliable, and always meet deadlines." },
  { name: "Amanda Jillions", role: "Pub Landlord", company: "Rose & Willow", quote: "Having a reliable cleaning team has made all the difference. The pub has never looked better, and our customers notice." },
  { name: "Jack Daniel", role: "Self-Employed Builder", company: "Extensions & Small Works", quote: "Great service for post-build cleans. They understand construction environments and always leave sites spotless." },
  { name: "Vicky Quin", role: "Owner", company: "Doodles Childcare", quote: "Trustworthy and thorough. They use safe, eco-friendly products which is essential for our childcare setting." },
];

const steps = [
  { number: "01", title: "Get in Touch", description: "Send us a message or give us a call" },
  { number: "02", title: "We Confirm the Scope", description: "We'll discuss your needs and provide a quote" },
  { number: "03", title: "We Clean – Properly", description: "Our team arrives and delivers excellent results" },
];

const beforeAfter = [
  { before: beforeKitchen, after: afterKitchen, label: "Kitchen Deep Clean" },
  { before: beforeBathroom, after: afterBathroom, label: "Bathroom Reset" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const Index = () => {
  return (
    <Layout>
      {/* HERO — full-bleed image, asymmetric */}
      <section className="relative -mt-16 md:-mt-20 min-h-[100svh] flex items-center overflow-hidden">
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
                  <div className="text-eco-gold text-3xl font-display font-light">£22.50</div>
                  <div className="uppercase tracking-widest text-xs mt-1">Domestic labour rate / hr</div>
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
              Every clean is quoted honestly, priced by the hour, and delivered with eco-friendly products as standard — the tougher jobs get the tougher tools when they need them.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-primary font-medium mt-2 group">
              More about us
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services — image-forward staggered cards */}
      <section className="section-padding bg-muted/40">
        <div className="container-wide mx-auto">
          <motion.div className="max-w-2xl mb-14" {...fadeInUp}>
            <span className="text-eco-gold text-xs tracking-[0.3em] uppercase">What we do</span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mt-4 leading-[1.05]">
              Services, tailored to the room.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                className={`group ${i % 2 === 1 ? "md:mt-16" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
              >
                <div className="relative overflow-hidden aspect-[4/3] mb-5">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-background/90 backdrop-blur flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-light text-foreground">
                  {service.title}
                </h3>
                <div className="w-10 h-px bg-eco-gold mt-3 mb-4" />
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Button variant="pillOutline" asChild>
              <Link to="/services">
                View All Services
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
          <p className="text-white/40 text-xs mt-8 italic">Placeholder photography — real job photos to follow.</p>
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

      {/* Testimonials on textured backdrop */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img src={testimonialsBg} alt="" aria-hidden="true" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-eco-dark/85" />
        </div>
        <div className="container-wide mx-auto relative text-white">
          <motion.div className="max-w-2xl mb-14" {...fadeInUp}>
            <span className="text-eco-gold text-xs tracking-[0.3em] uppercase">Client voices</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mt-4 leading-[1.05]">
              What our clients say.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-6 hover:bg-white/[0.07] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="font-display text-5xl text-eco-gold/60 leading-none">"</span>
                <p className="text-white/85 text-sm leading-relaxed mb-5 -mt-2 italic font-light">
                  {t.quote}
                </p>
                <div className="border-t border-white/10 pt-4">
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-white/60">{t.role}</p>
                  <p className="text-xs text-white/40">{t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-white/50 text-xs mt-8 italic">
            References and documentation available on request.
          </p>
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
