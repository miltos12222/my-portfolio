"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, ShoppingBag, ArrowRight, ArrowLeft, Send, Briefcase, Cpu, Server } from "lucide-react";
import { toast } from "sonner";

export default function ServicesPage() {
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedServices, setSelectedServices] = useState<string[]>(["Full Enterprise Homelab"]);
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

    const toggleService = (title: string) => {
        if (selectedServices.includes(title)) {
            if (selectedServices.length === 1) {
                toast.error("Πρέπει να έχετε τουλάχιστον μία υπηρεσία επιλεγμένη.");
                return;
            }
            setSelectedServices(selectedServices.filter(s => s !== title));
            toast.info(`Αφαιρέθηκε: ${title}`);
        } else {
            setSelectedServices([...selectedServices, title]);
            toast.success(`Προστέθηκε: ${title}`);
        }
    };

    const toggleAddon = (id: string) => {
        if (selectedAddons.includes(id)) {
            setSelectedAddons(selectedAddons.filter(a => a !== id));
        } else {
            setSelectedAddons([...selectedAddons, id]);
        }
    };

    const servicesTotal = selectedServices.reduce((acc, title) => {
        const found = catalog.find(c => c.title === title);
        return acc + (found ? found.price : 0);
    }, 0);

    const addonsTotal = selectedAddons.reduce((acc, id) => {
        const found = addonsList.find(a => a.id === id);
        return acc + (found ? found.price : 0);
    }, 0);

    const grandTotal = servicesTotal + addonsTotal;
    const summaryText = [...selectedServices, ...selectedAddons.map(id => addonsList.find(a => a.id === id)?.name || "")].filter(Boolean).join(" + ");

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
                toast.success("Το αίτημά σας στάλθηκε με επιτυχία!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                toast.error(`Αποτυχία αποστολής (${data.error || "Unknown"})`);
            }
        } catch (err) {
            console.error(err);
            toast.error("Σφάλμα σύνδεσης.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#0b0c10] text-[#e5e7eb] selection:bg-cyan-500/25 selection:text-white w-full overflow-x-hidden">
            <Navbar />

            <main className="relative w-full pt-32 pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">

                {/* Unified Hub Switcher */}
                <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
                    <a href="/" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold text-zinc-300 transition-all cursor-pointer">
                        <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                        <span>Βιογραφικό</span>
                    </a>
                    <a href="/services" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500 text-black text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 cursor-pointer">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Agency Web (Active)</span>
                    </a>
                    <a href="/devops" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold text-zinc-300 transition-all cursor-pointer">
                        <Server className="w-3.5 h-3.5 text-purple-400" />
                        <span>DevOps & Cloud</span>
                    </a>
                    <a href="/hardware" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold text-zinc-300 transition-all cursor-pointer">
                        <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Hardware Lab</span>
                    </a>
                </div>

                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                        Commercial Hub • Web Agency
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Εμπορικός Κατάλογος Υπηρεσιών
                    </h1>
                    <p className="text-sm text-zinc-400">Διαμορφώστε το δικό σας πακέτο και ζητήστε προσφορά.</p>
                </div>

                <div className="flex justify-center items-center gap-2 sm:gap-4 text-xs font-mono">
                    <button onClick={() => setStep(1)} className={`px-4 py-2 rounded-xl border cursor-pointer ${step === 1 ? "bg-cyan-500 text-black font-bold border-cyan-500" : "bg-white/[0.03] border-white/10 text-zinc-400"}`}>1. Κατάλογος</button>
                    <button onClick={() => setStep(2)} className={`px-4 py-2 rounded-xl border cursor-pointer ${step === 2 ? "bg-cyan-500 text-black font-bold border-cyan-500" : "bg-white/[0.03] border-white/10 text-zinc-400"}`}>2. Add-ons</button>
                    <button onClick={() => setStep(3)} className={`px-4 py-2 rounded-xl border cursor-pointer ${step === 3 ? "bg-cyan-500 text-black font-bold border-cyan-500" : "bg-white/[0.03] border-white/10 text-zinc-400"}`}>3. Υποβολή</button>
                </div>

                {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {catalog.map((item, i) => {
                                const isSelected = selectedServices.includes(item.title);
                                return (
                                    <div key={i} onClick={() => toggleService(item.title)} className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${isSelected ? "bg-cyan-500/10 border-cyan-500 shadow-lg" : "bg-white/[0.02] border-white/10 hover:border-white/20"}`}>
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] font-mono text-cyan-400 font-bold">{item.cat}</span>
                                                {isSelected && <span className="text-xs font-mono bg-cyan-500 text-black px-2 py-0.5 rounded-full font-bold">Επιλεγμένο</span>}
                                            </div>
                                            <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                            <p className="text-xs text-zinc-400 mt-1 mb-4">{item.desc}</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <span className="text-xl font-bold font-mono text-white">{item.price}€</span>
                                            <span className={`text-xs px-3 py-1.5 rounded-xl font-medium ${isSelected ? "bg-cyan-500 text-black font-bold" : "bg-white/10 text-white"}`}>{isSelected ? "Επιλεγμένο" : "Προσθήκη"}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between items-center pt-6 border-t border-white/10">
                            <span className="text-sm font-mono text-cyan-400 font-bold">Σύνολο: {grandTotal}€</span>
                            <button onClick={() => setStep(2)} className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs cursor-pointer flex items-center gap-2"><span>Συνέχεια</span><ArrowRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 max-w-2xl mx-auto">
                        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl space-y-4">
                            <h2 className="text-lg font-bold text-white">Πρόσθετα Add-ons</h2>
                            {addonsList.map((addon) => {
                                const isChecked = selectedAddons.includes(addon.id);
                                return (
                                    <div key={addon.id} onClick={() => toggleAddon(addon.id)} className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between ${isChecked ? "bg-purple-500/10 border-purple-500" : "bg-white/[0.02] border-white/10"}`}>
                                        <span className="text-sm font-medium text-white">{addon.name}</span>
                                        <span className="text-sm font-mono font-bold text-purple-400">+{addon.price}€</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between">
                            <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl bg-white/10 text-white text-xs cursor-pointer">Πίσω</button>
                            <button onClick={() => setStep(3)} className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs cursor-pointer">Επισκόπηση</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 max-w-2xl mx-auto">
                        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl space-y-6">
                            <h2 className="text-xl font-bold text-white">Ολοκλήρωση Αιτήματος</h2>
                            <form onSubmit={handleOrderSubmit} className="space-y-5">
                                <input type="text" required placeholder="Όνομα" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm" />
                                <input type="email" required placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm" />
                                <textarea rows={3} placeholder="Σχόλια..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-sm resize-none" />
                                <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-cyan-500 text-black font-bold text-sm cursor-pointer">Αποστολή</button>
                            </form>
                        </div>
                    </div>
                )}

            </main>
            <Footer />
        </div>
    );
}
