"use client";

import {
  ArrowLeft,
  X,
  TrendingUp,
  Check,
  GitCompareArrows,
  Trophy,
  MapPin,
} from "lucide-react";
import { Parcel } from "@/lib/types";
import { formatCurrency, formatNumber, timeAgo, classNames } from "@/lib/utils";

interface ParcelComparisonProps {
  parcelA: Parcel;
  parcelB: Parcel;
  onRemove: (slot: "A" | "B") => void;
  onExit: () => void;
}

type Direction = "higher" | "lower" | "neutral";

interface ComparableMetric {
  key: string;
  label: string;
  section: "Score" | "Cost" | "Market" | "Owner" | "Land";
  direction: Direction; // which is "better"
  getA: (p: Parcel) => number;
  getB?: (p: Parcel) => number; // if omitted, uses getA
  format: (v: number) => string;
  weight?: number; // default 1
}

// Metric definitions — direction = which way is "good"
const METRICS: ComparableMetric[] = [
  {
    key: "score",
    label: "Acquisition Score",
    section: "Score",
    direction: "higher",
    getA: (p) => p.score,
    format: (v) => `${v} / 100`,
    weight: 2,
  },
  {
    key: "resourcePotential",
    label: "Resource Potential",
    section: "Score",
    direction: "higher",
    getA: (p) => p.resourcePotential,
    format: (v) => `${v} / 100`,
  },
  {
    key: "costPerAcre",
    label: "Cost / Acre",
    section: "Cost",
    direction: "lower",
    getA: (p) => p.acquisitionCostPerAcre,
    format: (v) => formatCurrency(v),
    weight: 2,
  },
  {
    key: "totalCost",
    label: "Total Acquisition",
    section: "Cost",
    direction: "lower",
    getA: (p) => p.acquisitionCostPerAcre * p.farmSize,
    format: (v) => formatCurrency(v, true),
  },
  {
    key: "estimatedValue",
    label: "Est. Market Value",
    section: "Cost",
    direction: "higher",
    getA: (p) => p.estimatedValue,
    format: (v) => formatCurrency(v),
  },
  {
    key: "regulatoryComplexity",
    label: "Regulatory Complexity",
    section: "Market",
    direction: "lower",
    getA: (p) => p.regulatoryComplexity,
    format: (v) => `${v} / 10`,
  },
  {
    key: "competitionIntensity",
    label: "Competition Intensity",
    section: "Market",
    direction: "lower",
    getA: (p) => p.competitionIntensity,
    format: (v) => `${v} / 10`,
  },
  {
    key: "growthPotential",
    label: "Growth Potential",
    section: "Market",
    direction: "higher",
    getA: (p) => p.growthPotential,
    format: (v) => `${v} / 10`,
    weight: 1.5,
  },
  {
    key: "accessQuality",
    label: "Access & Infrastructure",
    section: "Market",
    direction: "higher",
    getA: (p) => p.accessQuality,
    format: (v) => `${v} / 10`,
  },
  {
    key: "royaltyRate",
    label: "Royalty Rate",
    section: "Market",
    direction: "higher",
    getA: (p) => p.royaltyRate,
    format: (v) => `${v.toFixed(1)}%`,
  },
  {
    key: "farmSize",
    label: "Farm Size",
    section: "Land",
    direction: "higher",
    getA: (p) => p.farmSize,
    format: (v) => `${formatNumber(v)} ac`,
  },
  {
    key: "nearestWell",
    label: "Nearest Well",
    section: "Land",
    direction: "lower",
    getA: (p) => p.nearestWell,
    format: (v) => `${v.toFixed(1)} km`,
  },
  {
    key: "ownerAge",
    label: "Owner Age",
    section: "Owner",
    direction: "higher", // older owner → more likely to sell (freehold context)
    getA: (p) => p.ownerAge,
    format: (v) => (v > 0 ? `${v} yrs` : "—"),
  },
];

function evaluate(metric: ComparableMetric, a: Parcel, b: Parcel): {
  aValue: number;
  bValue: number;
  winner: "A" | "B" | "tie";
  delta: number; // positive magnitude
  deltaPct: number;
} {
  const getB = metric.getB || metric.getA;
  const aValue = metric.getA(a);
  const bValue = getB(b);

  // Skip owner age for Crown parcels (no meaningful comparison)
  if (metric.key === "ownerAge" && (a.ownerAge === 0 || b.ownerAge === 0)) {
    return { aValue, bValue, winner: "tie", delta: 0, deltaPct: 0 };
  }

  if (aValue === bValue) {
    return { aValue, bValue, winner: "tie", delta: 0, deltaPct: 0 };
  }

  let winner: "A" | "B";
  if (metric.direction === "higher") {
    winner = aValue > bValue ? "A" : "B";
  } else {
    winner = aValue < bValue ? "A" : "B";
  }

  const delta = Math.abs(aValue - bValue);
  const base = Math.max(Math.abs(aValue), Math.abs(bValue)) || 1;
  const deltaPct = (delta / base) * 100;

  return { aValue, bValue, winner, delta, deltaPct };
}

export function ParcelComparison({
  parcelA,
  parcelB,
  onRemove,
  onExit,
}: ParcelComparisonProps) {
  // Compute scores across all metrics
  let aWins = 0;
  let bWins = 0;
  const results = METRICS.map((m) => {
    const r = evaluate(m, parcelA, parcelB);
    const w = m.weight ?? 1;
    if (r.winner === "A") aWins += w;
    if (r.winner === "B") bWins += w;
    return { metric: m, ...r };
  });

  // Collect standout advantages for each parcel (top 3 biggest swings)
  const standouts = [...results]
    .filter((r) => r.winner !== "tie" && r.deltaPct >= 5)
    .sort((a, b) => b.deltaPct - a.deltaPct);

  const parcelAdvantages = (slot: "A" | "B") =>
    standouts
      .filter((r) => r.winner === slot)
      .slice(0, 3)
      .map((r) => r.metric.label);

  const parcelWeaknesses = (slot: "A" | "B") =>
    standouts
      .filter((r) => r.winner !== slot)
      .slice(0, 3)
      .map((r) => r.metric.label);

  const recommendation: "A" | "B" | "tie" =
    aWins > bWins + 1 ? "A" : bWins > aWins + 1 ? "B" : "tie";

  // Group results by section
  const sections: Record<string, typeof results> = {};
  results.forEach((r) => {
    if (!sections[r.metric.section]) sections[r.metric.section] = [];
    sections[r.metric.section].push(r);
  });

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Exit comparison
        </button>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold" style={{ color: "var(--color-success)" }}>
          <GitCompareArrows className="w-3 h-3" />
          Side-by-side
        </div>
      </div>

      {/* Parcel header cards */}
      <div className="grid grid-cols-2 gap-2">
        <ParcelHead parcel={parcelA} slot="A" onRemove={() => onRemove("A")} isWinner={recommendation === "A"} />
        <ParcelHead parcel={parcelB} slot="B" onRemove={() => onRemove("B")} isWinner={recommendation === "B"} />
      </div>

      {/* Verdict bar */}
      <div
        className="rounded-md p-3 border"
        style={{
          backgroundColor:
            recommendation === "tie"
              ? "rgba(202, 138, 4, 0.08)"
              : "rgba(22, 121, 77, 0.08)",
          borderColor:
            recommendation === "tie"
              ? "rgba(202, 138, 4, 0.35)"
              : "rgba(22, 121, 77, 0.35)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy
              className="w-4 h-4"
              style={{
                color:
                  recommendation === "tie"
                    ? "var(--color-warning)"
                    : "var(--color-success)",
              }}
            />
            <div>
              <div
                className="text-[10px] uppercase tracking-widest font-semibold"
                style={{
                  color:
                    recommendation === "tie"
                      ? "var(--color-warning)"
                      : "var(--color-success)",
                }}
              >
                Recommendation
              </div>
              <div className="text-sm text-text-primary mt-0.5">
                {recommendation === "tie"
                  ? "Too close to call — parcels are comparable"
                  : `${recommendation === "A" ? parcelA.id : parcelB.id} is the stronger acquisition`}
              </div>
            </div>
          </div>
          <div className="font-data text-xs text-text-secondary">
            <span style={{ color: aWins >= bWins ? "var(--color-success)" : undefined }}>
              {aWins.toFixed(1)}
            </span>
            {" : "}
            <span style={{ color: bWins >= aWins ? "var(--color-success)" : undefined }}>
              {bWins.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Good vs Bad callouts */}
      <div className="grid grid-cols-2 gap-2">
        <ProConBlock
          title={`${parcelA.id} — strengths`}
          items={parcelAdvantages("A")}
          weakItems={parcelWeaknesses("A")}
        />
        <ProConBlock
          title={`${parcelB.id} — strengths`}
          items={parcelAdvantages("B")}
          weakItems={parcelWeaknesses("B")}
        />
      </div>

      {/* Metric rows grouped by section */}
      <div className="space-y-4 pt-2">
        {Object.entries(sections).map(([section, rows]) => (
          <div key={section}>
            <div className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-2">
              {section}
            </div>
            <div className="space-y-1">
              {rows.map(({ metric, aValue, bValue, winner, deltaPct }) => (
                <MetricRow
                  key={metric.key}
                  label={metric.label}
                  aLabel={metric.format(aValue)}
                  bLabel={metric.format(bValue)}
                  winner={winner}
                  deltaPct={deltaPct}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ParcelHead({
  parcel,
  slot,
  onRemove,
  isWinner,
}: {
  parcel: Parcel;
  slot: "A" | "B";
  onRemove: () => void;
  isWinner: boolean;
}) {
  return (
    <div
      className={classNames(
        "rounded-md p-3 border relative",
        isWinner ? "border-success" : "border-border"
      )}
      style={{
        backgroundColor: isWinner ? "rgba(22, 121, 77, 0.06)" : "var(--color-background)",
      }}
    >
      <div className="flex items-start justify-between mb-1">
        <div className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold">
          Parcel {slot}
        </div>
        <button
          onClick={onRemove}
          className="text-text-secondary hover:text-danger transition-colors"
          title="Remove from comparison"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      <div className="font-data text-base font-semibold text-text-primary leading-none">
        {parcel.id}
      </div>
      <div className="flex items-center gap-1 text-[10px] text-text-secondary mt-1">
        <MapPin className="w-2.5 h-2.5" />
        {parcel.locationName} · {parcel.region}
      </div>
      <div className="flex items-baseline gap-1 mt-2">
        <span className="font-data text-lg font-semibold" style={{ color: isWinner ? "var(--color-success)" : "var(--color-text-primary)" }}>
          {parcel.score}
        </span>
        <span className="text-[10px] text-text-secondary">/ 100 · {parcel.mineralType}</span>
      </div>
      <div className="text-[10px] text-text-secondary mt-0.5">
        {timeAgo(parcel.lastUpdated)}
      </div>
    </div>
  );
}

function ProConBlock({
  title,
  items,
  weakItems,
}: {
  title: string;
  items: string[];
  weakItems: string[];
}) {
  return (
    <div className="rounded-md border border-border bg-background p-3">
      <div className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-2">
        {title}
      </div>
      {items.length > 0 ? (
        <ul className="space-y-1 mb-2">
          {items.map((i) => (
            <li key={i} className="flex items-start gap-1.5 text-[11px] text-text-primary">
              <Check className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: "var(--color-success)" }} />
              {i}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-[11px] text-text-secondary italic mb-2">No clear advantages</div>
      )}
      {weakItems.length > 0 && (
        <ul className="space-y-1 pt-2 border-t border-border/50">
          {weakItems.map((i) => (
            <li key={i} className="flex items-start gap-1.5 text-[11px] text-text-secondary">
              <X className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: "var(--color-danger)" }} />
              {i}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MetricRow({
  label,
  aLabel,
  bLabel,
  winner,
  deltaPct,
}: {
  label: string;
  aLabel: string;
  bLabel: string;
  winner: "A" | "B" | "tie";
  deltaPct: number;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-xs py-1.5 border-b border-border/40 last:border-0">
      <div
        className={classNames(
          "text-right font-data",
          winner === "A" ? "font-semibold" : "text-text-secondary"
        )}
        style={winner === "A" ? { color: "var(--color-success)" } : undefined}
      >
        <div className="flex items-center justify-end gap-1">
          {winner === "A" && <TrendingUp className="w-3 h-3" />}
          {aLabel}
        </div>
      </div>
      <div className="text-[10px] uppercase tracking-wider text-text-secondary text-center px-1 min-w-[86px]">
        {label}
        {winner !== "tie" && deltaPct >= 5 && (
          <div className="font-data text-[9px] mt-0.5" style={{ color: "var(--color-success)" }}>
            Δ {deltaPct.toFixed(0)}%
          </div>
        )}
      </div>
      <div
        className={classNames(
          "text-left font-data",
          winner === "B" ? "font-semibold" : "text-text-secondary"
        )}
        style={winner === "B" ? { color: "var(--color-success)" } : undefined}
      >
        <div className="flex items-center gap-1">
          {bLabel}
          {winner === "B" && <TrendingUp className="w-3 h-3" />}
        </div>
      </div>
    </div>
  );
}
