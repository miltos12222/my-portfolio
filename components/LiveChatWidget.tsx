"use client";

import { useState } from "react";
import { MessageSquare, X, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function LiveChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleQuickOption = (topic: string) => {
        setMessage(`Γεια σας! Ενδιαφέρομαι για: ${topic}`);
    };

    const handleSendChat = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: "Live Chat Visitor",
                    email: "visitor@chat.local",
                    serviceTitle: "Live Chat Inquiry",
                    servicePrice: "Chat",
                    message: message,
                }),
            });

            if (res.ok) {
                setSubmitted(true);
                toast.success("Το μήνυμά σας στάλθηκε στον Μίλτο!");
                setTimeout(() => {
                    setSubmitted(false);
                    setMessage("");
                    setIsOpen(false);
                }, 3000);
            } else {
                toast.error("Σφάλμα αποστολής μηνύματος.");
            }
        } catch (err) {
            toast.error("Σφάλμα σύνδεσης.");
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window Popup */}
            {isOpen && (
                <div className="mb-4 w-[340px] sm:w-[380px] bg-[#12131c] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-4 border-b border-white/15 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-2xl bg-cyan-500 text-black font-bold flex items-center justify-center font-mono text-sm">
                                    MP
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#12131c] animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-white">Miltos Papageorgiou</h3>
                                <p className="text-[10px] font-mono text-cyan-400">Online • Συνήθως απαντάει άμεσα</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Body / Chat Content */}
                    <div className="p-4 space-y-4 max-h-[320px] overflow-y-auto text-xs">
                        <div className="bg-white/[0.04] border border-white/10 p-3.5 rounded-2xl rounded-tl-sm space-y-1 text-zinc-300">
                            <p className="font-semibold text-white flex items-center gap-1">
                                <span>Γεια σας! 👋</span>
                            </p>
                            <p>Πώς μπορώ να σας βοηθήσω σήμερα με το project, το PC build ή τις υποδομές σας;</p>
                        </div>

                        {/* Quick Action Chips */}
                        {!submitted && (
                            <div className="space-y-1.5 pt-1">
                                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Γρήγορη Επιλογή:</p>
                                <div className="flex flex-wrap gap-1.5">
                                    <button type="button" onClick={() => handleQuickOption("Custom PC Building")} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 transition-all cursor-pointer">
                                        🖥️ Custom PC
                                    </button>
                                    <button type="button" onClick={() => handleQuickOption("Web Development / E-shop")} className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 transition-all cursor-pointer">
                                        💻 Web Agency
                                    </button>
                                    <button type="button" onClick={() => handleQuickOption("DevOps & Cloud Migration")} className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 transition-all cursor-pointer">
                                        ☁️ DevOps / Cloud
                                    </button>
                                </div>
                            </div>
                        )}

                        {submitted && (
                            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-center space-y-2">
                                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                                <p className="font-bold text-white text-xs">Το μήνυμα στάλθηκε!</p>
                                <p className="text-[11px] text-zinc-400">Ευχαριστώ, θα επικοινωνήσω μαζί σας το συντομότερο δυνατόν.</p>
                            </div>
                        )}
                    </div>

                    {/* Footer Input Form */}
                    {!submitted && (
                        <form onSubmit={handleSendChat} className="p-3 border-t border-white/10 bg-black/20 flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Γράψτε το μήνυμά σας..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
                            />
                            <button
                                type="submit"
                                className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all cursor-pointer shadow"
                            >
                                <Send className="w-3.5 h-3.5" />
                            </button>
                        </form>
                    )}
                </div>
            )}

            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative group flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-500 text-black shadow-2xl hover:scale-105 transition-transform cursor-pointer"
                title="Live Chat Assistant"
            >
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0b0c10] animate-bounce" />
                {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}
            </button>
        </div>
    );
}
