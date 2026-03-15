// Pricing logic - NEVER expose these values to users
// All calculations are internal only

export type ServiceType = 'holiday-let' | 'end-of-tenancy' | 'deep';

// Keep these types available for future re-addition of construction services
// export type ConstructionServiceType = 'post-construction' | 'site-welfare';

export interface ExtrasSelection {
  kitchenAppliance: string[];
  interiorCleaning: string[];
  carpetUpholstery: string[];
  holidayLet: string[];
  exterior: string[];
}

export interface DomesticQuoteData {
  serviceType: ServiceType;
  bedrooms: 1 | 2 | 3;
  bathrooms: 1 | 2 | 3;
  extras: ExtrasSelection;
  condition: 'light' | 'average' | 'heavy';
}

export interface QuoteResult {
  estimatedPrice: number;
  durationRange: string;
  scopeSummary: string;
  inclusions: string[];
  exclusions: string[];
  serviceType: ServiceType;
  footerNote?: string;
  selectedExtras: string[];
  // Flags for availability booking
  isLargeJob?: boolean;
  isMultiDay?: boolean;
  isStaged?: boolean;
}

// =============== INTERNAL PRICING CONSTANTS (NEVER SHOWN) ===============

const MINIMUM_CHARGE = 45;

// Hourly rates per cleaner
const DOMESTIC_HOURLY_RATE = 22.50;

// Base labour hours by bedroom count
const DOMESTIC_BASE_HOURS = {
  1: 2,
  2: 2.5,
  3: 3.5,
};

// Bathroom labour additions
const DOMESTIC_BATHROOM_HOURS = {
  1: 0,
  2: 0.5,
  3: 1,
};

// Service type labour multipliers
const SERVICE_TYPE_MULTIPLIERS: Record<ServiceType, number> = {
  'holiday-let': 1,
  'end-of-tenancy': 1.4,
  'deep': 1.6,
};

// Condition labour multipliers
const CONDITION_MULTIPLIERS = {
  'light': 1,
  'average': 1.15,
  'heavy': 1.4,
};

// =============== EXTRAS LABOUR HOURS ===============

const EXTRAS_HOURS: Record<string, number> = {
  // Kitchen & Appliance
  'oven': 1,
  'double-oven': 1.5,
  'fridge': 0.5,
  'microwave': 0.25,
  'extractor': 0.5,
  'kitchen-cupboards': 0.75,
  // Interior Cleaning
  'interior-windows': 0.5,
  'skirting-deep': 0.5,
  'tile-grout': 0.75,
  'limescale': 0.5,
  'washing-machine': 0.5,
  'dishwasher': 0.25,
  // Carpet & Upholstery
  'carpet-room': 0.75,
  'rug': 0.5,
  'sofa': 1,
  'mattress': 0.5,
  // Holiday Let Specific
  'linen-change': 0.25,
  'towel-replacement': 0.15,
  'linen-laundry': 0.5,
  'welcome-pack': 0.25,
  'toiletries': 0.15,
  'bin-management': 0.15,
  // Exterior
  'patio-wash': 1.5,
  'driveway-wash': 1.5,
  'render-wash': 2,
  'roof-moss': 2,
  'gutter-clearing': 1,
};

const EXTRAS_LABELS: Record<string, string> = {
  // Kitchen & Appliance
  'oven': 'Oven deep clean',
  'double-oven': 'Double oven / range cooker clean',
  'fridge': 'Fridge interior clean',
  'microwave': 'Microwave clean',
  'extractor': 'Extractor fan and filter clean',
  'kitchen-cupboards': 'Inside kitchen cupboards',
  // Interior Cleaning
  'interior-windows': 'Interior window cleaning',
  'skirting-deep': 'Skirting board deep clean',
  'tile-grout': 'Tile and grout cleaning',
  'limescale': 'Limescale removal',
  'washing-machine': 'Washing machine deep clean',
  'dishwasher': 'Dishwasher clean',
  // Carpet & Upholstery
  'carpet-room': 'Carpet cleaning (per room)',
  'rug': 'Rug cleaning',
  'sofa': 'Sofa / upholstery cleaning',
  'mattress': 'Mattress sanitation',
  // Holiday Let Specific
  'linen-change': 'Bed linen change (per bed)',
  'towel-replacement': 'Towel replacement',
  'linen-laundry': 'Linen laundry service',
  'welcome-pack': 'Welcome pack setup',
  'toiletries': 'Toiletries restocking',
  'bin-management': 'Bin management between guests',
  // Exterior
  'patio-wash': 'Patio pressure washing',
  'driveway-wash': 'Driveway pressure washing',
  'render-wash': 'Render soft wash',
  'roof-moss': 'Roof moss removal',
  'gutter-clearing': 'Gutter clearing',
};

// =============== DURATION CALCULATION (INTERNAL) ===============

interface DurationResult {
  durationRange: string;
  isStaged: boolean;
  isMultiDay: boolean;
}

function calculateDurationRange(labourHours: number): DurationResult {
  if (labourHours <= 4) {
    return { durationRange: 'Approx. 2–4 hours', isStaged: false, isMultiDay: false };
  } else if (labourHours <= 8) {
    return { durationRange: 'Approx. 4–6 hours', isStaged: false, isMultiDay: false };
  } else if (labourHours <= 12) {
    return { durationRange: 'Approx. 6–8 hours', isStaged: false, isMultiDay: false };
  } else if (labourHours <= 16) {
    return { durationRange: 'Full day (staged clean possible)', isStaged: true, isMultiDay: false };
  } else {
    return { durationRange: 'Multi-day clean', isStaged: true, isMultiDay: true };
  }
}

function roundToHalfHour(hours: number): number {
  return Math.ceil(hours * 2) / 2;
}

// =============== QUOTE CALCULATION ===============

export function calculateDomesticQuote(data: DomesticQuoteData): QuoteResult {
  // Calculate base labour hours
  let labourHours = DOMESTIC_BASE_HOURS[data.bedrooms];
  
  // Add bathroom hours
  labourHours += DOMESTIC_BATHROOM_HOURS[data.bathrooms];
  
  // Apply service type multiplier
  labourHours *= SERVICE_TYPE_MULTIPLIERS[data.serviceType];
  
  // Apply condition multiplier
  labourHours *= CONDITION_MULTIPLIERS[data.condition];
  
  // Add extras hours
  const allExtras = [
    ...data.extras.kitchenAppliance,
    ...data.extras.interiorCleaning,
    ...data.extras.carpetUpholstery,
    ...data.extras.holidayLet,
    ...data.extras.exterior,
  ];
  
  allExtras.forEach(extra => {
    if (EXTRAS_HOURS[extra]) {
      labourHours += EXTRAS_HOURS[extra];
    }
  });
  
  // Round to nearest 0.5 hour
  labourHours = roundToHalfHour(labourHours);
  
  // Calculate price
  let price = labourHours * DOMESTIC_HOURLY_RATE;
  
  // Round to nearest £5
  price = Math.ceil(price / 5) * 5;
  
  // Enforce minimum charge
  price = Math.max(price, MINIMUM_CHARGE);
  
  // Calculate duration range
  const durationInfo = calculateDurationRange(labourHours);
  
  // Determine if this is a large job
  const isLargeJob = price >= 300;
  
  // Generate scope summary
  const scopeSummary = generateScopeSummary(data);
  
  // Build inclusions based on service type
  const inclusions = getBaseInclusions(data.serviceType);
  
  // Build selected extras labels
  const selectedExtras: string[] = [];
  allExtras.forEach(extra => {
    if (EXTRAS_LABELS[extra]) {
      selectedExtras.push(EXTRAS_LABELS[extra]);
      inclusions.push(EXTRAS_LABELS[extra]);
    }
  });
  
  const exclusions = getExclusions(data.serviceType);
  
  return {
    estimatedPrice: price,
    durationRange: durationInfo.durationRange,
    scopeSummary,
    inclusions,
    exclusions,
    serviceType: data.serviceType,
    selectedExtras,
    isLargeJob,
    isStaged: durationInfo.isStaged,
    isMultiDay: durationInfo.isMultiDay,
  };
}

function getBaseInclusions(serviceType: ServiceType): string[] {
  switch (serviceType) {
    case 'holiday-let':
      return [
        'Kitchen clean',
        'Bathroom clean',
        'Surface dusting',
        'Vacuuming and mopping floors',
        'Bin emptying',
        'Property check for damage or missing items',
      ];
    case 'end-of-tenancy':
      return [
        'Full kitchen deep clean',
        'Bathroom deep clean',
        'Interior windows',
        'Skirting boards and door frames',
        'Cupboards and drawers cleaned',
        'Floors vacuumed and mopped',
      ];
    case 'deep':
      return [
        'Detailed kitchen cleaning',
        'Bathroom deep cleaning',
        'Skirting boards',
        'Doors and frames',
        'Light switches and sockets',
        'High dusting areas',
        'Detailed floor cleaning',
      ];
  }
}

function getExclusions(serviceType: ServiceType): string[] {
  switch (serviceType) {
    case 'holiday-let':
      return [
        'Linen services (unless selected as extra)',
        'External window cleaning',
        'Garden or outdoor areas (unless selected)',
      ];
    case 'end-of-tenancy':
      return [
        'Carpet steam cleaning (available as extra)',
        'External windows',
        'Garden or outdoor areas',
      ];
    case 'deep':
      return [
        'Specialist equipment cleaning',
        'Exterior work (unless selected as extra)',
        'Carpet deep cleaning (available as extra)',
      ];
  }
}

function generateScopeSummary(data: DomesticQuoteData): string {
  const serviceLabels: Record<ServiceType, string> = {
    'holiday-let': 'Holiday let changeover',
    'end-of-tenancy': 'End of tenancy',
    'deep': 'Deep',
  };
  
  const allExtras = [
    ...data.extras.kitchenAppliance,
    ...data.extras.interiorCleaning,
    ...data.extras.carpetUpholstery,
    ...data.extras.holidayLet,
    ...data.extras.exterior,
  ];
  
  const extrasCount = allExtras.length;
  
  let summary = `${serviceLabels[data.serviceType]} clean`;
  
  if (extrasCount > 0) {
    summary += ` with ${extrasCount} extra${extrasCount > 1 ? 's' : ''} selected`;
  }
  
  summary += '.';
  
  return summary;
}
