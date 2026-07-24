import { motion } from "framer-motion";
import { Phone, CalendarClock, HardHat, Droplets, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { whatsappLink } from "@/lib/constants";
import heroCleaning from "@/assets/hero-cleaning.jpg";

// TODO: Once Leanne shares the Google Calendar Appointment Schedule embed,
// replace GOOGLE_CALENDAR_EMBED_URL with the provided iframe src.
const GOOGLE_CALENDAR_EMBED_URL: string | null = null;

const consultationTypes = [
  {
    icon: Droplets,
    title: "Mould Assessments",
    description:
      "On-site inspection to diagnose damp/mould issues and recommend the right treatment plan before we quote.",
  },
  {
    icon: HardHat,
    title: "Commercial & Post-Construction Visits",
    description:
      "Site walk-throughs for new-builds, refurbishments and commercial premises so we can quote accurately.",
  },
  {
    icon: CalendarClock,
    title: "General Quote Consultations",
    description:
      "Larger or unusual jobs where a quick chat or visit makes it easier to give you a fair, transparent price.",
  },
];

export default function BookConsultation() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative -mt-16 md:-mt-20 pt-40 md:pt-48 pb-20 md:pb-24 overflow-hidden">
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
            <span className="text-eco-gold text-xs tracking-[0.3em] uppercase">Book a consultation</span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-white mt-4 mb-6 leading-[0.95]">
              Let's <em className="italic text-eco-gold/95">talk it through.</em>
            </h1>
            <p className="text-white/80 text-lg font-light max-w-xl">
              For mould assessments, commercial and post-construction site visits, or larger jobs
              that need a proper look before we quote — book a time that suits you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What a consultation covers */}
      <section className="section-padding bg-background">
        <div className="container-narrow mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground mb-3">
              What a consultation covers
            </h2>
            <p className="text-muted-foreground">
              Free, no-obligation. In person for sites and mould, or a quick call for everything else.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {consultationTypes.map((c, i) => (
              <motion.div
                key={c.title}
                className="bg-card border border-border p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <c.icon className="w-8 h-8 text-primary" strokeWidth={1.25} />
                <div className="w-8 h-0.5 bg-eco-gold mt-3 mb-3" />
                <h3 className="font-heading font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking embed */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground mb-3">
              Pick a time
            </h2>
            <p className="text-muted-foreground">
              Choose a slot from the calendar below and we'll confirm by email.
            </p>
          </motion.div>

          <div className="bg-card border border-border overflow-hidden">
            {GOOGLE_CALENDAR_EMBED_URL ? (
              <iframe
                src={GOOGLE_CALENDAR_EMBED_URL}
                title="Book a consultation"
                className="w-full"
                style={{ height: 720, border: 0 }}
                loading="lazy"
              />
            ) : (
              <div className="p-10 md:p-16 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-5">
                  <CalendarClock className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  Booking calendar coming soon
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                  Placeholder — the Google Calendar Appointment Schedule embed will slot in here
                  once it's set up. In the meantime, message us on WhatsApp and we'll get you booked in.
                </p>
                <Button variant="whatsapp" className="rounded-full uppercase text-xs tracking-wider" asChild>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    <Phone className="w-4 h-4" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fallback */}
      <section className="section-padding bg-eco-charcoal text-white">
        <div className="container-wide mx-auto text-center">
          <MessageCircle className="w-8 h-8 text-eco-gold mx-auto mb-4" strokeWidth={1.25} />
          <h2 className="font-heading text-2xl md:text-3xl font-medium mb-3">
            Prefer WhatsApp? Message us instead
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Tell us what you need and we'll come straight back to you.
          </p>
          <Button size="lg" variant="whatsapp" className="rounded-full uppercase text-xs tracking-wider" asChild>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <Phone className="w-4 h-4" />
              WhatsApp Us
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
