"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  MapPin,
  GitBranch,
  TrendingUp,
  FileText,
  Download,
  RefreshCw,
  Mountain,
  Layers,
  DollarSign,
  Target,
} from "lucide-react";
import { SidebarNav, NavItem } from "@/components/ui/SidebarNav";
import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { ParcelExplorer } from "@/components/business/ParcelExplorer";
import { PipelineOverview } from "@/components/business/PipelineOverview";
import { ExpansionMatrix } from "@/components/business/ExpansionMatrix";
import { DispositionTracker } from "@/components/business/DispositionTracker";
import { businessMetrics } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: "map", label: "Parcel Map", icon: <MapPin className="w-4 h-4" /> },
  { id: "pipeline", label: "Deal Pipeline", icon: <GitBranch className="w-4 h-4" /> },
  { id: "expansion", label: "Expansion Analysis", icon: <TrendingUp className="w-4 h-4" /> },
  { id: "dispositions", label: "Crown Dispositions", icon: <FileText className="w-4 h-4" /> },
];

export default function BusinessDashboard() {
  const [activeId, setActiveId] = useState("overview");

  const handleNavClick = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav
        brandLabel="Brownstone"
        brandSub="Business Strategy"
        navItems={navItems}
        activeId={activeId}
        onNavClick={handleNavClick}
        switchHref="/marketing"
        switchLabel="Switch to Marketing"
      />

      <main className="flex-1 px-10 py-8 max-w-[1600px]">
        <PageHeader
          title="Business Strategy"
          breadcrumb={["Brownstone Resources", "Operations", "Business Strategy"]}
          description="Land analysis, mineral tenure tracking, and expansion intelligence across the Western Canadian basin."
          actions={
            <>
              <button className="btn-secondary">
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </button>
              <button className="btn-primary">
                <Download className="w-3.5 h-3.5" />
                Export Report
              </button>
            </>
          }
        />

        {/* Section 1: Key Metrics */}
        <section id="section-overview" className="mb-10 scroll-mt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 stagger-children">
            <MetricCard
              label={businessMetrics.totalParcels.label}
              value={formatNumber(businessMetrics.totalParcels.value)}
              trend={businessMetrics.totalParcels.trend}
              icon={<Mountain className="w-4 h-4" />}
            />
            <MetricCard
              label={businessMetrics.freeholdOpportunities.label}
              value={formatNumber(businessMetrics.freeholdOpportunities.value)}
              trend={businessMetrics.freeholdOpportunities.trend}
              icon={<Layers className="w-4 h-4" />}
            />
            <MetricCard
              label={businessMetrics.crownDispositions.label}
              value={formatNumber(businessMetrics.crownDispositions.value)}
              trend={businessMetrics.crownDispositions.trend}
              icon={<FileText className="w-4 h-4" />}
            />
            <MetricCard
              label={businessMetrics.avgScore.label}
              value={`${businessMetrics.avgScore.value}/100`}
              trend={businessMetrics.avgScore.trend}
              trendLabel="pts"
              icon={<Target className="w-4 h-4" />}
            />
            <MetricCard
              label={businessMetrics.pipelineValue.label}
              value={formatCurrency(businessMetrics.pipelineValue.value, true)}
              trend={businessMetrics.pipelineValue.trend}
              icon={<DollarSign className="w-4 h-4" />}
            />
          </div>
        </section>

        {/* Section 2: Interactive Parcel Explorer */}
        <section id="section-map" className="mb-10 scroll-mt-8 animate-fade-in">
          <SectionCard
            title="Geographic Intelligence"
            subtitle="Interactive parcel exploration across Western Canada — filter, expand territories, and drill into individual parcels"
          >
            <ParcelExplorer />
          </SectionCard>
        </section>

        {/* Section 3: Deal Pipeline */}
        <section id="section-pipeline" className="mb-10 scroll-mt-8 animate-fade-in">
          <SectionCard
            title="Deal Pipeline"
            subtitle="Active acquisition opportunities by stage"
          >
            <PipelineOverview />
          </SectionCard>
        </section>

        {/* Section 4: Expansion Analysis */}
        <section id="section-expansion" className="mb-10 scroll-mt-8 animate-fade-in">
          <SectionCard
            title="Regional Expansion Analysis"
            subtitle="Comparative intelligence across target provinces"
          >
            <ExpansionMatrix />
          </SectionCard>
        </section>

        {/* Section 5: Crown Disposition Tracker */}
        <section id="section-dispositions" className="mb-10 scroll-mt-8 animate-fade-in">
          <SectionCard
            title="Crown Disposition Tracker"
            subtitle="Upcoming public offerings and expiring leases"
          >
            <DispositionTracker />
          </SectionCard>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border flex items-center justify-between text-xs text-text-secondary">
          <div>Brownstone Resources Ltd. — Real-time data via GeoHub Saskatchewan</div>
          <div className="flex items-center gap-4">
            <span>Superior Quality</span>
            <span className="opacity-30">·</span>
            <span>Full Transparency</span>
            <span className="opacity-30">·</span>
            <span>Immediate Liquidity</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
