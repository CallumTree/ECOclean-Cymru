// Pricing engine — internal calculations only.
// Customer-facing UI shows Final Price + approximate duration only.
//
// Customer-facing services (5):
//   deep-clean, end-of-tenancy, holiday-let, post-construction, vehicle
// Internally, holiday-let resolves to either 'domestic-regular' (Standard
// Turnover) or 'domestic-deep' (Deep Reset) rates.

export type CustomerService =
  | 'deep-clean'
  | 'end-of-tenancy'
  | 'holiday-let'
  | 'post-construction'
  | 'vehicle';

export type ServiceType =
  | 'domestic-regular'
  | 'domestic-deep'
  | 'end-of-tenancy'
  | 'post-construction'
  | 'vehicle-exterior'
  | 'vehicle-interior'
  | 'vehicle-full-detail';

export const PROPERTY_SERVICES: ServiceType[] = [
  'domestic-regular',
  'domestic-deep',
  'end-of-tenancy',
  'post-construction',
];

export const VEHICLE_SERVICES: ServiceType[] = [
  'vehicle-exterior',
  'vehicle-interior',
  'vehicle-full-detail',
];

export type PropertySize = 1 | 2 | 3 | 4 | 5;
export type VehicleSize = 'small-car' | 'saloon' | 'suv' | 'van';
export type VehicleLevel = 'exterior' | 'interior' | 'full-detail';
export type Condition = 'light' | 'medium' | 'heavy';
export type Access = 'easy' | 'normal' | 'awkward';
export type HolidayLetVariant = 'standard' | 'deep-reset';

export interface QuoteInput {
  serviceType: ServiceType;
  propertySize?: PropertySize;
  bathrooms?: number;
  kitchens?: number;
  receptionRooms?: number;
  vehicleSize?: VehicleSize;
  condition: Condition;
  access: Access;
  wasteRemoval: boolean;
  parkingIssue: boolean;
  addOns: string[];
}

export interface QuoteResult {
  serviceType: ServiceType;
  estimatedHours: number;
  labourCost: number;
  materialsCost: number;
  wasteCost: number;
  parkingCost: number;
  addOnsTotal: number;
  subtotal: number;
  margin: number;
  finalPrice: number;
  durationRange: string;
  scopeSummary: string;
  selectedExtras: string[];
  // Booking flags
  isLargeJob?: boolean;
  isMultiDay?: boolean;
  isStaged?: boolean;
}

// =============== INTERNAL CONSTANTS ===============

const PROPERTY_BASE_HOURS: Record<string, Record<PropertySize, number>> = {
  'domestic-regular': { 1: 2.5, 2: 3.5, 3: 4.5, 4: 6, 5: 7.5 },
  'domestic-deep': { 1: 4, 2: 6, 3: 8, 4: 10, 5: 12 },
  'end-of-tenancy': { 1: 5, 2: 8, 3: 10, 4: 12, 5: 14 },
  'post-construction': { 1: 3, 2: 5, 3: 8, 4: 10, 5: 12 },
};

const VEHICLE_BASE_HOURS: Record<string, Record<VehicleSize, number>> = {
  'vehicle-exterior': { 'small-car': 1, 'saloon': 1, 'suv': 1.2, 'van': 1.5 },
  'vehicle-interior': { 'small-car': 1.5, 'saloon': 1.75, 'suv': 2, 'van': 2.5 },
  'vehicle-full-detail': { 'small-car': 3, 'saloon': 3.5, 'suv': 4, 'van': 5 },
};

const CONDITION_MULTIPLIERS: Record<Condition, number> = {
  light: 1.0,
  medium: 1.15,
  heavy: 1.3,
};

const ACCESS_MULTIPLIERS: Record<Access, number> = {
  easy: 1.0,
  normal: 1.05,
  awkward: 1.15,
};

const HOURLY_RATES: Record<ServiceType, number> = {
  'domestic-regular': 22,
  'domestic-deep': 25,
  'end-of-tenancy': 27,
  'post-construction': 28,
  'vehicle-exterior': 30,
  'vehicle-interior': 32,
  'vehicle-full-detail': 35,
};

const MARGINS: Record<ServiceType, number> = {
  'domestic-regular': 1.10,
  'domestic-deep': 1.15,
  'end-of-tenancy': 1.15,
  'post-construction': 1.20,
  'vehicle-exterior': 1.15,
  'vehicle-interior': 1.15,
  'vehicle-full-detail': 1.15,
};

// Add-on catalogues — service-specific
export interface AddOn { id: string; label: string; price: number }

export const DEEP_INTERIOR_ADDONS: AddOn[] = [
  { id: 'oven', label: 'Oven', price: 40 },
  { id: 'fridge', label: 'Fridge', price: 20 },
  { id: 'windows-inside', label: 'Inside windows', price: 30 },
  { id: 'cupboards', label: 'Cupboards', price: 25 },
  { id: 'carpet-clean', label: 'Carpet clean', price: 40 },
  { id: 'upholstery', label: 'Upholstery', price: 50 },
  { id: 'heavy-limescale', label: 'Heavy limescale', price: 30 },
];

export const DEEP_EXTERIOR_ADDONS: AddOn[] = [
  { id: 'pressure-wash-exterior', label: 'Pressure washing', price: 45 },
  { id: 'windows-outside', label: 'External windows', price: 30 },
];

export const HOLIDAY_LET_ADDONS: AddOn[] = [
  { id: 'linen-change', label: 'Linen change', price: 25 },
  { id: 'restocking', label: 'Restocking', price: 15 },
  { id: 'windows-inside', label: 'Inside windows', price: 30 },
  { id: 'fridge', label: 'Fridge clean', price: 20 },
];

export const POST_CONSTRUCTION_ADDONS: AddOn[] = [
  { id: 'paint-plaster', label: 'Paint / plaster removal', price: 50 },
  { id: 'sticker-removal', label: 'Window sticker removal', price: 30 },
  { id: 'heavy-dust', label: 'Heavy dust removal', price: 40 },
  { id: 'pressure-wash-exterior', label: 'External pressure wash', price: 45 },
];

export const VEHICLE_ADDONS: AddOn[] = [
  { id: 'pet-hair', label: 'Pet hair', price: 20 },
  { id: 'seat-shampoo', label: 'Seat shampoo', price: 30 },
  { id: 'stain-removal', label: 'Stain removal', price: 25 },
  { id: 'odour-treatment', label: 'Odour treatment', price: 15 },
  { id: 'engine-bay', label: 'Engine bay', price: 20 },
  { id: 'machine-polish', label: 'Machine polish', price: 50 },
  { id: 'ceramic-sealant', label: 'Ceramic / sealant', price: 60 },
];

// Backwards-compat alias used elsewhere
export const PROPERTY_ADDONS: AddOn[] = [
  ...DEEP_INTERIOR_ADDONS,
  ...DEEP_EXTERIOR_ADDONS,
];

export const SERVICE_LABELS: Record<ServiceType, string> = {
  'domestic-regular': 'Standard Turnover Clean',
  'domestic-deep': 'Deep Clean',
  'end-of-tenancy': 'End of Tenancy Clean',
  'post-construction': 'Post-Construction Clean',
  'vehicle-exterior': 'Exterior Valet',
  'vehicle-interior': 'Interior Valet',
  'vehicle-full-detail': 'Full Detail',
};

export const CUSTOMER_SERVICE_LABELS: Record<CustomerService, string> = {
  'deep-clean': 'Deep Clean',
  'end-of-tenancy': 'End of Tenancy',
  'holiday-let': 'Holiday Let / Airbnb',
  'post-construction': 'Post Construction',
  'vehicle': 'Vehicle Cleaning / Detailing',
};

const VEHICLE_LABELS: Record<VehicleSize, string> = {
  'small-car': 'Small car',
  'saloon': 'Saloon',
  'suv': 'SUV',
  'van': 'Van',
};

// =============== HELPERS ===============

function isVehicleService(s: ServiceType): boolean {
  return VEHICLE_SERVICES.includes(s);
}

function getAddonsCatalogue(s: ServiceType): AddOn[] {
  if (isVehicleService(s)) return VEHICLE_ADDONS;
  if (s === 'post-construction') return POST_CONSTRUCTION_ADDONS;
  // domestic-regular here means Holiday Let Standard Turnover
  if (s === 'domestic-regular') return HOLIDAY_LET_ADDONS;
  // deep / end-of-tenancy share the same catalogue
  return [...DEEP_INTERIOR_ADDONS, ...DEEP_EXTERIOR_ADDONS];
}

export function getAddonsForService(s: ServiceType): AddOn[] {
  return getAddonsCatalogue(s);
}

function calculateDurationRange(hours: number): { range: string; isStaged: boolean; isMultiDay: boolean } {
  if (hours <= 2) return { range: 'Approx. 1–2 hours', isStaged: false, isMultiDay: false };
  if (hours <= 4) return { range: 'Approx. 2–4 hours', isStaged: false, isMultiDay: false };
  if (hours <= 6) return { range: 'Approx. 4–6 hours', isStaged: false, isMultiDay: false };
  if (hours <= 8) return { range: 'Approx. 6–8 hours', isStaged: false, isMultiDay: false };
  if (hours <= 12) return { range: 'Full day', isStaged: true, isMultiDay: false };
  return { range: 'Multi-day clean', isStaged: true, isMultiDay: true };
}

function roundToNearest5(n: number): number {
  return Math.round(n / 5) * 5;
}

// Map a customer-facing vehicle level + variant to internal ServiceType
export function vehicleServiceType(level: VehicleLevel): ServiceType {
  if (level === 'exterior') return 'vehicle-exterior';
  if (level === 'interior') return 'vehicle-interior';
  return 'vehicle-full-detail';
}

// Map Holiday Let variant to internal ServiceType
export function holidayLetServiceType(variant: HolidayLetVariant): ServiceType {
  return variant === 'deep-reset' ? 'domestic-deep' : 'domestic-regular';
}

// =============== MAIN CALCULATION ===============

export function calculateQuote(input: QuoteInput): QuoteResult {
  const { serviceType, condition, access, wasteRemoval, parkingIssue, addOns } = input;

  // STEP 1 — Base hours
  let baseHours = 0;
  if (isVehicleService(serviceType)) {
    if (!input.vehicleSize) throw new Error('Vehicle size required');
    baseHours = VEHICLE_BASE_HOURS[serviceType][input.vehicleSize];
  } else {
    if (!input.propertySize) throw new Error('Property size required');
    baseHours = PROPERTY_BASE_HOURS[serviceType][input.propertySize];

    // Small uplifts for extra rooms beyond the implied baseline (1 bath, 1 kitchen).
    // These are intentionally modest so they don't override the bedroom-driven base.
    const extraBaths = Math.max(0, (input.bathrooms ?? 1) - 1);
    const extraKitchens = Math.max(0, (input.kitchens ?? 1) - 1);
    const extraReceptions = Math.max(0, input.receptionRooms ?? 0);
    baseHours += extraBaths * 0.5 + extraKitchens * 0.75 + extraReceptions * 0.25;
  }

  // STEP 2 — Adjusted hours
  const adjustedHours = baseHours * CONDITION_MULTIPLIERS[condition] * ACCESS_MULTIPLIERS[access];

  // STEP 3 & 4 — Hourly rate + labour cost
  const hourlyRate = HOURLY_RATES[serviceType];
  const labourCost = adjustedHours * hourlyRate;

  // STEP 5 — Materials
  const materialsCost = labourCost * 0.05;

  // STEP 6 — Waste
  const wasteCost = wasteRemoval ? 50 : 0;

  // STEP 7 — Parking
  const parkingCost = parkingIssue ? 10 : 0;

  // STEP 8 — Add-ons
  const catalogue = getAddonsCatalogue(serviceType);
  const selectedAddons = catalogue.filter((a) => addOns.includes(a.id));
  const addOnsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);

  // STEP 9 — Subtotal
  const subtotal = labourCost + materialsCost + wasteCost + addOnsTotal + parkingCost;

  // STEP 10 & 11 — Margin and final price
  const margin = MARGINS[serviceType];
  const finalPrice = roundToNearest5(subtotal * margin);

  // Duration
  const dur = calculateDurationRange(adjustedHours);

  // Scope summary
  const sizeLabel = isVehicleService(serviceType)
    ? VEHICLE_LABELS[input.vehicleSize as VehicleSize]
    : `${input.propertySize} bedroom${(input.propertySize ?? 0) > 1 ? 's' : ''}`;
  let scopeSummary = `${SERVICE_LABELS[serviceType]} — ${sizeLabel}`;
  if (selectedAddons.length > 0) {
    scopeSummary += ` with ${selectedAddons.length} add-on${selectedAddons.length > 1 ? 's' : ''}`;
  }
  scopeSummary += '.';

  // Booking flags
  const isLargeJob = finalPrice >= 300;

  return {
    serviceType,
    estimatedHours: Math.round(adjustedHours * 10) / 10,
    labourCost: Math.round(labourCost * 100) / 100,
    materialsCost: Math.round(materialsCost * 100) / 100,
    wasteCost,
    parkingCost,
    addOnsTotal,
    subtotal: Math.round(subtotal * 100) / 100,
    margin,
    finalPrice,
    durationRange: dur.range,
    scopeSummary,
    selectedExtras: selectedAddons.map((a) => a.label),
    isLargeJob,
    isStaged: dur.isStaged,
    isMultiDay: dur.isMultiDay,
  };
}

export function isPropertyService(s: ServiceType): boolean {
  return PROPERTY_SERVICES.includes(s);
}

export function isDomesticService(s: ServiceType): boolean {
  return s === 'domestic-regular' || s === 'domestic-deep' || s === 'end-of-tenancy';
}

// Backwards-compat alias for callers expecting `estimatedPrice`.
export function withLegacyFields<T extends QuoteResult>(r: T): T & { estimatedPrice: number } {
  return { ...r, estimatedPrice: r.finalPrice };
}
