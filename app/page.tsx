"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
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

        {/* SECTION: ABOUT ME */}
        <section id="about" className="py-20 max-w-4xl mx-auto px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              Σχετικά με Εμένα
            </h2>
            <p className="text-zinc-400 text-sm">
              Επαγγελματικό προφίλ, εργασιακή νοοτροπία και τεχνική κατεύθυνση.
            </p>
          </div>

          {/* Κάρτα Προφίλ & Νοοτροπίας Εργασίας */}
          <div className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between">
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
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Εστιάζω στη συνεχή τεχνική εξέλιξη, τις self-hosted υποδομές, τους αυτοματισμούς Linux/Docker και την ανάπτυξη σύγχρονων web εφαρμογών.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
              <span className="text-xs font-mono bg-white/[0.04] text-zinc-300 px-2.5 py-1 rounded border border-white/[0.05]">
                High Productivity
              </span>
              <span className="text-xs font-mono bg-white/[0.04] text-zinc-300 px-2.5 py-1 rounded border border-white/[0.05]">
                Self-Hosted Workflows
              </span>
              <span className="text-xs font-mono bg-white/[0.04] text-zinc-300 px-2.5 py-1 rounded border border-white/[0.05]">
                Web Development & Infrastructure
              </span>
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
