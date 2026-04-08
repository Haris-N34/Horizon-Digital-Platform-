"use client";

import { classNames } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function SectionCard({ title, subtitle, actions, children, className, noPadding }: SectionCardProps) {
  return (
    <div className={classNames("card", className)}>
      <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-border">
        <div>
          <h2 className="font-serif text-xl text-text-primary">{title}</h2>
          {subtitle && <p className="text-xs text-text-secondary mt-1">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className={noPadding ? "" : "p-6"}>{children}</div>
    </div>
  );
}
