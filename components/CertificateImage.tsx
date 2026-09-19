"use client";

import Image from "next/image";

export default function CertificateImage() {
  return (
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
  );
}
