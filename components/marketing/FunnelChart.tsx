"use client";

import { funnelStages } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

// Color gradient: deep teal at top to vivid copper at bottom
const stageColors = ["#0F6584", "#2D7C8C", "#7A8B62", "#B86C30", "#E07B2A"];

export function FunnelChart() {
  const max = funnelStages[0].count;

  return (
    <div className="space-y-1">
      {funnelStages.map((stage, i) => {
        const widthPct = Math.max(15, (stage.count / max) * 100);
        const color = stageColors[i];
        return (
          <div key={stage.name} className="relative">
            <div className="flex items-center">
              {/* Stage label on the left */}
              <div className="w-32 flex-shrink-0 pr-4 text-right">
                <div className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold">
                  Stage {i + 1}
                </div>
                <div className="font-serif text-base text-text-primary">{stage.name}</div>
              </div>

              {/* Funnel segment */}
              <div className="flex-1 relative h-20 flex items-center justify-center">
                <div
                  className="h-full flex items-center justify-center transition-all duration-500 relative"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: color,
                    clipPath: i < funnelStages.length - 1
                      ? `polygon(0 0, 100% 0, ${100 - (10 / widthPct) * 100 / 2}% 100%, ${(10 / widthPct) * 100 / 2}% 100%)`
                      : "none",
                    borderRadius: i === 0 ? "8px 8px 0 0" : i === funnelStages.length - 1 ? "0 0 8px 8px" : "0",
                  }}
                >
                  <div className="text-center text-white">
                    <div className="font-data text-2xl font-semibold leading-none">
                      {formatNumber(stage.count)}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider opacity-80 mt-1">
                      {i === 0 ? "landowners reached" : i === 1 ? "engaged" : i === 2 ? "contacted" : i === 3 ? "in negotiation" : "deals closed"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion rate on the right */}
              <div className="w-32 flex-shrink-0 pl-4">
                {stage.conversionRate !== undefined ? (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold">
                      Conversion
                    </div>
                    <div className="font-data text-lg text-accent font-semibold">
                      {stage.conversionRate.toFixed(1)}%
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold">
                      Source
                    </div>
                    <div className="text-xs text-text-secondary">SEO, ads, community</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <div className="text-xs text-text-secondary">
          Overall funnel efficiency
        </div>
        <div>
          <span className="font-data text-2xl font-semibold text-text-primary">
            {((funnelStages[funnelStages.length - 1].count / funnelStages[0].count) * 100).toFixed(2)}%
          </span>
          <span className="text-xs text-text-secondary ml-2">
            {funnelStages[funnelStages.length - 1].count} closed / {formatNumber(funnelStages[0].count)} reached
          </span>
        </div>
      </div>
    </div>
  );
}
