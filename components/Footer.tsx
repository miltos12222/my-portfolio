"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

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
    <footer
      id="contact"
      className="relative z-20 bg-[#040406] border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 text-center">

        {/* Brand & Info Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 border border-white/10 font-mono text-sm font-bold text-cyan-400">
            MP
          </div>
          <p className="text-base font-semibold text-white">Miltos Papageorgiou</p>
          <p className="text-xs text-gray-400 font-mono">
            Infrastructure & Web Developer • Computer Science Graduate
          </p>
        </div>

        {/* Κεντραρισμένα Κουμπιά Επικοινωνίας (GitHub, LinkedIn, Gmail) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/miltos12222"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-gray-200 transition-all hover:scale-105"
          >
            <GithubIcon className="h-4 w-4 text-gray-300" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/miltos-papageorgiou-a58142352/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-gray-200 transition-all hover:scale-105"
          >
            {/* Inline SVG για το LinkedIn για να μην εξαρτάται από το lucide-react */}
            <svg
              className="h-4 w-4 fill-[#0A66C2]"
              viewBox="0 0 24 24"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:miltospapageorgiou066@gmail.com"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-medium text-cyan-300 transition-all hover:scale-105"
          >
            <Mail className="h-4 w-4 text-cyan-400" />
            <span>miltospapageorgiou066@gmail.com</span>
          </a>
        </div>

        {/* Lower Row: Time, Stack Badge & Back To Top */}
        <div className="w-full pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Live Athens Time Clock */}
          <div className="flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-gray-300">
              Athens, GR: <span className="text-white font-semibold">{athensTime || "Loading..."}</span>
            </span>
          </div>

          <span className="text-[11px] text-gray-500 font-mono">
            Pure HTML5 Canvas • Framer Motion
          </span>

          {/* Back to top button */}
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
