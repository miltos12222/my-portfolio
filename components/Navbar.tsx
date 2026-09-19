"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, Menu, X, Compass } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("miltospapageorgiou@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "About Me", href: "#about-me" },
    { label: "Infrastructure", href: "#infrastructure" },
    { label: "Resilience", href: "#resilience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 py-6 pointer-events-none">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-5xl pointer-events-auto transition-all duration-300 rounded-3xl px-6 py-4 flex items-center justify-between ${scrolled
            ? "bg-[#0c0d14]/85 backdrop-blur-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
            : "bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg"
          }`}
      >
        {/* Brand / Monogram */}
        <a
          href="#top"
          className="group flex items-center gap-3.5 text-white transition-opacity hover:opacity-90"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500/25 via-white/5 to-purple-500/25 border border-white/20 p-[1px] shadow-md transition-transform duration-300 group-hover:scale-105">
            <span className="font-mono text-xs font-bold tracking-wider text-cyan-400">MP</span>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
              Miltos Papageorgiou
            </span>
            <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">
              Infra & Web Dev
            </span>
          </div>
        </a>

        {/* Desktop Links (Clean & Spacious) */}
        <div className="hidden lg:flex items-center gap-1.5 bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5 text-xs shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-white px-3.5 py-1.5 rounded-full transition-all hover:bg-white/10 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={copyEmail}
            className="group relative flex items-center gap-2 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 px-4 py-2 text-xs font-medium text-gray-200 transition-all active:scale-95 shadow-sm"
            title="Copy Email to Clipboard"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400 font-mono">Email Copied!</span>
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Contact</span>
              </>
            )}
          </button>

          <a
            href="https://github.com/miltos12222"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/15 text-gray-400 hover:text-white hover:bg-white/[0.1] transition-colors shadow-sm"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/15 text-gray-400 hover:text-white hover:bg-white/[0.1] transition-colors shadow-sm"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile / Clean Toggle Menu Button (Visible on all screens if we want a modern dropdown drawer) */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/10 border border-white/15 text-gray-200 hover:text-white transition-all text-xs font-medium"
            aria-label="Toggle Menu"
          >
            <Compass className={`h-4 w-4 text-cyan-400 transition-transform duration-500 ${menuOpen ? "rotate-90" : ""}`} />
            <span>Menu</span>
          </button>
        </div>
      </motion.nav>

      {/* Modern Dropdown / Expanded Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-24 left-4 right-4 max-w-md mx-auto bg-[#0d0e18]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 pointer-events-auto flex flex-col gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">Navigation Hub</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-sm font-medium text-gray-200 hover:text-cyan-400 transition-all flex items-center justify-between group"
                >
                  <span>{link.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-cyan-400 transition-colors" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={copyEmail}
                className="flex-1 py-2.5 px-4 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-cyan-500/25 transition-all"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Mail className="h-4 w-4" />}
                <span>{copied ? "Copied!" : "Copy Email"}</span>
              </button>

              <div className="flex gap-2">
                <a
                  href="https://github.com/miltos12222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
