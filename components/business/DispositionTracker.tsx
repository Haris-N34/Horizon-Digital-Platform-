"use client";

import { useState } from "react";
import { crownDispositions } from "@/lib/mock-data";
import { formatCurrency, formatDate, daysUntil, classNames } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable, Column } from "@/components/ui/DataTable";
import { CrownDisposition } from "@/lib/types";
import { ArrowRight } from "lucide-react";

type FilterType = "All" | "Available" | "Expiring Soon" | "Bid Submitted";

export function DispositionTracker() {
  const [filter, setFilter] = useState<FilterType>("All");

  const filtered = crownDispositions.filter((d) => {
    if (filter === "All") return true;
    if (filter === "Available") return d.status === "Available";
    if (filter === "Expiring Soon") return d.status === "Expiring";
    if (filter === "Bid Submitted") return d.status === "Bid Submitted";
    return true;
  });

  const tabs: FilterType[] = ["All", "Available", "Expiring Soon", "Bid Submitted"];
  const counts = {
    All: crownDispositions.length,
    Available: crownDispositions.filter((d) => d.status === "Available").length,
    "Expiring Soon": crownDispositions.filter((d) => d.status === "Expiring").length,
    "Bid Submitted": crownDispositions.filter((d) => d.status === "Bid Submitted").length,
  };

  const columns: Column<CrownDisposition>[] = [
    {
      key: "id",
      header: "Disposition",
      render: (row) => <span className="font-data text-text-primary font-medium">{row.id}</span>,
    },
    {
      key: "location",
      header: "Location",
      render: (row) => <span className="text-text-primary">{row.location}</span>,
    },
    {
      key: "type",
      header: "Type",
      render: (row) => <span className="text-text-secondary text-xs">{row.type}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "expiryDate",
      header: "Expiry",
      sortable: true,
      sortValue: (row) => new Date(row.expiryDate).getTime(),
      render: (row) => {
        const days = daysUntil(row.expiryDate);
        return (
          <div>
            <div className="text-text-primary font-data text-xs">{formatDate(row.expiryDate)}</div>
            <div className={classNames(
              "text-[10px] mt-0.5 font-data",
              days <= 30 ? "text-warning font-semibold" : "text-text-secondary"
            )}>
              {days > 0 ? `${days} days` : "expired"}
            </div>
          </div>
        );
      },
    },
    {
      key: "estimatedValue",
      header: "Est. Value",
      align: "right",
      sortable: true,
      sortValue: (row) => row.estimatedValue,
      render: (row) => (
        <span className="font-data text-text-primary font-semibold">
          {formatCurrency(row.estimatedValue)}
        </span>
      ),
    },
    {
      key: "action",
      header: "",
      align: "right",
      render: () => (
        <button className="text-xs font-medium inline-flex items-center gap-1 hover:gap-1.5 transition-all" style={{ color: "var(--color-accent)" }}>
          Review <ArrowRight className="w-3 h-3" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 bg-background rounded-md p-1 border border-border w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={classNames(
              "px-3 py-1.5 text-xs font-medium rounded transition-all",
              filter === tab
                ? "bg-surface text-text-primary shadow-warm"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {tab}
            <span className="ml-1.5 font-data text-[10px] opacity-60">
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(row) => row.id}
        rowHighlight={(row) => {
          const days = daysUntil(row.expiryDate);
          return days > 0 && days <= 30;
        }}
      />
    </div>
  );
}
