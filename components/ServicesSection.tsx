"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Code2, ShieldAlert, Check, X, ArrowRight, Loader2 } from "lucide-react";

interface Service {
    id: string;
    badge: string;
    badgeColor: string;
    title: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    icon: any;
}

const services: Service[] = [
    {
        id: "homelab",
        badge: "BASIC / INFRASTRUCTURE",
        badgeColor: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
        title: "Homelab & Server Setup",
        price: "€120",
        period: "efapax",
        description: "Plires stisimo oikiakou i mikrou epangelmatikou server & cloud.",
        features: [
            "Egkatastasi Proxmox VE / Docker LXC containers",
            "Stisimo Nextcloud & exoterikou apothikeutikou chorou",
            "Tailscale Mesh VPN gia asfali prosbasi apo pantou",
        ],
        icon: Server,
    },
    {
        id: "webdev",
        badge: "WEB & CLOUD SOLUTIONS",
        badgeColor: "bg-purple-500/10 border-purple-500/20 text-purple-400",
        title: "Web Dev & Hosting Setup",
        price: "€250",
        period: "efapax",
        description: "Dimiourgia Portfolio/Landing page & pliris parametropoisi.",
        features: [
            "Custom Modern Landing Page (Next.js / React / Tailwind)",
            "Syndesi Custom Domain & automata SSL Pistopointika",
            "Deployment se Vercel / Cloudflare / Custom VPS",
        ],
        icon: Code2,
    },
    {
        id: "security",
        badge: "CYBERSECURITY",
        badgeColor: "bg-blue-500/10 border-blue-500/20 text-blue-400",
        title: "System & Network Security Audit",
        price: "€180",
        period: "efapax",
        description: "Elenchos eupatheion kai thorakisi diktyou/ypodomon.",
        features: [
            "Vulnerability Scanning & Open Port Analysis (Nmap/Kali)",
            "Hardening SSH, Firewall & Access Control Rules",
            "Rhythmisi Nginx Reverse Proxy & Cloudflare WAF",
        ],
        icon: ShieldAlert,
    },
];

export default function ServicesSection() {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedService) return;

        setLoading(true);
        setStatus("idle");

        const formData = new FormData(e.currentTarget);
        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
            serviceTitle: selectedService.title,
            servicePrice: selectedService.price,
        };

        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setStatus("success");
                setTimeout(() => {
                    setSelectedService(null);
                    setStatus("idle");
                }, 2000);
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="services" className="space-y-6 my-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                    Exeidikeumenes Ypiresies & Paketa
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400">
                    Epilexte to paketo pou tairiazei stis anagkes sas i epikoinoniste gia prosarmosmeni lysi.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service) => {
                    const IconComponent = service.icon;
                    return (
                        <div
                            key={service.id}
                            className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all duration-300"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-mono tracking-wider ${service.badgeColor}`}
                                    >
                                        {service.badge}
                                    </span>
                                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
                                        <IconComponent className="w-5 h-5" />
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-3xl font-extrabold text-white">{service.price}</span>
                                    <span className="text-xs text-zinc-400">/ {service.period}</span>
                                </div>

                                <ul className="space-y-3 mb-8 border-t border-white/5 pt-6">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                                            <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => {
                                    setSelectedService(service);
                                    setStatus("idle");
                                }}
                                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all flex items-center justify-center gap-2 group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-400"
                            >
                                <span>Epilogi Paketou</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedService && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-lg rounded-3xl bg-[#12141c] border border-white/15 p-6 sm:p-8 shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="mb-6">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-1">
                                    AITIMA PARANGELIAS
                                </span>
                                <h3 className="text-xl font-bold text-white">
                                    {selectedService.title} ({selectedService.price})
                                </h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                                        Onomateponymo
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="p.ch. Miltos Papageorgiou"
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                                        Email Epikoinonias
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="name@example.com"
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                                        Leptomereies / Simeioseis
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={3}
                                        placeholder="Perigrapste ti akribos chreiazeste..."
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-all resize-none"
                                    ></textarea>
                                </div>

                                {status === "success" && (
                                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium text-center">
                                        ✓ To aitima sas stalthike epitychos!
                                    </div>
                                )}

                                {status === "error" && (
                                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center">
                                        ✕ Apotychia apostolis. Parakaloumedokimaste xana.
                                    </div>
                                )}

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold text-sm transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Apostoli...</span>
                                            </>
                                        ) : (
                                            <span>Apostoli Aitimatos</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
