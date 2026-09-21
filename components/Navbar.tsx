"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Terminal, Mail, Search, ArrowRight, Coffee, Zap, Menu, X } from "lucide-react";
import { toast } from "sonner";

export default function Navbar() {
  const pathname = usePathname();
  const isServicesPage = pathname === "/services";
  const isHardwarePage = pathname === "/hardware";
  const isDevopsPage = pathname === "/devops";
  const isDonatePage = pathname === "/donate";
  const isSubPage = isServicesPage || isHardwarePage || isDevopsPage || isDonatePage;

  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hackerMode, setHackerMode] = useState(false);

  // --- CONTROL + KONAMI CODE EASTER EGG (MAC/WINDOWS FRIENDLY) ---
  useEffect(() => {
    const konamiSequence = [
      { key: "ArrowUp", ctrl: true },
      { key: "ArrowUp", ctrl: true },
      { key: "ArrowDown", ctrl: true },
      { key: "ArrowDown", ctrl: true },
      { key: "ArrowLeft", ctrl: true },
      { key: "ArrowRight", ctrl: true },
      { key: "ArrowLeft", ctrl: true },
      { key: "ArrowRight", ctrl: true },
      { key: "b", ctrl: false },
      { key: "a", ctrl: false },
    ];
    let cursor = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdOpen(prev => !prev);
        return;
      }
      if (e.key === "Escape") {
        setIsCmdOpen(false);
        setMobileMenuOpen(false);
        return;
      }

      const expected = konamiSequence[cursor];
      const keyMatch = e.key.toLowerCase() === expected.key.toLowerCase() || e.key === expected.key;
      const ctrlMatch = expected.ctrl ? (e.ctrlKey || e.metaKey) : true;

      if (keyMatch && ctrlMatch) {
        if (expected.ctrl) e.preventDefault();
        cursor++;
        if (cursor === konamiSequence.length) {
          setHackerMode(prev => !prev);
          toast.success("🔓 CONTROL + KONAMI UNLOCKED: Matrix Hacker Mode Activated!", {
            description: "Root privileges granted via Control sequence, Miltos.",
            duration: 5000,
          });
          cursor = 0;
        }
      } else {
        if (!["Shift", "Control", "Alt", "Meta"].includes(e.key)) {
          cursor = 0;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (hackerMode) {
      document.documentElement.classList.add("matrix-hacker-mode");
    } else {
      document.documentElement.classList.remove("matrix-hacker-mode");
    }
  }, [hackerMode]);

  // --- GLOBAL SCROLL REVEAL OBSERVER HOOK ---
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px 0px -30px 0px",
      threshold: 0.05,
    });

    const elements = document.querySelectorAll(".reveal-on-scroll, .reveal-from-left, .reveal-from-right");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  const getHref = (id: string) => {
    return isSubPage ? `/${id}` : id;
  };

  const navLinks = [
    { name: "Βιογραφικό & Projects", href: "/" },
    { name: "Agency Web", href: "/services" },
    { name: "DevOps & Cloud", href: "/devops" },
    { name: "Custom PC & Hardware", href: "/hardware" },
    { name: "Support & Donate ☕", href: "/donate" },
    { name: "Overview", href: getHref("#overview") },
    { name: "Infrastructure", href: getHref("#infrastructure") },
    { name: "Contact", href: getHref("#contact") },
  ].filter(link => {
    if (searchQuery.trim() === "") return true;
    return link.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-[#0b0c10]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          {/* Logo / Brand */}
          <a href="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0b0c10] rounded-[14px] flex items-center justify-center font-mono font-bold text-white text-xs">
                MP
              </div>
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-white tracking-tight">Miltos Papageorgiou</h2>
              <p className="text-[9px] sm:text-[10px] font-mono text-cyan-400">INFRA & WEB DEV</p>
            </div>
          </a>

          {/* Desktop Navigation Hub Switcher */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-full shadow-inner text-xs font-mono">
            <a href="/" className={`px-3 py-1 rounded-full transition-colors ${pathname === "/" ? "bg-white/10 text-white font-bold" : "text-zinc-400 hover:text-white"}`}>CV</a>
            <a href="/services" className={`px-3 py-1 rounded-full transition-colors ${isServicesPage ? "bg-cyan-500/20 text-cyan-400 font-bold" : "text-zinc-400 hover:text-white"}`}>Web Agency</a>
            <a href="/devops" className={`px-3 py-1 rounded-full transition-colors ${isDevopsPage ? "bg-purple-500/20 text-purple-400 font-bold" : "text-zinc-400 hover:text-white"}`}>DevOps</a>
            <a href="/hardware" className={`px-3 py-1 rounded-full transition-colors ${isHardwarePage ? "bg-emerald-500/20 text-emerald-400 font-bold" : "text-zinc-400 hover:text-white"}`}>Hardware</a>
            <a href="/donate" className={`px-3 py-1 rounded-full transition-colors flex items-center gap-1 ${isDonatePage ? "bg-pink-500/20 text-pink-400 font-bold" : "text-zinc-400 hover:text-pink-300"}`}><Coffee className="w-3.5 h-3.5" /> Donate</a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {hackerMode && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 animate-pulse">
                <Zap className="w-3 h-3" /> ROOT
              </span>
            )}

            {/* Command Menu Button - Fully clickable on touch & desktop */}
            <button
              onClick={() => setIsCmdOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] text-xs font-mono text-zinc-300 transition-all cursor-pointer active:scale-95"
              title="Άνοιγμα Μενού (⌘K)"
            >
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden xs:inline">Μενού</span>
              <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-zinc-400">⌘K</span>
            </button>

            {/* Contact Button */}
            <a
              href={isSubPage ? "/#contact" : "#contact"}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 cursor-pointer active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white cursor-pointer active:scale-95"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-2 font-mono text-xs pb-2 animate-fade-in">
            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 rounded-xl transition-colors ${pathname === "/" ? "bg-white/10 text-white font-bold" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}
            >
              📂 Βιογραφικό & Projects (CV)
            </a>
            <a
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 rounded-xl transition-colors ${isServicesPage ? "bg-cyan-500/20 text-cyan-400 font-bold" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}
            >
              🌐 Agency Web & Services
            </a>
            <a
              href="/devops"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 rounded-xl transition-colors ${isDevopsPage ? "bg-purple-500/20 text-purple-400 font-bold" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}
            >
              ⚙️ DevOps & Cloud Infra
            </a>
            <a
              href="/hardware"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 rounded-xl transition-colors ${isHardwarePage ? "bg-emerald-500/20 text-emerald-400 font-bold" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}
            >
              🖥️ Custom PC & Hardware
            </a>
            <a
              href="/donate"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 rounded-xl transition-colors flex items-center gap-2 ${isDonatePage ? "bg-pink-500/20 text-pink-400 font-bold" : "text-zinc-400 hover:bg-white/5 hover:text-pink-300"}`}
            >
              <Coffee className="w-4 h-4" /> Support & Donate ☕
            </a>
            <a
              href={isSubPage ? "/#contact" : "#contact"}
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-cyan-500 text-black font-bold flex items-center justify-center gap-2 mt-1"
            >
              <Mail className="w-4 h-4" /> Επικοινωνία / Contact
            </a>
          </div>
        )}
      </header>

      {/* Command Palette Modal (Fixed Touch & Dark Colors) */}
      {isCmdOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setIsCmdOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-[#12131c] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-[#171824]">
              <Search className="w-4 h-4 text-cyan-400" />
              <input
                type="text"
                autoFocus
                placeholder="Αναζήτηση σελίδας ή εντολής..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-zinc-500 font-mono"
              />
              <button
                onClick={() => setIsCmdOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 max-h-72 overflow-y-auto space-y-1.5 bg-[#12131c]">
              {navLinks.length > 0 ? (
                navLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={() => setIsCmdOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.08] text-xs font-mono text-zinc-200 hover:text-white transition-all cursor-pointer group border border-white/5"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                  </a>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-zinc-400 font-mono">
                  Δεν βρέθηκαν αποτελέσματα.
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-white/10 bg-[#171824] flex justify-between items-center text-[10px] font-mono text-zinc-400">
              <span>Γρήγορη Πλοήγηση</span>
              <span>ESC για κλείσιμο</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
