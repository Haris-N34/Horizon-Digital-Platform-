import Link from "next/link";
import { Mountain, Megaphone, ArrowRight, MapPin, Target } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-prima) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top header */}
      <header className="relative z-10 px-12 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3 animate-fade-in">
          <div
            className="w-10 h-10 rounded-md flex items-center justify-center"
            style={{ backgroundColor: "var(--color-prima)" }}
          >
            <Mountain className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-serif text-xl text-text-primary leading-none">
              Brownstone Resources Ltd.
            </div>
            <div className="text-[11px] uppercase tracking-widest text-text-secondary mt-1">
              Established 2024
            </div>
          </div>
        </div>
        <div className="text-xs text-text-secondary uppercase tracking-wider">
          Internal Operations Platform
        </div>
      </header>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center px-12 py-16 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="text-xs uppercase tracking-[0.3em] text-secondary mb-4">
            Unified Operations Dashboard
          </div>
          <h1 className="font-serif text-6xl md:text-7xl text-text-primary leading-[1.05] mb-6 max-w-4xl">
            Horizon Digital Platform
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Choose your operations module to begin. Real-time intelligence on land,
            mineral rights, and market opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full stagger-children">
          {/* Business Strategy Card */}
          <Link href="/business" className="group">
            <div className="card card-pad h-full transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-success)" }}
                >
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-text-secondary px-2 py-1 border border-border rounded">
                  Module 01
                </div>
              </div>
              <h2 className="font-serif text-3xl text-text-primary mb-3">Business Strategy</h2>
              <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                Land analysis, mineral tenure tracking, deal pipeline, and expansion planning across Saskatchewan, Alberta, and Manitoba.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6 pt-4 border-t border-border">
                <div>
                  <div className="font-data text-xl text-text-primary font-semibold">847</div>
                  <div className="text-[10px] uppercase tracking-wider text-text-secondary mt-0.5">Parcels</div>
                </div>
                <div>
                  <div className="font-data text-xl text-text-primary font-semibold">3</div>
                  <div className="text-[10px] uppercase tracking-wider text-text-secondary mt-0.5">Regions</div>
                </div>
                <div>
                  <div className="font-data text-xl text-text-primary font-semibold">$4.2M</div>
                  <div className="text-[10px] uppercase tracking-wider text-text-secondary mt-0.5">Pipeline</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--color-accent)" }}>
                Open Dashboard
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Marketing Card */}
          <Link href="/marketing" className="group">
            <div className="card card-pad h-full transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-success)" }}
                >
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-text-secondary px-2 py-1 border border-border rounded">
                  Module 02
                </div>
              </div>
              <h2 className="font-serif text-3xl text-text-primary mb-3">Marketing</h2>
              <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                Deal sourcing, conversion funnel, channel performance, and AI-powered outreach optimization for landowner acquisition.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6 pt-4 border-t border-border">
                <div>
                  <div className="font-data text-xl text-text-primary font-semibold">312</div>
                  <div className="text-[10px] uppercase tracking-wider text-text-secondary mt-0.5">Leads</div>
                </div>
                <div>
                  <div className="font-data text-xl text-text-primary font-semibold">8.4%</div>
                  <div className="text-[10px] uppercase tracking-wider text-text-secondary mt-0.5">Convert</div>
                </div>
                <div>
                  <div className="font-data text-xl text-text-primary font-semibold">23</div>
                  <div className="text-[10px] uppercase tracking-wider text-text-secondary mt-0.5">Active</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--color-accent)" }}>
                Open Dashboard
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>

        {/* Value pillars */}
        <div className="mt-16 flex items-center gap-12 text-xs uppercase tracking-widest text-text-secondary animate-fade-in">
          <span>— Superior Quality</span>
          <span>— Full Transparency</span>
          <span>— Immediate Liquidity</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-12 py-6 border-t border-border flex items-center justify-between text-xs text-text-secondary">
        <div>Powered by GeoHub Saskatchewan + AI Analytics</div>
        <div>UCCA 2026 — Brownstone Resources Ltd.</div>
      </footer>
    </main>
  );
}
