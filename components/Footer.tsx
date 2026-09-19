"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const [athensTime, setAthensTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Athens",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setAthensTime(timeStr);
      } catch {
        setAthensTime("Athens, GR");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 bg-[#040406] border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Location */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 border border-white/10 font-mono text-xs font-bold text-cyan-400">
            MP
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Miltos Papageorgiou</p>
            <p className="text-[11px] text-gray-400 font-mono">
              Infrastructure & Web Developer • Computer Science Graduate
            </p>
          </div>
        </div>

        {/* Live Athens Time Clock */}
        <div className="flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/10 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-gray-300">
            Athens, GR: <span className="text-white font-semibold">{athensTime || "Loading..."}</span>
          </span>
        </div>

        {/* Back to top button */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-gray-400 font-mono">
            Pure HTML5 Canvas • Framer Motion
          </span>
          <button
            onClick={scrollToTop}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all active:scale-95"
            aria-label="Back to Top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
