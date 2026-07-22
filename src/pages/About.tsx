import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Shield, Leaf, BadgeCheck, Users, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { whatsappLink } from "@/lib/constants";
import teamImg from "@/assets/about-team.jpg";
import testimonialsBg from "@/assets/testimonials-bg.jpg";

const values = [
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Complete peace of mind with comprehensive public liability insurance.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "We use non-toxic, environmentally responsible products as standard — safe for your family and pets. Tougher dirt or stains occasionally need extra product or a different method, but eco-friendly is always our starting point.",
  },
  {
    icon: BadgeCheck,
    title: "CSCS Qualified",
    description: "Our team holds CSCS cards for safe work on construction sites and commercial environments.",
  },
  {
    icon: Users,
    title: "Local Team",
    description: "We're based in Pembrokeshire and proud to serve our local community.",
  },
];

export default function About() {
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
              About ECOclean Cymru
            </h1>
            <p className="text-white/70 text-lg">
              Professional cleaning with local values.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-12">
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-foreground mb-1">
                Who We Are
              </h2>
              <div className="w-12 h-0.5 bg-eco-gold mb-6" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  ECOclean Cymru LTD is a professional cleaning company based in Pembrokeshire, Wales.
                  We provide reliable, high-quality cleaning services to homes and businesses across the county.
                </p>
                <p>
                  Our approach is simple: do the job properly, use products that are kind to the environment,
                  and deliver the kind of service we'd want in our own homes. We're not a faceless company –
                  we're local, we're accountable, and we take pride in every clean.
                </p>
                <p>
                  From regular domestic cleaning to specialist post-construction work, we bring the same
                  attention to detail and professionalism to every job. Our team holds CSCS cards and
                  is experienced in working across various environments, from family homes to building sites.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-foreground text-center mb-8">
              What We Stand For
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {values.map((value) => (
                <div key={value.title}>
                  <value.icon className="w-9 h-9 text-primary mb-4" strokeWidth={1.25} />
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    {value.title}
                  </h3>
                  <div className="w-10 h-0.5 bg-eco-gold mt-2 mb-3" />
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Service Area */}
          <motion.div
            className="mt-12 bg-eco-tint p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MapPin className="w-8 h-8 text-primary mx-auto mb-4" strokeWidth={1.25} />
            <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
              Serving Pembrokeshire
            </h3>
            <p className="text-muted-foreground mb-6">
              We cover Haverfordwest, Milford Haven, Pembroke, Tenby, Narberth, and surrounding areas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="pill" asChild>
                <Link to="/contact">
                  Get in Touch
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
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
