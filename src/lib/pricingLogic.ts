// Pricing logic - NEVER expose these values to users
// All calculations are internal only

export type ServiceType = 'regular' | 'end-of-tenancy' | 'deep' | 'post-construction' | 'site-welfare';

export interface DomesticQuoteData {
  serviceType: 'regular' | 'end-of-tenancy' | 'deep';
  bedrooms: 1 | 2 | 3;
  bathrooms: 1 | 2 | 3;
  detailedAddOns: string[];
  applianceAddOns: string[];
  condition: 'light' | 'average' | 'heavy';
}

export interface TCQuoteData {
  bedrooms: 1 | 2 | 3;
  bathrooms: '1' | '1+wc' | '2+';
  worksCompleted: string[];
  siteCondition: 'light' | 'typical' | 'heavy';
}

export interface SiteWelfareQuoteData {
  cabinCount: number;
  cabinUses: string[];
  toiletShowerScale: '1-2' | '3-5' | '6+' | null;
  dailyOccupancy: '1-5' | '6-10' | '11-20' | '20+';
  frequency: 'one-off' | 'weekly' | 'twice-weekly' | 'daily';
  accessDetails: string[];
}

export interface QuoteResult {
  estimatedPrice: number;
  durationRange: string;
  scopeSummary: string;
  inclusions: string[];
  exclusions: string[];
  serviceType: ServiceType;
  footerNote?: string;
}

// =============== INTERNAL PRICING CONSTANTS (NEVER SHOWN) ===============

const MINIMUM_CHARGE = 45;

// Hourly rates per cleaner
const DOMESTIC_HOURLY_RATE = 22.50;
const TC_HOURLY_RATE = 26.00;

// Base labour hours by bedroom count (domestic)
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
const SERVICE_TYPE_MULTIPLIERS = {
  'regular': 1,
  'end-of-tenancy': 1.4,
  'deep': 1.6,
};

// Condition labour multipliers
const CONDITION_MULTIPLIERS = {
  'light': 1,
  'average': 1.15,
  'heavy': 1.4,
};

// Add-on labour hours (detailed cleaning)
const DETAILED_ADDON_HOURS: Record<string, number> = {
  'skirting': 0.5,
  'cupboards': 0.5,
  'windows': 0.5,
  'doorframes': 0.25,
  'wallmarks': 0.25,
};

// Add-on labour hours (appliances)
const APPLIANCE_ADDON_HOURS: Record<string, number> = {
  'oven': 1,
  'fridge': 0.5,
};

// =============== TC (POST-CONSTRUCTION) PRICING ===============

// Base labour hours by bedroom count (TC)
const TC_BASE_HOURS = {
  1: 3,
  2: 4,
  3: 5.5,
};

// TC bathroom labour additions
const TC_BATHROOM_HOURS = {
  '1': 0,
  '1+wc': 0.5,
  '2+': 1,
};

// TC works completed labour additions
const TC_WORKS_HOURS: Record<string, number> = {
  'kitchen': 1,
  'bathroom': 0.75,
  'floor-tiling': 0.5,
  'carpet-vinyl': 0.25,
  'decoration': 0.5,
  'joinery': 0.25,
};

// TC site condition multipliers
const TC_CONDITION_MULTIPLIERS = {
  'light': 1,
  'typical': 1.2,
  'heavy': 1.5,
};

// =============== DURATION CALCULATION (INTERNAL) ===============

function calculateDurationRange(labourHours: number): string {
  // Based on crew guidance - approximates duration for customer
  if (labourHours <= 4) {
    return 'Approx. 2–4 hours';
  } else if (labourHours <= 8) {
    return 'Approx. 4–6 hours';
  } else if (labourHours <= 12) {
    return 'Approx. 6–8 hours';
  } else if (labourHours <= 16) {
    return 'Full day (staged clean possible)';
  } else {
    return 'Multi-day clean';
  }
}

function roundToHalfHour(hours: number): number {
  return Math.ceil(hours * 2) / 2;
}

// =============== DOMESTIC QUOTE CALCULATION ===============

export function calculateDomesticQuote(data: DomesticQuoteData): QuoteResult {
  // Calculate base labour hours
  let labourHours = DOMESTIC_BASE_HOURS[data.bedrooms];
  
  // Add bathroom hours
  labourHours += DOMESTIC_BATHROOM_HOURS[data.bathrooms];
  
  // Apply service type multiplier
  labourHours *= SERVICE_TYPE_MULTIPLIERS[data.serviceType];
  
  // Apply condition multiplier
  labourHours *= CONDITION_MULTIPLIERS[data.condition];
  
  // Add detailed add-ons
  data.detailedAddOns.forEach(addOn => {
    if (DETAILED_ADDON_HOURS[addOn]) {
      labourHours += DETAILED_ADDON_HOURS[addOn];
    }
  });
  
  // Add appliance add-ons
  data.applianceAddOns.forEach(addOn => {
    if (APPLIANCE_ADDON_HOURS[addOn]) {
      labourHours += APPLIANCE_ADDON_HOURS[addOn];
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
  const durationRange = calculateDurationRange(labourHours);
  
  // Generate scope summary
  const scopeSummary = generateDomesticScopeSummary(data);
  
  // Build inclusions
  const inclusions = [
    'All rooms cleaned',
    'Kitchen surfaces',
    'Bathroom / WC cleaning',
    'Vacuuming and mopping',
    'Dusting reachable surfaces',
    'Visible appliance fronts wiped (wipe-down only)',
  ];
  
  // Add service-specific inclusions
  if (data.serviceType === 'deep') {
    inclusions.push('Detailed cleaning throughout');
    inclusions.push('Skirting boards');
    inclusions.push('Door frames & light switches');
    inclusions.push('Inside cupboards');
  }
  
  if (data.serviceType === 'end-of-tenancy') {
    inclusions.push('Move-out standard deep clean');
  }
  
  // Add selected add-ons
  const detailedLabels: Record<string, string> = {
    'skirting': 'Skirting boards (detailed clean)',
    'cupboards': 'Inside cupboards',
    'windows': 'Inside windows',
    'doorframes': 'Door frames & light switches',
    'wallmarks': 'Spot wall marks',
  };
  
  const applianceLabels: Record<string, string> = {
    'oven': 'Oven internal clean',
    'fridge': 'Fridge internal clean',
  };
  
  // Only add if not already included in deep clean
  if (data.serviceType !== 'deep') {
    data.detailedAddOns.forEach(addOn => {
      if (detailedLabels[addOn]) {
        inclusions.push(detailedLabels[addOn]);
      }
    });
  }
  
  data.applianceAddOns.forEach(addOn => {
    if (applianceLabels[addOn]) {
      inclusions.push(applianceLabels[addOn]);
    }
  });
  
  const exclusions = [
    'Internal appliance cleaning unless selected',
    'Waste removal unless agreed',
    'External window cleaning',
    'Carpet shampooing',
    'High-level cleaning requiring equipment',
  ];
  
  return {
    estimatedPrice: price,
    durationRange,
    scopeSummary,
    inclusions,
    exclusions,
    serviceType: data.serviceType,
  };
}

function generateDomesticScopeSummary(data: DomesticQuoteData): string {
  const serviceLabels = {
    'regular': 'General',
    'end-of-tenancy': 'End-of-tenancy',
    'deep': 'Deep',
  };
  
  const hasDetailedAddOns = data.detailedAddOns.length > 0;
  const hasApplianceAddOns = data.applianceAddOns.length > 0;
  
  let summary = `${serviceLabels[data.serviceType]} clean`;
  
  if (data.serviceType === 'deep') {
    summary += ' with detailed areas included';
  } else if (hasDetailedAddOns) {
    summary += ' with selected detailed areas';
  }
  
  if (hasApplianceAddOns) {
    summary += '. Internal appliances included.';
  } else {
    summary += '. No internal appliance cleaning included.';
  }
  
  return summary;
}

// =============== TC (POST-CONSTRUCTION) QUOTE CALCULATION ===============

export function calculateTCQuote(data: TCQuoteData): QuoteResult {
  // Calculate base labour hours
  let labourHours = TC_BASE_HOURS[data.bedrooms];
  
  // Add bathroom hours
  labourHours += TC_BATHROOM_HOURS[data.bathrooms];
  
  // Add works completed hours
  data.worksCompleted.forEach(work => {
    if (TC_WORKS_HOURS[work]) {
      labourHours += TC_WORKS_HOURS[work];
    }
  });
  
  // Apply site condition multiplier
  labourHours *= TC_CONDITION_MULTIPLIERS[data.siteCondition];
  
  // Round to nearest 0.5 hour
  labourHours = roundToHalfHour(labourHours);
  
  // Calculate price
  let price = labourHours * TC_HOURLY_RATE;
  
  // Round to nearest £5
  price = Math.ceil(price / 5) * 5;
  
  // Enforce minimum charge
  price = Math.max(price, MINIMUM_CHARGE);
  
  // Calculate duration range
  const durationRange = calculateDurationRange(labourHours);
  
  // Generate scope summary
  const scopeSummary = generateTCScopeSummary(data);
  
  // Build inclusions
  const inclusions = [
    'Full property clean',
    'Construction dust removal',
    'All hard surfaces cleaned',
    'Window sills and frames',
    'Light switches and sockets',
    'Door handles and frames',
  ];
  
  const worksLabels: Record<string, string> = {
    'kitchen': 'New kitchen area cleaning',
    'bathroom': 'New bathroom fit cleaning',
    'floor-tiling': 'Floor tile cleaning',
    'carpet-vinyl': 'New floor protection and clean',
    'decoration': 'Post-decoration clean-down',
    'joinery': 'Joinery dust removal',
  };
  
  data.worksCompleted.forEach(work => {
    if (worksLabels[work]) {
      inclusions.push(worksLabels[work]);
    }
  });
  
  const exclusions = [
    'Waste or debris removal',
    'Heavy staining or paint removal',
    'External cleaning',
    'Carpet deep cleaning',
    'Works not specified above',
  ];
  
  return {
    estimatedPrice: price,
    durationRange,
    scopeSummary,
    inclusions,
    exclusions,
    serviceType: 'post-construction',
  };
}

function generateTCScopeSummary(data: TCQuoteData): string {
  const conditionLabels = {
    'light': 'light site dust',
    'typical': 'typical handover condition',
    'heavy': 'heavy build-up',
  };
  
  const worksCount = data.worksCompleted.length;
  
  let summary = `Social housing handover clean with ${conditionLabels[data.siteCondition]}`;
  
  if (worksCount > 0) {
    summary += `. Includes cleaning for ${worksCount} completed work${worksCount > 1 ? 's' : ''}.`;
  } else {
    summary += '.';
  }
  
  return summary;
}

// =============== SITE WELFARE PRICING CONSTANTS ===============

const SITE_WELFARE_HOURLY_RATE = 26.00;

// Base hours per cabin by use type
const CABIN_USE_HOURS: Record<string, number> = {
  'toilets': 1.5,      // Heavy use
  'showers': 1.25,     // Heavy use
  'canteen': 0.75,     // Medium use
  'drying': 0.5,       // Light use
  'office': 0.5,       // Light use
};

// Toilet/shower scale multipliers
const TOILET_SHOWER_SCALE_MULTIPLIERS = {
  '1-2': 1,
  '3-5': 1.5,
  '6+': 2,
};

// Occupancy multipliers
const OCCUPANCY_MULTIPLIERS = {
  '1-5': 1,
  '6-10': 1.15,
  '11-20': 1.3,
  '20+': 1.5,
};

// Frequency discount rates (per visit)
const FREQUENCY_MULTIPLIERS = {
  'one-off': 1,
  'weekly': 0.9,
  'twice-weekly': 0.85,
  'daily': 0.8,
};

// =============== SITE WELFARE QUOTE CALCULATION ===============

export function calculateSiteWelfareQuote(data: SiteWelfareQuoteData): QuoteResult {
  // Calculate base labour hours from cabin uses
  let labourHours = 0;
  
  data.cabinUses.forEach(use => {
    if (CABIN_USE_HOURS[use]) {
      labourHours += CABIN_USE_HOURS[use];
    }
  });
  
  // Multiply by cabin count (with diminishing returns for multiple similar cabins)
  if (data.cabinCount > 1) {
    labourHours = labourHours * (1 + (data.cabinCount - 1) * 0.75);
  }
  
  // Apply toilet/shower scale multiplier if applicable
  const hasToiletsOrShowers = data.cabinUses.includes('toilets') || data.cabinUses.includes('showers');
  if (hasToiletsOrShowers && data.toiletShowerScale) {
    labourHours *= TOILET_SHOWER_SCALE_MULTIPLIERS[data.toiletShowerScale];
  }
  
  // Apply occupancy multiplier
  labourHours *= OCCUPANCY_MULTIPLIERS[data.dailyOccupancy];
  
  // Round to nearest 0.5 hour
  labourHours = roundToHalfHour(labourHours);
  
  // Ensure minimum 2 hours
  labourHours = Math.max(labourHours, 2);
  
  // Calculate price
  let price = labourHours * SITE_WELFARE_HOURLY_RATE;
  
  // Apply frequency discount
  price *= FREQUENCY_MULTIPLIERS[data.frequency];
  
  // Round to nearest £5
  price = Math.ceil(price / 5) * 5;
  
  // Enforce minimum charge
  price = Math.max(price, MINIMUM_CHARGE);
  
  // Calculate duration range
  const durationRange = calculateDurationRange(labourHours);
  
  // Generate scope summary
  const scopeSummary = generateSiteWelfareScopeSummary(data);
  
  // Build inclusions
  const inclusions = [
    'Cabin interior cleaning',
    'Floor cleaning and mopping',
    'Surface sanitisation',
    'Waste bin emptying',
  ];
  
  const useLabels: Record<string, string> = {
    'toilets': 'Toilet cubicle cleaning & sanitisation',
    'showers': 'Shower cubicle cleaning',
    'canteen': 'Canteen surfaces and tables',
    'drying': 'Drying room floor and surfaces',
    'office': 'Office desk and surface cleaning',
  };
  
  data.cabinUses.forEach(use => {
    if (useLabels[use]) {
      inclusions.push(useLabels[use]);
    }
  });
  
  const exclusions = [
    'Consumables / supplies (unless agreed)',
    'Deep cleaning or descaling',
    'External cabin cleaning',
    'Waste collection / skip emptying',
    'Equipment maintenance',
  ];
  
  // Add frequency note
  const frequencyLabels = {
    'one-off': 'One-off clean',
    'weekly': 'Weekly service',
    'twice-weekly': 'Twice weekly service',
    'daily': 'Daily service (Mon–Fri)',
  };
  
  const footerNote = `Site welfare cleaning is priced based on cabin use, occupancy, and frequency. ${frequencyLabels[data.frequency]} pricing shown.`;
  
  return {
    estimatedPrice: price,
    durationRange,
    scopeSummary,
    inclusions,
    exclusions,
    serviceType: 'site-welfare',
    footerNote,
  };
}

function generateSiteWelfareScopeSummary(data: SiteWelfareQuoteData): string {
  const cabinWord = data.cabinCount === 1 ? 'cabin' : 'cabins';
  
  const useLabels: Record<string, string> = {
    'toilets': 'toilets',
    'showers': 'showers',
    'canteen': 'canteen',
    'drying': 'drying room',
    'office': 'site office',
  };
  
  const uses = data.cabinUses
    .map(use => useLabels[use])
    .filter(Boolean);
  
  if (uses.length === 0) {
    return `${data.cabinCount} site ${cabinWord}.`;
  }
  
  const lastUse = uses.pop();
  const usesText = uses.length > 0 ? `${uses.join(', ')} and ${lastUse}` : lastUse;
  
  return `${data.cabinCount} site ${cabinWord} containing ${usesText}.`;
}
