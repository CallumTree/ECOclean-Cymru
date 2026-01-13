import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Shield, Leaf, BadgeCheck, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import logo from "@/assets/logo.jpeg";

const values = [
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Complete peace of mind with comprehensive public liability insurance.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Non-toxic, environmentally responsible products that are safe for your family and pets.",
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
      <section className="bg-gradient-to-br from-primary to-eco-secondary py-16 md:py-24">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img src={logo} alt="ECOclean Cymru" className="h-16 md:h-20 w-auto mb-4 bg-white rounded-lg p-2" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              About ECOclean Cymru
            </h1>
            <p className="text-white/90 text-lg">
              Professional cleaning with local values.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border mb-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                Who We Are
              </h2>
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
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              What We Stand For
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-card rounded-xl p-6 shadow-card border border-border"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Service Area */}
          <motion.div
            className="mt-12 bg-muted rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
              Serving Pembrokeshire
            </h3>
            <p className="text-muted-foreground mb-6">
              We cover Haverfordwest, Milford Haven, Pembroke, Tenby, Narberth, and surrounding areas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button variant="whatsapp" asChild>
                <a href="https://wa.me/447432670535" target="_blank" rel="noopener noreferrer">
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
