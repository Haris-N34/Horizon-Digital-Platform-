"use client";

import { ArrowRight } from "lucide-react";
import { Parcel } from "@/lib/types";
import { formatCurrency, classNames } from "@/lib/utils";

interface ParcelScoreTableProps {
  parcels: Parcel[];
  selectedParcelId: string | null;
  onSelectParcel: (parcel: Parcel) => void;
  limit?: number;
}

export function ParcelScoreTable({
  parcels,
  selectedParcelId,
  onSelectParcel,
  limit = 12,
}: ParcelScoreTableProps) {
  const top = [...parcels].sort((a, b) => b.score - a.score).slice(0, limit);

  if (top.length === 0) {
    return (
      <div className="text-center text-text-secondary text-sm py-8">
        No parcels match the current filters.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[10px] uppercase tracking-wider text-text-secondary font-semibold border-b border-border">
        <div className="col-span-1">#</div>
        <div className="col-span-3">Parcel</div>
        <div className="col-span-3">Type</div>
        <div className="col-span-2 text-right">Score</div>
        <div className="col-span-3 text-right">Value</div>
      </div>
      <div className="space-y-1 max-h-[440px] overflow-y-auto pr-1">
        {top.map((p, idx) => {
          const isSelected = p.id === selectedParcelId;
          return (
            <div
              key={p.id}
              onClick={() => onSelectParcel(p)}
              className={classNames(
                "grid grid-cols-12 gap-2 px-3 py-2.5 rounded transition-all cursor-pointer items-center group border",
                isSelected
                  ? "bg-accent/10 border-accent/30"
                  : "border-transparent hover:bg-background hover:border-border"
              )}
            >
              <div className="col-span-1 font-data text-xs text-text-secondary">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div className="col-span-3">
                <div className="font-data text-xs text-text-primary font-medium">{p.id}</div>
                <div className="text-[10px] text-text-secondary mt-0.5">{p.locationName}</div>
              </div>
              <div className="col-span-3">
                <div className="text-xs text-text-primary">{p.mineralType}</div>
                <div className="text-[10px] text-text-secondary mt-0.5">{p.ownershipType}</div>
              </div>
              <div className="col-span-2 text-right">
                <div
                  className="inline-block font-data text-xs font-semibold px-2 py-0.5 rounded"
                  style={{
                    backgroundColor:
                      p.score >= 80
                        ? "rgba(22, 121, 77, 0.15)"
                        : p.score >= 50
                        ? "rgba(202, 138, 4, 0.15)"
                        : "rgba(185, 28, 28, 0.15)",
                    color:
                      p.score >= 80
                        ? "var(--color-success)"
                        : p.score >= 50
                        ? "var(--color-warning)"
                        : "var(--color-danger)",
                  }}
                >
                  {p.score}
                </div>
              </div>
              <div className="col-span-3 text-right">
                <div className="font-data text-xs text-text-primary font-medium">
                  {formatCurrency(p.estimatedValue, true)}
                </div>
                <div
                  className={classNames(
                    "text-[10px] mt-0.5 flex items-center justify-end gap-0.5 transition-colors",
                    isSelected ? "text-accent" : "text-text-secondary group-hover:text-accent"
                  )}
                >
                  Details
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
