"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Terminal } from "lucide-react";

interface CollapsibleCardProps {
    title: string;
    subtitle: string;
    tags: string[];
    summary: string;
    detailedAnalysis: string[];
    icon?: React.ReactNode;
}

export default function CollapsibleCard({
    title,
    subtitle,
    tags,
    summary,
    detailedAnalysis,
    icon,
}: CollapsibleCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-[#0d0e18]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:border-white/20 shadow-xl flex flex-col justify-between">
            <div>
                {/* Top meta & Icon */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                        {subtitle}
                    </span>
                    <div className="p-2 rounded-2xl bg-white/[0.04] border border-white/10 text-gray-300">
                        {icon || <Terminal className="h-4 w-4" />}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
                    {title}
                </h3>

                {/* Initial Summary */}
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    {summary}
                </p>

                {/* Dropdown Expandable Content */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="pt-3 pb-4 border-t border-white/10 mt-3 space-y-2.5">
                                <span className="text-[11px] font-mono text-cyan-400/80 uppercase tracking-wider block">
                                    &gt; Techniki Analysi & Arxitektoniki:
                                </span>
                                {detailedAnalysis.map((point, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                                        <span className="text-cyan-400 font-mono mt-0.5">•</span>
                                        <span>{point}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer: Tags & Toggle Button */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-4">
                <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs text-gray-200 transition-all font-medium"
                >
                    <span>{isOpen ? "Ligotera" : "Analysi"}</span>
                    <ChevronDown
                        className={`h-3.5 w-3.5 text-cyan-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>
            </div>
        </div>
    );
}
