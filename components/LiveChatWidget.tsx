"use client";

import { useState } from "react";
import { MessageSquare, X, Send, CheckCircle2, ArrowRight, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function LiveChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<"menu" | "pc" | "web" | "devops" | "success">("menu");

    // States for selections
    const [pcCategory, setPcCategory] = useState("Gaming PC");
    const [pcRam, setPcRam] = useState("32GB DDR5");
    const [webType, setWebType] = useState("Landing Page / Portfolio");
    const [devopsTask, setDevopsTask] = useState("Cloud / VPS Migration");

    // Contact Info
    const [clientName, setClientName] = useState("");
    const [clientContact, setClientContact] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleReset = () => {
        setStep("menu");
        setClientName("");
        setClientContact("");
    };

    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clientName.trim() || !clientContact.trim()) {
            toast.error("Συμπληρώστε όνομα και email/τηλέφωνο.");
            return;
        }

        setIsSubmitting(true);

        let summary = "";
        let serviceTitle = "";

        if (step === "pc") {
            serviceTitle = `Chat PC Build: ${pcCategory}`;
            summary = `Custom PC Configuration:\n- Category: ${pcCategory}\n- RAM: ${pcRam}`;
        } else if (step === "web") {
            serviceTitle = `Chat Web Agency: ${webType}`;
            summary = `Web Agency Request:\n- Project Type: ${webType}`;
        } else if (step === "devops") {
            serviceTitle = `Chat DevOps: ${devopsTask}`;
            summary = `DevOps & Cloud Request:\n- Task: ${devopsTask}`;
        } else {
            serviceTitle = `General Chat Inquiry`;
            summary = `General Inquiry from Live Chat`;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: clientName,
                    email: clientContact,
                    serviceTitle: serviceTitle,
                    servicePrice: "Chat Estimate",
                    message: `${summary}\n\nContact Info: ${clientContact}`,
                }),
            });

            if (res.ok) {
                setStep("success");
                toast.success("Το αίτημά σας στάλθηκε επιτυχώς!");
            } else {
                toast.error("Σφάλμα αποστολής.");
            }
        } catch (err) {
            toast.error("Σφάλμα σύνδεσης.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window Popup */}
            {isOpen && (
                <div className="mb-4 w-[360px] sm:w-[400px] bg-[#12131c] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in text-xs">
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
                                <p className="text-[10px] font-mono text-cyan-400">Pro Tech Assistant • Online</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            {step !== "menu" && step !== "success" && (
                                <button onClick={handleReset} title="Αρχική" className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                                    <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                            )}
                            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-4 space-y-4 max-h-[360px] overflow-y-auto">

                        {/* INITIAL MENU STEP */}
                        {step === "menu" && (
                            <div className="space-y-3">
                                <div className="bg-white/[0.04] border border-white/10 p-3.5 rounded-2xl rounded-tl-sm space-y-1 text-zinc-300">
                                    <p className="font-semibold text-white">Γεια σας! 👋</p>
                                    <p>Επιλέξτε παρακάτω τι ακριβώς θέλετε να φτιάξουμε ή να συζητήσουμε:</p>
                                </div>

                                <div className="grid grid-cols-1 gap-2 pt-1">
                                    <button onClick={() => setStep("pc")} className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium flex items-center justify-between transition-all cursor-pointer">
                                        <span>🖥️ Custom PC / Hardware Build</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setStep("web")} className="p-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-medium flex items-center justify-between transition-all cursor-pointer">
                                        💻 Web Agency & E-shop
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setStep("devops")} className="p-3 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-medium flex items-center justify-between transition-all cursor-pointer">
                                        ☁️ DevOps & Cloud Migration
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 1: CUSTOM PC BUILD CONFIGURATOR */}
                        {step === "pc" && (
                            <div className="space-y-3">
                                <div className="bg-white/[0.04] border border-white/10 p-3 rounded-2xl text-zinc-300">
                                    <p className="font-bold text-white mb-1">🖥️ Custom PC Configurator</p>
                                    <p className="text-[11px] text-zinc-400">Διαλέξτε κατηγορία και μνήμη RAM για το σύστημά σας:</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-zinc-400">Κατηγορία Χρήσης:</label>
                                    <select value={pcCategory} onChange={(e) => setPcCategory(e.target.value)} className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500">
                                        <option value="Gaming PC (High FPS)" className="bg-zinc-900">Gaming PC (High FPS)</option>
                                        <option value="Pro Workstation (Rendering)" className="bg-zinc-900">Pro Workstation (Rendering)</option>
                                        <option value="AI / LLM Development Rig" className="bg-zinc-900">AI / LLM Development Rig</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-zinc-400">Επιλογή RAM:</label>
                                    <select value={pcRam} onChange={(e) => setPcRam(e.target.value)} className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500">
                                        <option value="32GB DDR5 Fast Kit" className="bg-zinc-900">32GB DDR5 Fast Kit</option>
                                        <option value="64GB DDR5 High Capacity" className="bg-zinc-900">64GB DDR5 High Capacity</option>
                                        <option value="128GB ECC Server Kit" className="bg-zinc-900">128GB ECC Server Kit</option>
                                    </select>
                                </div>

                                <form onSubmit={handleFinalSubmit} className="space-y-3 pt-2 border-t border-white/10">
                                    <input type="text" required placeholder="Το ονοματεπώνυμό σας" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500" />
                                    <input type="text" required placeholder="Email ή Τηλέφωνο επικοινωνίας" value={clientContact} onChange={(e) => setClientContact(e.target.value)} className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500" />

                                    <button type="submit" disabled={isSubmitting} className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all shadow cursor-pointer flex items-center justify-center gap-2">
                                        <Send className="w-3.5 h-3.5" />
                                        <span>{isSubmitting ? "Αποστολή..." : "Αποστολή Διαμόρφωσης PC"}</span>
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* STEP 2: WEB AGENCY */}
                        {step === "web" && (
                            <div className="space-y-3">
                                <div className="bg-white/[0.04] border border-white/10 p-3 rounded-2xl text-zinc-300">
                                    <p className="font-bold text-white mb-1">💻 Web Agency & E-shop</p>
                                    <p className="text-[11px] text-zinc-400">Τι είδους εφαρμογή ή ιστοσελίδα χρειάζεστε;</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-zinc-400">Τύπος Project:</label>
                                    <select value={webType} onChange={(e) => setWebType(e.target.value)} className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500">
                                        <option value="Landing Page (Fast One-Pager)" className="bg-zinc-900">Landing Page (Fast One-Pager)</option>
                                        <option value="Business App / E-shop" className="bg-zinc-900">Business App / E-shop</option>
                                        <option value="Custom Full-Stack App" className="bg-zinc-900">Custom Full-Stack App</option>
                                    </select>
                                </div>

                                <form onSubmit={handleFinalSubmit} className="space-y-3 pt-2 border-t border-white/10">
                                    <input type="text" required placeholder="Το ονοματεπώνυμό σας" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500" />
                                    <input type="text" required placeholder="Email ή Τηλέφωνο επικοινωνίας" value={clientContact} onChange={(e) => setClientContact(e.target.value)} className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500" />

                                    <button type="submit" disabled={isSubmitting} className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all shadow cursor-pointer flex items-center justify-center gap-2">
                                        <Send className="w-3.5 h-3.5" />
                                        <span>{isSubmitting ? "Αποστολή..." : "Αποστολή Αιτήματος Web"}</span>
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* STEP 3: DEVOPS */}
                        {step === "devops" && (
                            <div className="space-y-3">
                                <div className="bg-white/[0.04] border border-white/10 p-3 rounded-2xl text-zinc-300">
                                    <p className="font-bold text-white mb-1">☁️ DevOps & Cloud</p>
                                    <p className="text-[11px] text-zinc-400">Επιλέξτε την υπηρεσία υποδομής που χρειάζεστε:</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-zinc-400">Υπηρεσία DevOps:</label>
                                    <select value={devopsTask} onChange={(e) => setDevopsTask(e.target.value)} className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500">
                                        <option value="Cloud & VPS Migration" className="bg-zinc-900">Cloud & VPS Migration</option>
                                        <option value="Business Backups & Disaster Recovery" className="bg-zinc-900">Business Backups & Disaster Recovery</option>
                                        <option value="API & Webhook Automations" className="bg-zinc-900">API & Webhook Automations</option>
                                    </select>
                                </div>

                                <form onSubmit={handleFinalSubmit} className="space-y-3 pt-2 border-t border-white/10">
                                    <input type="text" required placeholder="Το ονοματεπώνυμό σας" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500" />
                                    <input type="text" required placeholder="Email ή Τηλέφωνο επικοινωνίας" value={clientContact} onChange={(e) => setClientContact(e.target.value)} className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500" />

                                    <button type="submit" disabled={isSubmitting} className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow cursor-pointer flex items-center justify-center gap-2">
                                        <Send className="w-3.5 h-3.5" />
                                        <span>{isSubmitting ? "Αποστολή..." : "Αποστολή Αιτήματος DevOps"}</span>
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* SUCCESS SCREEN */}
                        {step === "success" && (
                            <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-3">
                                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                                <p className="font-bold text-white text-sm">Το αίτημά σας καταχωρήθηκε!</p>
                                <p className="text-[11px] text-zinc-300">Τα specs και τα στοιχεία σας στάλθηκαν με επιτυχία στον Μίλτο. Θα επικοινωνήσει μαζί σας άμεσα!</p>
                                <button onClick={handleReset} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer">
                                    Νέα Συνομιλία
                                </button>
                            </div>
                        )}

                    </div>
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
