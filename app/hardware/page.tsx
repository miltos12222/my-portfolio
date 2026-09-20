"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Cpu, ArrowRight, ArrowLeft, Send, ShoppingBag, Briefcase, Sliders, Monitor, HardDrive, MemoryStick, Terminal, Wrench, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export default function HardwarePage() {
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    const [mode, setMode] = useState<"builder" | "repair">("builder");
    const [step, setStep] = useState<1 | 2>(1);
    const [buildCategory, setBuildCategory] = useState<"gaming" | "workstation" | "ai">("gaming");

    // Configurator Options state
    const [selectedRam, setSelectedRam] = useState(32);
    const [selectedStorage, setSelectedStorage] = useState(2);
    const [selectedGpuTier, setSelectedGpuTier] = useState("Mid-Range (RTX 4070 / RX 7800 XT)");
    const [selectedMonitor, setSelectedMonitor] = useState('27" 1440p IPS 170Hz');
    const [selectedSoftware, setSelectedSoftware] = useState("Windows 11 Pro (Clean Install & Drivers)");

    // Repair Service State
    const [selectedRepair, setSelectedRepair] = useState("Γενική Διάγνωση & Troubleshooting (30€)");

    const [assemblyFee, setAssemblyFee] = useState(120);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Auto-adjust default options when category changes
    useEffect(() => {
        if (buildCategory === "gaming") {
            setSelectedGpuTier("Mid-Range (RTX 4070 / RX 7800 XT)");
            setSelectedRam(32);
        } else if (buildCategory === "workstation") {
            setSelectedGpuTier("Pro NVIDIA ProArt / Radeon Pro");
            setSelectedRam(64);
        } else if (buildCategory === "ai") {
            setSelectedGpuTier("Enthusiast / Dual GPU (RTX 4090 / AI Setup)");
            setSelectedRam(128);
        }
    }, [buildCategory]);

    const repairServices = [
        { title: "Γενική Διάγνωση & Troubleshooting", price: 30, desc: "Εντοπισμός βλάβης σε hardware ή software, έλεγχος τροφοδοτικού, μητρικής και μνημών." },
        { title: "Service Λαπτοπ & Desktop (Καθαρισμός + Πάστα)", price: 45, desc: "Βαθύς καθαρισμός από σκόνες, αλλαγή κορυφαίας θερμοαγώγιμης πάστας και έλεγχος θερμοκρασιών." },
        { title: "Format & Εγκατάσταση Λογισμικού / Drivers", price: 40, desc: "Καθαρή εγκατάσταση Windows/Linux, πέρασμα όλων των τελευταίων drivers και optimization." },
        { title: "Αναβάθμιση Υλικού (Hardware Upgrade)", price: 35, desc: "Τοποθέτηση νέου SSD, προσθήκη RAM ή αλλαγή κάρτας γραφικών με ελέγχους συμβατότητας." }
    ];

    // Realistic Price Calculation Algorithm
    const calculateTotalEstimate = () => {
        let base = buildCategory === "gaming" ? 1100 : buildCategory === "workstation" ? 1600 : 2400;
        if (selectedRam === 64) base += 140;
        if (selectedRam === 128) base += 350;
        if (selectedStorage === 4) base += 220;
        if (selectedStorage === 8) base += 550;
        if (selectedGpuTier.includes("High-End")) base += 500;
        if (selectedGpuTier.includes("Enthusiast / Dual")) base += 1200;
        if (selectedGpuTier.includes("Pro NVIDIA")) base += 750;
        if (selectedMonitor.includes("4K")) base += 380;
        if (selectedMonitor.includes("Ultrawide")) base += 450;
        if (selectedSoftware.includes("Proxmox")) base += 30;
        if (selectedSoftware.includes("AI / ML")) base += 50;
        return base + assemblyFee;
    };

    const estimatedPrice = calculateTotalEstimate();

    const buildSummaryText = mode === "builder"
        ? `Custom PC Build (${buildCategory.toUpperCase()}) | RAM: ${selectedRam}GB | Storage: ${selectedStorage}TB NVMe | GPU: ${selectedGpuTier} | Monitor: ${selectedMonitor} | Software: ${selectedSoftware} | Total: ${estimatedPrice}€`
        : `Repair Service: ${selectedRepair}`;

    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    serviceTitle: mode === "builder" ? `Custom PC Build (${buildCategory.toUpperCase()})` : `Repair: ${selectedRepair}`,
                    servicePrice: mode === "builder" ? `${estimatedPrice}€` : "Repair Service",
                    message: `Service Mode: ${mode.toUpperCase()}\nDetails:\n${buildSummaryText}\n\nClient Notes:\n${formData.message}`,
                }),
            });
            const data = await res.json();
            if (res.ok && !data.error) {
                toast.success("Το αίτημά σας καταχωρήθηκε με επιτυχία!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                toast.error(`Αποτυχία αποστολής (${data.error || "Unknown"})`);
            }
        } catch (err) {
            console.error(err);
            toast.error("Σφάλμα σύνδεσης με τον διακομιστή.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#0b0c10] text-[#e5e7eb] selection:bg-cyan-500/25 selection:text-white w-full overflow-x-hidden">
            <Navbar />

            <main className="relative w-full pt-32 pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">

                {/* Navigation Switcher Tabs */}
                <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
                    <a href="/" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold text-zinc-300 transition-all cursor-pointer">
                        <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                        <span>Βιογραφικό</span>
                    </a>
                    <a href="/services" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold text-zinc-300 transition-all cursor-pointer">
                        <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Agency & Υπηρεσίες</span>
                    </a>
                    <a href="/hardware" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 cursor-pointer">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Hardware & PC Lab (Active)</span>
                    </a>
                </div>

                {/* Header & Mode Switcher (Builder vs Repairs) */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        Professional Hardware Store & Lab
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Custom PC Building & Επισκευές Υπολογιστών
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Επιλέξτε ανάμεσα σε προηγμένο Custom PC Builder ή επαγγελματικές υπηρεσίες τεχνικής υποστήριξης και επισκευής.
                    </p>

                    {/* Mode Switcher Buttons */}
                    <div className="flex justify-center gap-3 pt-2">
                        <button
                            onClick={() => { setMode("builder"); setStep(1); }}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${mode === "builder" ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20" : "bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white"}`}
                        >
                            <Cpu className="w-4 h-4" />
                            <span>Custom PC Builder</span>
                        </button>
                        <button
                            onClick={() => { setMode("repair"); setStep(1); }}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${mode === "repair" ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20" : "bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white"}`}
                        >
                            <Wrench className="w-4 h-4" />
                            <span>Service & Επισκευές PC / Laptop</span>
                        </button>
                    </div>
                </div>

                {/* ===================== MODE A: CUSTOM PC BUILDER ===================== */}
                {mode === "builder" && (
                    <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">

                        {/* Wizard Steps Bar */}
                        <div className="flex justify-center items-center gap-2 sm:gap-4 text-xs font-mono">
                            <button onClick={() => setStep(1)} className={`px-4 py-2 rounded-xl border cursor-pointer ${step === 1 ? "bg-emerald-500 text-black font-bold border-emerald-500" : "bg-white/[0.03] border-white/10 text-zinc-400"}`}>
                                1. Διαμόρφωση Υλικών
                            </button>
                            <button onClick={() => setStep(2)} className={`px-4 py-2 rounded-xl border cursor-pointer ${step === 2 ? "bg-emerald-500 text-black font-bold border-emerald-500" : "bg-white/[0.03] border-white/10 text-zinc-400"}`}>
                                2. Σύνοψη & Αίτηση
                            </button>
                        </div>

                        {step === 1 ? (
                            <div className="space-y-8">
                                {/* Category Selector */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { id: "gaming", title: "Gaming & Creator PC", desc: "Υψηλά FPS, κορυφαία αισθητική & rendering." },
                                        { id: "workstation", title: "Pro Workstation", desc: "Multi-core CPU, σταθερότητα & ECC RAM." },
                                        { id: "ai", title: "AI / LLM Development", desc: "Dual GPU support, υψηλή VRAM & τάση." }
                                    ].map((cat) => (
                                        <div
                                            key={cat.id}
                                            onClick={() => setBuildCategory(cat.id as any)}
                                            className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${buildCategory === cat.id ? "bg-emerald-500/15 border-emerald-500 shadow-lg shadow-emerald-500/10" : "bg-white/[0.02] border-white/10 hover:border-white/20"}`}
                                        >
                                            <div className="space-y-1">
                                                <h3 className="text-sm font-bold text-white">{cat.title}</h3>
                                                <p className="text-[11px] text-zinc-400 leading-relaxed">{cat.desc}</p>
                                            </div>
                                            {buildCategory === cat.id && <span className="mt-3 text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1"><Check className="w-3 h-3" /> Επιλεγμένο</span>}
                                        </div>
                                    ))}
                                </div>

                                {/* Dropdown Options Box */}
                                <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
                                    <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                                        <Sliders className="w-4 h-4 text-emerald-400" />
                                        <span>Τεχνικά Χαρακτηριστικά & Λογισμικό ({buildCategory.toUpperCase()})</span>
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                        {/* RAM */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                                                <MemoryStick className="w-3.5 h-3.5 text-cyan-400" />
                                                <span>Μνήμη RAM</span>
                                            </label>
                                            <select
                                                value={selectedRam}
                                                onChange={(e) => setSelectedRam(Number(e.target.value))}
                                                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                                            >
                                                <option value={32} className="bg-zinc-900">32GB DDR5 Fast Kit</option>
                                                <option value={64} className="bg-zinc-900">64GB DDR5 High Capacity</option>
                                                <option value={128} className="bg-zinc-900">128GB ECC / Pro Server Kit</option>
                                            </select>
                                        </div>

                                        {/* Storage */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                                                <HardDrive className="w-3.5 h-3.5 text-purple-400" />
                                                <span>Αποθηκευτικός Χώρος NVMe SSD</span>
                                            </label>
                                            <select
                                                value={selectedStorage}
                                                onChange={(e) => setSelectedStorage(Number(e.target.value))}
                                                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                                            >
                                                <option value={2} className="bg-zinc-900">2TB NVMe PCIe 4.0 (Gen4)</option>
                                                <option value={4} className="bg-zinc-900">4TB High-Speed NVMe</option>
                                                <option value={8} className="bg-zinc-900">8TB Enterprise Server Storage</option>
                                            </select>
                                        </div>

                                        {/* GPU Tier */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                                                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                                                <span>Κάρτα Γραφικών (GPU / VRAM Tier)</span>
                                            </label>
                                            <select
                                                value={selectedGpuTier}
                                                onChange={(e) => setSelectedGpuTier(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                                            >
                                                {buildCategory === "gaming" && (
                                                    <>
                                                        <option value="Mid-Range (RTX 4070 / RX 7800 XT)" className="bg-zinc-900">Mid-Range (RTX 4070 / RX 7800 XT)</option>
                                                        <option value="High-End (RTX 4080 Super / RX 7900 XTX)" className="bg-zinc-900">High-End (RTX 4080 Super / RX 7900 XTX)</option>
                                                    </>
                                                )}
                                                {buildCategory === "workstation" && (
                                                    <option value="Pro NVIDIA ProArt / Radeon Pro" className="bg-zinc-900">Pro NVIDIA ProArt / Radeon Pro (Stable for Render)</option>
                                                )}
                                                {buildCategory === "ai" && (
                                                    <option value="Enthusiast / Dual GPU (RTX 4090 / AI Setup)" className="bg-zinc-900">Enthusiast / Dual GPU (RTX 4090 / 24GB+ VRAM)</option>
                                                )}
                                            </select>
                                        </div>

                                        {/* Monitor */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                                                <Monitor className="w-3.5 h-3.5 text-amber-400" />
                                                <span>Περιφερειακό / Οθόνη (Optional)</span>
                                            </label>
                                            <select
                                                value={selectedMonitor}
                                                onChange={(e) => setSelectedMonitor(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                                            >
                                                <option value="Χωρίς Οθόνη" className="bg-zinc-900">Χωρίς Οθόνη / Μόνο Κουτί</option>
                                                <option value='27" 1440p IPS 170Hz' className='bg-zinc-900'>27" 1440p IPS 170Hz Gaming Monitor</option>
                                                <option value='32" 4K Creator Monitor' className='bg-zinc-900'>32" 4K Professional Creator Monitor</option>
                                            </select>
                                        </div>

                                        {/* Software Bundle */}
                                        <div className="space-y-2 sm:col-span-2">
                                            <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                                                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                                                <span>Εγκατάσταση Λογισμικού & OS Setup (Software Bundle)</span>
                                            </label>
                                            <select
                                                value={selectedSoftware}
                                                onChange={(e) => setSelectedSoftware(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                                            >
                                                <option value="Windows 11 Pro (Clean Install & Drivers)" className="bg-zinc-900">Windows 11 Pro (Clean Install, Drivers & Bloatware Removal)</option>
                                                <option value="Proxmox VE Hypervisor (Homelab Ready)" className="bg-zinc-900">Proxmox VE Hypervisor (Homelab Ready & Storage Pools Setup)</option>
                                                <option value="AI / ML Development Stack (Ubuntu Linux + CUDA + Docker)" className="bg-zinc-900">AI / ML Development Stack (Ubuntu Linux + CUDA Drivers + Docker)</option>
                                            </select>
                                        </div>

                                    </div>

                                    {/* Live Price Estimation Banner */}
                                    <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/20">
                                        <div>
                                            <span className="text-xs font-mono text-zinc-400 block">Εκτιμώμενο Συνολικό Κόστος:</span>
                                            <span className="text-2xl font-bold font-mono text-emerald-400">{estimatedPrice}€</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all shadow cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            <span>Συνέχεια στην Υποβολή</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ) : (
                            /* Summary & Submit */
                            <div className="space-y-6 max-w-2xl mx-auto">
                                <div className="bg-white/[0.03] border border-emerald-500/30 p-6 rounded-3xl space-y-4">
                                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider font-mono">Αναλυτική Λίστα Διαμόρφωσης</h3>
                                        <button onClick={() => setStep(1)} className="text-xs text-zinc-400 hover:text-white underline cursor-pointer">[ Edit ]</button>
                                    </div>
                                    <div className="space-y-2 text-xs font-mono text-zinc-300">
                                        <p>• Κατηγορία: <strong className="text-white uppercase">{buildCategory}</strong></p>
                                        <p>• RAM: <strong className="text-white">{selectedRam} GB</strong></p>
                                        <p>• Storage: <strong className="text-white">{selectedStorage} TB NVMe</strong></p>
                                        <p>• GPU: <strong className="text-white">{selectedGpuTier}</strong></p>
                                        <p>• Software: <strong className="text-purple-300">{selectedSoftware}</strong></p>
                                    </div>
                                    <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                                        <span className="text-sm font-bold text-white">Σύνολο:</span>
                                        <span className="text-2xl font-bold font-mono text-emerald-400">{estimatedPrice}€</span>
                                    </div>
                                </div>

                                <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl space-y-6">
                                    <h2 className="text-xl font-bold text-white">Αποστολή Αιτήματος Custom Build</h2>
                                    <form onSubmit={handleSubmitOrder} className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-medium text-zinc-300 mb-2">Ονοματεπώνυμο</label>
                                                <input type="text" required placeholder="Γιάννης Παπαδόπουλος" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-zinc-300 mb-2">Email</label>
                                                <input type="email" required placeholder="example@domain.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium opacity-80 mb-2">Παρατηρήσεις</label>
                                            <textarea rows={3} placeholder="Προτιμήσεις..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-sm focus:outline-none focus:border-emerald-500 resize-none" />
                                        </div>
                                        <div className="flex gap-3">
                                            <button type="button" onClick={() => setStep(1)} className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs cursor-pointer">Πίσω</button>
                                            <button type="submit" disabled={isSubmitting} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold text-sm shadow cursor-pointer">
                                                <Send className="w-4 h-4" />
                                                <span>{isSubmitting ? "Αποστολή..." : "Αποστολή Παραγγελίας"}</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                    </div>
                )}

                {/* ===================== MODE B: REPAIRS & SERVICE ===================== */}
                {mode === "repair" && (
                    <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {repairServices.map((rep, idx) => {
                                const isSelected = selectedRepair === `${rep.title} (${rep.price}€)`;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            setSelectedRepair(`${rep.title} (${rep.price}€)`);
                                            toast.success(`Επιλέχθηκε υπηρεσία: ${rep.title}`);
                                        }}
                                        className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${isSelected ? "bg-cyan-500/10 border-cyan-500 shadow-[0_0_25px_-5px_rgba(6,182,212,0.2)]" : "bg-white/[0.02] border-white/10 hover:border-white/20"}`}
                                    >
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">HARDWARE LAB / SERVICE</span>
                                                {isSelected && <span className="text-xs font-mono bg-cyan-500 text-black px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><Check className="w-3 h-3" /> Επιλεγμένο</span>}
                                            </div>
                                            <h3 className="text-lg font-bold text-white">{rep.title}</h3>
                                            <p className="text-xs text-zinc-400 mt-1 mb-4 leading-relaxed">{rep.desc}</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <span className="text-xl font-bold font-mono text-white">Κόστος: {rep.price}€</span>
                                            <span className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${isSelected ? "bg-cyan-500 text-black font-bold" : "bg-white/10 text-white"}`}>
                                                {isSelected ? "Επιλεγμένο" : "Επιλογή"}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Repair Contact Form */}
                        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl space-y-6">
                            <h2 className="text-xl font-bold text-white">Κλείστε Ραντεβού για Service / Επισκευή</h2>
                            <form onSubmit={handleSubmitOrder} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-300 mb-2">Ονοματεπώνυμο</label>
                                        <input type="text" required placeholder="Γιάννης Παπαδόπουλος" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-zinc-300 mb-2">Email</label>
                                        <input type="email" required placeholder="example@domain.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-300 mb-2">Επιλεγμένη Υπηρεσία Service</label>
                                    <input type="text" readOnly value={selectedRepair} className="w-full px-4 py-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 font-mono text-xs cursor-not-allowed" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium opacity-80 mb-2">Περιγραφή Βλάβης / Συσκευής</label>
                                    <textarea rows={3} placeholder="Π.χ. Το λάπτοπ δεν ανοίγει ή κάνει θόρυβο ο ανεμιστήρας..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-sm focus:outline-none focus:border-cyan-500 resize-none" />
                                </div>
                                <button type="submit" disabled={isSubmitting} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold text-sm shadow cursor-pointer">
                                    <Send className="w-4 h-4" />
                                    <span>{isSubmitting ? "Αποστολή..." : "Κλείσιμο Ραντεβού Service"}</span>
                                </button>
                            </form>
                        </div>

                    </div>
                )}

            </main>

            <Footer />
        </div>
    );
}
