import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Sparkles, HardHat, Bed, Bath, Calendar, Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { QuestionContainer } from "./QuestionContainer";
import { OptionCard } from "./OptionCard";
import { CheckboxOption } from "./CheckboxOption";
import { ResultScreen } from "./ResultScreen";
import { ExitScreen } from "./ExitScreen";
import { CallbackDialog } from "./CallbackDialog";
import {
  calculateDomesticQuote,
  calculateTCQuote,
  DomesticQuoteData,
  TCQuoteData,
  QuoteResult,
} from "@/lib/pricingLogic";

type FlowType = "entry" | "domestic" | "tc" | "exit";
type ServiceType = "domestic" | "end-of-tenancy" | "post-construction";
type Bedrooms = 1 | 2 | 3 | 4;
type Bathrooms = 1 | 2 | 3;
type CleanType = "regular" | "one-off" | "deep" | "end-of-tenancy";
type Condition = "light" | "average" | "heavy";
type TCBathrooms = "1" | "1+wc" | "2+";
type TCCondition = "light" | "typical" | "heavy";
type PostConstructionType = "tc" | "private" | "commercial";

interface QuestionnaireState {
  flow: FlowType;
  step: number;
  serviceType: ServiceType | null;
  postConstructionType: PostConstructionType | null;
  bedrooms: Bedrooms | null;
  bathrooms: Bathrooms | null;
  cleanType: CleanType | null;
  addOns: string[];
  condition: Condition | null;
  accessNotes: string;
  // TC specific
  tcBathrooms: TCBathrooms | null;
  worksCompleted: string[];
  siteCondition: TCCondition | null;
  tcAccessDetails: {
    vacant: boolean;
    keysAvailable: boolean;
    parkingAvailable: boolean;
    notes: string;
  };
  // Results
  result: QuoteResult | null;
  exitReason: "large-property" | "private-commercial" | null;
}

const initialState: QuestionnaireState = {
  flow: "entry",
  step: 0,
  serviceType: null,
  postConstructionType: null,
  bedrooms: null,
  bathrooms: null,
  cleanType: null,
  addOns: [],
  condition: null,
  accessNotes: "",
  tcBathrooms: null,
  worksCompleted: [],
  siteCondition: null,
  tcAccessDetails: {
    vacant: false,
    keysAvailable: false,
    parkingAvailable: false,
    notes: "",
  },
  result: null,
  exitReason: null,
};

export function PricingQuestionnaire() {
  const [state, setState] = useState<QuestionnaireState>(initialState);
  const [callbackOpen, setCallbackOpen] = useState(false);

  const updateState = (updates: Partial<QuestionnaireState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const goBack = () => {
    if (state.flow === "domestic") {
      if (state.step === 1) {
        updateState({ flow: "entry", step: 0, serviceType: null });
      } else {
        updateState({ step: state.step - 1 });
      }
    } else if (state.flow === "tc") {
      if (state.step === 1) {
        updateState({ flow: "entry", step: 0, postConstructionType: null });
      } else {
        updateState({ step: state.step - 1 });
      }
    }
  };

  const startQuestionnaire = () => {
    updateState({ flow: "entry", step: 1 });
  };

  const selectServiceType = (type: ServiceType) => {
    updateState({ serviceType: type });
    if (type === "post-construction") {
      updateState({ flow: "entry", step: 2 });
    } else {
      updateState({ flow: "domestic", step: 1 });
    }
  };

  const selectPostConstructionType = (type: PostConstructionType) => {
    updateState({ postConstructionType: type });
    if (type === "tc") {
      updateState({ flow: "tc", step: 1 });
    } else {
      updateState({ flow: "exit", exitReason: "private-commercial" });
    }
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

  const selectCleanType = (type: CleanType) => {
    updateState({ cleanType: type, step: 4 });
  };

  const toggleAddOn = (addOn: string) => {
    const newAddOns = state.addOns.includes(addOn)
      ? state.addOns.filter((a) => a !== addOn)
      : [...state.addOns, addOn];
    updateState({ addOns: newAddOns });
  };

  const confirmAddOns = () => {
    updateState({ step: 5 });
  };

  const selectCondition = (cond: Condition) => {
    updateState({ condition: cond, step: 6 });
  };

  const submitDomesticQuote = () => {
    const quoteData: DomesticQuoteData = {
      serviceType: state.serviceType === "end-of-tenancy" ? "end-of-tenancy" : "domestic",
      bedrooms: state.bedrooms as 1 | 2 | 3,
      bathrooms: state.bathrooms as 1 | 2 | 3,
      cleanType: state.cleanType as CleanType,
      addOns: state.addOns,
      condition: state.condition as Condition,
      accessNotes: state.accessNotes,
    };
    const result = calculateDomesticQuote(quoteData);
    updateState({ result, step: 7 });
  };

  // TC flow handlers
  const selectTCBedrooms = (beds: Bedrooms) => {
    updateState({ bedrooms: beds });
    if (beds === 4) {
      updateState({ flow: "exit", exitReason: "large-property" });
    } else {
      updateState({ step: 2 });
    }
  };

  const selectTCBathrooms = (baths: TCBathrooms) => {
    updateState({ tcBathrooms: baths, step: 3 });
  };

  const toggleWork = (work: string) => {
    const newWorks = state.worksCompleted.includes(work)
      ? state.worksCompleted.filter((w) => w !== work)
      : [...state.worksCompleted, work];
    updateState({ worksCompleted: newWorks });
  };

  const confirmWorks = () => {
    updateState({ step: 4 });
  };

  const selectSiteCondition = (cond: TCCondition) => {
    updateState({ siteCondition: cond, step: 5 });
  };

  const updateTCAccess = (field: keyof QuestionnaireState["tcAccessDetails"], value: boolean | string) => {
    updateState({
      tcAccessDetails: { ...state.tcAccessDetails, [field]: value },
    });
  };

  const submitTCQuote = () => {
    const quoteData: TCQuoteData = {
      bedrooms: state.bedrooms as 1 | 2 | 3,
      bathrooms: state.tcBathrooms as TCBathrooms,
      worksCompleted: state.worksCompleted,
      siteCondition: state.siteCondition as TCCondition,
      accessDetails: state.tcAccessDetails,
    };
    const result = calculateTCQuote(quoteData);
    updateState({ result, step: 6 });
  };

  const canSubmitTCAccess =
    state.tcAccessDetails.vacant &&
    state.tcAccessDetails.keysAvailable &&
    state.tcAccessDetails.parkingAvailable;

  const resetQuestionnaire = () => {
    setState(initialState);
  };

  // Entry screen
  if (state.flow === "entry" && state.step === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
          Build your clean in under 60 seconds
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
          Answer a few simple questions so we can allocate the right time and give you an accurate estimate.
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
        totalSteps={7}
        question="What type of clean do you need?"
        onBack={resetQuestionnaire}
      >
        <OptionCard
          icon={Home}
          title="Domestic cleaning"
          description="Regular home cleaning services"
          selected={state.serviceType === "domestic"}
          onClick={() => selectServiceType("domestic")}
          variant="large"
        />
        <OptionCard
          icon={Sparkles}
          title="End of tenancy cleaning"
          description="Move-out deep clean to landlord standards"
          selected={state.serviceType === "end-of-tenancy"}
          onClick={() => selectServiceType("end-of-tenancy")}
          variant="large"
        />
        <OptionCard
          icon={HardHat}
          title="Post-construction / site clean"
          description="Builder's clean or handover cleaning"
          selected={state.serviceType === "post-construction"}
          onClick={() => selectServiceType("post-construction")}
          variant="large"
        />
      </QuestionContainer>
    );
  }

  // Post-construction type selection
  if (state.flow === "entry" && state.step === 2) {
    return (
      <QuestionContainer
        currentStep={1}
        totalSteps={6}
        question="What best describes the job?"
        onBack={() => updateState({ step: 1, serviceType: null })}
      >
        <OptionCard
          title="Social housing / TC handover clean"
          description="Standard tenant changeover specification"
          selected={state.postConstructionType === "tc"}
          onClick={() => selectPostConstructionType("tc")}
          variant="large"
        />
        <OptionCard
          title="Private build or refurbishment"
          description="New build or renovation project"
          selected={state.postConstructionType === "private"}
          onClick={() => selectPostConstructionType("private")}
          variant="large"
        />
        <OptionCard
          title="Commercial site"
          description="Office, retail or industrial premises"
          selected={state.postConstructionType === "commercial"}
          onClick={() => selectPostConstructionType("commercial")}
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
    if (state.exitReason === "private-commercial") {
      return (
        <ExitScreen
          title="Custom quote required"
          message="Private and commercial construction cleans vary significantly. Please contact us with details or photos so we can quote accurately."
          showEmail
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
          totalSteps={7}
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
          totalSteps={7}
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

    // Step 3: Clean type
    if (state.step === 3) {
      return (
        <QuestionContainer
          currentStep={3}
          totalSteps={7}
          question="Which best describes the clean?"
          onBack={goBack}
        >
          <OptionCard
            icon={Calendar}
            title="Regular clean"
            description="Routine maintenance cleaning"
            selected={state.cleanType === "regular"}
            onClick={() => selectCleanType("regular")}
          />
          <OptionCard
            icon={Sparkles}
            title="One-off clean"
            description="Single visit, general refresh"
            selected={state.cleanType === "one-off"}
            onClick={() => selectCleanType("one-off")}
          />
          <OptionCard
            icon={Sparkles}
            title="Deep clean"
            description="Thorough top-to-bottom cleaning"
            selected={state.cleanType === "deep"}
            onClick={() => selectCleanType("deep")}
          />
          <OptionCard
            icon={Home}
            title="End of tenancy clean"
            description="Move-out standard cleaning"
            selected={state.cleanType === "end-of-tenancy"}
            onClick={() => selectCleanType("end-of-tenancy")}
          />
        </QuestionContainer>
      );
    }

    // Step 4: Add-ons
    if (state.step === 4) {
      const addOnOptions = [
        { id: "oven", label: "Oven clean" },
        { id: "fridge", label: "Fridge clean" },
        { id: "cupboards", label: "Inside cupboards" },
        { id: "windows", label: "Inside windows" },
        { id: "skirting", label: "Skirting boards / detail focus" },
        { id: "ironing", label: "Ironing" },
      ];

      return (
        <QuestionContainer
          currentStep={4}
          totalSteps={7}
          question="Do you need any of the following?"
          helperText="Select all that apply (optional)"
          onBack={goBack}
        >
          {addOnOptions.map((option) => (
            <CheckboxOption
              key={option.id}
              label={option.label}
              checked={state.addOns.includes(option.id)}
              onChange={() => toggleAddOn(option.id)}
            />
          ))}
          <div className="pt-4">
            <Button size="lg" className="w-full" onClick={confirmAddOns}>
              Continue
            </Button>
          </div>
        </QuestionContainer>
      );
    }

    // Step 5: Condition
    if (state.step === 5) {
      return (
        <QuestionContainer
          currentStep={5}
          totalSteps={7}
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

    // Step 6: Access notes
    if (state.step === 6) {
      return (
        <QuestionContainer
          currentStep={6}
          totalSteps={7}
          question="Anything we should know about access, parking, or pets?"
          helperText="Optional — skip if not applicable"
          onBack={goBack}
        >
          <Textarea
            placeholder="e.g. Key under mat, parking on street, friendly dog..."
            value={state.accessNotes}
            onChange={(e) => updateState({ accessNotes: e.target.value })}
            className="min-h-[120px]"
          />
          <div className="pt-4">
            <Button size="lg" className="w-full" onClick={submitDomesticQuote}>
              Get my estimate
            </Button>
          </div>
        </QuestionContainer>
      );
    }

    // Step 7: Result
    if (state.step === 7 && state.result) {
      return (
        <>
          <ResultScreen
            result={state.result}
            variant="domestic"
            onRequestCallback={() => setCallbackOpen(true)}
          />
          <CallbackDialog open={callbackOpen} onOpenChange={setCallbackOpen} />
        </>
      );
    }
  }

  // TC FLOW
  if (state.flow === "tc") {
    // Step 1: Bedrooms
    if (state.step === 1) {
      return (
        <QuestionContainer
          currentStep={1}
          totalSteps={6}
          question="How many bedrooms does the property have?"
          onBack={goBack}
        >
          {([1, 2, 3, 4] as const).map((num) => (
            <OptionCard
              key={num}
              icon={Bed}
              title={num === 4 ? "4+ bedrooms" : `${num} bedroom${num > 1 ? "s" : ""}`}
              selected={state.bedrooms === num}
              onClick={() => selectTCBedrooms(num)}
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
          totalSteps={6}
          question="Bathroom layout?"
          onBack={goBack}
        >
          <OptionCard
            icon={Bath}
            title="1 bathroom"
            selected={state.tcBathrooms === "1"}
            onClick={() => selectTCBathrooms("1")}
          />
          <OptionCard
            icon={Bath}
            title="1 bathroom + WC"
            selected={state.tcBathrooms === "1+wc"}
            onClick={() => selectTCBathrooms("1+wc")}
          />
          <OptionCard
            icon={Bath}
            title="2+ bathrooms"
            selected={state.tcBathrooms === "2+"}
            onClick={() => selectTCBathrooms("2+")}
          />
        </QuestionContainer>
      );
    }

    // Step 3: Works completed
    if (state.step === 3) {
      const workOptions = [
        { id: "kitchen", label: "New kitchen fit" },
        { id: "bathroom", label: "New bathroom fit" },
        { id: "floor-tiling", label: "Floor tiling" },
        { id: "carpet-vinyl", label: "Carpet or vinyl fitted" },
        { id: "decoration", label: "Decoration works" },
        { id: "joinery", label: "Minor joinery" },
      ];

      return (
        <QuestionContainer
          currentStep={3}
          totalSteps={6}
          question="What works have been completed?"
          helperText="Select all that apply"
          onBack={goBack}
        >
          {workOptions.map((option) => (
            <CheckboxOption
              key={option.id}
              label={option.label}
              checked={state.worksCompleted.includes(option.id)}
              onChange={() => toggleWork(option.id)}
            />
          ))}
          <div className="pt-4">
            <Button size="lg" className="w-full" onClick={confirmWorks}>
              Continue
            </Button>
          </div>
        </QuestionContainer>
      );
    }

    // Step 4: Site condition
    if (state.step === 4) {
      return (
        <QuestionContainer
          currentStep={4}
          totalSteps={6}
          question="Condition on completion?"
          onBack={goBack}
        >
          <OptionCard
            icon={Paintbrush}
            title="Light site dust only"
            description="Minimal dust, mostly tidy"
            selected={state.siteCondition === "light"}
            onClick={() => selectSiteCondition("light")}
          />
          <OptionCard
            icon={Paintbrush}
            title="Typical handover clean"
            description="Standard post-works condition"
            selected={state.siteCondition === "typical"}
            onClick={() => selectSiteCondition("typical")}
          />
          <OptionCard
            icon={Paintbrush}
            title="Heavy build-up / multiple trades"
            description="Significant cleaning required"
            selected={state.siteCondition === "heavy"}
            onClick={() => selectSiteCondition("heavy")}
          />
        </QuestionContainer>
      );
    }

    // Step 5: Access details
    if (state.step === 5) {
      return (
        <QuestionContainer
          currentStep={5}
          totalSteps={6}
          question="Site access details"
          helperText="Please confirm the following (all required)"
          onBack={goBack}
        >
          <CheckboxOption
            label="Vacant property"
            checked={state.tcAccessDetails.vacant}
            onChange={(checked) => updateTCAccess("vacant", checked)}
          />
          <CheckboxOption
            label="Keys available / welfare access"
            checked={state.tcAccessDetails.keysAvailable}
            onChange={(checked) => updateTCAccess("keysAvailable", checked)}
          />
          <CheckboxOption
            label="Parking available"
            checked={state.tcAccessDetails.parkingAvailable}
            onChange={(checked) => updateTCAccess("parkingAvailable", checked)}
          />
          <div className="pt-2">
            <Textarea
              placeholder="Additional notes (optional)"
              value={state.tcAccessDetails.notes}
              onChange={(e) => updateTCAccess("notes", e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <div className="pt-4">
            <Button
              size="lg"
              className="w-full"
              onClick={submitTCQuote}
              disabled={!canSubmitTCAccess}
            >
              Get my estimate
            </Button>
            {!canSubmitTCAccess && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                Please confirm all access requirements above
              </p>
            )}
          </div>
        </QuestionContainer>
      );
    }

    // Step 6: Result
    if (state.step === 6 && state.result) {
      return (
        <>
          <ResultScreen
            result={state.result}
            variant="tc"
            onRequestCallback={() => setCallbackOpen(true)}
          />
          <CallbackDialog open={callbackOpen} onOpenChange={setCallbackOpen} />
        </>
      );
    }
  }

  return null;
}
