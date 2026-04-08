"use client";

import { leads } from "@/lib/mock-data";
import { formatDate, formatNumber, classNames } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Phone, Mail, ArrowRight } from "lucide-react";

export function LeadScoreBoard() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-3 py-3 text-left text-[11px] uppercase tracking-wider font-semibold text-text-secondary w-12">#</th>
            <th className="px-3 py-3 text-left text-[11px] uppercase tracking-wider font-semibold text-text-secondary">Landowner</th>
            <th className="px-3 py-3 text-left text-[11px] uppercase tracking-wider font-semibold text-text-secondary">Location</th>
            <th className="px-3 py-3 text-right text-[11px] uppercase tracking-wider font-semibold text-text-secondary">Acres</th>
            <th className="px-3 py-3 text-left text-[11px] uppercase tracking-wider font-semibold text-text-secondary">Mineral</th>
            <th className="px-3 py-3 text-left text-[11px] uppercase tracking-wider font-semibold text-text-secondary w-48">Score</th>
            <th className="px-3 py-3 text-left text-[11px] uppercase tracking-wider font-semibold text-text-secondary">Stage</th>
            <th className="px-3 py-3 text-left text-[11px] uppercase tracking-wider font-semibold text-text-secondary">Last Contact</th>
            <th className="px-3 py-3 text-right text-[11px] uppercase tracking-wider font-semibold text-text-secondary">Action</th>
          </tr>
        </thead>
        <tbody className="data-table">
          {leads.map((lead, idx) => {
            const isTop3 = idx < 3;
            return (
              <tr
                key={lead.id}
                className={classNames(
                  "border-b border-border/50 transition-colors hover:bg-background",
                  isTop3 && "border-l-2"
                )}
                style={isTop3 ? { borderLeftColor: "var(--color-accent)" } : undefined}
              >
                <td className="px-3 py-3 font-data text-xs text-text-secondary">
                  {String(idx + 1).padStart(2, "0")}
                </td>
                <td className="px-3 py-3">
                  <div className="text-sm text-text-primary font-medium">{lead.name}</div>
                  {lead.successionPlan === false && (
                    <div className="text-[10px] text-warning mt-0.5">No succession plan</div>
                  )}
                </td>
                <td className="px-3 py-3 text-sm text-text-secondary">{lead.location}</td>
                <td className="px-3 py-3 text-right font-data text-sm text-text-primary">
                  {formatNumber(lead.parcelSize)}
                </td>
                <td className="px-3 py-3 text-sm text-text-secondary">{lead.mineralType}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${lead.score}%`,
                          backgroundColor:
                            lead.score >= 80
                              ? "var(--color-success)"
                              : lead.score >= 60
                              ? "var(--color-accent)"
                              : "var(--color-secondary)",
                        }}
                      />
                    </div>
                    <span className="font-data text-xs font-semibold text-text-primary w-8 text-right">
                      {lead.score}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <StatusBadge status={lead.stage} />
                </td>
                <td className="px-3 py-3 font-data text-xs text-text-secondary">
                  {formatDate(lead.lastContact)}
                </td>
                <td className="px-3 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      className="p-1.5 rounded hover:bg-accent/10 transition-colors"
                      title="Call"
                    >
                      <Phone className="w-3.5 h-3.5 text-text-secondary hover:text-accent" />
                    </button>
                    <button
                      className="p-1.5 rounded hover:bg-accent/10 transition-colors"
                      title="Email"
                    >
                      <Mail className="w-3.5 h-3.5 text-text-secondary hover:text-accent" />
                    </button>
                    <button
                      className="p-1.5 rounded hover:bg-accent/10 transition-colors"
                      title="View"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-text-secondary hover:text-accent" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
