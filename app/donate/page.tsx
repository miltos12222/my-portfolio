"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Coffee, Cpu, Copy, Check, Terminal, ExternalLink, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function DonatePage() {
    const [copiedSol, setCopiedSol] = useState(false);
    const [customAmount, setCustomAmount] = useState("10");

    const solAddress = "MiltosSolanaHardwareWalletAddressPlaceholder12345"; // Μπορείς να βάλεις τη δική σου διεύθυνση

    const handleCopySol = () => {
        navigator.clipboard.writeText(solAddress);
        setCopiedSol(true);
        toast.success("Η διεύθυνση Solana αντιγράφηκε στο πρόχειρο!");
        setTimeout(() => setCopiedSol(false), 2500);
    };

    return (
        <div className="relative min-h-screen bg-[#0b0c10] text-[#e5e7eb] selection:bg-cyan-500/25 selection:text-white w-full overflow-x-hidden">
            <Navbar />

            <main className="relative w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">

                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono">
                        <Heart className="w-3.5 h-3.5 animate-pulse text-pink-400" />
                        Support Miltos&apos; Homelab & Open Source Work
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                        Buy Me a Coffee or Fuel the Homelab ☕
                    </h1>
                    <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
                        Αν σου άρεσε το portfolio, τα ανοιχτά projects ή οι υποδομές, μπορείς να κεράσεις έναν καφέ, να στηρίξεις τα επόμενα server upgrades ή να στείλεις crypto!
                    </p>
                </div>

                {/* Donation Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Option 1: Crypto / Solana */}
                    <div className="rounded-3xl bg-white/[0.03] border border-white/15 p-6 flex flex-col justify-between space-y-6 hover:border-cyan-500/50 transition-all">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Web3 / Crypto</span>
                                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[10px] font-mono">SOL / USDC</span>
                            </div>
                            <h3 className="text-lg font-bold text-white">Solana & Crypto Transfer</h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Γρήγορη και άμεση υποστήριξη μέσω δικτύου Solana (μηδενικά fees).
                            </p>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/10">
                            <label className="block text-[11px] font-mono text-zinc-500">Solana Wallet Address:</label>
                            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-cyan-300">
                                <span className="truncate flex-1">{solAddress}</span>
                                <button
                                    onClick={handleCopySol}
                                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                                    title="Αντιγραφή"
                                >
                                    {copiedSol ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Option 2: Revolut / Fiat */}
                    <div className="rounded-3xl bg-white/[0.03] border border-white/15 p-6 flex flex-col justify-between space-y-6 hover:border-purple-500/50 transition-all">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">Fiat / Instant</span>
                                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 text-[10px] font-mono">Revolut</span>
                            </div>
                            <h3 className="text-lg font-bold text-white">Revolut Tag & Coffee</h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Στήριξε γρήγορα με ένα click μέσω Revolut tag για καφέ ή εξοπλισμό server.
                            </p>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/10">
                            <div className="flex gap-2">
                                {["5€", "10€", "25€", "50€"].map((amt) => (
                                    <button
                                        key={amt}
                                        onClick={() => setCustomAmount(amt.replace("€", ""))}
                                        className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${customAmount === amt.replace("€", "")
                                                ? "bg-purple-500 text-black border-purple-400 shadow-lg"
                                                : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                                            }`}
                                    >
                                        {amt}
                                    </button>
                                ))}
                            </div>

                            <a
                                href={`https://revolut.me/miltospap`} // Αντικατάστησε με το δικό σου revolut link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span>Άνοιγμα Revolut ({customAmount}€)</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Fun Developer Note */}
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.03] p-5 flex items-center gap-4 text-xs">
                    <Terminal className="w-6 h-6 text-cyan-400 shrink-0" />
                    <p className="text-zinc-300 leading-relaxed">
                        <strong className="text-white font-mono">&gt; root@miltos-server:~$</strong> Όλα τα έσοδα από τα donations επενδύονται απευθείας σε homelab hardware, SSDs για το Proxmox, και domain renewals! Ευχαριστώ πολύ! 🙏
                    </p>
                </div>

            </main>

            <Footer />
        </div>
    );
}
