"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Home, User, Server, Briefcase, Mail, Download, Copy, X, Terminal, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const EMAIL = "miltospapageorgiu066@gmail.com";

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        const openMenu = () => setOpen(true);

        document.addEventListener("keydown", down);
        window.addEventListener("open-command-palette", openMenu);

        return () => {
            document.removeEventListener("keydown", down);
            window.removeEventListener("open-command-palette", openMenu);
        };
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center bg-[#0b0c10]/80 backdrop-blur-md pt-[15vh] p-4 animate-fade-in-up" onClick={() => setOpen(false)}>
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-[#12131a] shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)] flex flex-col">
                <Command className="w-full h-full flex flex-col" label="Command Menu">
                    <div className="flex items-center border-b border-white/10 px-4">
                        <Terminal className="w-5 h-5 text-cyan-400 mr-2" />
                        <Command.Input
                            autoFocus
                            placeholder="Πληκτρολόγησε μια εντολή ή αναζήτηση..."
                            className="w-full bg-transparent py-4 text-base text-white placeholder:text-zinc-500 focus:outline-none border-none ring-0"
                        />
                        <button onClick={() => setOpen(false)} className="ml-2 text-zinc-500 hover:text-white transition-colors bg-white/5 rounded-md p-1">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <Command.List className="max-h-[350px] overflow-y-auto p-2 text-sm text-zinc-400 scrollbar-thin scrollbar-thumb-white/10">
                        <Command.Empty className="py-6 text-center text-sm text-zinc-500">Δεν βρέθηκαν αποτελέσματα.</Command.Empty>

                        <Command.Group heading="ΠΛΟΗΓΗΣΗ" className="px-2 py-2 text-xs font-mono text-zinc-500">
                            <Command.Item onSelect={() => runCommand(() => window.location.href = "#top")} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/10 hover:text-white transition-colors mt-1">
                                <Home className="w-4 h-4 text-cyan-400" /> Αρχική Σελίδα
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => window.location.href = "#about-me")} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/10 hover:text-white transition-colors mt-1">
                                <User className="w-4 h-4 text-purple-400" /> Σχετικά με Εμένα
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => window.location.href = "#infrastructure")} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/10 hover:text-white transition-colors mt-1">
                                <Server className="w-4 h-4 text-emerald-400" /> Homelab & Υποδομές
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => window.location.href = "#projects")} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/10 hover:text-white transition-colors mt-1">
                                <Briefcase className="w-4 h-4 text-amber-400" /> Τεχνικά Projects
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => window.location.href = "#contact")} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/10 hover:text-white transition-colors mt-1">
                                <Mail className="w-4 h-4 text-red-400" /> Φόρμα Επικοινωνίας
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="ΕΠΙΚΟΙΝΩΝΙΑ & ΣΥΝΔΕΣΜΟΙ" className="px-2 py-2 text-xs font-mono text-zinc-500 mt-2 border-t border-white/5 pt-3">
                            <Command.Item onSelect={() => runCommand(() => { window.location.href = `mailto:${EMAIL}`; })} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/10 hover:text-white transition-colors mt-1">
                                <ExternalLink className="w-4 h-4 text-cyan-400" /> Αποστολή Email ({EMAIL})
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => { navigator.clipboard.writeText(EMAIL); toast.success("Το email αντιγράφηκε στο πρόχειρο!"); })} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/10 hover:text-white transition-colors mt-1">
                                <Copy className="w-4 h-4 text-zinc-300" /> Αντιγραφή Email
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => { window.location.href = "/cv.pdf"; toast.success("Ξεκινάει η λήψη του CV..."); })} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/10 hover:text-white transition-colors mt-1">
                                <Download className="w-4 h-4 text-blue-400" /> Κατέβασμα Βιογραφικού (PDF)
                            </Command.Item>
                        </Command.Group>
                    </Command.List>

                    <div className="border-t border-white/5 p-3 flex justify-end gap-2 bg-[#0b0c10]">
                        <span className="text-[10px] text-zinc-500 flex items-center gap-1 font-mono">Χρησιμοποιήστε τα βελάκια <span className="bg-white/10 px-1 rounded text-white">↑</span> <span className="bg-white/10 px-1 rounded text-white">↓</span> για πλοήγηση</span>
                    </div>
                </Command>
            </div>
        </div>
    );
}
