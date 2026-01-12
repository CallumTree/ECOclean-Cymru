import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Clock, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";

export default function Pricing() {
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
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Pricing
            </h1>
            <p className="text-white/90 text-lg">
              Fair, transparent pricing for all our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="section-padding">
        <div className="container-narrow mx-auto text-center">
          <motion.div
            className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 rounded-full bg-eco-gold/20 flex items-center justify-center mx-auto mb-6">
              <Calculator className="w-10 h-10 text-eco-gold-muted" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Online Pricing Coming Soon
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              We're building an instant quote and booking tool so you can see prices and book online. 
              Until then, get in touch for a personalised quote.
            </p>

            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
              <Clock className="w-5 h-5" />
              <span>Launching soon</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button size="lg" asChild>
                <Link to="/contact">Get a Quote</Link>
              </Button>
              <Button size="lg" variant="whatsapp" asChild>
                <a href="https://wa.me/447432670535" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </Button>
            </div>

            <div className="pt-8 border-t border-border">
              <h3 className="font-heading font-semibold text-foreground mb-3">
                What to Expect
              </h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Fair, competitive rates</li>
                <li>• No hidden fees</li>
                <li>• Free, no-obligation quotes</li>
                <li>• Clear pricing before we start</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
