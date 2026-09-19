"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Mail, Server, Code2, Cpu, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0b0c10] text-[#e5e7eb] selection:bg-cyan-500/25 selection:text-white">
      {/* Top Anchor */}
      <div id="top" className="absolute top-0 left-0 h-px w-px pointer-events-none" />

      {/* Navigation */}
      <Navbar />

      <main className="relative w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">

        {/* SECTION: BENTO GRID HERO (Overview) */}
        <section id="overview" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {/* 1. Main Profile Card (Spans 2 columns, 2 rows) */}
          <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-white/[0.03] border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between z-10 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                AVAILABLE FOR HIRE
              </span>
              <span className="text-xs font-mono text-zinc-400">ATHENS, GR</span>
            </div>

            <div className="z-10 flex flex-col sm:flex-row items-center gap-6 my-auto">
              {/* Profile Image */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-white/15 shadow-xl shrink-0 bg-zinc-900">
                <Image
                  src="/profile.jpg"
                  alt="Miltos Papageorgiou"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                  Miltos Papageorgiou
                </h1>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Computer Science Graduate & Infrastructure Enthusiast. Εξειδίκευση σε self-hosted υποδομές, αυτοματισμούς Linux/Docker και σύγχρονη ανάπτυξη web εφαρμογών.
                </p>
              </div>
            </div>

            <div className="z-10 flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-white/10">
              <a
                href="https://github.com/miltos12222"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>
              <a
                href="mailto:miltospapageorgiou@gmail.com"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-xs font-medium text-cyan-300 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </a>
            </div>
          </div>

          {/* 2. Tech Stack Card */}
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-400 mb-4">
              <Server className="w-5 h-5 text-cyan-400" />
              <span className="text-[10px] font-mono uppercase tracking-wider">Infrastructure</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Self-Hosted</h3>
              <p className="text-xs text-zinc-400 mb-4">Proxmox VE, Docker containers, Nextcloud & MariaDB orchestration.</p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Proxmox</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Docker</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Tailscale</span>
            </div>
          </div>

          {/* 3. Code & Web Dev Card */}
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-400 mb-4">
              <Code2 className="w-5 h-5 text-purple-400" />
              <span className="text-[10px] font-mono uppercase tracking-wider">Development</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Modern Stack</h3>
              <p className="text-xs text-zinc-400 mb-4">Next.js, TypeScript, Tailwind CSS, high-performance web apps.</p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Next.js</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">TypeScript</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Tailwind</span>
            </div>
          </div>

          {/* 4. Work Ethic & Productivity Card */}
          <div className="md:col-span-2 lg:col-span-2 rounded-3xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-400 mb-3">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-mono uppercase tracking-wider">Work Ethic</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Υψηλή Παραγωγικότητα & Αντοχή</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Διαθέτω εξαιρετική οργάνωση, προσαρμοστικότητα και αποδεδειγμένη αντοχή σε απαιτητικά περιβάλλοντα εργασίας με αυξημένη πίεση και σύνθετα τεχνικά ζητήματα.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Problem Solver
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fast Learner
              </span>
            </div>
          </div>

        </section>

        {/* SECTION: ABOUT ME */}
        <section id="about-me" className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          <h2 className="text-xl font-bold text-white mb-3">Σχετικά με Εμένα</h2>
          <p className="text-sm text-zinc-300 leading-relaxed mb-3">
            Είμαι απόφοιτος Πληροφορικής με έντονο ενδιαφέρον και πρακτική εμπειρία στις υποδομές δικτύων, τη διαχείριση συστημάτων Linux και την ανάπτυξη λογισμικού.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Στόχος μου είναι η δημιουργία ασφαλών, γρήγορων και κλιμακούμενων εφαρμογών, αξιοποιώντας σύγχρονα εργαλεία αυτοματισμού και self-hosted αρχιτεκτονικές.
          </p>
        </section>

        {/* SECTION: INFRASTRUCTURE (Link 3 target) */}
        <section id="infrastructure" className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Server className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Infrastructure & Homelab Stack</h2>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Ανάπτυξη και διαχείριση εικονικών μηχανών σε Proxmox VE, παραμετροποίηση Docker containers για αυτόματο backup φωτογραφιών και αρχείων με ασφαλή πρόσβαση μέσω Tailscale VPN.
          </p>
        </section>

        {/* SECTION: RESILIENCE (Link 4 target) */}
        <section id="resilience" className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Resilience & High Availability</h2>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Σχεδιασμός με έμφαση στη συνεχή λειτουργία, τα αυτόματα backups και την ανθεκτικότητα απέναντι σε αστοχίες υλικού ή δικτύου.
          </p>
        </section>

        {/* SECTION: PROJECTS / SYSTEMS */}
        <section id="projects" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-cyan-400">Infrastructure</span>
                <Server className="w-4 h-4 text-zinc-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Self-Hosted Homelab & Nextcloud</h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                Ανάπτυξη και διαχείριση εικονικών μηχανών σε Proxmox VE, παραμετροποίηση Docker containers για αυτόματο backup φωτογραφιών και αρχείων με ασφαλή πρόσβαση μέσω Tailscale VPN.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Proxmox</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Docker</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Tailscale</span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-purple-400">Web App</span>
                <Code2 className="w-4 h-4 text-zinc-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">High-Performance Portfolio</h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                Σύγχρονο, ελαφρύ και πλήρως βελτιστοποιημένο portfolio κατασκευασμένο με Next.js, Tailwind CSS και TypeScript, σχεδιασμένο για άμεση φόρτωση και μηδενικά lags.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Next.js</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Tailwind</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">TypeScript</span>
            </div>
          </div>
        </section>

        {/* Contact Anchor */}
        <div id="contact" className="h-px w-px" />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
