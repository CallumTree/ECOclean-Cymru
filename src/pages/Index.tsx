import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Shield, Leaf, Users, BadgeCheck, UserCheck, ArrowRight, Sparkles, HardHat, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { whatsappLink } from "@/lib/constants";
import logo from "@/assets/logo.jpeg";

const trustItems = [
  { icon: Shield, text: "Fully Insured" },
  { icon: Leaf, text: "Eco-Friendly Products" },
  { icon: Users, text: "Reliable Local Cleaners" },
  { icon: BadgeCheck, text: "CSCS Card Holders" },
  { icon: UserCheck, text: "DBS Checks in Progress" },
];

const services = [
  {
    icon: Sparkles,
    title: "Deep Cleans",
    description: "Thorough top-to-bottom cleaning for homes and businesses that need extra attention.",
  },
  {
    icon: Users,
    title: "Regular Cleans",
    description: "Weekly or biweekly cleans to keep your space consistently fresh, on a routine that suits you.",
  },
  {
    icon: Briefcase,
    title: "Commercial Office Cleans",
    description: "Reliable cleaning for offices and workspaces, keeping things presentable for staff and clients.",
  },
  {
    icon: HardHat,
    title: "Post Construction Cleans",
    description: "Specialist cleaning for building sites. Quoted only after site visit or photos.",
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

const testimonials = [
  {
    name: "Callum Tree",
    role: "Construction Manager",
    company: "Developments & Site Welfare",
    quote: "ECOclean Cymru consistently deliver quality work on our construction sites. Professional, reliable, and always meet deadlines.",
  },
  {
    name: "Amanda Jillions",
    role: "Pub Landlord",
    company: "Rose & Willow",
    quote: "Having a reliable cleaning team has made all the difference. The pub has never looked better, and our customers notice.",
  },
  {
    name: "Jack Daniel",
    role: "Self-Employed Builder",
    company: "Extensions & Small Works",
    quote: "Great service for post-build cleans. They understand construction environments and always leave sites spotless.",
  },
  {
    name: "Vicky Quin",
    role: "Owner",
    company: "Doodles Childcare",
    quote: "Trustworthy and thorough. They use safe, eco-friendly products which is essential for our childcare setting.",
  },
];

const steps = [
  { number: "01", title: "Get in Touch", description: "Send us a message or give us a call" },
  { number: "02", title: "We Confirm the Scope", description: "We'll discuss your needs and provide a quote" },
  { number: "03", title: "We Clean – Properly", description: "Our team arrives and delivers excellent results" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-eco-secondary to-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-wide mx-auto section-padding relative">
          <div className="max-w-3xl">
            <motion.img
              src={logo}
              alt="ECOclean Cymru"
              className="h-20 md:h-24 w-auto mb-6 bg-white rounded-lg p-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            />
            <motion.h1
              className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              Complete cleaning solutions
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Professional domestic cleaning, deep cleans, and end of tenancy services across Pembrokeshire. Eco-friendly products. Trusted by homes and businesses.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button size="lg" variant="gold" asChild>
                <Link to="/contact">Get a Quote</Link>
              </Button>
              <Button size="lg" variant="whatsapp" asChild>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-muted py-8 border-y border-border">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {trustItems.map((item, index) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-2 text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From regular domestic cleans to specialist post-construction work, we've got you covered.
            </p>
          </div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow border border-border"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/services">
                View All Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Working Alongside */}
      <section className="section-padding bg-muted">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Working Alongside
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've built strong relationships across various sectors, delivering consistent quality in every environment.
            </p>
          </div>
          <div className="overflow-hidden relative">
            <div className="flex scroll-banner">
              {[...workingWith, ...workingWith].map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-4 px-8 py-4 bg-background rounded-lg shadow-sm border border-border"
                >
                  <span className="font-medium text-foreground whitespace-nowrap">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
          </div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                className="bg-card rounded-xl p-6 shadow-card border border-border"
                variants={fadeInUp}
              >
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-center text-muted-foreground text-sm mt-8">
            References and documentation available on request.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-eco-charcoal text-white">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Getting started with ECOclean Cymru is simple.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <span className="text-5xl font-heading font-bold text-eco-gold opacity-50">
                  {step.number}
                </span>
                <h3 className="font-heading text-xl font-semibold mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="text-white/70 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="gold" asChild>
              <Link to="/contact">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
