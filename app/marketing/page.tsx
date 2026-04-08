"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Filter,
  Megaphone,
  Users,
  Activity,
  Download,
  RefreshCw,
  Target,
  TrendingUp,
  DollarSign,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { SidebarNav, NavItem } from "@/components/ui/SidebarNav";
import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { FunnelChart } from "@/components/marketing/FunnelChart";
import { ChannelPerformance } from "@/components/marketing/ChannelPerformance";
import { CampaignTracker } from "@/components/marketing/CampaignTracker";
import { LeadScoreBoard } from "@/components/marketing/LeadScoreBoard";
import { AIRecommendations } from "@/components/marketing/AIRecommendations";
import { marketingMetrics } from "@/lib/mock-data";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: "funnel", label: "Funnel Analytics", icon: <Filter className="w-4 h-4" /> },
  { id: "campaigns", label: "Campaigns", icon: <Megaphone className="w-4 h-4" /> },
  { id: "leads", label: "Lead Board", icon: <Users className="w-4 h-4" /> },
  { id: "outreach", label: "Outreach Activity", icon: <Activity className="w-4 h-4" /> },
];

export default function MarketingDashboard() {
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
        brandSub="Marketing"
        navItems={navItems}
        activeId={activeId}
        onNavClick={handleNavClick}
        switchHref="/business"
        switchLabel="Switch to Business"
      />

      <main className="flex-1 px-10 py-8 max-w-[1600px]">
        <PageHeader
          title="Marketing"
          breadcrumb={["Brownstone Resources", "Operations", "Marketing"]}
          description="Deal sourcing, conversion analytics, and channel intelligence for landowner acquisition."
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
              label={marketingMetrics.totalLeads.label}
              value={formatNumber(marketingMetrics.totalLeads.value)}
              trend={marketingMetrics.totalLeads.trend}
              icon={<Users className="w-4 h-4" />}
            />
            <MetricCard
              label={marketingMetrics.conversionRate.label}
              value={formatPercent(marketingMetrics.conversionRate.value)}
              trend={marketingMetrics.conversionRate.trend}
              trendLabel="pts"
              icon={<Target className="w-4 h-4" />}
            />
            <MetricCard
              label={marketingMetrics.cpa.label}
              value={formatCurrency(marketingMetrics.cpa.value)}
              trend={marketingMetrics.cpa.trend}
              invertTrend
              icon={<DollarSign className="w-4 h-4" />}
            />
            <MetricCard
              label={marketingMetrics.activeCampaigns.label}
              value={formatNumber(marketingMetrics.activeCampaigns.value)}
              trend={marketingMetrics.activeCampaigns.trend}
              trendLabel=""
              icon={<Briefcase className="w-4 h-4" />}
            />
            <MetricCard
              label={marketingMetrics.dealsFromMarketing.label}
              value={formatNumber(marketingMetrics.dealsFromMarketing.value)}
              trend={marketingMetrics.dealsFromMarketing.trend}
              icon={<CheckCircle2 className="w-4 h-4" />}
            />
          </div>
        </section>

        {/* Section 2: Conversion Funnel */}
        <section id="section-funnel" className="mb-10 scroll-mt-8 animate-fade-in">
          <SectionCard
            title="Conversion Funnel"
            subtitle="From awareness to closed deals — 5-stage acquisition pipeline"
            actions={
              <div className="flex items-center gap-3 text-xs text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-success" />
                  +12% YoY funnel velocity
                </span>
              </div>
            }
          >
            <FunnelChart />
          </SectionCard>
        </section>

        {/* Section 3: Channel Performance */}
        <section id="section-campaigns" className="mb-10 scroll-mt-8 animate-fade-in">
          <SectionCard
            title="Channel Performance"
            subtitle="ROI ranking across all marketing channels — sorted by efficiency"
          >
            <ChannelPerformance />
          </SectionCard>
        </section>

        {/* Section 4: Active Campaigns */}
        <section className="mb-10 scroll-mt-8 animate-fade-in">
          <SectionCard
            title="Active Campaigns"
            subtitle="Live tracking of ongoing marketing initiatives"
          >
            <CampaignTracker />
          </SectionCard>
        </section>

        {/* Section 5: Lead Score Board */}
        <section id="section-leads" className="mb-10 scroll-mt-8 animate-fade-in">
          <SectionCard
            title="Top Lead Score Board"
            subtitle="High-intent landowners ranked by composite acquisition score"
          >
            <LeadScoreBoard />
          </SectionCard>
        </section>

        {/* Section 6: AI Recommendations */}
        <section id="section-outreach" className="mb-10 scroll-mt-8 animate-fade-in">
          <AIRecommendations />
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border flex items-center justify-between text-xs text-text-secondary">
          <div>Brownstone Resources Ltd. — Marketing Operations</div>
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
