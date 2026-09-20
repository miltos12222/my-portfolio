"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Terminal, Mail, Briefcase, ShoppingBag, Cpu, Server, X, Search, ArrowRight } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isServicesPage = pathname === "/services";
  const isHardwarePage = pathname === "/hardware";
  const isDevopsPage = pathname === "/devops";
  const isSubPage = isServicesPage || isHardwarePage || isDevopsPage;

  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleOpen = () => setIsCmdOpen(true);
    window.addEventListener("open-command-palette", handleOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdOpen(prev => !prev);
      }
      if (e.key === "Escape") {
        setIsCmdOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-command-palette", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getHref = (id: string) => {
    return isSubPage ? `/${id}` : id;
  };

  const navLinks = [
    { name: "Βιογραφικό & Projects", href: "/" },
    { name: "Agency Web", href: "/services" },
    { name: "DevOps & Cloud", href: "/devops" },
    { name: "Custom PC & Hardware", href: "/hardware" },
    { name: "Overview", href: getHref("#overview") },
    { name: "Infrastructure", href: getHref("#infrastructure") },
    { name: "Contact", href: getHref("#contact") },
  ].filter(link => {
    if (searchQuery.trim() === "") return true;
    return link.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
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

          {/* Navigation Hub Switcher */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-full shadow-inner text-xs font-mono">
            <a href="/" className={`px-3 py-1 rounded-full transition-colors ${pathname === "/" ? "bg-white/10 text-white font-bold" : "text-zinc-400 hover:text-white"}`}>CV</a>
            <a href="/services" className={`px-3 py-1 rounded-full transition-colors ${isServicesPage ? "bg-cyan-500/20 text-cyan-400 font-bold" : "text-zinc-400 hover:text-white"}`}>Web Agency</a>
            <a href="/devops" className={`px-3 py-1 rounded-full transition-colors ${isDevopsPage ? "bg-purple-500/20 text-purple-400 font-bold" : "text-zinc-400 hover:text-white"}`}>DevOps</a>
            <a href="/hardware" className={`px-3 py-1 rounded-full transition-colors ${isHardwarePage ? "bg-emerald-500/20 text-emerald-400 font-bold" : "text-zinc-400 hover:text-white"}`}>Hardware</a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCmdOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] text-xs font-mono text-zinc-300 transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span>Ctrl K</span>
            </button>

            <a
              href={isSubPage ? "/#contact" : "#contact"}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </div>

        </div>
      </header>

      {/* Command Palette Modal */}
      {isCmdOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-lg bg-[#12131c] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <Search className="w-4 h-4 text-zinc-400" />
              <input
                type="text"
                autoFocus
                placeholder="Αναζήτηση σελίδας ή εντολής..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-zinc-600 font-mono"
              />
              <button
                onClick={() => setIsCmdOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 max-h-72 overflow-y-auto space-y-1">
              {navLinks.length > 0 ? (
                navLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={() => setIsCmdOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.06] text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                  </a>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-zinc-500 font-mono">
                  Δεν βρέθηκαν αποτελέσματα.
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-white/5 bg-white/[0.01] flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span>Πλοήγηση με ταχύτητα</span>
              <span>ESC για κλείσιμο</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
