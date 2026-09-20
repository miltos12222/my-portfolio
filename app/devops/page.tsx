"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Server, ArrowRight, Briefcase, Cpu, ShoppingBag, Cloud, Database, Workflow, FileCode, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export default function DevopsPage() {
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    const devopsPackages = [
        { id: "dev-1", title: "Cloud & VPS Migration", price: 180, desc: "Μεταφορά εφαρμογών σε γρήγορους Cloud Servers.", cat: "DEVOPS / CLOUD", icon: Cloud },
        { id: "dev-2", title: "Business Backups & Disaster Recovery", price: 140, desc: "Επαγγελματικά κρυπτογραφημένα backups.", cat: "INFRASTRUCTURE", icon: Database },
        { id: "dev-3", title: "API & Webhook Automations", price: 220, desc: "Σύνδεση με CRM, ERP, Google Sheets.", cat: "AUTOMATION", icon: Workflow },
        { id: "dev-4", title: "Headless CMS Integration", price: 320, desc: "Next.js frontend με Sanity / Strapi CMS.", cat: "WEB ARCHITECTURE", icon: FileCode }
    ];

    const handleAddToCart = (pkg: { id: string; title: string; price: number; cat: string }) => {
        const saved = localStorage.getItem("miltos_agency_cart");
        let cart = saved ? JSON.parse(saved) : [];
        const existing = cart.find((i: any) => i.id === pkg.id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                id: pkg.id,
                title: pkg.title,
                price: pkg.price,
                quantity: 1,
                category: pkg.cat
            });
        }

        localStorage.setItem("miltos_agency_cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("storage-updated"));
        toast.success(`Προστέθηκε στο καλάθι: ${pkg.title}`);
        window.dispatchEvent(new Event("open-global-cart"));
    };

    return (
        <div className="relative min-h-screen bg-[#0b0c10] text-[#e5e7eb] selection:bg-purple-500/25 selection:text-white w-full overflow-x-hidden">
            <Navbar />

            <main className="relative w-full pt-32 pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">

                {/* Unified Hub Switcher */}
                <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
                    <a href="/" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold text-zinc-300 transition-all cursor-pointer">
                        <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                        <span>Βιογραφικό</span>
                    </a>
                    <a href="/services" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold text-zinc-300 transition-all cursor-pointer">
                        <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Agency Web</span>
                    </a>
                    <a href="/devops" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/20 cursor-pointer">
                        <Server className="w-3.5 h-3.5" />
                        <span>DevOps & Cloud (Active)</span>
                    </a>
                    <a href="/hardware" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold text-zinc-300 transition-all cursor-pointer">
                        <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Hardware Lab</span>
                    </a>
                </div>

                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                        Cloud Architecture & DevOps
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Υπηρεσίες Cloud, Migration & Αυτοματισμών
                    </h1>
                    <p className="text-sm text-zinc-400">Επιλέξτε τις υπηρεσίες υποδομής που χρειάζεστε και προσθέστε τες στο καλάθι.</p>
                </div>

                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {devopsPackages.map((pkg, i) => {
                            const IconComponent = pkg.icon;
                            return (
                                <div key={i} className="p-6 rounded-3xl border bg-white/[0.02] border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[10px] font-mono text-purple-400 font-bold">{pkg.cat}</span>
                                            <IconComponent className="w-4 h-4 text-purple-300" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">{pkg.title}</h3>
                                        <p className="text-xs text-zinc-400 mt-1 mb-4">{pkg.desc}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <span className="text-xl font-bold font-mono text-white">από {pkg.price}€</span>
                                        <button
                                            onClick={() => handleAddToCart(pkg)}
                                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow cursor-pointer"
                                        >
                                            <ShoppingCart className="w-3.5 h-3.5" />
                                            <span>Προσθήκη στο Καλάθι</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
