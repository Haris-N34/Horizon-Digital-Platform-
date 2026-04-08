// Core type definitions for Brownstone Resources Dashboard

export type OwnershipType = "Freehold" | "Crown";
export type MineralType = "Oil" | "Natural Gas" | "Potash" | "Helium" | "Uranium";
export type Region = "Saskatchewan" | "Alberta" | "Manitoba";
export type DealStage = "Identified" | "Contacted" | "Negotiating" | "Due Diligence" | "Closed";
export type CampaignStatus = "Active" | "Paused" | "Completed";
export type DispositionStatus = "Available" | "Expiring" | "Bid Submitted";
export type LeadStage = "Identified" | "Contacted" | "Negotiating";
export type Priority = "high" | "medium" | "low";
export type LandType =
  | "Cropland"
  | "Grazing Pasture"
  | "Mixed Use"
  | "Dryland"
  | "Irrigated"
  | "Grassland";

export interface Parcel {
  id: string;
  region: Region;
  locationName: string; // nearest town for context
  lat: number;
  lng: number;
  township: string;
  range: string;
  mineralType: MineralType;
  ownershipType: OwnershipType;
  score: number; // 0-100
  estimatedValue: number;
  ownerAge: number;
  farmSize: number; // acres
  nearestWell: number; // km
  resourcePotential: number; // 0-100
  status: "active" | "pending" | "expired";
  ownerName: string;
  // Market intelligence (real-time)
  acquisitionCostPerAcre: number; // CAD per acre
  regulatoryComplexity: number; // 1–10 (higher = harder)
  competitionIntensity: number; // 1–10 (higher = more crowded)
  growthPotential: number; // 1–10 (higher = better)
  landType: LandType;
  royaltyRate: number; // percentage, e.g. 12.5
  accessQuality: number; // 1–10 (infrastructure, road access)
  lastUpdated: string; // ISO timestamp – "real-time" tick
}

export interface Deal {
  id: string;
  parcelId: string;
  stage: DealStage;
  value: number;
  lastActivity: string;
  assignedTo: string;
}

export interface Campaign {
  id: string;
  name: string;
  channel: string;
  status: CampaignStatus;
  startDate: string;
  budget: number;
  spent: number;
  leadsGenerated: number;
  cpa: number;
  roi: number;
}

export interface Lead {
  id: string;
  name: string;
  location: string;
  parcelSize: number;
  mineralType: MineralType;
  score: number;
  stage: LeadStage;
  lastContact: string;
  ownerAge: number;
  successionPlan: boolean;
}

export interface CrownDisposition {
  id: string;
  location: string;
  type: MineralType;
  status: DispositionStatus;
  expiryDate: string;
  estimatedValue: number;
}

export interface ChannelMetric {
  channel: string;
  leads: number;
  cpa: number;
  conversionRate: number;
  roi: number;
}

export interface FunnelStage {
  name: string;
  count: number;
  conversionRate?: number;
}

export interface AIRecommendation {
  id: string;
  text: string;
  priority: Priority;
  category: string;
}

export interface RegionMetric {
  region: string;
  freeholdAvailability: number;
  avgLandCost: number;
  regulatoryComplexity: number;
  competitionIntensity: number;
  growthPotential: number;
}

export interface PipelineStage {
  name: DealStage;
  count: number;
  value: number;
  color: string;
}

export interface ActivityItem {
  id: string;
  parcelId: string;
  action: string;
  timestamp: string;
}
