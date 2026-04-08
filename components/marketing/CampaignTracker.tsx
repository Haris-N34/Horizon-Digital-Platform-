"use client";

import { campaigns } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Campaign } from "@/lib/types";

export function CampaignTracker() {
  const columns: Column<Campaign>[] = [
    {
      key: "name",
      header: "Campaign",
      render: (row) => (
        <div>
          <div className="text-text-primary font-medium">{row.name}</div>
          <div className="text-[11px] text-text-secondary mt-0.5">{row.channel}</div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "startDate",
      header: "Start",
      render: (row) => <span className="font-data text-xs text-text-secondary">{formatDate(row.startDate)}</span>,
    },
    {
      key: "budget",
      header: "Budget",
      align: "right",
      sortable: true,
      sortValue: (row) => row.budget,
      render: (row) => <span className="font-data text-text-primary">{formatCurrency(row.budget)}</span>,
    },
    {
      key: "spent",
      header: "Spent",
      align: "right",
      sortable: true,
      sortValue: (row) => row.spent,
      render: (row) => <span className="font-data text-text-secondary">{formatCurrency(row.spent)}</span>,
    },
    {
      key: "leadsGenerated",
      header: "Leads",
      align: "right",
      sortable: true,
      sortValue: (row) => row.leadsGenerated,
      render: (row) => <span className="font-data text-text-primary font-semibold">{row.leadsGenerated}</span>,
    },
    {
      key: "cpa",
      header: "CPA",
      align: "right",
      sortable: true,
      sortValue: (row) => row.cpa,
      render: (row) => <span className="font-data text-text-secondary">{formatCurrency(row.cpa)}</span>,
    },
    {
      key: "roi",
      header: "ROI",
      align: "right",
      sortable: true,
      sortValue: (row) => row.roi,
      render: (row) => (
        <span
          className="font-data font-semibold"
          style={{
            color: row.roi >= 4 ? "var(--color-success)" : row.roi >= 2 ? "var(--color-text-primary)" : "var(--color-danger)",
          }}
        >
          {row.roi.toFixed(1)}x
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={campaigns}
      rowKey={(row) => row.id}
    />
  );
}
