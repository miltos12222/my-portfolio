"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

interface TechBubbleModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    date: string;
    content: string;
}

export default function TechBubbleModal({ isOpen, onClose, title, date, content }: TechBubbleModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        onClick={onClose}
                        className="absolute inset-0 cursor-pointer"
                    />

                    {/* Floating Cloud / Bubble Window */}
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: [0, -6, 0],
                        }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{
                            scale: { duration: 0.2, ease: "easeOut" },
                            y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                        }}
                        className="relative w-full max-w-lg bg-[#12131c] border border-cyan-500/50 rounded-[30px] sm:rounded-[35px] p-6 sm:p-8 shadow-[0_0_60px_rgba(6,182,212,0.4)] z-10 text-white overflow-hidden"
                    >
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                                {date}
                            </span>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer active:scale-90"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                                {title}
                            </h2>
                            <div className="text-sm text-zinc-300 leading-relaxed font-sans space-y-3 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-cyan-500/20">
                                <p>{content}</p>
                                <p className="text-xs text-zinc-400 italic pt-2 border-t border-white/5">
                                    — Interactive Architecture Note by Miltos Papageorgiou.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end relative z-10">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 cursor-pointer"
                            >
                                Κλείσιμο
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
