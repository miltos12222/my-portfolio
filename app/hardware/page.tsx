"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Cpu, Wrench, ShieldCheck, ArrowRight, ArrowLeft, Send, ShoppingBag, Briefcase } from "lucide-react";
import { toast } from "sonner";

export default function HardwarePage() {
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    const [step, setStep] = useState<1 | 2>(1);
    const [selectedBuild, setSelectedBuild] = useState("Homelab Server Build");
    const [buildType, setBuildType] = useState("Homelab / Proxmox Server");
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const hardwarePackages = [
        { title: "Homelab / Proxmox Server Build", price: 120, desc: "Επιλογή υλικών (ECC RAM, NAS drives, IPMI), συναρμολόγηση και Proxmox προετοιμασία.", cat: "SERVER / INFRA" },
        { title: "Developer & AI Workstation", price: 160, desc: "Στήσιμο μηχανημάτων υψηλών επιδόσεων για multi-threading, 3D rendering ή τοπικά LLMs.", cat: "HIGH PERFORMANCE" },
        { title: "Custom Gaming & Creator PC", price: 140, desc: "Άριστο cable management, κορυφαίο airflow, stress testing (Prime95/FurMark) & BIOS tuning.", cat: "CONSUMER / GAMING" },
        { title: "Hardware Diagnostic & Thermal Overhaul", price: 60, desc: "Καθαρισμός, αλλαγή θερμοαγώγιμης πάστας, έλεγχος σταθερότητας και θερμοκρασιών.", cat: "MAINTENANCE" }
    ];

    const handleHardwareSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    serviceTitle: `Hardware Build: ${selectedBuild} (${buildType})`,
                    servicePrice: "Hardware Service",
                    message: formData.message,
                }),
            });
            const data = await res.json();
            if (res.ok && !data.error) {
                toast.success("Το αίτημά σας για hardware στάλθηκε με επιτυχία!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                toast.error(`Αποτυχία αποστολής (${data.error || "Unknown"})`);
            }
        } catch (err) {
            console.error(err);
            toast.error("Σφάλμα σύνδεσης με τον διακομιστή.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#0b0c10] text-[#e5e7eb] selection:bg-cyan-500/25 selection:text-white w-full overflow-x-hidden">
            <Navbar />

            <main className="relative w-full pt-32 pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">

                {/* Navigation Switcher Tabs (3 Tabs now) */}
                <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
                    <a href="/" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold text-zinc-300 transition-all cursor-pointer">
                        <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                        <span>Βιογραφικό</span>
                    </a>
                    <a href="/services" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold text-zinc-300 transition-all cursor-pointer">
                        <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Agency & Υπηρεσίες</span>
                    </a>
                    <a href="/hardware" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 cursor-pointer">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Custom PC & Hardware (Active)</span>
                    </a>
                </div>

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        Hardware Engineering & Assembly
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Custom PC Building & Server Hardware
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Εξειδικευμένο στήσιμο διακομιστών Homelab, σταθμών εργασίας AI/Development και Custom συστημάτων με έμφαση στην ανθεκτικότητα και το άψογο cable management.
                    </p>
                </div>

                {step === 1 ? (
                    <div className="space-y-8 animate-fade-in">
                        {/* Packages Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {hardwarePackages.map((pkg, i) => {
                                const isSelected = selectedBuild === pkg.title;
                                return (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setSelectedBuild(pkg.title);
                                            toast.success(`Επιλέχθηκε: ${pkg.title}`);
                                        }}
                                        className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${isSelected ? "bg-emerald-500/10 border-emerald-500 shadow-[0_0_25px_-5px_rgba(16,185,129,0.2)]" : "bg-white/[0.02] border-white/10 hover:border-white/20"}`}
                                    >
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">{pkg.cat}</span>
                                                {isSelected && <span className="text-xs font-mono bg-emerald-500 text-black px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><Check className="w-3 h-3" /> Επιλεγμένο</span>}
                                            </div>
                                            <h3 className="text-lg font-bold text-white">{pkg.title}</h3>
                                            <p className="text-xs text-zinc-400 mt-1 mb-4 leading-relaxed">{pkg.desc}</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <span className="text-xl font-bold font-mono text-white">Αμοιβή συναρμολόγησης: {pkg.price}€</span>
                                            <span className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${isSelected ? "bg-emerald-500 text-black font-bold" : "bg-white/10 text-white"}`}>
                                                {isSelected ? "Επιλεγμένο" : "Επιλογή"}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Configurator / Build Use-case Selector */}
                        <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-3xl space-y-4">
                            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Επιλέξτε Κύρια Χρήση Συστήματος</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {["Homelab / Proxmox Server", "AI / Developer Workstation", "High-End Gaming & Creation"].map((type, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setBuildType(type)}
                                        className={`p-4 rounded-2xl border text-left text-xs font-medium transition-all cursor-pointer ${buildType === type ? "bg-emerald-500/20 border-emerald-500 text-white font-bold" : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white"}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-white/10">
                            <button
                                onClick={() => setStep(2)}
                                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                            >
                                <span>Συνέχεια στη Φόρμα Αίτησης</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
                        <div className="bg-white/[0.03] border border-emerald-500/30 p-6 rounded-3xl space-y-3">
                            <div className="flex justify-between items-center pb-2 border-b border-white/10">
                                <h3 className="text-sm font-bold text-emerald-400 font-mono">Hardware Build Summary</h3>
                                <button onClick={() => setStep(1)} className="text-xs text-zinc-400 hover:text-white underline cursor-pointer">[ Edit Επιλογής ]</button>
                            </div>
                            <p className="text-xs text-zinc-200">• Υπηρεσία: <strong className="text-white">{selectedBuild}</strong></p>
                            <p className="text-xs text-zinc-200">• Χρήση: <strong className="text-white">{buildType}</strong>ό</p>
                        </div>

                        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl space-y-6">
                            <h2 className="text-xl font-bold text-white">Αίτημα Hardware Consulting / Build</h2>

                            <form onSubmit={handleHardwareSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-300 mb-2">Ονοματεπώνυμο</label>
                                        <input type="text" required placeholder="Γιάννης Παπαδόπουλος" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-300 mb-2">Email Επικοινωνίας</label>
                                        <input type="email" required placeholder="example@domain.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-all" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium opacity-80 mb-2">Budget & Λεπτομέρειες Hardware</label>
                                    <textarea rows={4} placeholder="Αναφέρετε το διαθέσιμο budget σας ή συγκεκριμένα εξαρτήματα που έχετε ήδη επιλέξει..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-all resize-none" />
                                </div>

                                <div className="flex gap-3">
                                    <button type="button" onClick={() => setStep(1)} className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all cursor-pointer">Πίσω</button>
                                    <button type="submit" disabled={isSubmitting} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 cursor-pointer">
                                        <Send className="w-4 h-4" />
                                        <span>{isSubmitting ? "Αποστολή..." : "Αποστολή Αιτήματος Hardware"}</span>
                                    </button>
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
