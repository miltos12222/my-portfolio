"use client";

import { usePathname } from "next/navigation";
import { Terminal, Mail, Briefcase, ShoppingBag, Cpu } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isServicesPage = pathname === "/services";
  const isHardwarePage = pathname === "/hardware";

  const getHref = (id: string) => {
    return (isServicesPage || isHardwarePage) ? `/${id}` : id;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#0b0c10]/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo / Brand */}
        <a href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0b0c10] rounded-[14px] flex items-center justify-center font-mono font-bold text-white text-xs">
              MP
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">Miltos Papageorgiou</h2>
            <p className="text-[10px] font-mono text-cyan-400">INFRA & WEB DEV</p>
          </div>
        </a>

        {/* Navigation Links (Conditional based on active page) */}
        {!isServicesPage && !isHardwarePage ? (
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full shadow-inner">
            <a href="#overview" className="px-3 py-1 text-xs text-zinc-300 hover:text-white transition-colors">Overview</a>
            <a href="#about-me" className="px-3 py-1 text-xs text-zinc-300 hover:text-white transition-colors">About Me</a>
            <a href="#infrastructure" className="px-3 py-1 text-xs text-zinc-300 hover:text-white transition-colors">Infrastructure</a>
            <a href="#resilience" className="px-3 py-1 text-xs text-zinc-300 hover:text-white transition-colors">Resilience</a>
            <a href="#projects" className="px-3 py-1 text-xs text-zinc-300 hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="px-3 py-1 text-xs text-zinc-300 hover:text-white transition-colors">Contact</a>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-2 bg-white/[0.03] border border-white/10 px-4 py-1.5 rounded-full text-xs font-mono">
            <a href="/" className="px-3 py-1 text-zinc-400 hover:text-white transition-colors">← Επιστροφή στο CV</a>
          </nav>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] text-xs font-mono text-zinc-300 transition-all cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>Ctrl K</span>
          </button>

          <a
            href={isServicesPage || isHardwarePage ? "/#contact" : "#contact"}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </a>
        </div>

      </div>
    </header>
  );
}
