"use client";

import { channelMetrics } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export function ChannelPerformance() {
  // Sort by ROI desc
  const sorted = [...channelMetrics].sort((a, b) => b.roi - a.roi);
  const maxRoi = sorted[0].roi;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {sorted.map((c, i) => {
          const isBest = i === 0;
          return (
            <div key={c.channel} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      isBest ? "text-text-primary" : "text-text-primary"
                    }`}
                  >
                    {c.channel}
                  </span>
                  {isBest && (
                    <span
                      className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold"
                      style={{
                        backgroundColor: "rgba(224, 123, 42, 0.18)",
                        color: "var(--color-accent)",
                      }}
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      Top ROI
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-text-secondary font-data">
                  <span>{c.leads} leads</span>
                  <span>{formatCurrency(c.cpa)} CPA</span>
                  <span>{c.conversionRate}% conv.</span>
                  <span
                    className={`font-semibold ${isBest ? "text-accent" : "text-text-primary"}`}
                    style={isBest ? { color: "var(--color-accent)" } : undefined}
                  >
                    {c.roi.toFixed(1)}x ROI
                  </span>
                </div>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 group-hover:opacity-90"
                  style={{
                    width: `${(c.roi / maxRoi) * 100}%`,
                    backgroundColor: isBest ? "var(--color-accent)" : "var(--color-secondary)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-md p-4 border border-success/30" style={{ backgroundColor: "rgba(22, 121, 77, 0.08)" }}>
        <div className="flex items-start gap-2 text-sm" style={{ color: "var(--color-success)" }}>
          <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>
            <strong>Insight:</strong> Partner referrals (6.4x ROI) and SEO (5.8x ROI) significantly outperform paid channels — recommend reallocating $1,500/mo from Facebook/Google Ads into the Estate Lawyer Partnership Program.
          </p>
        </div>
      </div>
    </div>
  );
}
