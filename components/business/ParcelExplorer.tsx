"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Globe2, Filter, X, GitCompareArrows, Radio } from "lucide-react";
import { parcels as allParcels } from "@/lib/mock-data";
import { Parcel, Region, MineralType, OwnershipType } from "@/lib/types";
import { ParcelScoreTable } from "./ParcelScoreTable";
import { ParcelDetails } from "./ParcelDetails";
import { ParcelComparison } from "./ParcelComparison";
import { formatCurrency, formatNumber, classNames } from "@/lib/utils";

// Dynamically import the map (no SSR)
const ParcelMap = dynamic(() => import("./ParcelMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[560px] w-full rounded-md bg-background flex items-center justify-center border border-border">
      <div className="text-text-secondary text-sm">Loading map...</div>
    </div>
  ),
});

type RegionFilter = Region | "All";
type MineralFilter = MineralType | "All";
type OwnershipFilter = OwnershipType | "All";

const REGIONS: { id: RegionFilter; label: string; sub: string }[] = [
  { id: "All", label: "All Western Canada", sub: "Full inventory" },
  { id: "Saskatchewan", label: "Saskatchewan", sub: "Home market" },
  { id: "Alberta", label: "Alberta", sub: "Priority expansion" },
  { id: "Manitoba", label: "Manitoba", sub: "Secondary" },
];

const MINERALS: MineralFilter[] = ["All", "Oil", "Natural Gas", "Potash", "Helium", "Uranium"];
const OWNERSHIPS: OwnershipFilter[] = ["All", "Freehold", "Crown"];

export function ParcelExplorer() {
  const [region, setRegion] = useState<RegionFilter>("All");
  const [mineral, setMineral] = useState<MineralFilter>("All");
  const [ownership, setOwnership] = useState<OwnershipFilter>("All");
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);

  // Compare mode state
  const [compareMode, setCompareMode] = useState(false);
  const [compareSlots, setCompareSlots] = useState<[Parcel | null, Parcel | null]>([null, null]);

  // Apply filters
  const filtered = useMemo(() => {
    return allParcels.filter((p) => {
      if (region !== "All" && p.region !== region) return false;
      if (mineral !== "All" && p.mineralType !== mineral) return false;
      if (ownership !== "All" && p.ownershipType !== ownership) return false;
      return true;
    });
  }, [region, mineral, ownership]);

  const selectedParcel = filtered.find((p) => p.id === selectedParcelId) || null;

  // Stats for the filtered set
  const stats = useMemo(() => {
    const count = filtered.length;
    const avgScore = count > 0 ? Math.round(filtered.reduce((s, p) => s + p.score, 0) / count) : 0;
    const totalValue = filtered.reduce((s, p) => s + p.estimatedValue, 0);
    const highCount = filtered.filter((p) => p.score >= 80).length;
    return { count, avgScore, totalValue, highCount };
  }, [filtered]);

  const addToCompare = (parcel: Parcel) => {
    setCompareSlots(([a, b]) => {
      // If already in comparison, do nothing
      if (a?.id === parcel.id || b?.id === parcel.id) return [a, b];
      // Fill first empty slot; otherwise replace slot B
      if (!a) return [parcel, b];
      if (!b) return [a, parcel];
      return [a, parcel];
    });
  };

  const removeFromCompare = (slot: "A" | "B") => {
    setCompareSlots(([a, b]) => (slot === "A" ? [null, b] : [a, null]));
  };

  const exitCompare = () => {
    setCompareMode(false);
    setCompareSlots([null, null]);
  };

  const handleSelect = (parcel: Parcel) => {
    if (compareMode) {
      addToCompare(parcel);
    } else {
      setSelectedParcelId(parcel.id);
    }
  };

  const clearSelection = () => setSelectedParcelId(null);

  const clearFilters = () => {
    setRegion("All");
    setMineral("All");
    setOwnership("All");
  };

  const hasFilters = region !== "All" || mineral !== "All" || ownership !== "All";

  // Highlighted parcels on the map (either selection or compare slots)
  const mapHighlightIds = compareMode
    ? [compareSlots[0]?.id, compareSlots[1]?.id].filter(Boolean) as string[]
    : selectedParcelId
    ? [selectedParcelId]
    : [];

  const [slotA, slotB] = compareSlots;
  const bothSlotsFilled = Boolean(slotA && slotB);

  return (
    <div className="space-y-5">
      {/* Region selector — large, prominent */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-secondary font-semibold">
            <Globe2 className="w-3 h-3" />
            Territory
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--color-success)" }}>
              <Radio className="w-3 h-3" />
              Live
            </div>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-[11px] text-text-secondary hover:text-accent flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" />
                Clear filters
              </button>
            )}
            <button
              onClick={() => {
                if (compareMode) {
                  exitCompare();
                } else {
                  setCompareMode(true);
                  setSelectedParcelId(null);
                }
              }}
              className={classNames(
                "flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded border transition-colors",
                compareMode
                  ? "border-success bg-success/10 text-success"
                  : "border-border text-text-secondary hover:border-success hover:text-success"
              )}
            >
              <GitCompareArrows className="w-3 h-3" />
              {compareMode ? "Exit Compare" : "Compare Parcels"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {REGIONS.map((r) => {
            const isActive = region === r.id;
            return (
              <button
                key={r.id}
                onClick={() => {
                  setRegion(r.id);
                  setSelectedParcelId(null);
                }}
                className={classNames(
                  "text-left px-4 py-3 rounded-md border transition-all duration-200",
                  isActive
                    ? "border-accent bg-accent/8 shadow-warm"
                    : "border-border bg-background hover:border-secondary hover:bg-surface"
                )}
              >
                <div className="font-serif text-sm text-text-primary">{r.label}</div>
                <div className="text-[10px] uppercase tracking-wider text-text-secondary mt-0.5">
                  {r.sub}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Compare slot bar (only visible in compare mode) */}
      {compareMode && (
        <div className="rounded-md border border-success/40 bg-success/5 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold" style={{ color: "var(--color-success)" }}>
              <GitCompareArrows className="w-3 h-3" />
              Compare Mode Active
            </div>
            <div className="text-[10px] text-text-secondary uppercase tracking-wider">
              {bothSlotsFilled ? "Showing comparison →" : "Click 2 parcels on the map or table"}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2.5">
            <SlotPill slot="A" parcel={slotA} onRemove={() => removeFromCompare("A")} />
            <SlotPill slot="B" parcel={slotB} onRemove={() => removeFromCompare("B")} />
          </div>
        </div>
      )}

      {/* Filter chips row */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Mineral
          </span>
          <div className="flex items-center gap-1">
            {MINERALS.map((m) => (
              <button
                key={m}
                onClick={() => setMineral(m)}
                className={classNames(
                  "px-2.5 py-1 text-[11px] rounded-md border transition-all",
                  mineral === m
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-background text-text-secondary hover:border-secondary hover:text-text-primary"
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold">
            Ownership
          </span>
          <div className="flex items-center gap-1">
            {OWNERSHIPS.map((o) => (
              <button
                key={o}
                onClick={() => setOwnership(o)}
                className={classNames(
                  "px-2.5 py-1 text-[11px] rounded-md border transition-all",
                  ownership === o
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-background text-text-secondary hover:border-secondary hover:text-text-primary"
                )}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map + side panel */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <ParcelMap
            parcels={filtered}
            selectedParcelId={mapHighlightIds[0] || null}
            onSelectParcel={handleSelect}
            region={region}
          />

          {/* Stats footer below the map */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            <StatBlock label="Visible" value={formatNumber(stats.count)} sub="parcels" />
            <StatBlock
              label="Avg Score"
              value={`${stats.avgScore}`}
              sub="/ 100"
              color={
                stats.avgScore >= 80
                  ? "var(--color-success)"
                  : stats.avgScore >= 50
                  ? "var(--color-accent)"
                  : "var(--color-danger)"
              }
            />
            <StatBlock
              label="High Priority"
              value={formatNumber(stats.highCount)}
              sub={`of ${stats.count}`}
            />
            <StatBlock
              label="Total Value"
              value={formatCurrency(stats.totalValue, true)}
              sub="estimated"
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          {compareMode && slotA && slotB ? (
            <ParcelComparison
              parcelA={slotA}
              parcelB={slotB}
              onRemove={removeFromCompare}
              onExit={exitCompare}
            />
          ) : selectedParcel && !compareMode ? (
            <ParcelDetails
              parcel={selectedParcel}
              onBack={clearSelection}
              onCompare={(p) => {
                setCompareMode(true);
                setSelectedParcelId(null);
                setCompareSlots([p, null]);
              }}
            />
          ) : (
            <div>
              <div className="mb-3">
                <h3 className="font-serif text-lg text-text-primary">
                  {compareMode
                    ? bothSlotsFilled
                      ? "Comparison"
                      : "Select parcels to compare"
                    : region === "All"
                    ? "Top Parcels"
                    : `Top ${region} Parcels`}
                </h3>
                <p className="text-xs text-text-secondary">
                  {compareMode
                    ? "Click parcels from the table or map to fill the two comparison slots"
                    : "Click any parcel to view full details"}
                </p>
              </div>
              <ParcelScoreTable
                parcels={filtered}
                selectedParcelId={mapHighlightIds[0] || null}
                onSelectParcel={handleSelect}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBlock({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="px-3 py-2.5 bg-background rounded-md border border-border">
      <div className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold">
        {label}
      </div>
      <div className="flex items-baseline gap-1 mt-0.5">
        <span
          className="font-data text-lg font-semibold"
          style={{ color: color || "var(--color-text-primary)" }}
        >
          {value}
        </span>
        {sub && <span className="text-[10px] text-text-secondary">{sub}</span>}
      </div>
    </div>
  );
}

function SlotPill({
  slot,
  parcel,
  onRemove,
}: {
  slot: "A" | "B";
  parcel: Parcel | null;
  onRemove: () => void;
}) {
  if (!parcel) {
    return (
      <div className="rounded-md border border-dashed border-border bg-background/60 px-3 py-2 flex items-center justify-center">
        <span className="text-[11px] text-text-secondary uppercase tracking-wider">
          Parcel {slot} · empty slot
        </span>
      </div>
    );
  }
  return (
    <div
      className="rounded-md border px-3 py-2 flex items-center justify-between"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "rgba(22, 121, 77, 0.4)",
      }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="text-[10px] uppercase tracking-widest font-semibold px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: "rgba(22, 121, 77, 0.15)",
            color: "var(--color-success)",
          }}
        >
          {slot}
        </span>
        <div className="min-w-0">
          <div className="font-data text-xs font-semibold text-text-primary truncate">
            {parcel.id}
          </div>
          <div className="text-[10px] text-text-secondary truncate">
            {parcel.locationName} · {parcel.mineralType}
          </div>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="text-text-secondary hover:text-danger transition-colors flex-shrink-0"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
