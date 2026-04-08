"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { classNames } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  trend?: number;
  trendLabel?: string;
  invertTrend?: boolean; // for metrics where down is good (e.g. CPA)
  icon?: React.ReactNode;
}

export function MetricCard({ label, value, trend, trendLabel, invertTrend = false, icon }: MetricCardProps) {
  const trendIsPositive = trend !== undefined && trend > 0;
  const trendIsNegative = trend !== undefined && trend < 0;
  const isGood = invertTrend ? trendIsNegative : trendIsPositive;
  const isBad = invertTrend ? trendIsPositive : trendIsNegative;

  return (
    <div className="card card-pad flex flex-col justify-between min-h-[140px]">
      <div className="flex items-start justify-between">
        <span className="text-xs uppercase tracking-wider text-text-secondary font-medium">
          {label}
        </span>
        {icon && <div className="text-success opacity-80">{icon}</div>}
      </div>
      <div className="mt-3">
        <div className="font-data text-3xl font-semibold text-text-primary tracking-tight">
          {value}
        </div>
        {trend !== undefined && (
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={classNames(
                "inline-flex items-center gap-0.5 text-xs font-medium font-data",
                isGood && "text-success",
                isBad && "text-danger",
                trend === 0 && "text-text-secondary"
              )}
            >
              {trend > 0 ? <TrendingUp className="w-3 h-3" /> : trend < 0 ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
              {trend > 0 ? "+" : ""}{trend}{trendLabel || "%"}
            </span>
            <span className="text-xs text-text-secondary">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}
