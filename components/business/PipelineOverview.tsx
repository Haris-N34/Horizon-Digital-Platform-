"use client";

import { pipelineStages, recentActivity } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { ChevronRight, Activity } from "lucide-react";

export function PipelineOverview() {
  const totalValue = pipelineStages.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="space-y-6">
      {/* Pipeline stages */}
      <div className="grid grid-cols-5 gap-3">
        {pipelineStages.map((stage, i) => (
          <div key={stage.name} className="relative">
            <div
              className="rounded-md p-4 border-l-4 bg-background h-full transition-all duration-200 hover:shadow-warm cursor-pointer"
              style={{ borderLeftColor: stage.color }}
            >
              <div className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold mb-2">
                {String(i + 1).padStart(2, "0")} — {stage.name}
              </div>
              <div className="font-data text-3xl font-semibold text-text-primary">
                {stage.count}
              </div>
              <div className="font-data text-xs text-text-secondary mt-1">
                {formatCurrency(stage.value, true)}
              </div>
              <div className="mt-3 h-1 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    backgroundColor: stage.color,
                    width: `${(stage.count / pipelineStages[0].count) * 100}%`,
                  }}
                />
              </div>
            </div>
            {i < pipelineStages.length - 1 && (
              <ChevronRight className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary opacity-30 hidden lg:block" />
            )}
          </div>
        ))}
      </div>

      {/* Total value bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-background rounded-md border border-border">
        <div className="text-xs uppercase tracking-wider text-text-secondary font-semibold">
          Total Pipeline Value
        </div>
        <div className="font-data text-xl font-semibold text-text-primary">
          {formatCurrency(totalValue, true)}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-3.5 h-3.5 text-success" />
          <h3 className="text-xs uppercase tracking-wider text-text-secondary font-semibold">
            Recent Activity
          </h3>
        </div>
        <div className="space-y-2">
          {recentActivity.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-3 py-2 rounded hover:bg-background transition-colors text-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="text-text-primary">
                  Parcel <span className="font-data font-semibold">{item.parcelId}</span>{" "}
                  <span className="text-text-secondary">{item.action}</span>
                </span>
              </div>
              <span className="text-xs text-text-secondary font-data">{item.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
