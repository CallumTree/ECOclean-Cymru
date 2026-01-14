import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ArrowLeft } from "lucide-react";
import { format, addDays, isWeekend, isBefore, startOfDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuoteResult } from "@/lib/pricingLogic";

interface AvailabilityRequestProps {
  result: QuoteResult;
  onBack: () => void;
  onSubmit: (data: AvailabilitySubmission) => void;
}

export interface AvailabilitySubmission {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredDate: Date;
  notes: string;
  result: QuoteResult;
}

export function AvailabilityRequest({ result, onBack, onSubmit }: AvailabilityRequestProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [notes, setNotes] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const today = startOfDay(new Date());
  const minDate = addDays(today, 2); // At least 2 days ahead

  // Disable weekends and dates too close
  const isDateDisabled = (date: Date) => {
    return isBefore(date, minDate) || isWeekend(date);
  };

  const validateStep1 = () => {
    if (!selectedDate) {
      setErrors({ date: "Please select a preferred date" });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!customerName.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!customerPhone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s+()-]{10,}$/.test(customerPhone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToNotes = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleContinueToContact = () => {
    setStep(3);
  };

  const handleSubmit = () => {
    if (validateStep3() && selectedDate) {
      onSubmit({
        customerName,
        customerEmail,
        customerPhone,
        preferredDate: selectedDate,
        notes,
        result,
      });
    }
  };

  // Step 1: Date selection
  if (step === 1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to quote
        </button>

        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
            Select a preferred date
          </h2>
          <p className="text-muted-foreground">
            Select a preferred date. Final scheduling will be confirmed after review.
          </p>
        </div>

        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={isDateDisabled}
            className="rounded-xl border border-border bg-card"
          />
        </div>

        {selectedDate && (
          <p className="text-center text-foreground">
            <CalendarIcon className="w-4 h-4 inline-block mr-2" />
            Selected: <strong>{format(selectedDate, "EEEE, d MMMM yyyy")}</strong>
          </p>
        )}

        {errors.date && (
          <p className="text-center text-destructive text-sm">{errors.date}</p>
        )}

        <Button
          size="lg"
          className="w-full"
          onClick={handleContinueToNotes}
          disabled={!selectedDate}
        >
          Continue
        </Button>
      </motion.div>
    );
  }

  // Step 2: Optional notes
  if (step === 2) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <button
          onClick={() => setStep(1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
            Any additional notes?
          </h2>
          <p className="text-muted-foreground">
            Any access notes, deadlines, or constraints we should know about?
          </p>
        </div>

        <Textarea
          placeholder="Optional — share any details that might help us plan..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="resize-none"
        />

        <Button size="lg" className="w-full" onClick={handleContinueToContact}>
          Continue
        </Button>
      </motion.div>
    );
  }

  // Step 3: Contact details + submit
  if (step === 3) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <button
          onClick={() => setStep(2)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
            Your contact details
          </h2>
          <p className="text-muted-foreground">
            So we can get back to you about availability.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-destructive text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Your phone number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-destructive text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email address"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-muted/50 rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-2">Request summary:</p>
          <p className="text-foreground">
            <strong>{format(selectedDate!, "EEEE, d MMMM yyyy")}</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            {result.scopeSummary}
          </p>
          <p className="text-foreground font-semibold mt-1">
            Estimated: £{result.estimatedPrice}
          </p>
        </div>

        <Button size="lg" className="w-full" onClick={handleSubmit}>
          Request availability
        </Button>
      </motion.div>
    );
  }

  return null;
}
