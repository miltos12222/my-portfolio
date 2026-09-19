"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import PortfolioGrid from "@/components/PortfolioGrid";
import Footer from "@/components/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="relative min-h-screen bg-[#0b0c10] text-[#e5e7eb] selection:bg-amber-500/25 selection:text-white">
      {/* Top Anchor for Navigation */}
      <div id="top" className="absolute top-0 left-0 h-px w-px pointer-events-none" />

      {/* Floating Glass HUD Navigation */}
      <Navbar />

      <main className="relative w-full">
        {/* Scrollytelling Section */}
        <section
          ref={containerRef}
          aria-label="Interactive Sequence"
          className="relative h-[480vh] w-full bg-[#0b0c10]"
        >
          <ScrollyCanvas containerRef={containerRef} totalFrames={120}>
            <Overlay scrollYProgress={scrollYProgress} />
          </ScrollyCanvas>
        </section>

        {/* SECTION: ABOUT ME & CERTIFICATION DOCUMENT */}
        <section id="about" className="py-20 max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              Σχετικά με Εμένα
            </h2>
            <p className="text-zinc-400 text-sm">
              Επαγγελματικό προφίλ, εργασιακή νοοτροπία και επίσημα έγγραφα κατάρτισης.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Κάρτα 1: Προφίλ & Νοοτροπία Εργασίας (5 cols) */}
            <div className="lg:col-span-5 glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 text-amber-400 font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  PROFILE & WORK ETHIC
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Παραγωγικότητα & Προσαρμοστικότητα
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                  Διαθέτω υψηλή προσαρμοστικότητα, οργάνωση και αποδεδειγμένη αντοχή σε απαιτητικές συνθήκες εργασίας με αυξημένη πίεση.
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Εστιάζω στη συνεχή τεχνική εξέλιξη, τις self-hosted υποδομές, τους αυτοματισμούς Linux/Docker και την ανάπτυξη σύγχρονων web εφαρμογών.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 mt-6 border-t border-white/[0.06]">
                <span className="text-xs font-mono bg-white/[0.04] text-zinc-300 px-2.5 py-1 rounded border border-white/[0.05]">
                  High Productivity
                </span>
                <span className="text-xs font-mono bg-white/[0.04] text-zinc-300 px-2.5 py-1 rounded border border-white/[0.05]">
                  Self-Hosted Workflows
                </span>
              </div>
            </div>

            {/* Κάρτα 2: Προβολή Επίσημου Εγγράφου / Βεβαίωσης (7 cols) */}
            <div className="lg:col-span-7 glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    Official Certificate
                  </span>
                  <span className="text-xs font-mono text-zinc-500">2026</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  Τεχνικός Εφαρμογών Πληροφορικής
                </h3>
                <p className="text-xs font-mono text-amber-400/90 mb-4">
                  Web Designer - Developer / Video Games / Πολυμέσα
                </p>

                {/* Document Image Preview Frame */}
                <a
                  href="/certificates/vevaiosi.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block w-full h-64 rounded-xl overflow-hidden border border-white/10 bg-black/40 my-4 transition-all duration-300 hover:border-amber-500/50"
                >
                  <Image
                    src="/certificates/vevaiosi.jpg"
                    alt="Βεβαίωση Επαγγελματικής Κατάρτισης"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4 opacity-90 group-hover:opacity-100">
                    <span className="text-xs font-mono text-white flex items-center gap-1.5">
                      🔍 Κάνε κλικ για πλήρη προβολή
                    </span>
                    <span className="text-xs font-mono text-amber-400 underline">
                      Open Full Size →
                    </span>
                  </div>
                </a>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.06]">
                <span className="text-xs font-mono bg-white/[0.04] text-zinc-300 px-2.5 py-1 rounded border border-white/[0.05]">
                  Ι.Σ.Α.Ε.Κ. ΑΚΜΗ
                </span>
                <span className="text-xs font-mono bg-white/[0.04] text-zinc-300 px-2.5 py-1 rounded border border-white/[0.05]">
                  Web Development
                </span>
                <span className="text-xs font-mono bg-white/[0.04] text-zinc-300 px-2.5 py-1 rounded border border-white/[0.05]">
                  Multimedia
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <PortfolioGrid />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
