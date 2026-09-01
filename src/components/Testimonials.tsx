import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, CheckCircle2, Building2, Home, Sparkles, Key, ChevronLeft, ChevronRight, ThumbsUp } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import testimonialsBg from "@/assets/testimonials-bg.jpg";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  serviceCategory: "all" | "commercial" | "domestic" | "holidaylet";
  serviceTag: string;
  rating: number;
  quote: string;
  date: string;
  verified: boolean;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: "1",
    name: "Callum Tree",
    role: "Construction Manager",
    company: "Developments & Site Welfare",
    location: "Haverfordwest",
    serviceCategory: "commercial",
    serviceTag: "Post-Construction Clean",
    rating: 5,
    quote: "ECOclean Cymru consistently deliver quality work on our construction sites. Professional, reliable, and always meet tight site handover deadlines without fuss.",
    date: "Recent Client",
    verified: true,
  },
  {
    id: "2",
    name: "Amanda Jillions",
    role: "Pub Landlord",
    company: "Rose & Willow Pub",
    location: "Tenby",
    serviceCategory: "commercial",
    serviceTag: "Commercial Hospitality Clean",
    rating: 5,
    quote: "Having a reliable cleaning team has made all the difference to our business. The pub has never looked better, and our regulars notice the freshness every day.",
    date: "Regular Contract",
    verified: true,
  },
  {
    id: "3",
    name: "Jack Daniel",
    role: "Self-Employed Builder",
    company: "Extensions & Small Works",
    location: "Pembroke Dock",
    serviceCategory: "commercial",
    serviceTag: "Post-Build Builder Clean",
    rating: 5,
    quote: "Great service for post-build cleans. They understand construction environments, wear appropriate CSCS PPE, and leave newly renovated sites spotless.",
    date: "Recent Client",
    verified: true,
  },
  {
    id: "4",
    name: "Vicky Quin",
    role: "Owner & Director",
    company: "Doodles Childcare",
    location: "Narberth",
    serviceCategory: "commercial",
    serviceTag: "Eco-Friendly Childcare Clean",
    rating: 5,
    quote: "Trustworthy and thorough. They use non-toxic, safe eco-friendly products which is essential for our childcare setting and children's safety.",
    date: "Weekly Contract",
    verified: true,
  },
  {
    id: "5",
    name: "Sarah & David Jenkins",
    role: "Homeowners",
    company: "Private Residence",
    location: "Saundersfoot",
    serviceCategory: "domestic",
    serviceTag: "Deep Clean & Oven Restoration",
    rating: 5,
    quote: "Booked a full spring deep clean including kitchen appliances. The attention to detail was outstanding! Everything sparkles and smells wonderfully fresh.",
    date: "Homeowner Review",
    verified: true,
  },
  {
    id: "6",
    name: "Gareth Evans",
    role: "Superhost / Property Owner",
    company: "Coastal Cottages Pembrokeshire",
    location: "St Davids",
    serviceCategory: "holidaylet",
    serviceTag: "Holiday Let Turnover",
    rating: 5,
    quote: "Fast turnarounds between guest check-outs with zero complaints. Guests repeatedly mention the immaculately clean cottage in their 5-star reviews!",
    date: "Holiday Let Client",
    verified: true,
  },
];

const categories = [
  { id: "all", label: "All Reviews", icon: Sparkles },
  { id: "commercial", label: "Commercial & Construction", icon: Building2 },
  { id: "domestic", label: "Domestic & Deep Cleans", icon: Home },
  { id: "holidaylet", label: "Holiday Lets & Turnovers", icon: Key },
];

export const Testimonials = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const filteredTestimonials = testimonialsData.filter(
    (t) => selectedCategory === "all" || t.serviceCategory === selectedCategory
  );

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, filteredTestimonials]);

  // Autoplay functionality
  useEffect(() => {
    if (!api || isPaused) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api, isPaused]);

  const handleDotClick = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <section className="relative section-padding overflow-hidden bg-eco-dark text-white">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={testimonialsBg}
          alt="Clean interior background"
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-eco-dark/95 via-eco-dark/90 to-eco-dark/95 backdrop-blur-[2px]" />
        <div className="absolute inset-0 grain-overlay opacity-40" />
      </div>

      <div className="container-wide mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 text-eco-gold text-xs tracking-[0.3em] uppercase mb-3 font-medium"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="w-8 h-px bg-eco-gold/70" />
              Client Trust & Reviews
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-5xl font-light text-white leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              What our clients say across <em className="italic text-eco-gold font-light">Pembrokeshire.</em>
            </motion.h2>
          </div>

          {/* Trust stats badge */}
          <motion.div
            className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/15 px-5 py-3 rounded-full self-start md:self-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-eco-gold text-eco-gold" />
              ))}
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="text-xs text-white/90 font-medium">
              <span className="text-eco-gold font-bold text-sm">5.0</span> Rating · 100% Recommended
            </div>
          </motion.div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "bg-eco-gold text-eco-charcoal shadow-lg shadow-eco-gold/20 font-semibold"
                    : "bg-white/5 hover:bg-white/10 text-white/70 border border-white/10"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-eco-charcoal" : "text-eco-gold"}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Carousel Container */}
        <div
          className="relative px-2 md:px-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {filteredTestimonials.map((item) => (
                <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full bg-white/[0.05] backdrop-blur-md border border-white/12 p-7 flex flex-col justify-between rounded-xl hover:bg-white/[0.08] hover:border-eco-gold/40 transition-all duration-300 group">
                    <div>
                      {/* Rating Stars & Quote Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-eco-gold text-eco-gold" />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-eco-gold/20 group-hover:text-eco-gold/40 transition-colors" />
                      </div>

                      {/* Service Badge */}
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-eco-gold/15 border border-eco-gold/30 text-eco-gold text-[11px] font-medium tracking-wide mb-4">
                        <Sparkles className="w-3 h-3" />
                        {item.serviceTag}
                      </div>

                      {/* Quote Content */}
                      <p className="text-white/90 text-sm md:text-base leading-relaxed italic font-light mb-6">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* Author & Verification Info */}
                    <div className="border-t border-white/10 pt-4 mt-auto flex items-center justify-between">
                      <div>
                        <h4 className="font-display font-medium text-white text-base group-hover:text-eco-gold transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-white/70 font-normal">
                          {item.role} · <span className="text-eco-gold/90">{item.company}</span>
                        </p>
                        <p className="text-[11px] text-white/50 mt-0.5">{item.location}, Wales</p>
                      </div>

                      {item.verified && (
                        <div className="flex items-center gap-1 text-[10px] text-eco-gold bg-eco-gold/10 px-2 py-1 rounded-full border border-eco-gold/20" title="Verified Pembrokeshire Client">
                          <CheckCircle2 className="w-3 h-3 text-eco-gold" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom Navigation Controls */}
            <div className="flex items-center justify-between mt-8">
              {/* Dots indicator */}
              <div className="flex items-center gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Go to review slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      current === index
                        ? "w-8 bg-eco-gold"
                        : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => api?.scrollPrev()}
                  className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                  aria-label="Previous reviews"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => api?.scrollNext()}
                  className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                  aria-label="Next reviews"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Carousel>
        </div>

        {/* Footer Note & Call-to-action */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/60">
          <p className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-eco-gold" />
            100% satisfaction guarantee on all Pembrokeshire cleans. Client references available upon request.
          </p>
          <a
            href="/contact"
            className="text-eco-gold hover:underline font-medium uppercase tracking-wider text-xs"
          >
            Ready to experience the difference? Request a Quote →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
