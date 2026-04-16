import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Home, Sparkles, Bed, Car, Truck, Boxes, Hammer, AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuestionContainer } from "./QuestionContainer";
import { OptionCard } from "./OptionCard";
import { CheckboxOption } from "./CheckboxOption";
import { ResultScreen } from "./ResultScreen";
import { CallbackDialog } from "./CallbackDialog";
import { AvailabilityRequest, AvailabilitySubmission } from "./AvailabilityRequest";
import { AvailabilityConfirmation } from "./AvailabilityConfirmation";
import {
  calculateQuote,
  QuoteInput,
  QuoteResult,
  ServiceType,
  PropertySize,
  VehicleSize,
  Condition,
  Access,
  isPropertyService,
  getAddonsForService,
  SERVICE_LABELS,
} from "@/lib/pricingLogic";
import logo from "@/assets/logo.jpeg";

type FlowType = "entry" | "service" | "questionnaire" | "result" | "availability" | "confirmation";

interface State {
  flow: FlowType;
  step: number;
  serviceType: ServiceType | null;
  propertySize: PropertySize | null;
  vehicleSize: VehicleSize | null;
  condition: Condition | null;
  access: Access | null;
  travelMiles: number;
  wasteRemoval: boolean;
  parkingIssue: boolean;
  addOns: string[];
  result: QuoteResult | null;
  preferredDate: Date | null;
}

const initialState: State = {
  flow: "entry",
  step: 0,
  serviceType: null,
  propertySize: null,
  vehicleSize: null,
  condition: null,
  access: null,
  travelMiles: 0,
  wasteRemoval: false,
  parkingIssue: false,
  addOns: [],
  result: null,
  preferredDate: null,
};

const SERVICE_OPTIONS: { id: ServiceType; icon: typeof Home; description: string }[] = [
  { id: 'domestic-regular', icon: Home, description: 'Routine cleaning for occupied homes' },
  { id: 'domestic-deep', icon: Sparkles, description: 'Detailed deep clean for occupied homes' },
  { id: 'end-of-tenancy', icon: Boxes, description: 'Full move-out clean for landlords or tenants' },
  { id: 'post-construction', icon: Hammer, description: 'After-builders / TC handover clean' },
  { id: 'vehicle-exterior', icon: Car, description: 'Exterior wash and detail' },
  { id: 'vehicle-interior', icon: Car, description: 'Interior valet and detail' },
  { id: 'vehicle-full-detail', icon: Truck, description: 'Full inside-and-out detail' },
];

export function PricingQuestionnaire() {
  const [state, setState] = useState<State>(initialState);
  const [callbackOpen, setCallbackOpen] = useState(false);

  const update = (u: Partial<State>) => setState((p) => ({ ...p, ...u }));
  const reset = () => setState(initialState);

  const isProperty = state.serviceType ? isPropertyService(state.serviceType) : false;

  // Steps: 1=size, 2=condition, 3=access, 4=travel/waste/parking, 5=add-ons, then result
  const totalSteps = 5;

  // Live preview quote — only valid once enough info gathered
  const livePreview = useMemo<QuoteResult | null>(() => {
    if (!state.serviceType || !state.condition || !state.access) return null;
    if (isProperty && !state.propertySize) return null;
    if (!isProperty && !state.vehicleSize) return null;
    try {
      const input: QuoteInput = {
        serviceType: state.serviceType,
        propertySize: state.propertySize ?? undefined,
        vehicleSize: state.vehicleSize ?? undefined,
        condition: state.condition,
        access: state.access,
        travelMiles: state.travelMiles,
        wasteRemoval: state.wasteRemoval,
        parkingIssue: state.parkingIssue,
        addOns: state.addOns,
      };
      return calculateQuote(input);
    } catch {
      return null;
    }
  }, [state, isProperty]);

  const goBack = () => {
    if (state.flow === "service") return reset();
    if (state.flow === "questionnaire") {
      if (state.step === 1) return update({ flow: "service" });
      return update({ step: state.step - 1 });
    }
  };

  const finalise = () => {
    if (!livePreview) return;
    update({ result: livePreview, flow: "result" });
  };

  const toggleAddon = (id: string) => {
    update({
      addOns: state.addOns.includes(id)
        ? state.addOns.filter((a) => a !== id)
        : [...state.addOns, id],
    });
  };

  // Availability handlers
  const startAvailability = () => update({ flow: "availability" });
  const handleAvailabilitySubmit = (submission: AvailabilitySubmission) => {
    const label = SERVICE_LABELS[submission.result.serviceType];
    const dateStr = format(submission.preferredDate, "EEEE, d MMMM yyyy");
    const msg = encodeURIComponent(
      `[${label} – Availability Request]\n\n` +
      `Name: ${submission.customerName}\n` +
      `Phone: ${submission.customerPhone}\n` +
      `${submission.customerEmail ? `Email: ${submission.customerEmail}\n` : ''}` +
      `\nPreferred Date: ${dateStr}\n` +
      `\nService: ${submission.result.scopeSummary}\n` +
      `Estimated Price: £${submission.result.finalPrice}\n` +
      `Duration: ${submission.result.durationRange}\n` +
      `${submission.result.selectedExtras.length > 0 ? `\nAdd-ons: ${submission.result.selectedExtras.join(', ')}\n` : ''}` +
      `${submission.notes ? `\nNotes: ${submission.notes}` : ''}`
    );
    window.open(`https://wa.me/447432670535?text=${msg}`, '_blank');
    update({ flow: "confirmation", preferredDate: submission.preferredDate });
  };

  // ===== ENTRY =====
  if (state.flow === "entry") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
        <img src={logo} alt="ECOclean Cymru" className="h-20 md:h-24 w-auto mx-auto mb-6 rounded-lg shadow-md" />
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
          Get an instant estimate
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
          Answer a few quick questions for an accurate, transparent price.
        </p>
        <Button size="lg" onClick={() => update({ flow: "service" })}>Start</Button>
      </motion.div>
    );
  }

  // ===== SERVICE SELECTION =====
  if (state.flow === "service") {
    return (
      <QuestionContainer
        currentStep={0}
        totalSteps={totalSteps}
        question="What service do you need?"
        onBack={reset}
      >
        {SERVICE_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.id}
            icon={opt.icon}
            title={SERVICE_LABELS[opt.id]}
            description={opt.description}
            selected={state.serviceType === opt.id}
            onClick={() => update({ serviceType: opt.id, flow: "questionnaire", step: 1, addOns: [] })}
            variant="large"
          />
        ))}
      </QuestionContainer>
    );
  }

  // ===== QUESTIONNAIRE =====
  if (state.flow === "questionnaire" && state.serviceType) {
    // Step 1: size
    if (state.step === 1) {
      if (isProperty) {
        return (
          <QuestionContainer
            currentStep={1}
            totalSteps={totalSteps}
            question="How many bedrooms?"
            onBack={goBack}
          >
            {([1, 2, 3, 4, 5] as PropertySize[]).map((n) => (
              <OptionCard
                key={n}
                icon={Bed}
                title={`${n} bedroom${n > 1 ? 's' : ''}`}
                selected={state.propertySize === n}
                onClick={() => update({ propertySize: n, step: 2 })}
              />
            ))}
          </QuestionContainer>
        );
      }
      return (
        <QuestionContainer
          currentStep={1}
          totalSteps={totalSteps}
          question="What size vehicle?"
          onBack={goBack}
        >
          {([
            { id: 'small-car' as VehicleSize, label: 'Small car' },
            { id: 'saloon' as VehicleSize, label: 'Saloon' },
            { id: 'suv' as VehicleSize, label: 'SUV' },
            { id: 'van' as VehicleSize, label: 'Van' },
          ]).map((v) => (
            <OptionCard
              key={v.id}
              icon={v.id === 'van' ? Truck : Car}
              title={v.label}
              selected={state.vehicleSize === v.id}
              onClick={() => update({ vehicleSize: v.id, step: 2 })}
            />
          ))}
        </QuestionContainer>
      );
    }

    // Step 2: condition
    if (state.step === 2) {
      const opts: { id: Condition; title: string; description: string }[] = [
        { id: 'light', title: 'Light', description: 'Generally tidy, surface clean only' },
        { id: 'medium', title: 'Medium', description: 'Normal lived-in condition' },
        { id: 'heavy', title: 'Heavy', description: 'Neglected or very dirty — needs extra time' },
      ];
      return (
        <QuestionContainer
          currentStep={2}
          totalSteps={totalSteps}
          question="What condition is it in?"
          helperText="Be honest — this helps us allocate the right time."
          onBack={goBack}
        >
          {opts.map((o) => (
            <OptionCard
              key={o.id}
              icon={AlertCircle}
              title={o.title}
              description={o.description}
              selected={state.condition === o.id}
              onClick={() => update({ condition: o.id, step: 3 })}
            />
          ))}
        </QuestionContainer>
      );
    }

    // Step 3: access
    if (state.step === 3) {
      const opts: { id: Access; title: string; description: string }[] = [
        { id: 'easy', title: 'Easy', description: 'Ground floor, parking outside, no stairs' },
        { id: 'normal', title: 'Normal', description: 'A flight of stairs or short walk' },
        { id: 'awkward', title: 'Awkward', description: 'Multiple floors, narrow access, no nearby parking' },
      ];
      return (
        <QuestionContainer
          currentStep={3}
          totalSteps={totalSteps}
          question="How easy is access?"
          onBack={goBack}
        >
          {opts.map((o) => (
            <OptionCard
              key={o.id}
              title={o.title}
              description={o.description}
              selected={state.access === o.id}
              onClick={() => update({ access: o.id, step: 4 })}
            />
          ))}
        </QuestionContainer>
      );
    }

    // Step 4: travel / waste / parking
    if (state.step === 4) {
      return (
        <QuestionContainer
          currentStep={4}
          totalSteps={totalSteps}
          question="A few site details"
          helperText="Travel beyond 10 miles, waste removal, or parking issues may add a small charge."
          onBack={goBack}
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="miles">Travel distance (miles)</Label>
              <Input
                id="miles"
                type="number"
                min={0}
                value={state.travelMiles}
                onChange={(e) => update({ travelMiles: Math.max(0, Number(e.target.value) || 0) })}
                placeholder="0"
              />
              <p className="text-xs text-muted-foreground mt-1">First 10 miles are free.</p>
            </div>
            <CheckboxOption
              label="Waste removal needed"
              checked={state.wasteRemoval}
              onChange={(c) => update({ wasteRemoval: c })}
            />
            <CheckboxOption
              label="Parking is an issue at this location"
              checked={state.parkingIssue}
              onChange={(c) => update({ parkingIssue: c })}
            />
          </div>
          <div className="pt-4">
            <Button size="lg" className="w-full" onClick={() => update({ step: 5 })}>
              Continue
            </Button>
          </div>
        </QuestionContainer>
      );
    }

    // Step 5: add-ons
    if (state.step === 5) {
      const addons = getAddonsForService(state.serviceType);
      return (
        <QuestionContainer
          currentStep={5}
          totalSteps={totalSteps}
          question="Any add-ons?"
          helperText="Optional extras — select any that apply."
          onBack={goBack}
        >
          {addons.map((a) => (
            <CheckboxOption
              key={a.id}
              label={a.label}
              checked={state.addOns.includes(a.id)}
              onChange={() => toggleAddon(a.id)}
            />
          ))}
          {livePreview && (
            <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">Estimated total</p>
              <p className="font-heading text-2xl font-bold text-primary">£{livePreview.finalPrice}</p>
            </div>
          )}
          <div className="pt-4">
            <Button size="lg" className="w-full" onClick={finalise}>
              See my quote
            </Button>
          </div>
        </QuestionContainer>
      );
    }
  }

  // ===== RESULT =====
  if (state.flow === "result" && state.result) {
    return (
      <>
        <ResultScreen
          result={state.result}
          onRequestCallback={() => setCallbackOpen(true)}
          onCheckAvailability={startAvailability}
          onStartOver={reset}
        />
        <CallbackDialog open={callbackOpen} onOpenChange={setCallbackOpen} />
      </>
    );
  }

  // ===== AVAILABILITY =====
  if (state.flow === "availability" && state.result) {
    return (
      <AvailabilityRequest
        result={state.result}
        onBack={() => update({ flow: "result" })}
        onSubmit={handleAvailabilitySubmit}
      />
    );
  }

  // ===== CONFIRMATION =====
  if (state.flow === "confirmation" && state.result && state.preferredDate) {
    return (
      <AvailabilityConfirmation
        result={state.result}
        preferredDate={state.preferredDate}
        onStartOver={reset}
      />
    );
  }

  return null;
}
