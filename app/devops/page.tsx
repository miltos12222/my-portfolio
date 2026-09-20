"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Server, ArrowRight, Send, Briefcase, Cpu, ShoppingBag, Cloud, Database, Workflow, FileCode } from "lucide-react";
import { toast } from "sonner";

export default function DevopsPage() {
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    const [step, setStep] = useState<1 | 2>(1);
    const [selectedDevops, setSelectedDevops] = useState("Cloud & VPS Migration (από 180€)");
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const devopsPackages = [
        { title: "Cloud & VPS Migration", price: 180, desc: "Μεταφορά εφαρμογών σε γρήγορους Cloud Servers.", cat: "DEVOPS / CLOUD", icon: Cloud },
        { title: "Business Backups & Disaster Recovery", price: 140, desc: "Επαγγελματικά κρυπτογραφημένα backups.", cat: "INFRASTRUCTURE", icon: Database },
        { title: "API & Webhook Automations", price: 220, desc: "Σύνδεση με CRM, ERP, Google Sheets.", cat: "AUTOMATION", icon: Workflow },
        { title: "Headless CMS Integration", price: 320, desc: "Next.js frontend με Sanity / Strapi CMS.", cat: "WEB ARCHITECTURE", icon: FileCode }
    ];

    const handleDevopsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    serviceTitle: `DevOps: ${selectedDevops}`,
                    servicePrice: "DevOps Service",
                    message: formData.message,
                }),
            });
            const data = await res.json();
            if (res.ok && !data.error) {
                toast.success("Το αίτημά σας στάλθηκε με επιτυχία!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                toast.error("Αποτυχία αποστολής.");
            }
        } catch (err) {
            toast.error("Σφάλμα σύνδεσης.");
        } finally {
            setIsSubmitting(false);
        }
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
                    <p className="text-sm text-zinc-400">Προηγμένες λύσεις υποδομής για επιχειρήσεις.</p>
                </div>

                {step === 1 ? (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {devopsPackages.map((pkg, i) => {
                                const itemStr = `${pkg.title} (από ${pkg.price}€)`;
                                const isSelected = selectedDevops === itemStr;
                                const IconComponent = pkg.icon;
                                return (
                                    <div key={i} onClick={() => setSelectedDevops(itemStr)} className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${isSelected ? "bg-purple-500/10 border-purple-500 shadow-lg" : "bg-white/[0.02] border-white/10 hover:border-white/20"}`}>
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
                                            <span className={`text-xs px-3 py-1.5 rounded-xl font-medium ${isSelected ? "bg-purple-600 text-white font-bold" : "bg-white/10 text-white"}`}>{isSelected ? "Επιλεγμένο" : "Επιλογή"}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-end pt-4 border-t border-white/10">
                            <button onClick={() => setStep(2)} className="px-6 py-3.5 rounded-xl bg-purple-600 text-white font-bold text-xs cursor-pointer flex items-center gap-2"><span>Συνέχεια</span><ArrowRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 max-w-2xl mx-auto">
                        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl space-y-6">
                            <h2 className="text-xl font-bold text-white">Αίτημα DevOps & Cloud</h2>
                            <form onSubmit={handleDevopsSubmit} className="space-y-5">
                                <input type="text" required placeholder="Όνομα" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm" />
                                <input type="email" required placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm" />
                                <textarea rows={3} placeholder="Λεπτομέρειες..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-sm resize-none" />
                                <div className="flex gap-3">
                                    <button type="button" onClick={() => setStep(1)} className="px-5 py-3.5 rounded-xl bg-white/10 text-white text-xs cursor-pointer">Πίσω</button>
                                    <button type="submit" disabled={isSubmitting} className="flex-1 py-3.5 rounded-xl bg-purple-600 text-white font-bold text-sm cursor-pointer">Αποστολή</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </main>
            <Footer />
        </div>
    );
}
