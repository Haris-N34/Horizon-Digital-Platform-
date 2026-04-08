"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Mountain,
  ArrowRightLeft,
} from "lucide-react";
import { classNames } from "@/lib/utils";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
}

interface SidebarNavProps {
  brandLabel: string;
  brandSub: string;
  navItems: NavItem[];
  activeId: string;
  onNavClick?: (id: string) => void;
  switchHref: string;
  switchLabel: string;
}

export function SidebarNav({
  brandLabel,
  brandSub,
  navItems,
  activeId,
  onNavClick,
  switchHref,
  switchLabel,
}: SidebarNavProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <aside
      className={classNames(
        "bg-grain bg-prima text-background flex-shrink-0 flex flex-col h-screen sticky top-0 transition-all duration-300 border-r border-border",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
      style={{ backgroundColor: "var(--color-prima)" }}
    >
      {/* Brand */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex-shrink-0 rounded-md flex items-center justify-center" style={{ backgroundColor: "var(--color-success)" }}>
            <Mountain className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="font-serif text-lg leading-none text-white whitespace-nowrap">
                Brownstone
              </div>
              <div className="text-[10px] uppercase tracking-wider text-white/50 mt-1 whitespace-nowrap">
                {brandSub}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.id === activeId;
            const content = (
              <div
                className={classNames(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 cursor-pointer group",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex-shrink-0" style={{ color: isActive ? "var(--color-success)" : undefined }}>
                  {item.icon}
                </div>
                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                {!collapsed && isActive && (
                  <div
                    className="ml-auto w-1 h-4 rounded-sm"
                    style={{ backgroundColor: "var(--color-success)" }}
                  />
                )}
              </div>
            );
            return (
              <div key={item.id} onClick={() => onNavClick?.(item.id)}>
                {content}
              </div>
            );
          })}
        </div>

        {/* Value pillars */}
        {!collapsed && (
          <div className="mt-8 px-3">
            <div className="text-[10px] uppercase tracking-widest text-white/30 mb-3">
              Value Pillars
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[11px] text-white/50">
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-success)" }} />
                Superior Quality
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/50">
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-success)" }} />
                Full Transparency
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/50">
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-success)" }} />
                Immediate Liquidity
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Footer actions */}
      <div className="border-t border-white/10 px-3 py-3 space-y-1">
        <Link href={switchHref}>
          <div
            className={classNames(
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 cursor-pointer text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <ArrowRightLeft className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span className="whitespace-nowrap text-xs">{switchLabel}</span>}
          </div>
        </Link>

        <button
          onClick={toggleDark}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 text-white/70 hover:bg-white/5 hover:text-white"
        >
          {isDark ? <Sun className="w-4 h-4 flex-shrink-0" /> : <Moon className="w-4 h-4 flex-shrink-0" />}
          {!collapsed && <span className="text-xs">{isDark ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 text-white/70 hover:bg-white/5 hover:text-white"
        >
          {collapsed ? <ChevronRight className="w-4 h-4 flex-shrink-0" /> : <ChevronLeft className="w-4 h-4 flex-shrink-0" />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
