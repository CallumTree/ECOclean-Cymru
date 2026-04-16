import { motion } from "framer-motion";
import { Clock, Phone, MessageSquare, FileText, Calendar, Info, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteResult, isDomesticService } from "@/lib/pricingLogic";

interface ResultScreenProps {
  result: QuoteResult;
  onRequestCallback: () => void;
  onCheckAvailability: () => void;
  onStartOver: () => void;
}

export function ResultScreen({
  result,
  onRequestCallback,
  onCheckAvailability,
  onStartOver,
}: ResultScreenProps) {
  const isDomestic = isDomesticService(result.serviceType);
  const isBookingRestricted = result.isLargeJob || result.isMultiDay || result.isStaged;
  const showDepositNote = isDomestic && result.finalPrice >= 180;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Price */}
      <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 md:p-8 text-primary-foreground">
        <p className="text-primary-foreground/80 mb-1">Estimated price</p>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-heading text-5xl md:text-6xl font-bold">£{result.finalPrice}</span>
        </div>
        <div className="flex items-center gap-2 text-primary-foreground/90">
          <Clock className="w-5 h-5" />
          <span>{result.durationRange}</span>
        </div>
      </div>

      {/* Scope */}
      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl border border-border">
        <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm text-foreground">{result.scopeSummary}</p>
      </div>

      {/* Selected add-ons (labels only, no prices) */}
      {result.selectedExtras.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-heading font-semibold text-foreground mb-3">Add-ons included</h3>
          <ul className="space-y-1">
            {result.selectedExtras.map((label, i) => (
              <li key={i} className="text-foreground text-sm">• {label}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Deposit note */}
      {showDepositNote && (
        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl border border-border">
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            For larger domestic cleans (£180+), we may request a small booking deposit once availability is confirmed. This is deducted from the final invoice.
          </p>
        </div>
      )}

      <p className="text-sm text-muted-foreground text-center px-4">
        Time and price shown are estimates based on typical cleaning pace. Final scheduling may vary depending on access and condition.
      </p>

      <div className="space-y-3 pt-4">
        {!isBookingRestricted ? (
          <Button size="lg" className="w-full" onClick={onCheckAvailability}>
            <Calendar className="w-5 h-5" />
            Check availability
          </Button>
        ) : (
          <div className="bg-muted/50 rounded-xl p-4 border border-border text-center">
            <p className="text-sm text-muted-foreground">
              This job requires scheduling review — please contact us to confirm availability.
            </p>
          </div>
        )}

        <Button variant="whatsapp" size="lg" className="w-full" asChild>
          <a
            href="https://wa.me/447432670535?text=Hi%2C%20I%20just%20used%20the%20pricing%20tool%20and%20would%20like%20to%20confirm%20my%20quote."
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquare className="w-5 h-5" />
            WhatsApp us to confirm
          </a>
        </Button>

        <Button variant="outline" size="lg" className="w-full" onClick={onRequestCallback}>
          <Phone className="w-5 h-5" />
          Request a callback
        </Button>

        <Button variant="ghost" size="lg" className="w-full" onClick={onStartOver}>
          <RotateCcw className="w-5 h-5" />
          Start a new quote
        </Button>
      </div>
    </motion.div>
  );
}
