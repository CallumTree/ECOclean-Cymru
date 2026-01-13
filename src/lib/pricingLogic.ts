// Pricing logic - NEVER expose these values to users
// All calculations are internal only

export interface DomesticQuoteData {
  serviceType: 'domestic' | 'end-of-tenancy';
  bedrooms: 1 | 2 | 3;
  bathrooms: 1 | 2 | 3;
  cleanType: 'regular' | 'one-off' | 'deep' | 'end-of-tenancy';
  addOns: string[];
  condition: 'light' | 'average' | 'heavy';
  accessNotes?: string;
}

export interface TCQuoteData {
  bedrooms: 1 | 2 | 3;
  bathrooms: '1' | '1+wc' | '2+';
  worksCompleted: string[];
  siteCondition: 'light' | 'typical' | 'heavy';
  accessDetails: {
    vacant: boolean;
    keysAvailable: boolean;
    parkingAvailable: boolean;
    notes?: string;
  };
}

export interface QuoteResult {
  estimatedPrice: number;
  timeBlock: '2-hour' | '4-hour' | 'full-day';
  inclusions: string[];
  exclusions: string[];
}

// Base pricing (hidden)
const MINIMUM_CHARGE = 45;

const DOMESTIC_BASE_RATES = {
  1: 45,
  2: 55,
  3: 75,
};

const BATHROOM_MULTIPLIERS = {
  1: 1,
  2: 1.15,
  3: 1.3,
};

const CLEAN_TYPE_MULTIPLIERS = {
  'regular': 1,
  'one-off': 1.1,
  'deep': 1.4,
  'end-of-tenancy': 1.5,
};

const CONDITION_MULTIPLIERS = {
  'light': 1,
  'average': 1.15,
  'heavy': 1.35,
};

const ADD_ON_PRICES: Record<string, number> = {
  'oven': 25,
  'fridge': 15,
  'cupboards': 20,
  'windows': 15,
  'skirting': 10,
  'ironing': 20,
};

// TC Pricing
const TC_BASE_RATES = {
  1: 75,
  2: 95,
  3: 125,
};

const TC_BATHROOM_MULTIPLIERS = {
  '1': 1,
  '1+wc': 1.1,
  '2+': 1.25,
};

const TC_WORKS_PRICES: Record<string, number> = {
  'kitchen': 25,
  'bathroom': 20,
  'floor-tiling': 15,
  'carpet-vinyl': 10,
  'decoration': 15,
  'joinery': 10,
};

const TC_CONDITION_MULTIPLIERS = {
  'light': 1,
  'typical': 1.2,
  'heavy': 1.5,
};

function getTimeBlock(price: number): '2-hour' | '4-hour' | 'full-day' {
  if (price <= 49) return '2-hour';
  if (price <= 149) return '4-hour';
  return 'full-day';
}

export function calculateDomesticQuote(data: DomesticQuoteData): QuoteResult {
  // Base calculation
  let price = DOMESTIC_BASE_RATES[data.bedrooms];
  
  // Apply bathroom multiplier
  price *= BATHROOM_MULTIPLIERS[data.bathrooms];
  
  // Apply clean type multiplier
  price *= CLEAN_TYPE_MULTIPLIERS[data.cleanType];
  
  // Apply condition multiplier
  price *= CONDITION_MULTIPLIERS[data.condition];
  
  // Add add-ons
  let addOnTotal = 0;
  data.addOns.forEach(addOn => {
    if (ADD_ON_PRICES[addOn]) {
      addOnTotal += ADD_ON_PRICES[addOn];
    }
  });
  price += addOnTotal;
  
  // Round to nearest £5
  price = Math.ceil(price / 5) * 5;
  
  // Enforce minimum charge
  price = Math.max(price, MINIMUM_CHARGE);
  
  // Build inclusions based on selections
  const inclusions = [
    'All rooms cleaned',
    'Kitchen surfaces and appliances (exterior)',
    'Bathroom/WC cleaning',
    'Vacuuming and mopping',
    'Dusting surfaces',
  ];
  
  if (data.cleanType === 'deep' || data.cleanType === 'end-of-tenancy') {
    inclusions.push('Detailed cleaning throughout');
  }
  
  // Add selected add-ons to inclusions
  const addOnLabels: Record<string, string> = {
    'oven': 'Oven clean (interior)',
    'fridge': 'Fridge clean (interior)',
    'cupboards': 'Inside cupboard cleaning',
    'windows': 'Interior window cleaning',
    'skirting': 'Skirting boards detail focus',
    'ironing': 'Ironing service',
  };
  
  data.addOns.forEach(addOn => {
    if (addOnLabels[addOn]) {
      inclusions.push(addOnLabels[addOn]);
    }
  });
  
  const exclusions = [
    'Waste removal (unless agreed)',
    'External window cleaning',
    'Carpet shampooing',
    'High-level cleaning requiring equipment',
  ];
  
  return {
    estimatedPrice: price,
    timeBlock: getTimeBlock(price),
    inclusions,
    exclusions,
  };
}

export function calculateTCQuote(data: TCQuoteData): QuoteResult {
  // Base calculation
  let price = TC_BASE_RATES[data.bedrooms];
  
  // Apply bathroom multiplier
  price *= TC_BATHROOM_MULTIPLIERS[data.bathrooms];
  
  // Add works completed pricing
  let worksTotal = 0;
  data.worksCompleted.forEach(work => {
    if (TC_WORKS_PRICES[work]) {
      worksTotal += TC_WORKS_PRICES[work];
    }
  });
  price += worksTotal;
  
  // Apply condition multiplier
  price *= TC_CONDITION_MULTIPLIERS[data.siteCondition];
  
  // Round to nearest £5
  price = Math.ceil(price / 5) * 5;
  
  // Enforce minimum charge
  price = Math.max(price, MINIMUM_CHARGE);
  
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
    'floor-tiling': 'Floor tile cleaning and polish',
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
    timeBlock: getTimeBlock(price),
    inclusions,
    exclusions,
  };
}
