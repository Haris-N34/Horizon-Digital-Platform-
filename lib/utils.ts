// Helper utility functions

export function formatCurrency(value: number, compact = false): string {
  if (compact && value >= 1_000_000) {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-CA").format(value);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function daysUntil(dateString: string): number {
  const target = new Date(dateString).getTime();
  const now = Date.now();
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

export function timeAgo(isoString: string): string {
  const t = new Date(isoString).getTime();
  const diffMs = Date.now() - t;
  const mins = Math.max(1, Math.round(diffMs / 60_000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
}

export function scoreColor(score: number): string {
  if (score >= 80) return "var(--color-success)";
  if (score >= 50) return "var(--color-warning)";
  return "var(--color-danger)";
}

export function scoreBgClass(score: number): string {
  if (score >= 80) return "bg-success/15 text-success";
  if (score >= 50) return "bg-warning/15 text-warning";
  return "bg-danger/15 text-danger";
}

export function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
