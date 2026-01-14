import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Sparkles, HardHat, Bed, Bath, Paintbrush, AlertCircle, Building2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  calculateTCQuote,
  calculateSiteWelfareQuote,
  DomesticQuoteData,
  TCQuoteData,
  SiteWelfareQuoteData,
  QuoteResult,
} from "@/lib/pricingLogic";
import logo from "@/assets/logo.jpeg";

type FlowType = "entry" | "domestic" | "tc" | "site-welfare" | "exit" | "availability" | "confirmation";
type ServiceType = "regular" | "end-of-tenancy" | "deep" | "post-construction" | "site-welfare";
type Bedrooms = 1 | 2 | 3 | 4;
type Bathrooms = 1 | 2 | 3;
type Condition = "light" | "average" | "heavy";
type TCBathrooms = "1" | "1+wc" | "2+";
type TCCondition = "light" | "typical" | "heavy";
type PostConstructionType = "tc" | "private" | "commercial";
type ToiletShowerScale = "1-2" | "3-5" | "6+";
type DailyOccupancy = "1-5" | "6-10" | "11-20" | "20+";
type CleaningFrequency = "one-off" | "weekly" | "twice-weekly" | "daily";

interface QuestionnaireState {
  flow: FlowType;
  step: number;
  serviceType: ServiceType | null;
  postConstructionType: PostConstructionType | null;
  bedrooms: Bedrooms | null;
  bathrooms: Bathrooms | null;
  detailedAddOns: string[];
  applianceAddOns: string[];
  condition: Condition | null;
  // TC specific
  tcBathrooms: TCBathrooms | null;
  worksCompleted: string[];
  siteCondition: TCCondition | null;
  // Site Welfare specific
  cabinCount: number;
  cabinUses: string[];
  toiletShowerScale: ToiletShowerScale | null;
  dailyOccupancy: DailyOccupancy | null;
  cleaningFrequency: CleaningFrequency | null;
  accessDetails: string[];
  accessNotes: string;
  // Results
  result: QuoteResult | null;
  exitReason: "large-property" | "private-commercial" | null;
  // Deep clean suggestion
  showDeepCleanSuggestion: boolean;
  // Availability request
  preferredDate: Date | null;
}

const initialState: QuestionnaireState = {
  flow: "entry",
  step: 0,
  serviceType: null,
  postConstructionType: null,
  bedrooms: null,
  bathrooms: null,
  detailedAddOns: [],
  applianceAddOns: [],
  condition: null,
  tcBathrooms: null,
  worksCompleted: [],
  siteCondition: null,
  cabinCount: 1,
  cabinUses: [],
  toiletShowerScale: null,
  dailyOccupancy: null,
  cleaningFrequency: null,
  accessDetails: [],
  accessNotes: "",
  result: null,
  exitReason: null,
  showDeepCleanSuggestion: false,
  preferredDate: null,
};

// Deep clean automatically includes these add-ons
const DEEP_CLEAN_INCLUDED_ADDONS = ['skirting', 'doorframes', 'cupboards'];

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
        updateState({ step: state.step - 1, showDeepCleanSuggestion: false });
      }
    } else if (state.flow === "tc") {
      if (state.step === 1) {
        updateState({ flow: "entry", step: 2, postConstructionType: null });
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
    } else if (type === "site-welfare") {
      updateState({ flow: "site-welfare", step: 1 });
    } else if (type === "deep") {
      // Pre-select deep clean add-ons
      updateState({ 
        flow: "domestic", 
        step: 1,
        detailedAddOns: [...DEEP_CLEAN_INCLUDED_ADDONS],
      });
    } else {
      updateState({ flow: "domestic", step: 1, detailedAddOns: [] });
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

  const toggleDetailedAddOn = (addOn: string) => {
    const newAddOns = state.detailedAddOns.includes(addOn)
      ? state.detailedAddOns.filter((a) => a !== addOn)
      : [...state.detailedAddOns, addOn];
    updateState({ detailedAddOns: newAddOns });
  };

  const confirmDetailedAddOns = () => {
    updateState({ step: 4 });
  };

  const toggleApplianceAddOn = (addOn: string) => {
    const newAddOns = state.applianceAddOns.includes(addOn)
      ? state.applianceAddOns.filter((a) => a !== addOn)
      : [...state.applianceAddOns, addOn];
    updateState({ applianceAddOns: newAddOns });
  };

  const confirmApplianceAddOns = () => {
    updateState({ step: 5 });
  };

  const selectCondition = (cond: Condition) => {
    updateState({ condition: cond });
    
    // Check if we should suggest deep clean
    const shouldSuggestDeepClean = 
      state.serviceType !== 'deep' && 
      (cond === 'heavy' || state.detailedAddOns.length >= 3);
    
    if (shouldSuggestDeepClean) {
      updateState({ showDeepCleanSuggestion: true });
    } else {
      submitDomesticQuote(cond);
    }
  };

  const switchToDeepClean = () => {
    updateState({ 
      serviceType: 'deep',
      detailedAddOns: [...DEEP_CLEAN_INCLUDED_ADDONS, ...state.detailedAddOns.filter(a => !DEEP_CLEAN_INCLUDED_ADDONS.includes(a))],
      showDeepCleanSuggestion: false,
    });
    submitDomesticQuote(state.condition as Condition, 'deep');
  };

  const keepCurrentSelection = () => {
    updateState({ showDeepCleanSuggestion: false });
    submitDomesticQuote(state.condition as Condition);
  };

  const submitDomesticQuote = (condition: Condition, overrideServiceType?: 'deep') => {
    const serviceType = overrideServiceType || state.serviceType;
    const quoteData: DomesticQuoteData = {
      serviceType: serviceType as 'regular' | 'end-of-tenancy' | 'deep',
      bedrooms: state.bedrooms as 1 | 2 | 3,
      bathrooms: state.bathrooms as 1 | 2 | 3,
      detailedAddOns: state.detailedAddOns,
      applianceAddOns: state.applianceAddOns,
      condition: condition,
    };
    const result = calculateDomesticQuote(quoteData);
    updateState({ result, step: 6, condition });
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
    const currentWorks = state.worksCompleted || [];
    const newWorks = currentWorks.includes(work)
      ? currentWorks.filter((w) => w !== work)
      : [...currentWorks, work];
    updateState({ worksCompleted: newWorks });
  };

  const confirmWorks = () => {
    updateState({ step: 4 });
  };

  const selectSiteCondition = (cond: TCCondition) => {
    updateState({ siteCondition: cond });
    submitTCQuote(cond);
  };

  const submitTCQuote = (condition: TCCondition) => {
    const quoteData: TCQuoteData = {
      bedrooms: state.bedrooms as 1 | 2 | 3,
      bathrooms: state.tcBathrooms as TCBathrooms,
      worksCompleted: state.worksCompleted,
      siteCondition: condition,
    };
    const result = calculateTCQuote(quoteData);
    updateState({ result, step: 5, siteCondition: condition });
  };

  // Site Welfare flow handlers
  const setCabinCount = (count: number) => {
    updateState({ cabinCount: count, step: 2 });
  };

  const toggleCabinUse = (use: string) => {
    const currentUses = state.cabinUses || [];
    const newUses = currentUses.includes(use)
      ? currentUses.filter((u) => u !== use)
      : [...currentUses, use];
    updateState({ cabinUses: newUses });
  };

  const confirmCabinUses = () => {
    const hasToiletsOrShowers = state.cabinUses.includes('toilets') || state.cabinUses.includes('showers');
    if (hasToiletsOrShowers) {
      updateState({ step: 3 });
    } else {
      updateState({ step: 4 });
    }
  };

  const selectToiletShowerScale = (scale: ToiletShowerScale) => {
    updateState({ toiletShowerScale: scale, step: 4 });
  };

  const selectDailyOccupancy = (occupancy: DailyOccupancy) => {
    updateState({ dailyOccupancy: occupancy, step: 5 });
  };

  const selectCleaningFrequency = (frequency: CleaningFrequency) => {
    updateState({ cleaningFrequency: frequency, step: 6 });
  };

  const toggleAccessDetail = (detail: string) => {
    const currentDetails = state.accessDetails || [];
    const newDetails = currentDetails.includes(detail)
      ? currentDetails.filter((d) => d !== detail)
      : [...currentDetails, detail];
    updateState({ accessDetails: newDetails });
  };

  const submitSiteWelfareQuote = () => {
    const quoteData: SiteWelfareQuoteData = {
      cabinCount: state.cabinCount,
      cabinUses: state.cabinUses,
      toiletShowerScale: state.toiletShowerScale,
      dailyOccupancy: state.dailyOccupancy as DailyOccupancy,
      frequency: state.cleaningFrequency as CleaningFrequency,
      accessDetails: state.accessDetails,
    };
    const result = calculateSiteWelfareQuote(quoteData);
    updateState({ result, step: 7 });
  };

  const resetQuestionnaire = () => {
    setState(initialState);
  };

  // Availability flow handlers
  const startAvailabilityRequest = () => {
    updateState({ flow: "availability" });
  };

  const handleAvailabilitySubmit = (submission: AvailabilitySubmission) => {
    // Build service type label for the message header
    const serviceLabels: Record<string, string> = {
      'regular': 'Domestic Clean',
      'end-of-tenancy': 'End of Tenancy',
      'deep': 'Deep Clean',
      'post-construction': 'Post-Construction – TC',
      'site-welfare': 'Site Welfare Cleaning',
    };
    const serviceLabel = serviceLabels[submission.result.serviceType] || 'Cleaning';
    
    // Format date
    const dateStr = format(submission.preferredDate, "EEEE, d MMMM yyyy");
    
    // Build WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `[${serviceLabel} – Availability Request]\n\n` +
      `Name: ${submission.customerName}\n` +
      `Phone: ${submission.customerPhone}\n` +
      `${submission.customerEmail ? `Email: ${submission.customerEmail}\n` : ''}` +
      `\nPreferred Date: ${dateStr}\n` +
      `\nService: ${submission.result.scopeSummary}\n` +
      `Estimated Price: £${submission.result.estimatedPrice}\n` +
      `Duration: ${submission.result.durationRange}\n` +
      `${submission.notes ? `\nNotes: ${submission.notes}` : ''}`
    );
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/447432670535?text=${whatsappMessage}`, '_blank');
    
    // Update state to show confirmation
    updateState({ 
      flow: "confirmation",
      preferredDate: submission.preferredDate,
    });
  };

  const handleBackToResult = () => {
    // Return to the appropriate result step based on flow
    if (state.serviceType === 'site-welfare') {
      const hasToiletsOrShowers = state.cabinUses.includes('toilets') || state.cabinUses.includes('showers');
      updateState({ flow: "site-welfare", step: hasToiletsOrShowers ? 7 : 6 });
    } else if (state.serviceType === 'post-construction') {
      updateState({ flow: "tc", step: 5 });
    } else {
      updateState({ flow: "domestic", step: 6 });
    }
  };

  // Calculate total steps based on flow
  const getDomesticTotalSteps = () => 6;
  const getTCTotalSteps = () => 5;
  const getSiteWelfareTotalSteps = () => {
    const hasToiletsOrShowers = state.cabinUses.includes('toilets') || state.cabinUses.includes('showers');
    return hasToiletsOrShowers ? 7 : 6;
  };

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
        totalSteps={getDomesticTotalSteps()}
        question="What type of clean do you need?"
        onBack={resetQuestionnaire}
      >
        <OptionCard
          icon={Home}
          title="Regular / one-off clean"
          description="Routine maintenance or single visit"
          selected={state.serviceType === "regular"}
          onClick={() => selectServiceType("regular")}
          variant="large"
        />
        <OptionCard
          icon={Sparkles}
          title="End of tenancy clean"
          description="Move-out deep clean to landlord standards"
          selected={state.serviceType === "end-of-tenancy"}
          onClick={() => selectServiceType("end-of-tenancy")}
          variant="large"
        />
        <OptionCard
          icon={Sparkles}
          title="Deep clean"
          description="Thorough top-to-bottom cleaning"
          selected={state.serviceType === "deep"}
          onClick={() => selectServiceType("deep")}
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
        <OptionCard
          icon={Building2}
          title="Site welfare cleaning"
          description="Portable cabins, toilets, canteens"
          selected={state.serviceType === "site-welfare"}
          onClick={() => selectServiceType("site-welfare")}
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
        totalSteps={getTCTotalSteps()}
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
          totalSteps={getDomesticTotalSteps()}
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
          totalSteps={getDomesticTotalSteps()}
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

    // Step 3: Detailed cleaning add-ons
    if (state.step === 3) {
      const detailedOptions = [
        { id: "skirting", label: "Skirting boards (detailed clean)" },
        { id: "cupboards", label: "Inside cupboards" },
        { id: "windows", label: "Inside windows" },
        { id: "doorframes", label: "Door frames & light switches" },
        { id: "wallmarks", label: "Spot wall marks" },
      ];

      const isDeepClean = state.serviceType === 'deep';

      return (
        <QuestionContainer
          currentStep={3}
          totalSteps={getDomesticTotalSteps()}
          question="Detailed cleaning add-ons"
          helperText={isDeepClean 
            ? "These are pre-selected for deep cleans. Adjust if needed." 
            : "Detailed cleaning beyond a standard clean. Adds time."}
          onBack={goBack}
        >
          {detailedOptions.map((option) => (
            <CheckboxOption
              key={option.id}
              label={option.label}
              checked={state.detailedAddOns.includes(option.id)}
              onChange={() => toggleDetailedAddOn(option.id)}
            />
          ))}
          <div className="pt-4">
            <Button size="lg" className="w-full" onClick={confirmDetailedAddOns}>
              Continue
            </Button>
          </div>
        </QuestionContainer>
      );
    }

    // Step 4: Appliance add-ons
    if (state.step === 4) {
      const applianceOptions = [
        { id: "oven", label: "Oven internal clean" },
        { id: "fridge", label: "Fridge internal clean" },
      ];

      return (
        <QuestionContainer
          currentStep={4}
          totalSteps={getDomesticTotalSteps()}
          question="Appliance add-ons"
          helperText="These are not included in a standard clean."
          onBack={goBack}
        >
          {applianceOptions.map((option) => (
            <CheckboxOption
              key={option.id}
              label={option.label}
              checked={state.applianceAddOns.includes(option.id)}
              onChange={() => toggleApplianceAddOn(option.id)}
            />
          ))}
          <div className="pt-4">
            <Button size="lg" className="w-full" onClick={confirmApplianceAddOns}>
              Continue
            </Button>
          </div>
        </QuestionContainer>
      );
    }

    // Step 5: Condition (with deep clean suggestion)
    if (state.step === 5) {
      if (state.showDeepCleanSuggestion) {
        return (
          <QuestionContainer
            currentStep={5}
            totalSteps={getDomesticTotalSteps()}
            question="Consider a deep clean?"
            onBack={() => updateState({ showDeepCleanSuggestion: false })}
          >
            <div className="flex items-start gap-3 p-4 bg-eco-gold/10 rounded-xl border border-eco-gold/30 mb-4">
              <AlertCircle className="w-6 h-6 text-eco-gold-muted flex-shrink-0" />
              <p className="text-sm text-foreground">
                Based on your selections, a deep clean may be more suitable.
              </p>
            </div>
            <div className="space-y-3">
              <Button size="lg" className="w-full" onClick={switchToDeepClean}>
                Switch to deep clean
              </Button>
              <Button size="lg" variant="outline" className="w-full" onClick={keepCurrentSelection}>
                Keep current selection
              </Button>
            </div>
          </QuestionContainer>
        );
      }

      return (
        <QuestionContainer
          currentStep={5}
          totalSteps={getDomesticTotalSteps()}
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

    // Step 6: Result
    if (state.step === 6 && state.result) {
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

  // TC FLOW
  if (state.flow === "tc") {
    // Step 1: Bedrooms
    if (state.step === 1) {
      return (
        <QuestionContainer
          currentStep={1}
          totalSteps={getTCTotalSteps()}
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
          totalSteps={getTCTotalSteps()}
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
          totalSteps={getTCTotalSteps()}
          question="What works have been completed?"
          helperText="Select all that apply"
          onBack={goBack}
        >
          {workOptions.map((option) => (
            <CheckboxOption
              key={option.id}
              label={option.label}
              checked={(state.worksCompleted || []).includes(option.id)}
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
          totalSteps={getTCTotalSteps()}
          question="Condition on site?"
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

    // Step 5: Result
    if (state.step === 5 && state.result) {
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

  // SITE WELFARE FLOW
  if (state.flow === "site-welfare") {
    const hasToiletsOrShowers = state.cabinUses.includes('toilets') || state.cabinUses.includes('showers');
    
    // Adjust step numbers based on whether toilet/shower scale is shown
    const getAdjustedStep = () => {
      if (!hasToiletsOrShowers && state.step >= 3) {
        return state.step + 1;
      }
      return state.step;
    };

    // Step 1: Number of cabins
    if (state.step === 1) {
      return (
        <QuestionContainer
          currentStep={1}
          totalSteps={getSiteWelfareTotalSteps()}
          question="How many site cabins are on site?"
          onBack={() => updateState({ flow: "entry", step: 1, serviceType: null })}
        >
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <OptionCard
                key={num}
                title={num === 10 ? "10+" : `${num}`}
                selected={state.cabinCount === num}
                onClick={() => setCabinCount(num)}
              />
            ))}
          </div>
        </QuestionContainer>
      );
    }

    // Step 2: Cabin use
    if (state.step === 2) {
      const cabinUseOptions = [
        { id: "toilets", label: "Toilets" },
        { id: "showers", label: "Showers" },
        { id: "canteen", label: "Canteen / break room" },
        { id: "drying", label: "Drying room" },
        { id: "office", label: "Site office" },
      ];

      return (
        <QuestionContainer
          currentStep={2}
          totalSteps={getSiteWelfareTotalSteps()}
          question="What are the cabins used for?"
          helperText="This helps us allocate the correct time and materials."
          onBack={() => updateState({ step: 1 })}
        >
          {cabinUseOptions.map((option) => (
            <CheckboxOption
              key={option.id}
              label={option.label}
              checked={(state.cabinUses || []).includes(option.id)}
              onChange={() => toggleCabinUse(option.id)}
            />
          ))}
          <div className="pt-4">
            <Button 
              size="lg" 
              className="w-full" 
              onClick={confirmCabinUses}
              disabled={state.cabinUses.length === 0}
            >
              Continue
            </Button>
          </div>
        </QuestionContainer>
      );
    }

    // Step 3: Toilet/shower scale (conditional)
    if (state.step === 3 && hasToiletsOrShowers) {
      return (
        <QuestionContainer
          currentStep={3}
          totalSteps={getSiteWelfareTotalSteps()}
          question="How many toilet cubicles / showers are there?"
          onBack={() => updateState({ step: 2 })}
        >
          <OptionCard
            title="1–2"
            selected={state.toiletShowerScale === "1-2"}
            onClick={() => selectToiletShowerScale("1-2")}
          />
          <OptionCard
            title="3–5"
            selected={state.toiletShowerScale === "3-5"}
            onClick={() => selectToiletShowerScale("3-5")}
          />
          <OptionCard
            title="6+"
            selected={state.toiletShowerScale === "6+"}
            onClick={() => selectToiletShowerScale("6+")}
          />
        </QuestionContainer>
      );
    }

    // Step 4: Daily occupancy
    if (state.step === 4 || (state.step === 3 && !hasToiletsOrShowers)) {
      const currentStep = hasToiletsOrShowers ? 4 : 3;
      return (
        <QuestionContainer
          currentStep={currentStep}
          totalSteps={getSiteWelfareTotalSteps()}
          question="Approx. how many people use the welfare facilities daily?"
          onBack={() => updateState({ step: hasToiletsOrShowers ? 3 : 2 })}
        >
          <OptionCard
            title="1–5"
            selected={state.dailyOccupancy === "1-5"}
            onClick={() => selectDailyOccupancy("1-5")}
          />
          <OptionCard
            title="6–10"
            selected={state.dailyOccupancy === "6-10"}
            onClick={() => selectDailyOccupancy("6-10")}
          />
          <OptionCard
            title="11–20"
            selected={state.dailyOccupancy === "11-20"}
            onClick={() => selectDailyOccupancy("11-20")}
          />
          <OptionCard
            title="20+"
            selected={state.dailyOccupancy === "20+"}
            onClick={() => selectDailyOccupancy("20+")}
          />
        </QuestionContainer>
      );
    }

    // Step 5: Cleaning frequency
    if (state.step === 5 || (state.step === 4 && !hasToiletsOrShowers)) {
      const currentStep = hasToiletsOrShowers ? 5 : 4;
      return (
        <QuestionContainer
          currentStep={currentStep}
          totalSteps={getSiteWelfareTotalSteps()}
          question="How often do you need cleaning?"
          onBack={() => updateState({ step: hasToiletsOrShowers ? 4 : 3 })}
        >
          <OptionCard
            title="One-off"
            description="Single visit"
            selected={state.cleaningFrequency === "one-off"}
            onClick={() => selectCleaningFrequency("one-off")}
          />
          <OptionCard
            title="Weekly"
            description="Once per week"
            selected={state.cleaningFrequency === "weekly"}
            onClick={() => selectCleaningFrequency("weekly")}
          />
          <OptionCard
            title="Twice weekly"
            description="Two visits per week"
            selected={state.cleaningFrequency === "twice-weekly"}
            onClick={() => selectCleaningFrequency("twice-weekly")}
          />
          <OptionCard
            title="Daily (Mon–Fri)"
            description="Five visits per week"
            selected={state.cleaningFrequency === "daily"}
            onClick={() => selectCleaningFrequency("daily")}
          />
        </QuestionContainer>
      );
    }

    // Step 6: Access & site status
    if (state.step === 6 || (state.step === 5 && !hasToiletsOrShowers)) {
      const currentStep = hasToiletsOrShowers ? 6 : 5;
      const accessOptions = [
        { id: "active-use", label: "Cabins in active use" },
        { id: "vacant", label: "Vacant during cleaning" },
        { id: "water-power", label: "Water & power available" },
        { id: "parking", label: "Parking available" },
      ];

      return (
        <QuestionContainer
          currentStep={currentStep}
          totalSteps={getSiteWelfareTotalSteps()}
          question="Site access details"
          onBack={() => updateState({ step: hasToiletsOrShowers ? 5 : 4 })}
        >
          {accessOptions.map((option) => (
            <CheckboxOption
              key={option.id}
              label={option.label}
              checked={(state.accessDetails || []).includes(option.id)}
              onChange={() => toggleAccessDetail(option.id)}
            />
          ))}
          <div className="pt-4">
            <Textarea 
              placeholder="Any additional notes about site access (optional)"
              value={state.accessNotes}
              onChange={(e) => updateState({ accessNotes: e.target.value })}
              className="mb-4"
            />
            <Button size="lg" className="w-full" onClick={submitSiteWelfareQuote}>
              Get estimate
            </Button>
          </div>
        </QuestionContainer>
      );
    }

    // Step 7: Result
    if ((state.step === 7 || (state.step === 6 && !hasToiletsOrShowers)) && state.result) {
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
