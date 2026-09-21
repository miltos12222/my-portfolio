"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { playNeuralSound } from "@/utils/useSoundFX";

export default function MiltosAIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "ai", text: "Γεια σας! Είμαι ο AI Assistant του Μίλτου. Ρωτήστε με ό,τι θέλετε για τις δεξιότητές του σε Proxmox, Next.js ή Linux!" }
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
            let aiReply = "Ο Μίλτος εξειδικεύεται σε Next.js, Proxmox VE και Docker automations με έμφαση στην υψηλή διαθεσιμότητα.";
            const lower = userText.toLowerCase();

            if (lower.includes("proxmox") || lower.includes("homelab") || lower.includes("server")) {
                aiReply = "Ο Μίλτος διαχειρίζεται προηγμένα Proxmox clusters, LXC containers, ext4 storage mounts και ασφαλή Tailscale VPN mesh networks!";
            } else if (lower.includes("next.js") || lower.includes("react") || lower.includes("web") || lower.includes("stack")) {
                aiReply = "Χρησιμοποιεί Next.js App Router, TypeScript, Tailwind CSS και Framer Motion για ultra-fast 2030-ready web applications.";
            } else if (lower.includes("hire") || lower.includes("job") || lower.includes("δουλειά") || lower.includes("cv") || lower.includes("πρόσληψη")) {
                aiReply = "Ο Μίλτος είναι διαθέσιμος για άμεση πρόσληψη (Available for Hire)! Μπορείτε να του στείλετε απευθείας Job Offer μέσω του καλαθιού / Offer Hub.";
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
                            className="relative w-full max-w-lg bg-[#0b0c10] border border-purple-500/40 rounded-[30px] p-6 shadow-[0_0_50px_rgba(147,51,234,0.3)] z-10 text-white flex flex-col h-[450px]"
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-500/40">
                                        <Sparkles className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold">Miltos AI Twin (Neural Model)</h3>
                                        <span className="text-[10px] font-mono text-emerald-400">● Online & Trained on CV</span>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2 scrollbar-thin">
                                {messages.map((m, i) => (
                                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${m.role === 'user' ? 'bg-cyan-500 text-black font-medium rounded-br-none' : 'bg-white/10 text-zinc-200 rounded-bl-none font-sans border border-white/10'}`}>
                                            {m.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSend} className="pt-3 border-t border-white/10 flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Ρωτήστε κάτι για τον Μίλτο..."
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
