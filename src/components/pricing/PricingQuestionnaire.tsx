import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Bed, Boxes, Hammer, AlertCircle, Home,
  Bath, ChefHat, Sofa,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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
  CustomerService,
  PropertySize,
  HolidayLetVariant,
  Condition,
  Access,
  getAddonsForService,
  SERVICE_LABELS,
  CUSTOMER_SERVICE_LABELS,
  holidayLetServiceType,
  DEEP_INTERIOR_ADDONS,
  DEEP_EXTERIOR_ADDONS,
} from "@/lib/pricingLogic";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/constants";
import logo from "@/assets/logo.jpeg";

type FlowType = "entry" | "service" | "questionnaire" | "result" | "availability" | "confirmation";

interface State {
  flow: FlowType;
  step: number;
  customerService: CustomerService | null;
  // Internal resolved type (set after variant chosen for holiday-let)
  serviceType: ServiceType | null;
  // Property fields
  propertySize: PropertySize | null;
  bathrooms: number;
  kitchens: number;
  receptionRooms: number;
  // Holiday Let
  holidayLetVariant: HolidayLetVariant | null;
  // Common
  condition: Condition | null;
  access: Access;
  postcode: string;
  wasteRemoval: boolean;
  parkingIssue: boolean;
  addOns: string[];
  result: QuoteResult | null;
  preferredDate: Date | null;
  timeSlot: string | null;
  photosSubmitted: number;
}

const initialState: State = {
  flow: "entry",
  step: 0,
  customerService: null,
  serviceType: null,
  propertySize: null,
  bathrooms: 1,
  kitchens: 1,
  receptionRooms: 0,
  holidayLetVariant: null,
  condition: null,
  access: "easy",
  postcode: "",
  wasteRemoval: false,
  parkingIssue: false,
  addOns: [],
  result: null,
  preferredDate: null,
  timeSlot: null,
  photosSubmitted: 0,
};

const SERVICE_OPTIONS: { id: CustomerService; icon: typeof Home; description: string }[] = [
  { id: 'deep-clean', icon: Sparkles, description: 'Detailed deep clean for occupied homes' },
  { id: 'end-of-tenancy', icon: Boxes, description: 'Full move-out clean — landlord standard' },
  { id: 'holiday-let', icon: Home, description: 'Turnover or deep reset for short-term lets' },
  { id: 'post-construction', icon: Hammer, description: 'After-builders / TC handover clean' },
];

// Condition copy varies by service
const CONDITION_COPY: Record<CustomerService, Record<Condition, string>> = {
  'deep-clean': {
    light: 'Well maintained, regularly cleaned',
    medium: 'Standard lived-in condition',
    heavy: 'Needs a full deep clean',
  },
  'end-of-tenancy': {
    light: 'Property already mostly clean',
    medium: 'Typical end of tenancy',
    heavy: 'Requires full restoration clean',
  },
  'holiday-let': {
    light: 'Recently cleaned',
    medium: 'Standard lived-in condition',
    heavy: 'Needs a deep reset',
  },
  'post-construction': {
    light: 'Final sparkle clean',
    medium: 'Post-build clean',
    heavy: 'Heavy build clean',
  },
};

export function PricingQuestionnaire() {
  const { toast } = useToast();
  const [state, setState] = useState<State>(initialState);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [isSubmittingPhotos, setIsSubmittingPhotos] = useState(false);

  const update = (u: Partial<State>) => setState((p) => ({ ...p, ...u }));
  const reset = () => setState(initialState);

  const cs = state.customerService;
  const isHolidayLet = cs === 'holiday-let';
  const isPostConstruction = cs === 'post-construction';
  const skipCondition = isHolidayLet; // Holiday let has no condition step

  // Total steps depend on the flow
  const totalSteps = useMemo(() => {
    if (!cs) return 5;
    if (isHolidayLet) return 4;  // size, variant, add-ons, logistics
    if (isPostConstruction) return 4; // size, build stage, add-ons, site
    return 5; // deep / EoT: size, condition, interior, exterior, logistics
  }, [cs, isHolidayLet, isPostConstruction]);

  // Live preview — best-effort
  const livePreview = useMemo<QuoteResult | null>(() => {
    if (!state.serviceType) return null;
    const conditionForCalc: Condition = state.condition ?? 'light';
    if (!state.propertySize) return null;
    try {
      const input: QuoteInput = {
        serviceType: state.serviceType,
        propertySize: state.propertySize ?? undefined,
        bathrooms: state.bathrooms,
        kitchens: state.kitchens,
        receptionRooms: state.receptionRooms,
        condition: conditionForCalc,
        access: state.access,
        wasteRemoval: state.wasteRemoval,
        parkingIssue: state.parkingIssue,
        addOns: state.addOns,
      };
      return calculateQuote(input);
    } catch {
      return null;
    }
  }, [state]);

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

  // Service select → set initial internal serviceType
  const pickService = (id: CustomerService) => {
    let serviceType: ServiceType;
    if (id === 'deep-clean') serviceType = 'domestic-deep';
    else if (id === 'end-of-tenancy') serviceType = 'end-of-tenancy';
    else if (id === 'post-construction') serviceType = 'post-construction';
    else serviceType = 'domestic-regular'; // holiday-let: placeholder until variant chosen
    update({
      customerService: id,
      serviceType,
      flow: "questionnaire",
      step: 1,
      addOns: [],
      condition: null,
      holidayLetVariant: null,
    });
  };

  // Availability handlers
  const startAvailability = () => update({ flow: "availability" });
  const handleAvailabilitySubmit = async (submission: AvailabilitySubmission) => {
    const label = SERVICE_LABELS[submission.result.serviceType];
    const dateStr = format(submission.preferredDate, "EEEE, d MMMM yyyy");
    const lines = [
      `[${label} – Availability Request]`,
      ``,
      `Name: ${submission.customerName}`,
      `Phone: ${submission.customerPhone}`,
      submission.customerEmail ? `Email: ${submission.customerEmail}` : null,
      ``,
      `Preferred Date: ${dateStr}`,
      submission.timeSlot ? `Time Slot: ${submission.timeSlot}` : null,
      state.postcode ? `Postcode: ${state.postcode}` : null,
      ``,
      `Service: ${submission.result.scopeSummary}`,
      `Estimated Price: £${submission.result.finalPrice}`,
      `Duration: ${submission.result.durationRange}`,
      submission.result.selectedExtras.length
        ? `Add-ons: ${submission.result.selectedExtras.join(', ')}`
        : null,
      submission.notes ? `\nNotes: ${submission.notes}` : null,
      submission.photos.length
        ? `\n${submission.photos.length} photo(s) attached — sent separately by email.`
        : null,
    ].filter(Boolean).join('\n');

    // wa.me links can't carry file attachments, so photos are sent via
    // Web3Forms (same access key as the Contact form) as a real email
    // attachment, while WhatsApp still opens immediately for a fast reply.
    if (submission.photos.length > 0) {
      setIsSubmittingPhotos(true);
      try {
        const payload = new FormData();
        payload.append("access_key", WEB3FORMS_ACCESS_KEY);
        payload.append("subject", `Availability request photos from ${submission.customerName} — ecocleancymru.com`);
        payload.append("from_name", "ECOclean Cymru website — instant quote tool");
        payload.append("name", submission.customerName);
        payload.append("phone", submission.customerPhone);
        if (submission.customerEmail) payload.append("email", submission.customerEmail);
        payload.append("service", label);
        payload.append("preferred_date", dateStr);
        payload.append("message", lines);
        submission.photos.forEach((file) => payload.append("attachment", file));

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: payload,
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || "Submission failed");
      } catch {
        toast({
          title: "Photos didn't send",
          description: "Your availability request still went through — just mention the photos when you WhatsApp us.",
          variant: "destructive",
        });
      } finally {
        setIsSubmittingPhotos(false);
      }
    }

    window.open(`https://wa.me/447432670535?text=${encodeURIComponent(lines)}`, '_blank');
    update({
      flow: "confirmation",
      preferredDate: submission.preferredDate,
      timeSlot: submission.timeSlot ?? null,
      photosSubmitted: submission.photos.length,
    });
  };

  // ===== ENTRY =====
  if (state.flow === "entry") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
        <img src={logo} alt="ECOclean Cymru" className="h-20 md:h-24 w-auto mx-auto mb-6 rounded-lg shadow-md" />
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
          Get a quote
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
            title={CUSTOMER_SERVICE_LABELS[opt.id]}
            description={opt.description}
            selected={state.customerService === opt.id}
            onClick={() => pickService(opt.id)}
            variant="large"
          />
        ))}
      </QuestionContainer>
    );
  }

  // ===== QUESTIONNAIRE =====
  if (state.flow === "questionnaire" && cs && state.serviceType) {
    // ---------- HOLIDAY LET FLOW ----------
    if (isHolidayLet) {
      // Step 1: property size
      if (state.step === 1) {
        return <PropertySizeStep state={state} update={update} totalSteps={totalSteps} onBack={goBack} />;
      }
      // Step 2: variant
      if (state.step === 2) {
        const opts: { id: HolidayLetVariant; title: string; description: string }[] = [
          { id: 'standard', title: 'Standard Turnover Clean', description: 'Between guest stays — quick reset' },
          { id: 'deep-reset', title: 'Deep Reset Clean', description: 'Periodic deep clean for the whole property' },
        ];
        return (
          <QuestionContainer
            currentStep={2}
            totalSteps={totalSteps}
            question="Which type of clean?"
            onBack={goBack}
          >
            {opts.map((o) => (
              <OptionCard
                key={o.id}
                title={o.title}
                description={o.description}
                selected={state.holidayLetVariant === o.id}
                onClick={() => update({
                  holidayLetVariant: o.id,
                  serviceType: holidayLetServiceType(o.id),
                  addOns: [],
                  condition: 'light', // holiday let has no condition step — use baseline
                  step: 3,
                })}
              />
            ))}
          </QuestionContainer>
        );
      }
      // Step 3: add-ons
      if (state.step === 3) {
        const addons = getAddonsForService(state.serviceType);
        return (
          <QuestionContainer
            currentStep={3}
            totalSteps={totalSteps}
            question="Any add-ons?"
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
            <PricePreview livePreview={livePreview} />
            <div className="pt-4">
              <Button size="lg" className="w-full" onClick={() => update({ step: 4 })}>Continue</Button>
            </div>
          </QuestionContainer>
        );
      }
      // Step 4: logistics
      if (state.step === 4) {
        return <LogisticsStep
          state={state} update={update}
          totalSteps={totalSteps} step={4} onBack={goBack}
          onSubmit={finalise} livePreview={livePreview}
        />;
      }
    }

    // ---------- POST CONSTRUCTION FLOW ----------
    if (isPostConstruction) {
      // Step 1: size
      if (state.step === 1) {
        return <PropertySizeStep state={state} update={update} totalSteps={totalSteps} onBack={goBack} />;
      }
      // Step 2: build stage (= condition mapping)
      if (state.step === 2) {
        const copy = CONDITION_COPY['post-construction'];
        const opts: { id: Condition; title: string }[] = [
          { id: 'light', title: 'Light' },
          { id: 'medium', title: 'Medium' },
          { id: 'heavy', title: 'Heavy' },
        ];
        return (
          <QuestionContainer
            currentStep={2}
            totalSteps={totalSteps}
            question="What's the build stage?"
            onBack={goBack}
          >
            {opts.map((o) => (
              <OptionCard
                key={o.id}
                icon={Hammer}
                title={o.title}
                description={copy[o.id]}
                selected={state.condition === o.id}
                onClick={() => update({ condition: o.id, step: 3 })}
              />
            ))}
          </QuestionContainer>
        );
      }
      // Step 3: add-ons (incl waste)
      if (state.step === 3) {
        const addons = getAddonsForService(state.serviceType);
        return (
          <QuestionContainer
            currentStep={3}
            totalSteps={totalSteps}
            question="Any add-ons?"
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
            <CheckboxOption
              label="Waste removal needed (£50)"
              checked={state.wasteRemoval}
              onChange={(c) => update({ wasteRemoval: c })}
            />
            <PricePreview livePreview={livePreview} />
            <div className="pt-4">
              <Button size="lg" className="w-full" onClick={() => update({ step: 4 })}>Continue</Button>
            </div>
          </QuestionContainer>
        );
      }
      // Step 4: site conditions (access + parking + postcode)
      if (state.step === 4) {
        const accessOpts: { id: Access; title: string; description: string }[] = [
          { id: 'easy', title: 'Clear', description: 'Site is clear and easy to access' },
          { id: 'normal', title: 'Partially obstructed', description: 'Some scaffold or materials in the way' },
          { id: 'awkward', title: 'Active site', description: 'Other trades still on site' },
        ];
        return (
          <QuestionContainer
            currentStep={4}
            totalSteps={totalSteps}
            question="Site conditions"
            onBack={goBack}
          >
            <div className="space-y-3">
              {accessOpts.map((o) => (
                <OptionCard
                  key={o.id}
                  title={o.title}
                  description={o.description}
                  selected={state.access === o.id}
                  onClick={() => update({ access: o.id })}
                />
              ))}
            </div>
            <div className="pt-2">
              <CheckboxOption
                label="Parking is an issue at this location (£10)"
                checked={state.parkingIssue}
                onChange={(c) => update({ parkingIssue: c })}
              />
            </div>
            <div className="pt-2">
              <Label htmlFor="postcode">Postcode</Label>
              <Input
                id="postcode"
                type="text"
                value={state.postcode}
                onChange={(e) => update({ postcode: e.target.value.toUpperCase() })}
                placeholder="e.g. SA61 1AB"
              />
            </div>
            <PricePreview livePreview={livePreview} />
            <div className="pt-4">
              <Button size="lg" className="w-full" onClick={finalise}>See my quote</Button>
            </div>
          </QuestionContainer>
        );
      }
    }

    // ---------- DEEP CLEAN / END OF TENANCY FLOW ----------
    // Step 1: size
    if (state.step === 1) {
      return <PropertySizeStep state={state} update={update} totalSteps={totalSteps} onBack={goBack} />;
    }
    // Step 2: condition
    if (state.step === 2) {
      const copy = CONDITION_COPY[cs];
      return (
        <QuestionContainer
          currentStep={2}
          totalSteps={totalSteps}
          question="What condition is it in?"
          helperText={cs === 'end-of-tenancy' ? 'Designed to meet landlord standards.' : 'Be honest — this helps us allocate the right time.'}
          onBack={goBack}
        >
          {(['light', 'medium', 'heavy'] as Condition[]).map((c) => (
            <OptionCard
              key={c}
              icon={AlertCircle}
              title={c[0].toUpperCase() + c.slice(1)}
              description={copy[c]}
              selected={state.condition === c}
              onClick={() => update({ condition: c, step: 3 })}
            />
          ))}
        </QuestionContainer>
      );
    }
    // Step 3: interior add-ons
    if (state.step === 3) {
      return (
        <QuestionContainer
          currentStep={3}
          totalSteps={totalSteps}
          question="Interior add-ons"
          helperText="Select any that apply."
          onBack={goBack}
        >
          {DEEP_INTERIOR_ADDONS.map((a) => (
            <CheckboxOption
              key={a.id}
              label={a.label}
              checked={state.addOns.includes(a.id)}
              onChange={() => toggleAddon(a.id)}
            />
          ))}
          <PricePreview livePreview={livePreview} />
          <div className="pt-4">
            <Button size="lg" className="w-full" onClick={() => update({ step: 4 })}>Continue</Button>
          </div>
        </QuestionContainer>
      );
    }
    // Step 4: exterior add-ons
    if (state.step === 4) {
      return (
        <QuestionContainer
          currentStep={4}
          totalSteps={totalSteps}
          question="Exterior add-ons"
          helperText="Optional — skip if none needed."
          onBack={goBack}
        >
          {DEEP_EXTERIOR_ADDONS.map((a) => (
            <CheckboxOption
              key={a.id}
              label={a.label}
              checked={state.addOns.includes(a.id)}
              onChange={() => toggleAddon(a.id)}
            />
          ))}
          <PricePreview livePreview={livePreview} />
          <div className="pt-4">
            <Button size="lg" className="w-full" onClick={() => update({ step: 5 })}>Continue</Button>
          </div>
        </QuestionContainer>
      );
    }
    // Step 5: logistics
    if (state.step === 5) {
      return <LogisticsStep
        state={state} update={update}
        totalSteps={totalSteps} step={5} onBack={goBack}
        onSubmit={finalise} livePreview={livePreview}
      />;
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
        isSubmitting={isSubmittingPhotos}
      />
    );
  }

  // ===== CONFIRMATION =====
  if (state.flow === "confirmation" && state.result && state.preferredDate) {
    return (
      <AvailabilityConfirmation
        result={state.result}
        preferredDate={state.preferredDate}
        timeSlot={state.timeSlot ?? undefined}
        photosSubmitted={state.photosSubmitted}
        onStartOver={reset}
      />
    );
  }

  return null;
}

// ---------- Sub-components ----------

function PricePreview({ livePreview }: { livePreview: QuoteResult | null }) {
  if (!livePreview) return null;
  return (
    <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
      <p className="text-sm text-muted-foreground">Estimated total</p>
      <p className="font-heading text-2xl font-bold text-primary">£{livePreview.finalPrice}</p>
      <p className="text-xs text-muted-foreground mt-1">Final price may vary slightly after inspection.</p>
    </div>
  );
}

interface StepProps {
  state: State;
  update: (u: Partial<State>) => void;
  totalSteps: number;
  onBack: () => void;
}

function PropertySizeStep({ state, update, totalSteps, onBack }: StepProps) {
  const canContinue = !!state.propertySize;
  return (
    <QuestionContainer
      currentStep={1}
      totalSteps={totalSteps}
      question="Tell us about the property"
      onBack={onBack}
    >
      <div>
        <Label className="flex items-center gap-2 mb-2"><Bed className="w-4 h-4" /> Bedrooms</Label>
        <div className="grid grid-cols-5 gap-2">
          {([1, 2, 3, 4, 5] as PropertySize[]).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => update({ propertySize: n })}
              className={`h-12 rounded-lg border-2 font-semibold transition-all ${
                state.propertySize === n
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground hover:border-primary/50'
              }`}
            >
              {n === 5 ? '5+' : n}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="baths" className="flex items-center gap-2 mb-2"><Bath className="w-4 h-4" /> Bathrooms</Label>
        <Input
          id="baths"
          type="number"
          min={1}
          max={10}
          value={state.bathrooms}
          onChange={(e) => update({ bathrooms: Math.max(1, Number(e.target.value) || 1) })}
        />
      </div>

      <div>
        <Label htmlFor="kitchens" className="flex items-center gap-2 mb-2"><ChefHat className="w-4 h-4" /> Kitchens</Label>
        <Input
          id="kitchens"
          type="number"
          min={1}
          max={5}
          value={state.kitchens}
          onChange={(e) => update({ kitchens: Math.max(1, Number(e.target.value) || 1) })}
        />
      </div>

      <div>
        <Label htmlFor="reception" className="flex items-center gap-2 mb-2"><Sofa className="w-4 h-4" /> Reception rooms (optional)</Label>
        <Input
          id="reception"
          type="number"
          min={0}
          max={10}
          value={state.receptionRooms}
          onChange={(e) => update({ receptionRooms: Math.max(0, Number(e.target.value) || 0) })}
        />
      </div>

      <div className="pt-4">
        <Button
          size="lg"
          className="w-full"
          disabled={!canContinue}
          onClick={() => update({ step: 2 })}
        >
          Continue
        </Button>
      </div>
    </QuestionContainer>
  );
}

interface LogisticsStepProps extends StepProps {
  step: number;
  onSubmit: () => void;
  livePreview: QuoteResult | null;
}

function LogisticsStep({ state, update, totalSteps, step, onBack, onSubmit, livePreview }: LogisticsStepProps) {
  return (
    <QuestionContainer
      currentStep={step}
      totalSteps={totalSteps}
      question="A few site details"
      helperText="Almost there — just so we can plan the visit."
      onBack={onBack}
    >
      <div>
        <Label htmlFor="postcode">Postcode</Label>
        <Input
          id="postcode"
          type="text"
          value={state.postcode}
          onChange={(e) => update({ postcode: e.target.value.toUpperCase() })}
          placeholder="e.g. SA61 1AB"
        />
      </div>
      <CheckboxOption
        label="Parking is an issue at this location (£10)"
        checked={state.parkingIssue}
        onChange={(c) => update({ parkingIssue: c })}
      />
      <CheckboxOption
        label="Waste removal needed (£50)"
        checked={state.wasteRemoval}
        onChange={(c) => update({ wasteRemoval: c })}
      />
      <PricePreview livePreview={livePreview} />
      <div className="pt-4">
        <Button size="lg" className="w-full" onClick={onSubmit}>See my quote</Button>
      </div>
    </QuestionContainer>
  );
}
