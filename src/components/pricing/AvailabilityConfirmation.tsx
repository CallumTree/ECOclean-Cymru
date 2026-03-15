import { motion } from "framer-motion";
import { CheckCircle, MessageSquare, RotateCcw, Info } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { QuoteResult } from "@/lib/pricingLogic";

interface AvailabilityConfirmationProps {
  result: QuoteResult;
  preferredDate: Date;
  onStartOver: () => void;
}

export function AvailabilityConfirmation({ 
  result, 
  preferredDate,
  onStartOver 
}: AvailabilityConfirmationProps) {
  const isDomestic = result.serviceType === 'holiday-let' || 
                     result.serviceType === 'end-of-tenancy' || 
                     result.serviceType === 'deep';

  const showDepositNote = isDomestic && result.estimatedPrice >= 180;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Success header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-secondary" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
          Request received
        </h2>
        
        {/* Service-specific confirmation message */}
        <p className="text-muted-foreground">
          {isDomestic ? (
            "Thanks — we've received your request. We aim to respond within 24 hours to confirm availability."
          ) : (
            "Request received. A member of our team will be in touch shortly to confirm availability."
          )}
        </p>
      </div>

      {/* Request summary */}
      <div className="bg-card rounded-xl border border-border p-5 space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Preferred date</p>
          <p className="font-semibold text-foreground">
            {format(preferredDate, "EEEE, d MMMM yyyy")}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Service</p>
          <p className="text-foreground">{result.scopeSummary}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Estimated price</p>
          <p className="font-semibold text-foreground">£{result.estimatedPrice}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Approximate duration</p>
          <p className="text-foreground">{result.durationRange}</p>
        </div>
      </div>

      {/* Deposit note for larger domestic cleans */}
      {showDepositNote && (
        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl border border-border">
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            For larger domestic cleans (£180+), we may request a small booking deposit once availability is confirmed. This is deducted from the final invoice.
          </p>
        </div>
      )}

      {/* Next steps */}
      <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
        <h3 className="font-heading font-semibold text-foreground mb-2">
          What happens next?
        </h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>• We'll check our schedule and contact you to confirm</li>
          <li>• Final timing will be agreed with you directly</li>
          <li>• You can reach us on WhatsApp if you have questions</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          variant="whatsapp"
          size="lg"
          className="w-full"
          asChild
        >
          <a
            href="https://wa.me/447432670535?text=Hi%2C%20I%20just%20submitted%20an%20availability%20request%20and%20have%20a%20question."
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquare className="w-5 h-5" />
            WhatsApp us
          </a>
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={onStartOver}
        >
          <RotateCcw className="w-5 h-5" />
          Start a new quote
        </Button>
      </div>
    </motion.div>
  );
}
