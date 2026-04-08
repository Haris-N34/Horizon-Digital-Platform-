"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { classNames } from "@/lib/utils";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  align?: "left" | "right" | "center";
  width?: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  sortValue?: (row: T) => number | string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  rowHighlight?: (row: T) => boolean;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  rowKey,
  rowHighlight,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    const key = String(col.key);
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sortedData = (() => {
    if (!sortKey) return data;
    const col = columns.find((c) => String(c.key) === sortKey);
    if (!col) return data;
    return [...data].sort((a, b) => {
      const av = col.sortValue ? col.sortValue(a) : (a as Record<string, unknown>)[sortKey];
      const bv = col.sortValue ? col.sortValue(b) : (b as Record<string, unknown>)[sortKey];
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      const sa = String(av ?? "");
      const sb = String(bv ?? "");
      return sortDir === "asc" ? sa.localeCompare(sb) : sb.localeCompare(sa);
    });
  })();

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full data-table border-collapse">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                style={{ width: col.width }}
                onClick={() => handleSort(col)}
                className={classNames(
                  "px-4 py-3 text-[11px] uppercase tracking-wider font-semibold text-text-secondary",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                  !col.align && "text-left",
                  col.sortable && "cursor-pointer hover:text-text-primary select-none"
                )}
              >
                <div
                  className={classNames(
                    "inline-flex items-center gap-1",
                    col.align === "right" && "justify-end w-full"
                  )}
                >
                  {col.header}
                  {col.sortable && sortKey === String(col.key) && (
                    sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-text-secondary text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row) => {
              const highlight = rowHighlight?.(row);
              return (
                <tr
                  key={rowKey(row)}
                  className={classNames(
                    "border-b border-border/50 transition-colors",
                    highlight && "!bg-warning/8"
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={classNames(
                        "px-4 py-3 text-sm",
                        col.align === "right" && "text-right",
                        col.align === "center" && "text-center"
                      )}
                    >
                      {col.render ? col.render(row) : String((row as Record<string, unknown>)[String(col.key)] ?? "")}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
