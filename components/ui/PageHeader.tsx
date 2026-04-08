"use client";

import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  breadcrumb?: string[];
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, breadcrumb, description, actions }: PageHeaderProps) {
  return (
    <header className="flex items-start justify-between mb-8 pb-6 border-b border-border">
      <div>
        {breadcrumb && (
          <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-2 uppercase tracking-wider">
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3 h-3" />}
                {crumb}
              </span>
            ))}
          </div>
        )}
        <h1 className="font-serif text-4xl text-text-primary">{title}</h1>
        {description && (
          <p className="text-text-secondary mt-2 text-sm max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  );
}
