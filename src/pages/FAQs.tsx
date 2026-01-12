import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What products do you use?",
    answer: "We use eco-friendly, non-toxic cleaning products that are safe for your family, pets, and the environment. Our products are effective yet gentle, and we're happy to accommodate any specific product requests or sensitivities.",
  },
  {
    question: "Are you insured?",
    answer: "Yes, ECOclean Cymru LTD is fully insured. We carry comprehensive public liability insurance to protect both our clients and our team. Documentation is available on request.",
  },
  {
    question: "Do I need to be home during the clean?",
    answer: "Not necessarily. Many of our clients provide us with keys or access codes. We're fully insured and trustworthy – we're happy to clean while you're at work or out. If you'd prefer to be home, that's fine too.",
  },
  {
    question: "What about pets?",
    answer: "We love pets! We're experienced working in homes with cats, dogs, and other animals. Just let us know about any pets in advance so we can ensure their comfort and use appropriate products.",
  },
  {
    question: "How long does a typical clean take?",
    answer: "This depends on the size of your property and the type of service. A regular domestic clean for a 3-bedroom home typically takes 2-3 hours. Deep cleans and end of tenancy cleans take longer. We'll give you an accurate time estimate when we quote.",
  },
  {
    question: "What areas do you cover?",
    answer: "We serve Pembrokeshire, Wales. This includes Haverfordwest, Milford Haven, Pembroke, Tenby, Narberth, and surrounding areas. If you're unsure whether we cover your location, just ask.",
  },
  {
    question: "What's your cancellation policy?",
    answer: "We understand plans change. We ask for at least 24 hours' notice for cancellations or rescheduling. Cancellations with less than 24 hours' notice may incur a fee to cover our team's time.",
  },
  {
    question: "Can I change my booking?",
    answer: "Absolutely. Just get in touch via phone, email, or WhatsApp and we'll rearrange your booking to a more convenient time. We try to be as flexible as possible.",
  },
];

export default function FAQs() {
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
              Frequently Asked Questions
            </h1>
            <p className="text-white/90 text-lg">
              Everything you need to know about our cleaning services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Still Have Questions */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              We're happy to help. Get in touch and we'll get back to you promptly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild>
                <Link to="/contact">Contact Us</Link>
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
