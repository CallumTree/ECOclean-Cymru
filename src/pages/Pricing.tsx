import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PricingQuestionnaire } from "@/components/pricing/PricingQuestionnaire";

export default function Pricing() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-secondary py-8 md:py-12">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              Get an Instant Estimate
            </h1>
            <p className="text-primary-foreground/90">
              Fair, transparent pricing for all our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Questionnaire */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="max-w-xl mx-auto">
            <PricingQuestionnaire />
          </div>
        </div>
      </section>
    </Layout>
  );
}
