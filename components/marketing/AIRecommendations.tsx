"use client";

import { aiRecommendations } from "@/lib/mock-data";
import { Sparkles, AlertCircle, TrendingUp, User } from "lucide-react";
import { classNames } from "@/lib/utils";

const categoryIcons: Record<string, React.ReactNode> = {
  Performance: <TrendingUp className="w-3.5 h-3.5" />,
  Opportunity: <AlertCircle className="w-3.5 h-3.5" />,
  Budget: <TrendingUp className="w-3.5 h-3.5" />,
  Lead: <User className="w-3.5 h-3.5" />,
};

const priorityColors = {
  high: "var(--color-danger)",
  medium: "var(--color-warning)",
  low: "var(--color-text-secondary)",
};

export function AIRecommendations() {
  return (
    <div
      className="rounded-md p-6"
      style={{
        border: "1.5px dashed var(--color-accent)",
        backgroundColor: "rgba(224, 123, 42, 0.05)",
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center"
            style={{ backgroundColor: "var(--color-success)" }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-serif text-xl text-text-primary leading-none">
              AI Insights — This Week
            </h2>
            <p className="text-[11px] text-text-secondary mt-1 uppercase tracking-wider">
              Auto-generated recommendations from operational data
            </p>
          </div>
        </div>
        <div className="text-[10px] uppercase tracking-widest text-text-secondary px-2 py-1 border border-border rounded">
          Updated 2h ago
        </div>
      </div>

      <div className="space-y-3">
        {aiRecommendations.map((rec) => (
          <div
            key={rec.id}
            className="flex items-start gap-3 p-3 rounded bg-background border border-border hover:border-accent/40 transition-colors group cursor-pointer"
          >
            <div
              className="mt-0.5 flex-shrink-0 w-7 h-7 rounded flex items-center justify-center"
              style={{
                backgroundColor: priorityColors[rec.priority] + "15",
                color: priorityColors[rec.priority],
              }}
            >
              {categoryIcons[rec.category] || <Sparkles className="w-3.5 h-3.5" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={classNames(
                    "text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded"
                  )}
                  style={{
                    backgroundColor: priorityColors[rec.priority] + "15",
                    color: priorityColors[rec.priority],
                  }}
                >
                  {rec.priority} priority
                </span>
                <span className="text-[10px] uppercase tracking-wider text-text-secondary">
                  {rec.category}
                </span>
              </div>
              <p className="text-sm text-text-primary leading-relaxed">{rec.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
