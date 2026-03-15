import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Sparkles, Bed, Bath, AlertCircle, UtensilsCrossed, SprayCan, Sofa, Palmtree, TreePine } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { QuestionContainer } from "./QuestionContainer";
import { OptionCard } from "./OptionCard";
import { CheckboxOption } from "./CheckboxOption";
import { ResultScreen } from "./ResultScreen";
import { ExitScreen } from "./ExitScreen";
import { CallbackDialog } from "./CallbackDialog";
import { AvailabilityRequest, AvailabilitySubmission } from "./AvailabilityRequest";
import { AvailabilityConfirmation } from "./AvailabilityConfirmation";
import {
  calculateDomesticQuote,
  DomesticQuoteData,
  ExtrasSelection,
  QuoteResult,
  ServiceType,
} from "@/lib/pricingLogic";
import logo from "@/assets/logo.jpeg";

type FlowType = "entry" | "domestic" | "exit" | "availability" | "confirmation";
type Bedrooms = 1 | 2 | 3 | 4;
type Bathrooms = 1 | 2 | 3;
type Condition = "light" | "average" | "heavy";

interface QuestionnaireState {
  flow: FlowType;
  step: number;
  serviceType: ServiceType | null;
  bedrooms: Bedrooms | null;
  bathrooms: Bathrooms | null;
  extras: ExtrasSelection;
  condition: Condition | null;
  // Results
  result: QuoteResult | null;
  exitReason: "large-property" | null;
  // Availability request
  preferredDate: Date | null;
}

const initialState: QuestionnaireState = {
  flow: "entry",
  step: 0,
  serviceType: null,
  bedrooms: null,
  bathrooms: null,
  extras: {
    kitchenAppliance: [],
    interiorCleaning: [],
    carpetUpholstery: [],
    holidayLet: [],
    exterior: [],
  },
  condition: null,
  result: null,
  exitReason: null,
  preferredDate: null,
};

// Extras definitions by group
const KITCHEN_APPLIANCE_EXTRAS = [
  { id: "oven", label: "Oven deep clean" },
  { id: "double-oven", label: "Double oven / range cooker clean" },
  { id: "fridge", label: "Fridge interior clean" },
  { id: "microwave", label: "Microwave clean" },
  { id: "extractor", label: "Extractor fan and filter clean" },
  { id: "kitchen-cupboards", label: "Inside kitchen cupboards" },
];

const INTERIOR_CLEANING_EXTRAS = [
  { id: "interior-windows", label: "Interior window cleaning" },
  { id: "skirting-deep", label: "Skirting board deep clean" },
  { id: "tile-grout", label: "Tile and grout cleaning" },
  { id: "limescale", label: "Limescale removal" },
  { id: "washing-machine", label: "Washing machine deep clean" },
  { id: "dishwasher", label: "Dishwasher clean" },
];

const CARPET_UPHOLSTERY_EXTRAS = [
  { id: "carpet-room", label: "Carpet cleaning (per room)" },
  { id: "rug", label: "Rug cleaning" },
  { id: "sofa", label: "Sofa or upholstery cleaning" },
  { id: "mattress", label: "Mattress sanitation" },
];

const HOLIDAY_LET_EXTRAS = [
  { id: "linen-change", label: "Bed linen change (per bed)" },
  { id: "towel-replacement", label: "Towel replacement" },
  { id: "linen-laundry", label: "Linen laundry service" },
  { id: "welcome-pack", label: "Welcome pack setup" },
  { id: "toiletries", label: "Toiletries restocking" },
  { id: "bin-management", label: "Bin management between guests" },
];

const EXTERIOR_EXTRAS = [
  { id: "patio-wash", label: "Patio pressure washing" },
  { id: "driveway-wash", label: "Driveway pressure washing" },
  { id: "render-wash", label: "Render soft wash" },
  { id: "roof-moss", label: "Roof moss removal" },
  { id: "gutter-clearing", label: "Gutter clearing" },
];

export function PricingQuestionnaire() {
  const [state, setState] = useState<QuestionnaireState>(initialState);
  const [callbackOpen, setCallbackOpen] = useState(false);

  const updateState = (updates: Partial<QuestionnaireState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const goBack = () => {
    if (state.flow === "domestic") {
      if (state.step === 1) {
        updateState({ flow: "entry", step: 1, serviceType: null });
      } else {
        updateState({ step: state.step - 1 });
      }
    }
  };

  const startQuestionnaire = () => {
    updateState({ flow: "entry", step: 1 });
  };

  const selectServiceType = (type: ServiceType) => {
    updateState({ serviceType: type, flow: "domestic", step: 1 });
  };

  // Domestic flow handlers
  const selectBedrooms = (beds: Bedrooms) => {
    updateState({ bedrooms: beds });
    if (beds === 4) {
      updateState({ flow: "exit", exitReason: "large-property" });
    } else {
      updateState({ step: 2 });
    }
  };

  const selectBathrooms = (baths: Bathrooms) => {
    updateState({ bathrooms: baths, step: 3 });
  };

  const toggleExtra = (group: keyof ExtrasSelection, id: string) => {
    const current = state.extras[group];
    const updated = current.includes(id)
      ? current.filter((e) => e !== id)
      : [...current, id];
    updateState({
      extras: { ...state.extras, [group]: updated },
    });
  };

  const confirmExtras = () => {
    updateState({ step: state.step + 1 });
  };

  const selectCondition = (cond: Condition) => {
    updateState({ condition: cond });
    submitQuote(cond);
  };

  const submitQuote = (condition: Condition) => {
    const quoteData: DomesticQuoteData = {
      serviceType: state.serviceType as ServiceType,
      bedrooms: state.bedrooms as 1 | 2 | 3,
      bathrooms: state.bathrooms as 1 | 2 | 3,
      extras: state.extras,
      condition: condition,
    };
    const result = calculateDomesticQuote(quoteData);
    updateState({ result, condition });
    // Move to result step (step after condition)
    updateState({ step: getResultStep() });
  };

  const resetQuestionnaire = () => {
    setState(initialState);
  };

  // Availability flow handlers
  const startAvailabilityRequest = () => {
    updateState({ flow: "availability" });
  };

  const handleAvailabilitySubmit = (submission: AvailabilitySubmission) => {
    const serviceLabels: Record<string, string> = {
      'holiday-let': 'Holiday Let / Airbnb Clean',
      'end-of-tenancy': 'End of Tenancy',
      'deep': 'Deep Clean',
    };
    const serviceLabel = serviceLabels[submission.result.serviceType] || 'Cleaning';
    
    const dateStr = format(submission.preferredDate, "EEEE, d MMMM yyyy");
    
    const whatsappMessage = encodeURIComponent(
      `[${serviceLabel} – Availability Request]\n\n` +
      `Name: ${submission.customerName}\n` +
      `Phone: ${submission.customerPhone}\n` +
      `${submission.customerEmail ? `Email: ${submission.customerEmail}\n` : ''}` +
      `\nPreferred Date: ${dateStr}\n` +
      `\nService: ${submission.result.scopeSummary}\n` +
      `Estimated Price: £${submission.result.estimatedPrice}\n` +
      `Duration: ${submission.result.durationRange}\n` +
      `${submission.result.selectedExtras.length > 0 ? `\nExtras: ${submission.result.selectedExtras.join(', ')}\n` : ''}` +
      `${submission.notes ? `\nNotes: ${submission.notes}` : ''}`
    );
    
    window.open(`https://wa.me/447432670535?text=${whatsappMessage}`, '_blank');
    
    updateState({ 
      flow: "confirmation",
      preferredDate: submission.preferredDate,
    });
  };

  const handleBackToResult = () => {
    updateState({ flow: "domestic", step: getResultStep() });
  };

  // Calculate steps dynamically
  // Steps: 1=bedrooms, 2=bathrooms, 3=kitchen extras, 4=interior extras,
  // 5=carpet extras, 6=holiday let extras (if holiday-let), 7/6=exterior extras,
  // +1=condition, +1=result
  const isHolidayLet = state.serviceType === 'holiday-let';
  const extrasStepCount = isHolidayLet ? 5 : 4; // 5 groups for holiday-let, 4 for others
  const conditionStep = 2 + extrasStepCount + 1; // bedrooms + bathrooms + extras + condition
  const resultStep = conditionStep + 1;
  const totalSteps = resultStep;

  const getResultStep = () => resultStep;

  // Entry screen
  if (state.flow === "entry" && state.step === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <img 
          src={logo} 
          alt="ECOclean Cymru" 
          className="h-20 md:h-24 w-auto mx-auto mb-6 rounded-lg shadow-md" 
        />
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
          Build your clean in under 60 seconds
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
          Answer a few quick questions so we can give you an accurate estimate and allocate the right time.
        </p>
        <Button size="lg" onClick={startQuestionnaire}>
          Start
        </Button>
      </motion.div>
    );
  }

  // Service type selection
  if (state.flow === "entry" && state.step === 1) {
    return (
      <QuestionContainer
        currentStep={1}
        totalSteps={totalSteps}
        question="What type of clean do you need?"
        onBack={resetQuestionnaire}
      >
        <OptionCard
          icon={Home}
          title="Holiday Let / Airbnb Changeover"
          description="Between-guest cleaning for holiday properties"
          selected={state.serviceType === "holiday-let"}
          onClick={() => selectServiceType("holiday-let")}
          variant="large"
        />
        <OptionCard
          icon={Sparkles}
          title="End of Tenancy Clean"
          description="Full deep clean when tenants move out"
          selected={state.serviceType === "end-of-tenancy"}
          onClick={() => selectServiceType("end-of-tenancy")}
          variant="large"
        />
        <OptionCard
          icon={Sparkles}
          title="Deep Clean"
          description="Detailed cleaning beyond a normal domestic clean"
          selected={state.serviceType === "deep"}
          onClick={() => selectServiceType("deep")}
          variant="large"
        />
      </QuestionContainer>
    );
  }

  // Exit screens
  if (state.flow === "exit") {
    if (state.exitReason === "large-property") {
      return (
        <ExitScreen
          title="Let's chat about your property"
          message="Larger properties vary significantly. Please contact us so we can quote accurately."
        />
      );
    }
  }

  // DOMESTIC FLOW
  if (state.flow === "domestic") {
    // Step 1: Bedrooms
    if (state.step === 1) {
      return (
        <QuestionContainer
          currentStep={1}
          totalSteps={totalSteps}
          question="How many bedrooms does the property have?"
          onBack={goBack}
        >
          {([1, 2, 3, 4] as const).map((num) => (
            <OptionCard
              key={num}
              icon={Bed}
              title={num === 4 ? "4+ bedrooms" : `${num} bedroom${num > 1 ? "s" : ""}`}
              selected={state.bedrooms === num}
              onClick={() => selectBedrooms(num)}
            />
          ))}
        </QuestionContainer>
      );
    }

    // Step 2: Bathrooms
    if (state.step === 2) {
      return (
        <QuestionContainer
          currentStep={2}
          totalSteps={totalSteps}
          question="How many bathrooms or en-suites?"
          onBack={goBack}
        >
          {([1, 2, 3] as const).map((num) => (
            <OptionCard
              key={num}
              icon={Bath}
              title={num === 3 ? "3+" : `${num}`}
              selected={state.bathrooms === num}
              onClick={() => selectBathrooms(num)}
            />
          ))}
        </QuestionContainer>
      );
    }

    // Step 3: Kitchen & Appliance Extras
    if (state.step === 3) {
      return (
        <QuestionContainer
          currentStep={3}
          totalSteps={totalSteps}
          question="Kitchen & Appliance Extras"
          helperText="Select any additional kitchen or appliance cleaning. These add time to your clean."
          onBack={goBack}
        >
          {KITCHEN_APPLIANCE_EXTRAS.map((option) => (
            <CheckboxOption
              key={option.id}
              label={option.label}
              checked={state.extras.kitchenAppliance.includes(option.id)}
              onChange={() => toggleExtra('kitchenAppliance', option.id)}
            />
          ))}
          <div className="pt-4">
            <Button size="lg" className="w-full" onClick={confirmExtras}>
              Continue
            </Button>
          </div>
        </QuestionContainer>
      );
    }

    // Step 4: Interior Cleaning Extras
    if (state.step === 4) {
      return (
        <QuestionContainer
          currentStep={4}
          totalSteps={totalSteps}
          question="Interior Cleaning Extras"
          helperText="Additional detailed interior cleaning services."
          onBack={goBack}
        >
          {INTERIOR_CLEANING_EXTRAS.map((option) => (
            <CheckboxOption
              key={option.id}
              label={option.label}
              checked={state.extras.interiorCleaning.includes(option.id)}
              onChange={() => toggleExtra('interiorCleaning', option.id)}
            />
          ))}
          <div className="pt-4">
            <Button size="lg" className="w-full" onClick={confirmExtras}>
              Continue
            </Button>
          </div>
        </QuestionContainer>
      );
    }

    // Step 5: Carpet & Upholstery Extras
    if (state.step === 5) {
      return (
        <QuestionContainer
          currentStep={5}
          totalSteps={totalSteps}
          question="Carpet & Upholstery Extras"
          helperText="Add carpet, rug, or upholstery cleaning to your service."
          onBack={goBack}
        >
          {CARPET_UPHOLSTERY_EXTRAS.map((option) => (
            <CheckboxOption
              key={option.id}
              label={option.label}
              checked={state.extras.carpetUpholstery.includes(option.id)}
              onChange={() => toggleExtra('carpetUpholstery', option.id)}
            />
          ))}
          <div className="pt-4">
            <Button size="lg" className="w-full" onClick={confirmExtras}>
              Continue
            </Button>
          </div>
        </QuestionContainer>
      );
    }

    // Step 6: Holiday Let Extras (only for holiday-let service)
    if (state.step === 6 && isHolidayLet) {
      return (
        <QuestionContainer
          currentStep={6}
          totalSteps={totalSteps}
          question="Holiday Let Extras"
          helperText="Services specific to guest changeovers and holiday lets."
          onBack={goBack}
        >
          {HOLIDAY_LET_EXTRAS.map((option) => (
            <CheckboxOption
              key={option.id}
              label={option.label}
              checked={state.extras.holidayLet.includes(option.id)}
              onChange={() => toggleExtra('holidayLet', option.id)}
            />
          ))}
          <div className="pt-4">
            <Button size="lg" className="w-full" onClick={confirmExtras}>
              Continue
            </Button>
          </div>
        </QuestionContainer>
      );
    }

    // Exterior Extras step (step 7 for holiday-let, step 6 for others)
    const exteriorStep = isHolidayLet ? 7 : 6;
    if (state.step === exteriorStep) {
      return (
        <QuestionContainer
          currentStep={exteriorStep}
          totalSteps={totalSteps}
          question="Exterior Cleaning Extras"
          helperText="Optional exterior cleaning services."
          onBack={goBack}
        >
          {EXTERIOR_EXTRAS.map((option) => (
            <CheckboxOption
              key={option.id}
              label={option.label}
              checked={state.extras.exterior.includes(option.id)}
              onChange={() => toggleExtra('exterior', option.id)}
            />
          ))}
          <div className="pt-4">
            <Button size="lg" className="w-full" onClick={confirmExtras}>
              Continue
            </Button>
          </div>
        </QuestionContainer>
      );
    }

    // Condition step
    if (state.step === conditionStep) {
      return (
        <QuestionContainer
          currentStep={conditionStep}
          totalSteps={totalSteps}
          question="How would you describe the current condition?"
          helperText="Please be honest — this helps us allocate the right time so the job isn't rushed."
          onBack={goBack}
        >
          <OptionCard
            title="Light"
            description="Well maintained, minimal cleaning needed"
            selected={state.condition === "light"}
            onClick={() => selectCondition("light")}
          />
          <OptionCard
            title="Average"
            description="Normal lived-in condition"
            selected={state.condition === "average"}
            onClick={() => selectCondition("average")}
          />
          <OptionCard
            title="Heavy"
            description="Build-up or neglected areas"
            selected={state.condition === "heavy"}
            onClick={() => selectCondition("heavy")}
          />
        </QuestionContainer>
      );
    }

    // Result step
    if (state.step === resultStep && state.result) {
      return (
        <>
          <ResultScreen
            result={state.result}
            onRequestCallback={() => setCallbackOpen(true)}
            onCheckAvailability={startAvailabilityRequest}
          />
          <CallbackDialog open={callbackOpen} onOpenChange={setCallbackOpen} />
        </>
      );
    }
  }

  // AVAILABILITY FLOW
  if (state.flow === "availability" && state.result) {
    return (
      <AvailabilityRequest
        result={state.result}
        onBack={handleBackToResult}
        onSubmit={handleAvailabilitySubmit}
      />
    );
  }

  // CONFIRMATION FLOW
  if (state.flow === "confirmation" && state.result && state.preferredDate) {
    return (
      <AvailabilityConfirmation
        result={state.result}
        preferredDate={state.preferredDate}
        onStartOver={resetQuestionnaire}
      />
    );
  }

  return null;
}
