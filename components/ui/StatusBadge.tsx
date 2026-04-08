"use client";

import { classNames } from "@/lib/utils";

type StatusVariant = "success" | "warning" | "danger" | "info" | "neutral" | "accent";

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
}

const variantClasses: Record<StatusVariant, string> = {
  success: "bg-success/12 text-success border-success/20",
  warning: "bg-warning/12 text-warning border-warning/20",
  danger: "bg-danger/12 text-danger border-danger/20",
  info: "bg-blue-500/12 text-blue-700 border-blue-500/20",
  neutral: "bg-text-secondary/12 text-text-secondary border-text-secondary/20",
  accent: "bg-accent/15 text-accent border-accent/25",
};

// Helper to auto-detect variant from common status strings
function autoVariant(status: string): StatusVariant {
  const s = status.toLowerCase();
  if (s === "active" || s === "available" || s === "closed" || s === "success") return "success";
  if (s === "pending" || s === "expiring" || s === "paused" || s === "warning" || s === "negotiating") return "warning";
  if (s === "expired" || s === "failed" || s === "danger") return "danger";
  if (s === "bid submitted" || s === "due diligence") return "info";
  if (s === "completed" || s === "identified") return "neutral";
  if (s === "contacted") return "accent";
  return "neutral";
}

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const v = variant || autoVariant(status);
  return (
    <span
      className={classNames(
        "inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded border uppercase tracking-wider",
        variantClasses[v]
      )}
    >
      {status}
    </span>
  );
}
