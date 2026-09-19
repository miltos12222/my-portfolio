"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, Menu, X, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { label: "Overview", href: "#top" },
    { label: "About Me", href: "#about" },
    { label: "Infrastructure", href: "#systems" },
    { label: "Resilience", href: "#resilience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 py-4 md:py-6 pointer-events-none">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-6xl pointer-events-auto transition-all duration-300 rounded-2xl px-4 py-3 md:px-6 md:py-3.5 flex items-center justify-between ${
          scrolled
            ? "bg-[#0c0d14]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            : "bg-black/30 backdrop-blur-md border border-white/5"
        }`}
      >
        {/* Brand / Monogram */}
        <a
          href="#top"
          className="group flex items-center gap-3 text-white transition-opacity hover:opacity-90"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500/20 via-white/5 to-purple-500/20 border border-white/15 p-[1px] shadow-sm transition-transform duration-300 group-hover:scale-105">
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

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/8 rounded-full px-3 py-1 text-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-white px-3 py-1.5 rounded-full transition-colors hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions (Socials & Quick Email) */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={copyEmail}
            className="group relative flex items-center gap-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 px-3.5 py-1.5 text-xs font-medium text-gray-200 transition-all active:scale-95"
            title="Copy Email to Clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-mono">Email Copied!</span>
              </>
            ) : (
              <>
                <Mail className="h-3.5 w-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Contact</span>
              </>
            )}
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 bg-[#0d0e17]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-5 pointer-events-auto flex flex-col gap-3 shadow-2xl z-50 lg:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-300 hover:text-cyan-400 py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-4 w-4 opacity-50" />
              </a>
            ))}

            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                onClick={copyEmail}
                className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold flex items-center justify-center gap-2"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Mail className="h-4 w-4" />}
                <span>{copied ? "Copied to Clipboard" : "Copy Email"}</span>
              </button>

              <div className="flex gap-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300"
                  aria-label="LinkedIn"
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
