import {
  Parcel,
  Deal,
  Campaign,
  Lead,
  CrownDisposition,
  ChannelMetric,
  FunnelStage,
  AIRecommendation,
  RegionMetric,
  PipelineStage,
  ActivityItem,
  LandType,
  Region,
  MineralType,
} from "./types";

// Raw parcel rows — enriched below with market-intel fields
type RawParcel = Omit<
  Parcel,
  | "acquisitionCostPerAcre"
  | "regulatoryComplexity"
  | "competitionIntensity"
  | "growthPotential"
  | "landType"
  | "royaltyRate"
  | "accessQuality"
  | "lastUpdated"
>;

// Western Canada parcel inventory — Saskatchewan, Alberta, Manitoba
const rawParcels: RawParcel[] = [
  // ===== SASKATCHEWAN =====
  { id: "SK-2847", region: "Saskatchewan", locationName: "Weyburn", lat: 49.6628, lng: -103.8511, township: "Twp 6", range: "R 13 W2", mineralType: "Oil", ownershipType: "Freehold", score: 92, estimatedValue: 487000, ownerAge: 68, farmSize: 640, nearestWell: 1.2, resourcePotential: 88, status: "active", ownerName: "Robert McKenzie" },
  { id: "SK-3104", region: "Saskatchewan", locationName: "Regina", lat: 50.4584, lng: -104.6189, township: "Twp 17", range: "R 19 W2", mineralType: "Oil", ownershipType: "Freehold", score: 87, estimatedValue: 412000, ownerAge: 71, farmSize: 480, nearestWell: 0.8, resourcePotential: 82, status: "active", ownerName: "Margaret Tessier" },
  { id: "SK-4812", region: "Saskatchewan", locationName: "Swift Current", lat: 50.2884, lng: -107.7944, township: "Twp 16", range: "R 13 W3", mineralType: "Oil", ownershipType: "Freehold", score: 84, estimatedValue: 375000, ownerAge: 65, farmSize: 720, nearestWell: 2.1, resourcePotential: 79, status: "active", ownerName: "John Mantyk" },
  { id: "SK-5621", region: "Saskatchewan", locationName: "Kindersley", lat: 51.4569, lng: -109.1681, township: "Twp 30", range: "R 23 W3", mineralType: "Potash", ownershipType: "Freehold", score: 89, estimatedValue: 542000, ownerAge: 73, farmSize: 960, nearestWell: 3.4, resourcePotential: 91, status: "active", ownerName: "David Olesen" },
  { id: "SK-6234", region: "Saskatchewan", locationName: "Estevan", lat: 49.2128, lng: -102.9884, township: "Twp 2", range: "R 6 W2", mineralType: "Oil", ownershipType: "Crown", score: 76, estimatedValue: 298000, ownerAge: 0, farmSize: 320, nearestWell: 1.6, resourcePotential: 74, status: "active", ownerName: "Crown Land" },
  { id: "SK-7102", region: "Saskatchewan", locationName: "Lloydminster SK", lat: 53.2734, lng: -109.8728, township: "Twp 50", range: "R 27 W3", mineralType: "Natural Gas", ownershipType: "Freehold", score: 81, estimatedValue: 358000, ownerAge: 67, farmSize: 560, nearestWell: 1.9, resourcePotential: 78, status: "active", ownerName: "Linda Beauchamp" },
  { id: "SK-7889", region: "Saskatchewan", locationName: "Maple Creek", lat: 50.0456, lng: -109.6764, township: "Twp 13", range: "R 28 W3", mineralType: "Helium", ownershipType: "Freehold", score: 94, estimatedValue: 612000, ownerAge: 69, farmSize: 800, nearestWell: 0.5, resourcePotential: 95, status: "active", ownerName: "Wesley Friesen" },
  { id: "SK-8341", region: "Saskatchewan", locationName: "Saskatoon", lat: 52.1417, lng: -106.6700, township: "Twp 36", range: "R 5 W3", mineralType: "Potash", ownershipType: "Crown", score: 72, estimatedValue: 285000, ownerAge: 0, farmSize: 480, nearestWell: 4.2, resourcePotential: 70, status: "active", ownerName: "Crown Land" },
  { id: "SK-1567", region: "Saskatchewan", locationName: "Moose Jaw", lat: 50.3934, lng: -105.5519, township: "Twp 21", range: "R 16 W2", mineralType: "Oil", ownershipType: "Freehold", score: 85, estimatedValue: 398000, ownerAge: 66, farmSize: 720, nearestWell: 1.4, resourcePotential: 81, status: "active", ownerName: "James MacDonald" },
  { id: "SK-2389", region: "Saskatchewan", locationName: "Eastend", lat: 49.5174, lng: -108.7964, township: "Twp 4", range: "R 13 W3", mineralType: "Uranium", ownershipType: "Crown", score: 91, estimatedValue: 567000, ownerAge: 0, farmSize: 1280, nearestWell: 5.6, resourcePotential: 90, status: "active", ownerName: "Crown Land" },
  { id: "SK-3478", region: "Saskatchewan", locationName: "North Battleford", lat: 52.7575, lng: -108.2861, township: "Twp 41", range: "R 18 W3", mineralType: "Potash", ownershipType: "Freehold", score: 79, estimatedValue: 342000, ownerAge: 64, farmSize: 560, nearestWell: 2.8, resourcePotential: 77, status: "active", ownerName: "Karen Petersen" },
  { id: "SK-4156", region: "Saskatchewan", locationName: "Shaunavon", lat: 49.6544, lng: -108.4144, township: "Twp 9", range: "R 22 W3", mineralType: "Helium", ownershipType: "Freehold", score: 88, estimatedValue: 478000, ownerAge: 72, farmSize: 800, nearestWell: 1.1, resourcePotential: 86, status: "active", ownerName: "Andrew Schmidt" },
  { id: "SK-5891", region: "Saskatchewan", locationName: "Weyburn N", lat: 49.9406, lng: -103.8678, township: "Twp 15", range: "R 13 W2", mineralType: "Oil", ownershipType: "Freehold", score: 82, estimatedValue: 367000, ownerAge: 68, farmSize: 480, nearestWell: 1.7, resourcePotential: 80, status: "active", ownerName: "Patricia Vermeulen" },
  { id: "SK-6712", region: "Saskatchewan", locationName: "Yorkton", lat: 51.2139, lng: -102.4628, township: "Twp 31", range: "R 4 W2", mineralType: "Natural Gas", ownershipType: "Crown", score: 71, estimatedValue: 268000, ownerAge: 0, farmSize: 320, nearestWell: 3.8, resourcePotential: 69, status: "active", ownerName: "Crown Land" },
  { id: "SK-7345", region: "Saskatchewan", locationName: "Carlyle", lat: 49.6339, lng: -102.2972, township: "Twp 1", range: "R 17 W2", mineralType: "Oil", ownershipType: "Freehold", score: 86, estimatedValue: 421000, ownerAge: 67, farmSize: 640, nearestWell: 1.3, resourcePotential: 83, status: "active", ownerName: "Michael Trottier" },
  { id: "SK-8923", region: "Saskatchewan", locationName: "Macklin", lat: 52.3267, lng: -109.9528, township: "Twp 38", range: "R 28 W3", mineralType: "Oil", ownershipType: "Freehold", score: 74, estimatedValue: 295000, ownerAge: 63, farmSize: 400, nearestWell: 2.5, resourcePotential: 72, status: "active", ownerName: "Lisa Henderson" },
  { id: "SK-9456", region: "Saskatchewan", locationName: "Maple Creek S", lat: 49.9128, lng: -109.4789, township: "Twp 13", range: "R 28 W3", mineralType: "Helium", ownershipType: "Freehold", score: 90, estimatedValue: 523000, ownerAge: 70, farmSize: 720, nearestWell: 0.9, resourcePotential: 89, status: "active", ownerName: "Gerald Wiebe" },
  { id: "SK-1879", region: "Saskatchewan", locationName: "Weyburn S", lat: 49.4492, lng: -103.9514, township: "Twp 6", range: "R 13 W2", mineralType: "Oil", ownershipType: "Freehold", score: 65, estimatedValue: 234000, ownerAge: 58, farmSize: 320, nearestWell: 4.5, resourcePotential: 62, status: "active", ownerName: "Donald Pyhtila" },
  { id: "SK-2456", region: "Saskatchewan", locationName: "Regina E", lat: 50.5456, lng: -104.4178, township: "Twp 17", range: "R 19 W2", mineralType: "Oil", ownershipType: "Crown", score: 45, estimatedValue: 156000, ownerAge: 0, farmSize: 320, nearestWell: 6.2, resourcePotential: 48, status: "expired", ownerName: "Crown Land" },
  { id: "SK-3567", region: "Saskatchewan", locationName: "Kindersley S", lat: 51.2837, lng: -109.0701, township: "Twp 30", range: "R 23 W3", mineralType: "Potash", ownershipType: "Freehold", score: 42, estimatedValue: 142000, ownerAge: 55, farmSize: 240, nearestWell: 5.8, resourcePotential: 44, status: "pending", ownerName: "Amanda Reimer" },
  { id: "SK-4678", region: "Saskatchewan", locationName: "Saskatoon SE", lat: 51.9989, lng: -106.5712, township: "Twp 36", range: "R 5 W3", mineralType: "Potash", ownershipType: "Freehold", score: 38, estimatedValue: 128000, ownerAge: 52, farmSize: 200, nearestWell: 7.1, resourcePotential: 41, status: "pending", ownerName: "Steven Krueger" },
  { id: "SK-5234", region: "Saskatchewan", locationName: "Esterhazy", lat: 50.6489, lng: -102.0834, township: "Twp 22", range: "R 33 W1", mineralType: "Potash", ownershipType: "Freehold", score: 80, estimatedValue: 372000, ownerAge: 71, farmSize: 640, nearestWell: 2.0, resourcePotential: 78, status: "active", ownerName: "Karl Schoenfeld" },
  { id: "SK-6891", region: "Saskatchewan", locationName: "Estevan W", lat: 49.1492, lng: -103.4514, township: "Twp 2", range: "R 9 W2", mineralType: "Oil", ownershipType: "Freehold", score: 87, estimatedValue: 445000, ownerAge: 69, farmSize: 720, nearestWell: 0.7, resourcePotential: 85, status: "active", ownerName: "Frank Hartwig" },

  // ===== ALBERTA =====
  { id: "AB-1234", region: "Alberta", locationName: "Edmonton SE", lat: 53.5461, lng: -113.4938, township: "Twp 53", range: "R 24 W4", mineralType: "Oil", ownershipType: "Freehold", score: 83, estimatedValue: 389000, ownerAge: 66, farmSize: 560, nearestWell: 1.8, resourcePotential: 81, status: "active", ownerName: "Brian Lapointe" },
  { id: "AB-2345", region: "Alberta", locationName: "Calgary NE", lat: 51.0447, lng: -114.0719, township: "Twp 24", range: "R 1 W5", mineralType: "Natural Gas", ownershipType: "Freehold", score: 77, estimatedValue: 318000, ownerAge: 65, farmSize: 480, nearestWell: 2.4, resourcePotential: 75, status: "active", ownerName: "Catherine Bouchard" },
  { id: "AB-3456", region: "Alberta", locationName: "Red Deer", lat: 52.2681, lng: -113.8112, township: "Twp 38", range: "R 27 W4", mineralType: "Oil", ownershipType: "Freehold", score: 86, estimatedValue: 432000, ownerAge: 69, farmSize: 640, nearestWell: 1.1, resourcePotential: 84, status: "active", ownerName: "William Beauchemin" },
  { id: "AB-4567", region: "Alberta", locationName: "Medicine Hat", lat: 50.0395, lng: -110.6764, township: "Twp 12", range: "R 6 W4", mineralType: "Helium", ownershipType: "Freehold", score: 93, estimatedValue: 598000, ownerAge: 71, farmSize: 800, nearestWell: 0.6, resourcePotential: 92, status: "active", ownerName: "Edgar Nielsen" },
  { id: "AB-5678", region: "Alberta", locationName: "Drayton Valley", lat: 53.2167, lng: -114.9833, township: "Twp 49", range: "R 7 W5", mineralType: "Natural Gas", ownershipType: "Freehold", score: 81, estimatedValue: 365000, ownerAge: 67, farmSize: 560, nearestWell: 1.6, resourcePotential: 79, status: "active", ownerName: "Hugh Kowalski" },
  { id: "AB-6789", region: "Alberta", locationName: "Lethbridge", lat: 49.6956, lng: -112.8451, township: "Twp 9", range: "R 21 W4", mineralType: "Natural Gas", ownershipType: "Freehold", score: 79, estimatedValue: 348000, ownerAge: 68, farmSize: 640, nearestWell: 2.2, resourcePotential: 77, status: "active", ownerName: "Marie Lavigne" },
  { id: "AB-7890", region: "Alberta", locationName: "Grande Prairie", lat: 55.1700, lng: -118.7948, township: "Twp 71", range: "R 5 W6", mineralType: "Oil", ownershipType: "Crown", score: 75, estimatedValue: 312000, ownerAge: 0, farmSize: 960, nearestWell: 3.1, resourcePotential: 78, status: "active", ownerName: "Crown Land" },
  { id: "AB-8901", region: "Alberta", locationName: "Lloydminster AB", lat: 53.2785, lng: -110.0028, township: "Twp 50", range: "R 1 W4", mineralType: "Oil", ownershipType: "Freehold", score: 88, estimatedValue: 467000, ownerAge: 70, farmSize: 720, nearestWell: 1.0, resourcePotential: 86, status: "active", ownerName: "Russell Hagen" },
  { id: "AB-9012", region: "Alberta", locationName: "Brooks", lat: 50.5644, lng: -111.8989, township: "Twp 18", range: "R 14 W4", mineralType: "Oil", ownershipType: "Freehold", score: 84, estimatedValue: 401000, ownerAge: 67, farmSize: 600, nearestWell: 1.5, resourcePotential: 82, status: "active", ownerName: "Vincent Kowalchuk" },
  { id: "AB-1023", region: "Alberta", locationName: "Wainwright", lat: 52.8389, lng: -110.8472, township: "Twp 45", range: "R 6 W4", mineralType: "Oil", ownershipType: "Freehold", score: 82, estimatedValue: 378000, ownerAge: 66, farmSize: 560, nearestWell: 1.8, resourcePotential: 80, status: "active", ownerName: "Thomas Reynolds" },

  // ===== MANITOBA =====
  { id: "MB-1001", region: "Manitoba", locationName: "Brandon", lat: 49.8488, lng: -99.9501, township: "Twp 10", range: "R 19 W1", mineralType: "Oil", ownershipType: "Freehold", score: 78, estimatedValue: 322000, ownerAge: 67, farmSize: 480, nearestWell: 2.3, resourcePotential: 76, status: "active", ownerName: "Henrik Pedersen" },
  { id: "MB-1002", region: "Manitoba", locationName: "Virden", lat: 49.8499, lng: -100.9269, township: "Twp 10", range: "R 26 W1", mineralType: "Oil", ownershipType: "Freehold", score: 85, estimatedValue: 408000, ownerAge: 70, farmSize: 640, nearestWell: 1.2, resourcePotential: 83, status: "active", ownerName: "Wallace Sigurdsson" },
  { id: "MB-1003", region: "Manitoba", locationName: "Portage la Prairie", lat: 49.9728, lng: -98.2944, township: "Twp 12", range: "R 8 W1", mineralType: "Natural Gas", ownershipType: "Freehold", score: 73, estimatedValue: 278000, ownerAge: 64, farmSize: 400, nearestWell: 3.2, resourcePotential: 71, status: "active", ownerName: "Helen Magnusson" },
  { id: "MB-1004", region: "Manitoba", locationName: "Dauphin", lat: 51.1494, lng: -100.0548, township: "Twp 26", range: "R 19 W1", mineralType: "Potash", ownershipType: "Crown", score: 69, estimatedValue: 252000, ownerAge: 0, farmSize: 480, nearestWell: 4.5, resourcePotential: 68, status: "active", ownerName: "Crown Land" },
  { id: "MB-1005", region: "Manitoba", locationName: "Souris", lat: 49.6178, lng: -100.2547, township: "Twp 7", range: "R 22 W1", mineralType: "Oil", ownershipType: "Freehold", score: 81, estimatedValue: 356000, ownerAge: 69, farmSize: 560, nearestWell: 1.7, resourcePotential: 79, status: "active", ownerName: "Olaf Stefanson" },
  { id: "MB-1006", region: "Manitoba", locationName: "Pierson", lat: 49.1828, lng: -101.2547, township: "Twp 1", range: "R 28 W1", mineralType: "Oil", ownershipType: "Freehold", score: 87, estimatedValue: 442000, ownerAge: 71, farmSize: 720, nearestWell: 0.9, resourcePotential: 85, status: "active", ownerName: "Lawrence Friesen" },
  { id: "MB-1007", region: "Manitoba", locationName: "Melita", lat: 49.2683, lng: -100.9994, township: "Twp 2", range: "R 27 W1", mineralType: "Oil", ownershipType: "Freehold", score: 76, estimatedValue: 305000, ownerAge: 65, farmSize: 480, nearestWell: 2.5, resourcePotential: 74, status: "active", ownerName: "Thelma Kowalchuk" },
];

// Region baseline metrics (mirrors regionMetrics below, kept here for enrichment).
const REGION_BASELINE: Record<
  Region,
  { avgCost: number; reg: number; comp: number; growth: number }
> = {
  Saskatchewan: { avgCost: 1850, reg: 4, comp: 6, growth: 8 },
  Alberta: { avgCost: 2640, reg: 6, comp: 8, growth: 9 },
  Manitoba: { avgCost: 1420, reg: 3, comp: 4, growth: 6 },
};

// Deterministic hash for per-parcel variation (so data feels "real" but is stable)
function parcelHash(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

function deriveLandType(p: RawParcel, h: number): LandType {
  // Bias land type by mineral + region + a stable per-parcel wobble
  if (p.mineralType === "Potash" || p.mineralType === "Uranium") {
    return ["Cropland", "Mixed Use", "Dryland"][h % 3] as LandType;
  }
  if (p.mineralType === "Helium") {
    return ["Grazing Pasture", "Grassland", "Dryland"][h % 3] as LandType;
  }
  if (p.mineralType === "Oil") {
    return ["Cropland", "Grazing Pasture", "Mixed Use", "Dryland"][h % 4] as LandType;
  }
  return ["Mixed Use", "Irrigated", "Cropland"][h % 3] as LandType;
}

function deriveRoyaltyRate(p: RawParcel, h: number): number {
  // Freehold avg ~12.5%, Crown ~15-20% (higher provincial cut), mineral-weighted
  const base = p.ownershipType === "Crown" ? 17.5 : 12.5;
  const mineralAdj: Record<MineralType, number> = {
    Oil: 0,
    "Natural Gas": -0.5,
    Potash: 1.0,
    Helium: 2.0,
    Uranium: 2.5,
  };
  const wobble = ((h % 11) - 5) * 0.1; // -0.5 … +0.5
  return Math.round((base + mineralAdj[p.mineralType] + wobble) * 10) / 10;
}

function enrichParcel(p: RawParcel): Parcel {
  const base = REGION_BASELINE[p.region];
  const h = parcelHash(p.id);

  // Acquisition cost: region baseline ± score-driven premium ± wobble
  const scoreMultiplier = 0.82 + (p.score / 100) * 0.42; // ~0.82–1.24
  const sizeAdj = p.farmSize >= 800 ? -50 : p.farmSize <= 320 ? 60 : 0;
  const wobble = ((h % 17) - 8) * 6; // ±48
  const acquisitionCostPerAcre = Math.round(
    base.avgCost * scoreMultiplier + sizeAdj + wobble
  );

  // Regulatory complexity: Crown adds +2, remote (distant well) adds ~1
  const regulatoryComplexity = clamp(
    base.reg + (p.ownershipType === "Crown" ? 2 : 0) + (p.nearestWell > 4 ? 1 : 0),
    1,
    10
  );

  // Competition: higher in productive zones (high score / low well distance)
  const competitionIntensity = clamp(
    base.comp +
      (p.score >= 85 ? 1 : 0) +
      (p.nearestWell < 1.5 ? 1 : 0) -
      (p.mineralType === "Uranium" ? 2 : 0),
    1,
    10
  );

  // Growth potential: resource potential + regional tailwind
  const growthPotential = clamp(
    Math.round(base.growth * 0.55 + (p.resourcePotential / 100) * 4.5),
    1,
    10
  );

  // Access quality: closer well + larger parcels → better infra
  const accessQuality = clamp(
    Math.round(9 - p.nearestWell * 0.9 + (p.farmSize >= 640 ? 1 : 0)),
    1,
    10
  );

  // "Live" timestamp — minutes ago based on hash, gives real-time feel
  const minutesAgo = (h % 47) + 1;
  const lastUpdated = new Date(Date.now() - minutesAgo * 60_000).toISOString();

  return {
    ...p,
    acquisitionCostPerAcre,
    regulatoryComplexity,
    competitionIntensity,
    growthPotential,
    landType: deriveLandType(p, h),
    royaltyRate: deriveRoyaltyRate(p, h),
    accessQuality,
    lastUpdated,
  };
}

export const parcels: Parcel[] = rawParcels.map(enrichParcel);

// Region viewport configuration for the interactive map
export const REGION_VIEWS: Record<"All" | "Saskatchewan" | "Alberta" | "Manitoba", { center: [number, number]; zoom: number }> = {
  All: { center: [51.5, -106.0], zoom: 5 },
  Saskatchewan: { center: [52.0, -106.0], zoom: 6 },
  Alberta: { center: [52.5, -113.5], zoom: 6 },
  Manitoba: { center: [50.0, -99.5], zoom: 6 },
};

export const deals: Deal[] = [
  { id: "D-001", parcelId: "SK-2847", stage: "Negotiating", value: 487000, lastActivity: "2026-04-05", assignedTo: "M. Chen" },
  { id: "D-002", parcelId: "SK-3104", stage: "Due Diligence", value: 412000, lastActivity: "2026-04-04", assignedTo: "S. Patel" },
  { id: "D-003", parcelId: "SK-4812", stage: "Contacted", value: 375000, lastActivity: "2026-04-03", assignedTo: "M. Chen" },
  { id: "D-004", parcelId: "SK-5621", stage: "Closed", value: 542000, lastActivity: "2026-04-02", assignedTo: "J. Williams" },
  { id: "D-005", parcelId: "SK-7889", stage: "Negotiating", value: 612000, lastActivity: "2026-04-01", assignedTo: "S. Patel" },
];

export const pipelineStages: PipelineStage[] = [
  { name: "Identified", count: 89, value: 28_400_000, color: "#7A7164" },
  { name: "Contacted", count: 34, value: 14_200_000, color: "#2D6B8C" },
  { name: "Negotiating", count: 12, value: 6_800_000, color: "#E07B2A" },
  { name: "Due Diligence", count: 5, value: 2_900_000, color: "#6B3E8C" },
  { name: "Closed", count: 3, value: 1_650_000, color: "#16794D" },
];

export const recentActivity: ActivityItem[] = [
  { id: "A-1", parcelId: "SK-2847", action: "moved to Negotiating", timestamp: "2 hours ago" },
  { id: "A-2", parcelId: "SK-7889", action: "received counter-offer", timestamp: "5 hours ago" },
  { id: "A-3", parcelId: "SK-5621", action: "deal closed — $542K", timestamp: "1 day ago" },
  { id: "A-4", parcelId: "SK-3104", action: "title search complete", timestamp: "1 day ago" },
  { id: "A-5", parcelId: "SK-4812", action: "owner returned call", timestamp: "2 days ago" },
];

export const regionMetrics: RegionMetric[] = [
  { region: "Saskatchewan", freeholdAvailability: 38, avgLandCost: 1850, regulatoryComplexity: 4, competitionIntensity: 6, growthPotential: 8 },
  { region: "Alberta", freeholdAvailability: 22, avgLandCost: 2640, regulatoryComplexity: 6, competitionIntensity: 8, growthPotential: 9 },
  { region: "Manitoba", freeholdAvailability: 31, avgLandCost: 1420, regulatoryComplexity: 3, competitionIntensity: 4, growthPotential: 6 },
];

export const crownDispositions: CrownDisposition[] = [
  { id: "CD-1024", location: "Weyburn SE", type: "Oil", status: "Available", expiryDate: "2026-05-15", estimatedValue: 285000 },
  { id: "CD-1056", location: "Estevan W", type: "Oil", status: "Expiring", expiryDate: "2026-04-22", estimatedValue: 342000 },
  { id: "CD-1078", location: "Kindersley N", type: "Natural Gas", status: "Available", expiryDate: "2026-06-30", estimatedValue: 198000 },
  { id: "CD-1092", location: "Lloydminster", type: "Oil", status: "Bid Submitted", expiryDate: "2026-04-18", estimatedValue: 467000 },
  { id: "CD-1115", location: "Swift Current", type: "Helium", status: "Available", expiryDate: "2026-07-12", estimatedValue: 612000 },
  { id: "CD-1132", location: "Moose Jaw S", type: "Potash", status: "Expiring", expiryDate: "2026-04-29", estimatedValue: 378000 },
  { id: "CD-1147", location: "Regina N", type: "Natural Gas", status: "Available", expiryDate: "2026-08-04", estimatedValue: 234000 },
  { id: "CD-1163", location: "Yorkton E", type: "Oil", status: "Bid Submitted", expiryDate: "2026-04-25", estimatedValue: 425000 },
  { id: "CD-1189", location: "Saskatoon W", type: "Potash", status: "Available", expiryDate: "2026-09-18", estimatedValue: 512000 },
  { id: "CD-1204", location: "Maple Creek", type: "Helium", status: "Expiring", expiryDate: "2026-05-02", estimatedValue: 398000 },
];

export const funnelStages: FunnelStage[] = [
  { name: "Awareness", count: 4200 },
  { name: "Interest", count: 890, conversionRate: 21.2 },
  { name: "Outreach", count: 312, conversionRate: 35.1 },
  { name: "Conversion", count: 26, conversionRate: 8.3 },
  { name: "Closed", count: 14, conversionRate: 53.8 },
];

export const channelMetrics: ChannelMetric[] = [
  { channel: "Partner Referrals", leads: 28, cpa: 450, conversionRate: 18, roi: 6.4 },
  { channel: "SEO/Website", leads: 12, cpa: 320, conversionRate: 22, roi: 5.8 },
  { channel: "Cold Calling 2.0", leads: 156, cpa: 890, conversionRate: 12, roi: 3.2 },
  { channel: "Direct Mail", leads: 67, cpa: 1240, conversionRate: 9, roi: 2.1 },
  { channel: "Facebook/Google Ads", leads: 45, cpa: 2100, conversionRate: 6, roi: 1.4 },
  { channel: "Community Events", leads: 4, cpa: 3200, conversionRate: 15, roi: 0.9 },
];

export const campaigns: Campaign[] = [
  { id: "C-001", name: "SK Freehold Q2 Cold Call Blitz", channel: "Cold Calling", status: "Active", startDate: "2026-03-15", budget: 4500, spent: 2840, leadsGenerated: 47, cpa: 60, roi: 4.2 },
  { id: "C-002", name: "Alberta Expansion Awareness", channel: "Facebook Ads", status: "Active", startDate: "2026-03-20", budget: 2800, spent: 1620, leadsGenerated: 18, cpa: 90, roi: 1.8 },
  { id: "C-003", name: "Mineral Rights SEO Content", channel: "SEO", status: "Active", startDate: "2026-01-10", budget: 1200, spent: 3600, leadsGenerated: 12, cpa: 300, roi: 5.8 },
  { id: "C-004", name: "Rural SK Direct Mail Wave 3", channel: "Direct Mail", status: "Completed", startDate: "2026-02-08", budget: 3200, spent: 3200, leadsGenerated: 24, cpa: 133, roi: 2.4 },
  { id: "C-005", name: "Estate Lawyer Partnership Program", channel: "Referrals", status: "Active", startDate: "2026-01-05", budget: 500, spent: 1500, leadsGenerated: 16, cpa: 94, roi: 6.4 },
  { id: "C-006", name: "Helium Belt Targeted Outreach", channel: "Cold Calling", status: "Active", startDate: "2026-03-28", budget: 2200, spent: 980, leadsGenerated: 19, cpa: 52, roi: 4.8 },
  { id: "C-007", name: "Q1 Winter Newsletter", channel: "Email", status: "Paused", startDate: "2026-01-22", budget: 800, spent: 480, leadsGenerated: 7, cpa: 69, roi: 2.1 },
];

export const leads: Lead[] = [
  { id: "L-001", name: "Wesley Friesen", location: "Swift Current", parcelSize: 800, mineralType: "Helium", score: 96, stage: "Negotiating", lastContact: "2026-04-05", ownerAge: 69, successionPlan: false },
  { id: "L-002", name: "Robert McKenzie", location: "Weyburn", parcelSize: 640, mineralType: "Oil", score: 94, stage: "Negotiating", lastContact: "2026-04-04", ownerAge: 68, successionPlan: false },
  { id: "L-003", name: "David Olesen", location: "Kindersley", parcelSize: 960, mineralType: "Potash", score: 91, stage: "Contacted", lastContact: "2026-04-03", ownerAge: 73, successionPlan: false },
  { id: "L-004", name: "Margaret Tessier", location: "Regina", parcelSize: 480, mineralType: "Oil", score: 89, stage: "Negotiating", lastContact: "2026-04-02", ownerAge: 71, successionPlan: false },
  { id: "L-005", name: "Gerald Wiebe", location: "Maple Creek", parcelSize: 720, mineralType: "Helium", score: 88, stage: "Contacted", lastContact: "2026-04-01", ownerAge: 70, successionPlan: false },
  { id: "L-006", name: "Andrew Schmidt", location: "Shaunavon", parcelSize: 800, mineralType: "Helium", score: 86, stage: "Identified", lastContact: "2026-03-28", ownerAge: 72, successionPlan: false },
  { id: "L-007", name: "John Mantyk", location: "Swift Current", parcelSize: 720, mineralType: "Oil", score: 85, stage: "Contacted", lastContact: "2026-04-06", ownerAge: 65, successionPlan: false },
  { id: "L-008", name: "James MacDonald", location: "Moose Jaw", parcelSize: 720, mineralType: "Oil", score: 84, stage: "Identified", lastContact: "2026-03-25", ownerAge: 66, successionPlan: false },
  { id: "L-009", name: "Michael Trottier", location: "Estevan", parcelSize: 640, mineralType: "Oil", score: 83, stage: "Contacted", lastContact: "2026-03-30", ownerAge: 67, successionPlan: true },
  { id: "L-010", name: "Patricia Vermeulen", location: "Weyburn", parcelSize: 480, mineralType: "Oil", score: 80, stage: "Identified", lastContact: "2026-03-22", ownerAge: 68, successionPlan: false },
  { id: "L-011", name: "Karen Petersen", location: "North Battleford", parcelSize: 560, mineralType: "Potash", score: 78, stage: "Identified", lastContact: "2026-03-20", ownerAge: 64, successionPlan: false },
  { id: "L-012", name: "Linda Beauchamp", location: "Lloydminster", parcelSize: 560, mineralType: "Natural Gas", score: 77, stage: "Contacted", lastContact: "2026-03-29", ownerAge: 67, successionPlan: false },
  { id: "L-013", name: "Brian Lapointe", location: "Edmonton SE", parcelSize: 560, mineralType: "Oil", score: 75, stage: "Identified", lastContact: "2026-03-18", ownerAge: 66, successionPlan: false },
  { id: "L-014", name: "Lisa Henderson", location: "Lloydminster", parcelSize: 400, mineralType: "Oil", score: 72, stage: "Identified", lastContact: "2026-03-15", ownerAge: 63, successionPlan: true },
  { id: "L-015", name: "Thomas Reynolds", location: "Calgary NE", parcelSize: 640, mineralType: "Natural Gas", score: 70, stage: "Identified", lastContact: "2026-03-12", ownerAge: 70, successionPlan: false },
];

export const aiRecommendations: AIRecommendation[] = [
  { id: "AI-1", text: "Cold calling conversion dropped 3% — recommend refreshing the script with updated comparable data from Q1 closings.", priority: "high", category: "Performance" },
  { id: "AI-2", text: "12 Crown dispositions expiring in SE Saskatchewan within 60 days — flag for bid review immediately.", priority: "high", category: "Opportunity" },
  { id: "AI-3", text: "Facebook ad spend in Alberta underperforming — suggest reallocating $800/mo to partner referral program.", priority: "medium", category: "Budget" },
  { id: "AI-4", text: "Landowner John Mantyk (parcel SK-4812) visited the website 3x this week after receiving direct mail — escalate to phone call.", priority: "high", category: "Lead" },
];

// Top-line metrics for the business overview
export const businessMetrics = {
  totalParcels: { value: 847, trend: 12, label: "Total Parcels Tracked" },
  freeholdOpportunities: { value: 234, trend: 8, label: "Freehold Opportunities" },
  crownDispositions: { value: 156, trend: -3, label: "Crown Dispositions Available" },
  avgScore: { value: 72, trend: 5, label: "Avg Parcel Score" },
  pipelineValue: { value: 4_200_000, trend: 18, label: "Pipeline Value" },
};

export const marketingMetrics = {
  totalLeads: { value: 312, trend: 24, label: "Total Leads" },
  conversionRate: { value: 8.4, trend: 1.2, label: "Conversion Rate" },
  cpa: { value: 1847, trend: -12, label: "Cost Per Acquisition" },
  activeCampaigns: { value: 23, trend: 5, label: "Active Campaigns" },
  dealsFromMarketing: { value: 14, trend: 40, label: "Deals from Marketing (Q)" },
};
