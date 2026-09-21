"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { playNeuralSound } from "@/utils/useSoundFX";

export default function MiltosAIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "ai",
            text: "Γεια σας! Είμαι ο AI Assistant του Μίλτου. Ρωτήστε με ό,τι θέλετε για την εμπειρία του σε Proxmox homelabs, Next.js web apps, Linux systems ή την επαγγελματική του διαθεσιμότητα!"
        }
    ]);
    const [input, setInput] = useState("");

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        playNeuralSound('click');

        const userText = input.trim();
        const newMsgs = [...messages, { role: "user", text: userText }];
        setMessages(newMsgs);
        setInput("");

        setTimeout(() => {
            let aiReply = "Ο Μίλτος Παπαγεωργίου είναι απόφοιτος Πληροφορικής με βαθιά τεχνογνωσία τόσο στο Frontend Development (Next.js, TypeScript, Tailwind) όσο και στο Infrastructure & DevOps (Proxmox VE, Docker, Tailscale Mesh VPN). Στόχος του είναι η δημιουργία ασφαλών, γρήγορων και κλιμακούμενων εφαρμογών.";
            const lower = userText.toLowerCase();

            if (lower.includes("proxmox") || lower.includes("homelab") || lower.includes("server") || lower.includes("linux")) {
                aiReply = "Στον τομέα των υποδομών, ο Μίλτος διαχειρίζεται αυτοτελώς προηγμένα Proxmox VE clusters και LXC containers. Έχει στήσει robust συστήματα με ext4 storage mounts, αυτοματοποιημένα ZFS snapshots και ασφαλή απομακρυσμένη πρόσβαση μέσω Tailscale VPN, χωρίς ποτέ να εκθέτει ports στο δημόσιο internet.";
            } else if (lower.includes("next.js") || lower.includes("react") || lower.includes("web") || lower.includes("stack") || lower.includes("frontend")) {
                aiReply = "Ως Full Stack Developer, αξιοποιεί το Next.js (App Router), TypeScript, Tailwind CSS και Framer Motion. Δημιουργεί εξαιρετικά γρήγορες, SEO-optimized web εφαρμογές με σύγχρονη αρχιτεκτονική και κορυφαία Google Lighthouse scores.";
            } else if (lower.includes("hire") || lower.includes("job") || lower.includes("δουλειά") || lower.includes("cv") || lower.includes("πρόσληψη") || lower.includes("experience") || lower.includes("εμπειρία") || lower.includes("πάντα") || lower.includes("όλα")) {
                aiReply = "Εμπειρία & Background: 1) Απόφοιτος Πληροφορικής με πρακτική εμπειρία σε δίκτυα και Linux. 2) Homelab Enthuasiast με Proxmox, Docker, Nextcloud (συγχρονισμός 6000+ φωτογραφιών) και MariaDB. 3) Web Developer με έμφαση σε high-performance Next.js εφαρμογές. Ο Μίλτος είναι διαθέσιμος για άμεση εργασία (Available for Hire) — μπορείτε να του στείλετε επίσημο Job Offer απευθείας από το καλάθι του site!";
            } else if (lower.includes("backup") || lower.includes("nextcloud") || lower.includes("photos")) {
                aiReply = "Ο Μίλτος διατηρεί αυτοματοποιημένο self-hosted Nextcloud server συνδεδεμένο με Docker containers για απρόσκοπτο backup και συγχρονισμό χιλιάδων φωτογραφιών και αρχείων με απόλυτη ιδιωτικότητα.";
            }

            setMessages([...newMsgs, { role: "ai", text: aiReply }]);
            playNeuralSound('success');
        }, 600);
    };

    return (
        <>
            <div className="fixed bottom-20 sm:bottom-24 left-4 sm:left-6 z-40">
                <button
                    onClick={() => { setIsOpen(true); playNeuralSound('open'); }}
                    className="relative flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_10px_30px_rgba(147,51,234,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                    <Bot className="w-4 h-4 text-cyan-300 animate-pulse" />
                    <span className="hidden sm:inline">Miltos AI Twin</span>
                    <span className="sm:hidden">AI</span>
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="absolute inset-0" />

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-[#0b0c10] border border-purple-500/40 rounded-[30px] p-6 shadow-[0_0_50px_rgba(147,51,234,0.3)] z-10 text-white flex flex-col h-[480px]"
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-500/40">
                                        <Sparkles className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold">Miltos AI Twin (Neural Model)</h3>
                                        <span className="text-[10px] font-mono text-emerald-400">● Full CV & Homelab Knowledge</span>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2 scrollbar-thin">
                                {messages.map((m, i) => (
                                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${m.role === 'user' ? 'bg-cyan-500 text-black font-medium rounded-br-none' : 'bg-white/10 text-zinc-200 rounded-bl-none font-sans border border-white/10'}`}>
                                            {m.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSend} className="pt-3 border-t border-white/10 flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Ρωτήστε για Proxmox, Next.js, εμπειρία..."
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-purple-500"
                                />
                                <button type="submit" className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all cursor-pointer">
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
