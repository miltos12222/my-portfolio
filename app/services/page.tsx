"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, ShoppingBag, Briefcase, Cpu, Server, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export default function ServicesPage() {
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    const catalog = [
        { id: "serv-1", title: "Landing Page", cat: "WEB DEVELOPMENT", price: 199, desc: "Μοντέρνα, αστραπιαία ιστοσελίδα μίας σελίδας." },
        { id: "serv-2", title: "Personal Portfolio / Blog", cat: "WEB DEVELOPMENT", price: 290, desc: "Προσωπικός ιστότοπος ή blog με πολλαπλές σελίδες." },
        { id: "serv-3", title: "Business App / E-shop", cat: "WEB DEVELOPMENT", price: 450, desc: "Πλήρης επαγγελματική δυναμική εφαρμογή ή e-shop." },
        { id: "serv-4", title: "Custom Full-Stack App", cat: "WEB DEVELOPMENT", price: 650, desc: "Προηγμένη web εφαρμογή κομμένη και ραμμένη στις ανάγκες σας." },
        { id: "serv-5", title: "Basic Homelab Setup", cat: "DEVOPS / LINUX", price: 150, desc: "Βασικό στήσιμο εικονικών μηχανών και ασφαλούς δικτύου." },
        { id: "serv-6", title: "Full Enterprise Homelab", cat: "DEVOPS / LINUX", price: 280, desc: "Προηγμένη αρχιτεκτονική με backups και ιδιωτικό cloud." },
        { id: "serv-7", title: "Advanced Cloud & Docker", cat: "INFRASTRUCTURE", price: 250, desc: "Ανάπτυξη και ενορχήστρωση self-hosted εφαρμογών." },
        { id: "serv-8", title: "Consulting & Audit", cat: "EXPERT SUPPORT", price: 35, hourly: true, desc: "Εξατομικευμένες λύσεις και τεχνική υποστήριξη ανά ώρα." }
    ];

    const addonsList = [
        { id: "seo", name: "Advanced SEO & Lighthouse Optimization", price: 70 },
        { id: "vpn", name: "Tailscale Secure Mesh VPN Setup", price: 100 },
        { id: "backup", name: "Automated Daily Snapshots & Disaster Recovery", price: 90 }
    ];

    const handleAddToCart = (item: { id: string; title: string; price: number; cat: string }) => {
        const saved = localStorage.getItem("miltos_agency_cart");
        let cart = saved ? JSON.parse(saved) : [];
        const existing = cart.find((i: any) => i.id === item.id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: 1,
                category: item.cat
            });
        }

        localStorage.setItem("miltos_agency_cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("storage-updated"));
        toast.success(`Προστέθηκε στο καλάθι: ${item.title}`);
        window.dispatchEvent(new Event("open-global-cart"));
    };

    const toggleAddon = (id: string) => {
        if (selectedAddons.includes(id)) {
            setSelectedAddons(selectedAddons.filter(a => a !== id));
        } else {
            setSelectedAddons([...selectedAddons, id]);
        }
    };

    const handleAddAddonsToCart = () => {
        if (selectedAddons.length === 0) {
            toast.error("Δεν έχετε επιλέξει κάποιο πρόσθετο add-on.");
            return;
        }

        const saved = localStorage.getItem("miltos_agency_cart");
        let cart = saved ? JSON.parse(saved) : [];

        selectedAddons.forEach(addonId => {
            const found = addonsList.find(a => a.id === addonId);
            if (found) {
                const existing = cart.find((i: any) => i.id === `addon-${found.id}`);
                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push({
                        id: `addon-${found.id}`,
                        title: `Addon: ${found.name}`,
                        price: found.price,
                        quantity: 1,
                        category: "WEB ADDONS"
                    });
                }
            }
        });

        localStorage.setItem("miltos_agency_cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("storage-updated"));
        toast.success("Τα πρόσθετα προστέθηκαν στο καλάθι!");
        window.dispatchEvent(new Event("open-global-cart"));
    };

    return (
        <div className="relative min-h-screen bg-[#0b0c10] text-[#e5e7eb] selection:bg-cyan-500/25 selection:text-white w-full overflow-x-hidden">
            <Navbar />

            <main className="relative w-full pt-32 pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">

                {/* Unified Hub Switcher */}
                <div className="flex flex-wrap justify-center items-center gap-2 mb-6 reveal-on-scroll">
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

                <div className="text-center max-w-2xl mx-auto space-y-3 reveal-on-scroll">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                        Commercial Hub • Web Agency
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Εμπορικός Κατάλογος Υπηρεσιών Web
                    </h1>
                    <p className="text-sm text-zinc-400">Επιλέξτε όσες υπηρεσίες θέλετε και προσθέστε τες απευθείας στο ενιαίο καλάθι σας.</p>
                </div>

                {/* Web Development Catalog Grid with Reveal Animations */}
                <div className="space-y-6 reveal-on-scroll">
                    <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider">1. Υπηρεσίες Ανάπτυξης</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {catalog.map((item, i) => (
                            <div
                                key={i}
                                className="group relative p-6 rounded-3xl border bg-white/[0.02] border-white/10 hover:border-cyan-500/50 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.15)] flex flex-col justify-between cursor-pointer"
                            >
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[10px] font-mono text-cyan-400 font-bold group-hover:tracking-wider transition-all duration-300">{item.cat}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-150 transition-opacity duration-300 animate-pulse" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">{item.title}</h3>
                                    <p className="text-xs text-zinc-400 mt-1 mb-4 leading-relaxed">{item.desc}</p>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <span className="text-xl font-bold font-mono text-white group-hover:scale-105 transition-transform duration-300">{item.price}€</span>
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all duration-300 shadow hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95 cursor-pointer"
                                    >
                                        <ShoppingCart className="w-3.5 h-3.5" />
                                        <span>Προσθήκη στο Καλάθι</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add-ons Section with Reveal Animations */}
                <div className="space-y-6 max-w-3xl mx-auto pt-8 reveal-on-scroll">
                    <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider">2. Προαιρετικά Add-ons</h2>
                    <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-3xl space-y-4">
                        {addonsList.map((addon) => {
                            const isChecked = selectedAddons.includes(addon.id);
                            return (
                                <div
                                    key={addon.id}
                                    onClick={() => toggleAddon(addon.id)}
                                    className={`group p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all duration-300 hover:-translate-y-1 ${isChecked ? "bg-purple-500/10 border-purple-500 shadow-[0_5px_20px_-5px_rgba(168,85,247,0.2)]" : "bg-white/[0.02] border-white/10 hover:border-purple-500/40 hover:bg-white/[0.04]"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isChecked ? "bg-purple-500 border-purple-500 text-black" : "border-white/20"}`}>
                                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                        </div>
                                        <span className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">{addon.name}</span>
                                    </div>
                                    <span className="text-sm font-mono font-bold text-purple-400">+{addon.price}€</span>
                                </div>
                            );
                        })}

                        <div className="pt-4 flex justify-end">
                            <button
                                onClick={handleAddAddonsToCart}
                                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all duration-300 shadow hover:shadow-lg hover:shadow-purple-500/25 active:scale-95 cursor-pointer flex items-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                <span>Προσθήκη Επιλεγμένων Add-ons στο Καλάθι</span>
                            </button>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
