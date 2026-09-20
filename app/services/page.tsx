"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, ShoppingBag, ArrowRight, ArrowLeft, Send, Briefcase } from "lucide-react";
import { toast } from "sonner";

export default function ServicesPage() {
    // ΟΡΙΣΤΙΚΗ ΔΙΟΡΘΩΣΗ SCROLL POSITION ΣΤΟ REFRESH (Force Top)
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedServices, setSelectedServices] = useState<{ title: string; price: number; hourly?: boolean }[]>([
        { title: "Full Enterprise Homelab", price: 280 }
    ]);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const catalog = [
        { title: "Landing Page", cat: "WEB DEVELOPMENT", price: 199, desc: "Μοντέρνα, αστραπιαία ιστοσελίδα μίας σελίδας." },
        { title: "Personal Portfolio / Blog", cat: "WEB DEVELOPMENT", price: 290, desc: "Προσωπικός ιστότοπος ή blog με πολλαπλές σελίδες." },
        { title: "Business App / E-shop", cat: "WEB DEVELOPMENT", price: 450, desc: "Πλήρης επαγγελματική δυναμική εφαρμογή ή e-shop." },
        { title: "Custom Full-Stack App", cat: "WEB DEVELOPMENT", price: 650, desc: "Προηγμένη web εφαρμογή κομμένη και ραμμένη στις ανάγκες σας." },
        { title: "Basic Homelab Setup", cat: "DEVOPS / LINUX", price: 150, desc: "Βασικό στήσιμο εικονικών μηχανών και ασφαλούς δικτύου." },
        { title: "Full Enterprise Homelab", cat: "DEVOPS / LINUX", price: 280, desc: "Προηγμένη αρχιτεκτονική με backups και ιδιωτικό cloud." },
        { title: "Advanced Cloud & Docker", cat: "INFRASTRUCTURE", price: 250, desc: "Ανάπτυξη και ενορχήστρωση self-hosted εφαρμογών." },
        { title: "Consulting & Audit", cat: "EXPERT SUPPORT", price: 35, hourly: true, desc: "Εξατομικευμένες λύσεις και τεχνική υποστήριξη ανά ώρα." }
    ];

    const addonsList = [
        { id: "seo", name: "Advanced SEO & Lighthouse Optimization", price: 70 },
        { id: "vpn", name: "Tailscale Secure Mesh VPN Setup", price: 100 },
        { id: "backup", name: "Automated Daily Snapshots & Disaster Recovery", price: 90 }
    ];

    const toggleServiceItem = (item: { title: string; price: number; hourly?: boolean }) => {
        const exists = selectedServices.some(s => s.title === item.title);
        if (exists) {
            if (selectedServices.length === 1) {
                toast.error("Πρέπει να έχετε τουλάχιστον μία υπηρεσία επιλεγμένη.");
                return;
            }
            setSelectedServices(selectedServices.filter(s => s.title !== item.title));
            toast.info(`Αφαιρέθηκε: ${item.title}`);
        } else {
            setSelectedServices([...selectedServices, item]);
            toast.success(`Προστέθηκε: ${item.title}`);
        }
    };

    const toggleAddon = (id: string) => {
        if (selectedAddons.includes(id)) {
            setSelectedAddons(selectedAddons.filter(a => a !== id));
        } else {
            setSelectedAddons([...selectedAddons, id]);
        }
    };

    const servicesTotal = selectedServices.reduce((acc, curr) => acc + curr.price, 0);
    const addonsTotal = selectedAddons.reduce((acc, id) => {
        const found = addonsList.find(a => a.id === id);
        return acc + (found ? found.price : 0);
    }, 0);
    const grandTotal = servicesTotal + addonsTotal;

    const summaryText = [
        ...selectedServices.map(s => `${s.title} (${s.price}€${s.hourly ? '/hr' : ''})`),
        ...selectedAddons.map(id => {
            const f = addonsList.find(a => a.id === id);
            return f ? `${f.name} (${f.price}€)` : "";
        })
    ].filter(Boolean).join(" + ");

    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    serviceTitle: summaryText,
                    servicePrice: `${grandTotal}€`,
                    message: formData.message,
                }),
            });
            const data = await res.json();
            if (res.ok && !data.error) {
                toast.success("Το αίτημά σας στάλθηκε με επιτυχία! Θα επικοινωνήσω μαζί σας άμεσα.");
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

                {/* Navigation Switcher Tabs */}
                <div className="flex justify-center items-center gap-3 mb-6">
                    <a
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold text-zinc-300 transition-all cursor-pointer"
                    >
                        <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                        <span>Βιογραφικό & Projects</span>
                    </a>
                    <a
                        href="/services"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-black text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
                    >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Agency & Υπηρεσίες (Active)</span>
                    </a>
                </div>

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                        Miltos Papageorgiou • Commercial Hub
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Εμπορικός Κατάλογος & Service Builder
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Διαμορφώστε το δικό σας πακέτο, δείτε το κόστος ζωντανά και στείλτε το αίτημά σας.
                    </p>
                </div>

                {/* Wizard Steps Bar */}
                <div className="flex justify-center items-center gap-2 sm:gap-4 text-xs font-mono">
                    <button onClick={() => setStep(1)} className={`px-3 sm:px-4 py-2 rounded-xl border cursor-pointer ${step === 1 ? "bg-cyan-500 text-black font-bold border-cyan-500" : "bg-white/[0.03] border-white/10 text-zinc-400"}`}>
                        1. Κατάλογος
                    </button>
                    <button onClick={() => setStep(2)} className={`px-3 sm:px-4 py-2 rounded-xl border cursor-pointer ${step === 2 ? "bg-cyan-500 text-black font-bold border-cyan-500" : "bg-white/[0.03] border-white/10 text-zinc-400"}`}>
                        2. Add-ons
                    </button>
                    <button onClick={() => setStep(3)} className={`px-3 sm:px-4 py-2 rounded-xl border cursor-pointer ${step === 3 ? "bg-cyan-500 text-black font-bold border-cyan-500" : "bg-white/[0.03] border-white/10 text-zinc-400"}`}>
                        3. Υποβολή
                    </button>
                </div>

                {/* STEP 1: SELECT SERVICES */}
                {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {catalog.map((item, i) => {
                                const isSelected = selectedServices.some(s => s.title === item.title);
                                return (
                                    <div
                                        key={i}
                                        onClick={() => toggleServiceItem(item)}
                                        className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${isSelected ? "bg-cyan-500/10 border-cyan-500 shadow-[0_0_25px_-5px_rgba(6,182,212,0.2)]" : "bg-white/[0.02] border-white/10 hover:border-white/20"}`}
                                    >
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">{item.cat}</span>
                                                {isSelected && <span className="text-xs font-mono bg-cyan-500 text-black px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><Check className="w-3 h-3" /> Επιλεγμένο</span>}
                                            </div>
                                            <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                            <p className="text-xs text-zinc-400 mt-1 mb-4 leading-relaxed">{item.desc}</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <span className="text-xl font-bold font-mono text-white">{item.price}€ <span className="text-xs text-zinc-500 font-normal">{item.hourly ? '/ ώρα' : 'από'}</span></span>
                                            <span className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${isSelected ? "bg-cyan-500 text-black font-bold" : "bg-white/10 text-white"}`}>
                                                {isSelected ? "Αφαίρεση" : "Προσθήκη"}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-white/10">
                            <div className="text-sm font-mono">
                                Επιλεγμένες: <span className="text-cyan-400 font-bold">{selectedServices.length}</span> | Σύνολο: <span className="text-cyan-400 font-bold text-xl">{grandTotal}€</span>
                            </div>
                            <button
                                onClick={() => setStep(2)}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all cursor-pointer"
                            >
                                <span>Συνέχεια (Add-ons)</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2: SELECT ADD-ONS */}
                {step === 2 && (
                    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
                        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl space-y-4">
                            <h2 className="text-lg font-bold text-white">Πρόσθετα Εργαλεία & Add-ons</h2>
                            <p className="text-xs text-zinc-400">Επιλέξτε επιπλέον δυνατότητες για την αναβάθμιση του project σας.</p>

                            <div className="space-y-3 pt-2">
                                {addonsList.map((addon) => {
                                    const isChecked = selectedAddons.includes(addon.id);
                                    return (
                                        <div
                                            key={addon.id}
                                            onClick={() => toggleAddon(addon.id)}
                                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${isChecked ? "bg-purple-500/10 border-purple-500" : "bg-white/[0.02] border-white/10 hover:border-white/20"}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${isChecked ? "bg-purple-500 border-purple-500 text-black" : "border-white/20"}`}>
                                                    {isChecked && <Check className="w-3.5 h-3.5 font-bold" />}
                                                </div>
                                                <span className="text-sm font-medium text-white">{addon.name}</span>
                                            </div>
                                            <span className="text-sm font-mono font-bold text-purple-400">+{addon.price}€</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4">
                            <button
                                onClick={() => setStep(1)}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all cursor-pointer"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Πίσω</span>
                            </button>

                            <button
                                onClick={() => setStep(3)}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all cursor-pointer"
                            >
                                <span>Επισκόπηση & Αίτηση</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: SUMMARY & CONTACT FORM */}
                {step === 3 && (
                    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">

                        {/* Summary Box */}
                        <div className="bg-white/[0.03] border border-cyan-500/30 p-6 rounded-3xl space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider font-mono">Σύνοψη Καλαθιού (Cart Summary)</h3>
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
                                >
                                    [ Edit Επιλογών ]
                                </button>
                            </div>

                            <div className="space-y-2 text-xs text-zinc-300">
                                {selectedServices.map((s, idx) => (
                                    <div key={idx} className="flex justify-between">
                                        <span>• {s.title}</span>
                                        <span className="font-mono">{s.price}€</span>
                                    </div>
                                ))}
                                {selectedAddons.map((id, idx) => {
                                    const f = addonsList.find(a => a.id === id);
                                    return f ? (
                                        <div key={idx} className="flex justify-between text-purple-300">
                                            <span>+ {f.name}</span>
                                            <span className="font-mono">{f.price}€</span>
                                        </div>
                                    ) : null;
                                })}
                            </div>

                            <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                                <span className="text-sm font-bold text-white">Τελικό Κόστος:</span>
                                <span className="text-2xl font-bold font-mono text-cyan-400">{grandTotal}€</span>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl space-y-6">
                            <h2 className="text-xl font-bold text-white">Ολοκλήρωση Αιτήματος</h2>

                            <form onSubmit={handleOrderSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-300 mb-2">Όνομα / Επωνυμία</label>
                                        <input type="text" required placeholder="Γιάννης Παπαδόπουλος" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-300 mb-2">Email Επικοινωνίας</label>
                                        <input type="email" required placeholder="example@domain.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-all" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-zinc-300 mb-2">Επιλεγμένες Υπηρεσίες</label>
                                    <input type="text" readOnly value={summaryText} className="w-full px-4 py-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 font-mono text-xs cursor-not-allowed" />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium opacity-80 mb-2">Σχόλια / Λεπτομέρειες</label>
                                    <textarea rows={3} placeholder="Περιγράψτε τυχόν πρόσθετες απαιτήσεις..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-all resize-none" />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all cursor-pointer"
                                    >
                                        Πίσω
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
                                    >
                                        <Send className="w-4 h-4" />
                                        <span>{isSubmitting ? "Αποστολή..." : "Αποστολή Ολοκληρωμένου Αιτήματος"}</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                )}

            </main>

            {/* Floating Quick Action Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-[#0b0c10]/95 backdrop-blur-md border-t border-white/10 py-3 px-4 z-50 shadow-2xl flex items-center justify-between max-w-4xl mx-auto sm:rounded-t-2xl sm:left-1/2 sm:-translate-x-1/2 sm:w-[90%]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                        <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                        <span className="text-zinc-400 block">Επιλεγμένες: <strong className="text-white">{selectedServices.length} υπηρεσίες</strong></span>
                        <span className="text-cyan-400 font-mono font-bold text-sm">Σύνολο: {grandTotal}€</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    {step !== 3 ? (
                        <button
                            onClick={() => setStep(3)}
                            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all shadow cursor-pointer"
                        >
                            Ολοκλήρωση ➔
                        </button>
                    ) : (
                        <button
                            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all shadow cursor-pointer"
                        >
                            Φόρμα Αίτησης ↓
                        </button>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
