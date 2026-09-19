"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Code2, ShieldAlert, Check, X, ArrowRight } from "lucide-react";

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
        period: "εφάπαξ",
        description: "Πλήρες στήσιμο οικιακού ή μικρού επαγγελματικού server & cloud.",
        features: [
            "Εγκατάσταση Proxmox VE / Docker LXC containers",
            "Στήσιμο Nextcloud & εξωτερικού αποθηκευτικού χώρου",
            "Tailscale Mesh VPN για ασφαλή πρόσβαση από παντού",
        ],
        icon: Server,
    },
    {
        id: "webdev",
        badge: "WEB & CLOUD SOLUTIONS",
        badgeColor: "bg-purple-500/10 border-purple-500/20 text-purple-400",
        title: "Web Dev & Hosting Setup",
        price: "€250",
        period: "εφάπαξ",
        description: "Δημιουργία Portfolio/Landing page & πλήρης παραμετροποίηση.",
        features: [
            "Custom Modern Landing Page (Next.js / React / Tailwind)",
            "Σύνδεση Custom Domain & αυτόματα SSL Πιστοποιητικά",
            "Deployment σε Vercel / Cloudflare / Custom VPS",
        ],
        icon: Code2,
    },
    {
        id: "security",
        badge: "CYBERSECURITY",
        badgeColor: "bg-blue-500/10 border-blue-500/20 text-blue-400",
        title: "System & Network Security Audit",
        price: "€180",
        period: "εφάπαξ",
        description: "Έλεγχος ευπαθειών και θωράκιση δικτύου/υποδομών.",
        features: [
            "Vulnerability Scanning & Open Port Analysis (Nmap/Kali)",
            "Hardening SSH, Firewall & Access Control Rules",
            "Ρύθμιση Nginx Reverse Proxy & Cloudflare WAF",
        ],
        icon: ShieldAlert,
    },
];

export default function ServicesSection() {
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    return (
        <section id="services" className="space-y-6 my-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                    Εξειδικευμένες Υπηρεσίες & Πακέτα
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400">
                    Επιλέξτε το πακέτο που ταιριάζει στις ανάγκες σας ή επικοινωνήστε για προσαρμοσμένη λύση.
                </p>
            </div>

            {/* Grid Πακέτων */}
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
                                onClick={() => setSelectedService(service)}
                                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all flex items-center justify-center gap-2 group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-400"
                            >
                                <span>Επιλογή Πακέτου</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Modal Φόρμας Παραγγελίας */}
            <AnimatePresence>
                {selectedService && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-lg rounded-3xl bg-[#12141c] border border-white/15 p-6 sm:p-8 shadow-2xl"
                        >
                            {/* Κουμπί Κλεισίματος */}
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="mb-6">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-1">
                                    ΑΙΤΗΜΑ ΠΑΡΑΓΓΕΛΙΑΣ
                                </span>
                                <h3 className="text-xl font-bold text-white">
                                    {selectedService.title} ({selectedService.price})
                                </h3>
                            </div>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.currentTarget);
                                    const name = formData.get("name");
                                    const email = formData.get("email");
                                    const message = formData.get("message");

                                    const subject = encodeURIComponent(`Αίτημα Παραγγελίας: ${selectedService.title}`);
                                    const body = encodeURIComponent(
                                        `Ονοματεπώνυμο: ${name}\nEmail Επικοινωνίας: ${email}\nΠακέτο: ${selectedService.title} (${selectedService.price})\n\nΛεπτομέρειες / Σημειώσεις:\n${message}`
                                    );

                                    window.location.href = `mailto:elanaspww@gmail.com?subject=${subject}&body=${body}`;
                                    setSelectedService(null);
                                }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                                        Ονοματεπώνυμο
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="π.χ. Μίλτος Παπαγεωργίου"
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                                        Email Επικοινωνίας
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
                                        Λεπτομέρειες / Σημειώσεις
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={3}
                                        placeholder="Περιγράψτε τι ακριβώς χρειάζεστε..."
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-all resize-none"
                                    ></textarea>
                                </div>

                                <p className="text-[11px] text-zinc-500 pt-1">
                                    * Πατώντας «Αποστολή Αιτήματος» θα ανοίξει η εφαρμογή email σας για να στείλετε το αίτημα απευθείας στο email μου.
                                </p>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all"
                                    >
                                        Αποστολή Αιτήματος
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
