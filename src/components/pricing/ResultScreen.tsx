import { motion } from "framer-motion";
import { Check, X, Clock, Phone, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteResult } from "@/lib/pricingLogic";

interface ResultScreenProps {
  result: QuoteResult;
  onRequestCallback: () => void;
}

export function ResultScreen({ result, onRequestCallback }: ResultScreenProps) {
  const isTC = result.serviceType === 'post-construction';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Price Card */}
      <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 md:p-8 text-primary-foreground">
        <p className="text-primary-foreground/80 mb-1">Estimated price</p>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-heading text-5xl md:text-6xl font-bold">
            £{result.estimatedPrice}
          </span>
        </div>
        <div className="flex items-center gap-2 text-primary-foreground/90">
          <Clock className="w-5 h-5" />
          <span>{result.durationRange}</span>
        </div>
      </div>

      {/* Scope Summary */}
      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl border border-border">
        <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm text-foreground">
          {result.scopeSummary}
        </p>
      </div>

      {/* What's Included */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          What's included
        </h3>
        <ul className="space-y-2">
          {result.inclusions.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* What's Not Included */}
      <div className="bg-muted/50 rounded-xl border border-border p-5">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Not included
        </h3>
        <ul className="space-y-2">
          {result.exclusions.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Note */}
      <p className="text-sm text-muted-foreground text-center px-4">
        Time and price shown are estimates based on typical cleaning pace. Final scheduling may vary depending on access and condition.
        {isTC && " Non-standard works may require review."}
      </p>

      {/* CTAs */}
      <div className="space-y-3 pt-4">
        <Button
          variant="whatsapp"
          size="lg"
          className="w-full"
          asChild
        >
          <a
            href="https://wa.me/447432670535?text=Hi%2C%20I%20just%20used%20the%20pricing%20tool%20and%20would%20like%20to%20confirm%20my%20quote."
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquare className="w-5 h-5" />
            WhatsApp us to confirm
          </a>
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={onRequestCallback}
        >
          <Phone className="w-5 h-5" />
          Request a callback
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="w-full text-muted-foreground"
          disabled
        >
          Continue to booking (coming soon)
        </Button>
      </div>
    </motion.div>
  );
}
