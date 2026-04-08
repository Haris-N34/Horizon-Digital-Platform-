"use client";

import {
  ArrowLeft,
  MapPin,
  User,
  Layers,
  Ruler,
  DollarSign,
  Phone,
  Plus,
  Drill,
  Activity,
  Gavel,
  Users,
  TrendingUp,
  Leaf,
  Percent,
  Route,
  GitCompareArrows,
  Radio,
} from "lucide-react";
import { Parcel } from "@/lib/types";
import { formatCurrency, formatNumber, timeAgo } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface ParcelDetailsProps {
  parcel: Parcel;
  onBack: () => void;
  onCompare?: (p: Parcel) => void;
}

// Derive a synthetic score breakdown from the parcel attributes
function getScoreBreakdown(p: Parcel) {
  const proximityScore = Math.max(0, Math.min(100, Math.round(100 - p.nearestWell * 13)));
  const ownerScore =
    p.ownershipType === "Crown"
      ? 50
      : p.ownerAge >= 70
      ? 95
      : p.ownerAge >= 65
      ? 85
      : p.ownerAge >= 60
      ? 70
      : 50;
  const sizeScore = Math.min(100, Math.round((p.farmSize / 1000) * 100));
  return [
    { label: "Resource Potential", value: p.resourcePotential },
    { label: "Proximity to Wells", value: proximityScore },
    { label: "Owner Profile", value: ownerScore },
    { label: "Parcel Size", value: sizeScore },
  ];
}

function priorityLabel(score: number): { text: string; color: string } {
  if (score >= 80) return { text: "High Priority", color: "var(--color-success)" };
  if (score >= 50) return { text: "Medium Priority", color: "var(--color-warning)" };
  return { text: "Low Priority", color: "var(--color-danger)" };
}

// For 1-10 metrics: convert to a color based on direction (higher-better or lower-better)
function metricColor(value: number, higherIsBetter: boolean): string {
  const normalized = higherIsBetter ? value : 11 - value;
  if (normalized >= 8) return "var(--color-success)";
  if (normalized >= 5) return "var(--color-accent)";
  return "var(--color-danger)";
}

function metricLabel(value: number, higherIsBetter: boolean): string {
  const normalized = higherIsBetter ? value : 11 - value;
  if (normalized >= 8) return "Favorable";
  if (normalized >= 5) return "Moderate";
  return "Unfavorable";
}

export function ParcelDetails({ parcel, onBack, onCompare }: ParcelDetailsProps) {
  const breakdown = getScoreBreakdown(parcel);
  const priority = priorityLabel(parcel.score);
  const totalAcquisition = parcel.acquisitionCostPerAcre * parcel.farmSize;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header w/ back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to top parcels
        </button>
        {onCompare && (
          <button
            onClick={() => onCompare(parcel)}
            className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded border border-border text-text-secondary hover:border-success hover:text-success transition-colors"
          >
            <GitCompareArrows className="w-3 h-3" />
            Add to compare
          </button>
        )}
      </div>

      {/* Title block */}
      <div className="pb-4 border-b border-border">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="font-data text-2xl font-semibold text-text-primary leading-none">
              {parcel.id}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-1.5">
              <MapPin className="w-3 h-3" />
              {parcel.locationName} · {parcel.region}
            </div>
            <div className="text-[11px] text-text-secondary font-data mt-0.5">
              {parcel.township} / {parcel.range}
            </div>
          </div>
          <StatusBadge status={parcel.status} />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-data text-4xl font-semibold text-text-primary">
              {parcel.score}
            </span>
            <span className="text-xs text-text-secondary">/ 100</span>
          </div>
          <span
            className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded"
            style={{
              backgroundColor: priority.color + "15",
              color: priority.color,
            }}
          >
            {priority.text}
          </span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${parcel.score}%`,
              backgroundColor: priority.color,
            }}
          />
        </div>

        {/* Live tick */}
        <div className="flex items-center gap-1.5 mt-3 text-[10px] text-text-secondary uppercase tracking-wider">
          <Radio className="w-3 h-3" style={{ color: "var(--color-success)" }} />
          <span>Live data</span>
          <span className="opacity-50">· updated {timeAgo(parcel.lastUpdated)}</span>
        </div>
      </div>

      {/* Market Intelligence — the new block */}
      <div>
        <div className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-3 flex items-center gap-1.5">
          <Activity className="w-3 h-3" style={{ color: "var(--color-success)" }} />
          Market Intelligence
        </div>

        {/* Cost tile */}
        <div
          className="rounded-md p-3 border mb-3"
          style={{
            backgroundColor: "rgba(22, 121, 77, 0.06)",
            borderColor: "rgba(22, 121, 77, 0.28)",
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--color-success)" }}>
              <DollarSign className="w-3 h-3" />
              Acquisition Cost
            </div>
            <span className="font-data text-[11px] text-text-secondary">
              {formatNumber(parcel.farmSize)} ac
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="font-data text-xl font-semibold text-text-primary">
              {formatCurrency(parcel.acquisitionCostPerAcre)}
              <span className="text-xs font-normal text-text-secondary"> / acre</span>
            </div>
            <div className="font-data text-sm text-text-secondary">
              ≈ {formatCurrency(totalAcquisition, true)} total
            </div>
          </div>
        </div>

        {/* Metric bars */}
        <div className="space-y-2.5">
          <MetricBar
            icon={<Gavel className="w-3 h-3" />}
            label="Regulatory Complexity"
            value={parcel.regulatoryComplexity}
            higherIsBetter={false}
          />
          <MetricBar
            icon={<Users className="w-3 h-3" />}
            label="Competition Intensity"
            value={parcel.competitionIntensity}
            higherIsBetter={false}
          />
          <MetricBar
            icon={<TrendingUp className="w-3 h-3" />}
            label="Growth Potential"
            value={parcel.growthPotential}
            higherIsBetter={true}
          />
          <MetricBar
            icon={<Route className="w-3 h-3" />}
            label="Access & Infrastructure"
            value={parcel.accessQuality}
            higherIsBetter={true}
          />
        </div>

        {/* Sub-tiles: land type + royalty */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="rounded-md border border-border bg-background px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-text-secondary font-semibold">
              <Leaf className="w-3 h-3" style={{ color: "var(--color-success)" }} />
              Land Type
            </div>
            <div className="font-data text-sm text-text-primary font-semibold mt-1">
              {parcel.landType}
            </div>
          </div>
          <div className="rounded-md border border-border bg-background px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-text-secondary font-semibold">
              <Percent className="w-3 h-3" style={{ color: "var(--color-success)" }} />
              Royalty Rate
            </div>
            <div className="font-data text-sm text-text-primary font-semibold mt-1">
              {parcel.royaltyRate.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="pt-4 border-t border-border">
        <div className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-3">
          Score Breakdown
        </div>
        <div className="space-y-2.5">
          {breakdown.map((row) => (
            <div key={row.label}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-text-primary">{row.label}</span>
                <span className="font-data font-semibold text-text-primary">{row.value}</span>
              </div>
              <div className="h-1 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${row.value}%`,
                    backgroundColor:
                      row.value >= 80
                        ? "var(--color-success)"
                        : row.value >= 50
                        ? "var(--color-accent)"
                        : "var(--color-secondary)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Property details */}
      <div className="pt-4 border-t border-border">
        <div className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-3">
          Property Details
        </div>
        <div className="space-y-2 text-xs">
          <DetailRow
            icon={<User className="w-3 h-3" />}
            label="Owner"
            value={parcel.ownerName}
          />
          {parcel.ownershipType === "Freehold" && parcel.ownerAge > 0 && (
            <DetailRow
              icon={<User className="w-3 h-3" />}
              label="Owner Age"
              value={`${parcel.ownerAge} yrs`}
            />
          )}
          <DetailRow
            icon={<Layers className="w-3 h-3" />}
            label="Mineral Type"
            value={parcel.mineralType}
          />
          <DetailRow
            icon={<Layers className="w-3 h-3" />}
            label="Ownership"
            value={parcel.ownershipType}
          />
          <DetailRow
            icon={<Ruler className="w-3 h-3" />}
            label="Farm Size"
            value={`${formatNumber(parcel.farmSize)} acres`}
          />
          <DetailRow
            icon={<Drill className="w-3 h-3" />}
            label="Nearest Well"
            value={`${parcel.nearestWell} km`}
          />
        </div>
      </div>

      {/* Estimated value */}
      <div
        className="rounded-md p-4 border"
        style={{
          backgroundColor: "rgba(224, 123, 42, 0.08)",
          borderColor: "rgba(224, 123, 42, 0.35)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold" style={{ color: "var(--color-accent)" }}>
            <DollarSign className="w-3 h-3" />
            Estimated Market Value
          </div>
          <div className="font-data text-xl font-semibold text-text-primary">
            {formatCurrency(parcel.estimatedValue)}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <button className="btn-primary justify-center text-xs">
          <Plus className="w-3.5 h-3.5" />
          Add to Pipeline
        </button>
        <button className="btn-secondary justify-center text-xs">
          <Phone className="w-3.5 h-3.5" />
          {parcel.ownershipType === "Crown" ? "Submit Bid" : "Contact Owner"}
        </button>
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-background transition-colors">
      <div className="flex items-center gap-2 text-text-secondary">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-text-primary font-medium">{value}</span>
    </div>
  );
}

function MetricBar({
  icon,
  label,
  value,
  higherIsBetter,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  higherIsBetter: boolean;
}) {
  const color = metricColor(value, higherIsBetter);
  const tag = metricLabel(value, higherIsBetter);
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <div className="flex items-center gap-1.5 text-text-primary">
          <span style={{ color }}>{icon}</span>
          {label}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider" style={{ color }}>
            {tag}
          </span>
          <span className="font-data font-semibold text-text-primary w-7 text-right">
            {value}/10
          </span>
        </div>
      </div>
      <div className="h-1 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value * 10}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
