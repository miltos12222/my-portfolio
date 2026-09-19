'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Globe, ShieldCheck, Check, Send, X, Sparkles } from 'lucide-react';

interface ServicePackage {
    id: string;
    badge: string;
    title: string;
    price: string;
    description: string;
    popular?: boolean;
    icon: any;
    features: string[];
}

const services: ServicePackage[] = [
    {
        id: 'homelab',
        badge: 'Basic / Infrastructure',
        title: 'Homelab & Server Setup',
        price: '€120',
        description: 'Πλήρες στήσιμο οικιακού ή μικρού επαγγελματικού server & cloud.',
        icon: Server,
        features: [
            'Εγκατάσταση Proxmox VE / Docker LXC containers',
            'Στήσιμο Nextcloud & εξωτερικού αποθηκευτικού χώρου',
            'Tailscale Mesh VPN για ασφαλή πρόσβαση από παντού',
            'Βασικές ρυθμίσεις Firewall, Fail2ban & Security Hardening'
        ]
    },
    {
        id: 'webdev',
        badge: 'Web & Cloud Solutions',
        title: 'Web Dev & Hosting Setup',
        price: '€250',
        popular: true,
        description: 'Δημιουργία Portfolio/Landing page & πλήρης παραμετροποίηση.',
        icon: Globe,
        features: [
            'Custom Modern Landing Page (Next.js / React / Tailwind)',
            'Σύνδεση Custom Domain & αυτόματα SSL Πιστοποιητικά',
            'Deployment σε Vercel / Cloudflare / Custom VPS',
            'Βέλτιστη ταχύτητα, SEO Optimization & Mobile Responsiveness'
        ]
    },
    {
        id: 'security',
        badge: 'Cybersecurity',
        title: 'System & Network Security Audit',
        price: '€180',
        description: 'Έλεγχος ευπαθειών και θωράκιση δικτύου/υποδομών.',
        icon: ShieldCheck,
        features: [
            'Vulnerability Scanning & Open Port Analysis (Nmap/Kali)',
            'Hardening SSH, Firewall & Access Control Rules',
            'Ρύθμιση Nginx Reverse Proxy & Cloudflare WAF',
            'Αναλυτικό PDF Report με ευρήματα & οδηγίες θωράκισης'
        ]
    }
];

export default function ServicesSection() {
    const [selectedService, setSelectedService] = useState<ServicePackage | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (service: ServicePackage) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section id="services" className="py-20 px-4 max-w-7xl mx-auto relative">
            {/* SECTION HEADER */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Professional IT Services</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                    Ηλεκτρονικές Υπηρεσίες & Πακέτα
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
                    Εξειδικευμένες λύσεις SysAdmin, Virtualization, Web Development & Cybersecurity με απόλυτη διαφάνεια.
                </p>
            </div>

            {/* CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service) => {
                    const Icon = service.icon;
                    return (
                        <div
                            key={service.id}
                            className={`relative rounded-2xl bg-slate-900/80 border p-8 flex flex-col justify-between backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${service.popular
                                ? 'border-blue-500 shadow-2xl shadow-blue-500/10 ring-1 ring-blue-500/50'
                                : 'border-slate-800 hover:border-slate-700 shadow-xl'
                                }`}
                        >
                            {service.popular && (
                                <div className="absolute -top-3 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                    Δημοφιλες
                                </div>
                            )}

                            <div>
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                                    <Icon className="w-6 h-6" />
                                </div>

                                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                                    {service.badge}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">{service.description}</p>

                                <div className="mb-6 pb-6 border-b border-slate-800">
                                    <span className="text-4xl font-extrabold text-white">{service.price}</span>
                                    <span className="text-slate-500 text-sm font-medium"> / εφάπαξ</span>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                            <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => handleOpenModal(service)}
                                className={`w-full py-3.5 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${service.popular
                                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                                    }`}
                            >
                                <span>Επιλογή & Παραγγελία</span>
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* MODAL FORM */}
            <AnimatePresence>
                {isModalOpen && selectedService && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="mb-6">
                                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                                    Αίτημα Παραγγελίας
                                </span>
                                <h3 className="text-xl font-bold text-white mt-1">
                                    {selectedService.title} ({selectedService.price})
                                </h3>
                            </div>

                            <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="space-y-4">
                                <input type="hidden" name="service" value={selectedService.title} />
                                <input type="hidden" name="price" value={selectedService.price} />

                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                                        Ονοματεπώνυμο
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Γιάννης Παπαδόπουλος"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                                        Email Επικοινωνίας
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="name@example.com"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                                        Λεπτομέρειες / Σημειώσεις
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={3}
                                        placeholder="Περιγράψτε εν συντομία τι θέλετε να υλοποιήσουμε..."
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none text-sm"
                                    ></textarea>
                                </div>

                                <p className="text-[11px] text-slate-500">
                                    * Με την αποστολή, θα επικοινωνήσω μαζί σας στο email σας για επιβεβαίωση και στοιχεία πληρωμής (PayPal / Τραπεζική κατάθεση).
                                </p>

                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 text-sm"
                                >
                                    Αποστολή Αιτήματος
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
