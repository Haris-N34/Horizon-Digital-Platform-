"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { regionMetrics } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Lightbulb } from "lucide-react";

export function ExpansionMatrix() {
  // Normalize land cost to 1-10 scale for chart comparison
  const data = regionMetrics.map((r) => ({
    region: r.region,
    "Freehold Avail. (%)": r.freeholdAvailability,
    "Reg. Complexity": r.regulatoryComplexity * 10,
    "Competition": r.competitionIntensity * 10,
    "Growth Potential": r.growthPotential * 10,
  }));

  return (
    <div className="space-y-6">
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="region"
              tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }}
              axisLine={{ stroke: "var(--color-border)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
              axisLine={{ stroke: "var(--color-border)" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-background)",
                border: "1px solid var(--color-border)",
                borderRadius: "6px",
                fontSize: "12px",
              }}
              cursor={{ fill: "rgba(224, 123, 42, 0.08)" }}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
              iconType="square"
            />
            <Bar dataKey="Freehold Avail. (%)" fill="#16794D" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Reg. Complexity" fill="#B91C1C" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Competition" fill="#CA8A04" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Growth Potential" fill="#E07B2A" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Land cost comparison strip */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
        {regionMetrics.map((r) => (
          <div key={r.region} className="px-4 py-3 bg-background rounded-md border border-border">
            <div className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold">
              {r.region}
            </div>
            <div className="font-data text-lg font-semibold text-text-primary mt-1">
              {formatCurrency(r.avgLandCost)}
            </div>
            <div className="text-[10px] text-text-secondary">avg / acre</div>
          </div>
        ))}
      </div>

      {/* Recommendation summary */}
      <div className="rounded-md p-4 border border-accent/30" style={{ backgroundColor: "rgba(224, 123, 42, 0.08)" }}>
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <Lightbulb className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold mb-1.5" style={{ color: "var(--color-accent)" }}>
              Strategic Recommendation
            </div>
            <p className="text-sm text-text-primary leading-relaxed">
              <strong>Alberta</strong> shows the highest growth potential (9/10) but carries elevated competition (8/10) and land costs (+43% vs SK). Recommend a <strong>phased entry</strong>: continue dominant positioning in Saskatchewan while running a 6-month Alberta pilot focused on the Edmonton corridor freehold pockets. Manitoba remains a long-term option due to lower competition and favorable regulatory environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
