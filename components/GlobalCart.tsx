"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Trash2, Send, Briefcase, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    category: string;
}

export default function GlobalCart() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);

    // Modes: 'none' | 'checkout' | 'hiring'
    const [actionType, setActionType] = useState<"none" | "checkout" | "hiring">("none");
    const [formData, setFormData] = useState({ name: "", email: "", company: "", notes: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadCart = () => {
        const saved = localStorage.getItem("miltos_agency_cart");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch {
                setItems([]);
            }
        }
    };

    useEffect(() => {
        loadCart();
        const handleStorageUpdate = () => loadCart();
        const handleOpenCart = () => setIsOpen(true);

        window.addEventListener("storage-updated", handleStorageUpdate);
        window.addEventListener("open-global-cart", handleOpenCart);

        return () => {
            window.removeEventListener("storage-updated", handleStorageUpdate);
            window.removeEventListener("open-global-cart", handleOpenCart);
        };
    }, []);

    const updateQuantity = (id: string, delta: number) => {
        const updated = items.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
        }).filter(Boolean) as CartItem[];

        setItems(updated);
        localStorage.setItem("miltos_agency_cart", JSON.stringify(updated));
        window.dispatchEvent(new Event("storage-updated"));
    };

    const removeItem = (id: string) => {
        const updated = items.filter(item => item.id !== id);
        setItems(updated);
        localStorage.setItem("miltos_agency_cart", JSON.stringify(updated));
        window.dispatchEvent(new Event("storage-updated"));
        toast.info("Το αντικείμενο αφαιρέθηκε από το καλάθι.");
    };

    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0) {
            toast.error("Το καλάθι σας είναι άδειο.");
            return;
        }

        setIsSubmitting(true);
        try {
            const cartSummary = items.map(i => `- ${i.title} (x${i.quantity}) [${i.price}€]`).join("\n");
            const isHiring = actionType === "hiring";

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: isHiring ? (formData.company || "Recruiter") : formData.name,
                    email: formData.email,
                    serviceTitle: isHiring ? "OFFICIAL JOB OFFER / HIRING INQUIRY" : "COMMERCIAL SERVICE ORDER / CHECKOUT",
                    servicePrice: `${totalPrice}€ (Total)`,
                    message: isHiring
                        ? `ΕΤΑΙΡΕΙΑ / RECRUITER: ${formData.company}\nEMAIL: ${formData.email}\n\nΕΠΙΛΕΓΜΕΝΑ ITEMS:\n${cartSummary}\n\nΣΗΜΕΙΩΣΕΙΣ / OFFER:\n${formData.notes}`
                        : `ΠΕΛΑΤΗΣ: ${formData.name}\nEMAIL: ${formData.email}\n\nΠΑΡΑΓΓΕΛΙΑ:\n${cartSummary}\n\nΣΗΜΕΙΩΣΕΙΣ ΠΕΛΑΤΗ:\n${formData.notes}`,
                }),
            });

            const data = await res.json();
            if (res.ok && !data.error) {
                toast.success(isHiring ? "🚀 Η πρόταση πρόσληψης στάλθηκε επιτυχώς!" : "✅ Η παραγγελία σας καταχωρήθηκε με επιτυχία!");
                localStorage.removeItem("miltos_agency_cart");
                setItems([]);
                setIsOpen(false);
                setActionType("none");
                setFormData({ name: "", email: "", company: "", notes: "" });
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
        <>
            {/* Floating Cart Trigger Button - Αρμονικά τοποθετημένο πάνω από το chat widget */}
            <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40">
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative flex items-center gap-2.5 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-bold text-xs shadow-[0_10px_30px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="hidden sm:inline">Καλάθι / Offer Hub</span>
                    <span className="sm:hidden">Καλάθι</span>
                    {totalCount > 0 && (
                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white font-mono text-[10px] flex items-center justify-center font-bold shadow-md animate-bounce">
                            {totalCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Slide-over Cart Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[99999] flex justify-end bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0"
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-md bg-[#0b0c10] border-l border-white/10 h-full flex flex-col justify-between p-6 sm:p-8 z-10 text-white shadow-2xl overflow-y-auto"
                        >
                            <div>
                                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                                    <div className="flex items-center gap-2">
                                        <ShoppingCart className="w-5 h-5 text-cyan-400" />
                                        <h2 className="text-lg font-bold">Το Καλάθι & Offer Hub σας</h2>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {items.length === 0 ? (
                                    <div className="py-20 text-center space-y-3">
                                        <ShoppingCart className="w-12 h-12 text-zinc-600 mx-auto stroke-[1.5]" />
                                        <p className="text-sm text-zinc-400">Το καλάθι σας είναι κενό.</p>
                                        <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                                            Προσθέστε υπηρεσίες από τον κατάλογο για αγορά ή για υποβολή πρότασης συνεργασίας.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="py-6 space-y-4">
                                        {actionType === "none" ? (
                                            <>
                                                <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
                                                    {items.map((item) => (
                                                        <div key={item.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                                                            <div className="space-y-1">
                                                                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">{item.category}</span>
                                                                <h4 className="text-xs font-bold text-white">{item.title}</h4>
                                                                <span className="text-xs font-mono text-zinc-300">{item.price}€</span>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex items-center border border-white/10 rounded-xl bg-white/5">
                                                                    <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 text-xs hover:bg-white/10">-</button>
                                                                    <span className="px-2 py-1 text-xs font-mono">{item.quantity}</span>
                                                                    <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 text-xs hover:bg-white/10">+</button>
                                                                </div>
                                                                <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300 p-1">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="pt-4 border-t border-white/10 space-y-4">
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="text-zinc-400">Εκτιμώμενο Σύνολο:</span>
                                                        <span className="text-xl font-bold font-mono text-cyan-400">{totalPrice}€</span>
                                                    </div>

                                                    {/* ΔΥΟ ΞΕΚΑΘΑΡΕΣ ΕΠΙΛΟΓΕΣ ΜΕ ΔΙΑΦΟΡΕΤΙΚΑ ΧΡΩΜΑΤΑ ΚΑΙ ANIMATIONS */}
                                                    <div className="grid grid-cols-1 gap-3 pt-2">
                                                        {/* Επιλογή 1: Συνέχεια στην Αγορά (Cyan) */}
                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={() => setActionType("checkout")}
                                                            className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer flex items-center justify-center gap-2"
                                                        >
                                                            <CreditCard className="w-4 h-4" />
                                                            <span>Ολοκλήρωση Αγοράς Υπηρεσιών</span>
                                                        </motion.button>

                                                        {/* Επιλογή 2: Αποστολή Πρότασης Πρόσληψης / Job Offer (Emerald / Πράσινο) */}
                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={() => setActionType("hiring")}
                                                            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer flex items-center justify-center gap-2"
                                                        >
                                                            <Briefcase className="w-4 h-4" />
                                                            <span>Θέλω να σε προσλάβω (Job Offer)</span>
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            /* Dynamic Form για Checkout ή Hiring */
                                            <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
                                                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                                                    <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                                                        {actionType === "hiring" ? "💼 Φόρμα Πρότασης Πρόσληψης" : "🛒 Φόρμα Ολοκλήρωσης Παραγγελίας"}
                                                    </h3>
                                                    <button type="button" onClick={() => setActionType("none")} className="text-xs text-zinc-400 hover:text-white underline">← Πίσω στο καλάθι</button>
                                                </div>

                                                {actionType === "hiring" ? (
                                                    <>
                                                        <div>
                                                            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Όνομα Εταιρείας / Recruiter</label>
                                                            <input type="text" required placeholder="Microsoft / Tech Corp" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white focus:outline-none focus:border-emerald-500" />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div>
                                                            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Ονοματεπώνυμο</label>
                                                            <input type="text" required placeholder="Γιάννης Παπαδόπουλος" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-500" />
                                                        </div>
                                                    </>
                                                )}

                                                <div>
                                                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">Email Επικοινωνίας</label>
                                                    <input type="email" required placeholder="name@domain.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white focus:outline-none ${actionType === "hiring" ? "focus:border-emerald-500" : "focus:border-cyan-500"}`} />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                                                        {actionType === "hiring" ? "Λεπτομέρειες Θέσης / Σημειώσεις" : "Παρατηρήσεις Παραγγελίας"}
                                                    </label>
                                                    <textarea rows={3} placeholder={actionType === "hiring" ? "Θέλουμε να σε συναντήσουμε για συνέντευξη..." : "Ειδικές απαιτήσεις για το project..."} value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white focus:outline-none resize-none ${actionType === "hiring" ? "focus:border-emerald-500" : "focus:border-cyan-500"}`} />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className={`w-full py-4 rounded-xl text-black font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 ${actionType === "hiring"
                                                            ? "bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                                                            : "bg-cyan-500 hover:bg-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                                                        }`}
                                                >
                                                    <Send className="w-4 h-4" />
                                                    <span>{isSubmitting ? "Αποστολή..." : (actionType === "hiring" ? "Αποστολή Job Offer στον Μίλτο" : "Υποβολή Παραγγελίας")}</span>
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 border-t border-white/10 text-center">
                                <p className="text-[11px] text-zinc-500 font-mono">
                                    🔒 Secure Multi-Action Hub • Miltos Papageorgiou
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
