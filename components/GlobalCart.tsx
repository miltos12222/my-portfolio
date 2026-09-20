"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, Send } from "lucide-react";
import { toast } from "sonner";

export interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    category: string;
}

export default function GlobalCart() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadCart = () => {
            const saved = localStorage.getItem("miltos_agency_cart");
            if (saved) {
                try {
                    setItems(JSON.parse(saved));
                } catch (e) {
                    console.error(e);
                }
            }
        };

        loadCart();

        const handleOpenCart = () => setIsOpen(true);
        const handleStorageUpdate = () => loadCart();

        window.addEventListener("open-global-cart", handleOpenCart);
        window.addEventListener("storage-updated", handleStorageUpdate);

        return () => {
            window.removeEventListener("open-global-cart", handleOpenCart);
            window.removeEventListener("storage-updated", handleStorageUpdate);
        };
    }, []);

    const saveCart = (newItems: CartItem[]) => {
        setItems(newItems);
        localStorage.setItem("miltos_agency_cart", JSON.stringify(newItems));
        window.dispatchEvent(new Event("storage-updated"));
    };

    const updateQuantity = (id: string, delta: number) => {
        const updated = items.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
        }).filter(Boolean) as CartItem[];
        saveCart(updated);
    };

    const removeItem = (id: string) => {
        const updated = items.filter(item => item.id !== id);
        saveCart(updated);
        toast.info("Το προϊόν αφαιρέθηκε από το καλάθι.");
    };

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleCheckoutSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0) {
            toast.error("Το καλάθι σας είναι άδειο.");
            return;
        }

        setSubmitting(true);
        const cartSummary = items.map(i => `${i.quantity}x ${i.title} (${i.price * i.quantity}€)`).join("\n");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    serviceTitle: `Cart Order (${totalCount} items)`,
                    servicePrice: `${totalPrice}€`,
                    message: `Client Details:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nNotes: ${formData.notes}\n\nOrdered Items:\n${cartSummary}\n\nTotal: ${totalPrice}€`,
                }),
            });

            if (res.ok) {
                toast.success("Η παραγγελία/αίτημα στάλθηκε με επιτυχία!");
                localStorage.removeItem("miltos_agency_cart");
                setItems([]);
                setIsCheckingOut(false);
                setIsOpen(false);
                setFormData({ name: "", email: "", phone: "", notes: "" });
                window.dispatchEvent(new Event("storage-updated"));
            } else {
                toast.error("Σφάλμα αποστολής παραγγελίας.");
            }
        } catch (err) {
            toast.error("Σφάλμα σύνδεσης.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {/* Floating Cart Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold shadow-2xl hover:scale-105 transition-transform cursor-pointer"
                title="Το Καλάθι μου"
            >
                <ShoppingCart className="w-5 h-5 text-black" />
                <span className="text-xs font-mono bg-black text-white px-2 py-0.5 rounded-full">
                    {totalCount}
                </span>
            </button>

            {/* Cart Drawer Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-md bg-[#12131c] border-l border-white/15 h-full flex flex-col justify-between shadow-2xl p-6 text-xs">

                        {/* Header */}
                        <div>
                            <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5 text-cyan-400" />
                                    <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Το Καλάθι Υπηρεσιών & Hardware</h2>
                                </div>
                                <button
                                    onClick={() => { setIsOpen(false); setIsCheckingOut(false); }}
                                    className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Items List or Checkout Form */}
                            {!isCheckingOut ? (
                                <div className="py-4 space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto">
                                    {items.length === 0 ? (
                                        <div className="text-center py-16 space-y-3">
                                            <ShoppingCart className="w-12 h-12 text-zinc-600 mx-auto opacity-50" />
                                            <p className="text-zinc-400 font-mono">Το καλάθι σας είναι άδειο.</p>
                                            <p className="text-[11px] text-zinc-600">Προσθέστε υπηρεσίες από το Web Agency, DevOps ή Hardware Lab!</p>
                                        </div>
                                    ) : (
                                        items.map((item) => (
                                            <div key={item.id} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                                                <div className="space-y-1 flex-1">
                                                    <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wide">{item.category}</span>
                                                    <h4 className="font-bold text-white text-xs">{item.title}</h4>
                                                    <p className="text-emerald-400 font-mono font-bold">{item.price}€</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center border border-white/15 rounded-xl overflow-hidden bg-black/30">
                                                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 hover:bg-white/10 text-zinc-300 transition-colors cursor-pointer">
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="px-2.5 font-mono text-white">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 hover:bg-white/10 text-zinc-300 transition-colors cursor-pointer">
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <button onClick={() => removeItem(item.id)} className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            ) : (
                                <form onSubmit={handleCheckoutSubmit} className="py-4 space-y-3">
                                    <h3 className="font-bold text-white text-xs font-mono uppercase tracking-wider mb-2">Στοιχεία Αποστολής Αιτήματος</h3>
                                    <input type="text" required placeholder="Ονοματεπώνυμο" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500" />
                                    <input type="email" required placeholder="Email Επικοινωνίας" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500" />
                                    <input type="text" placeholder="Τηλέφωνο (Προαιρετικό)" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500" />
                                    <textarea rows={3} placeholder="Τυχόν σχόλια ή παρατηρήσεις..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500 resize-none" />

                                    <button type="button" onClick={() => setIsCheckingOut(false)} className="text-xs text-zinc-400 underline cursor-pointer">← Επιστροφή στο καλάθι</button>
                                </form>
                            )}
                        </div>

                        {/* Footer Summary & Checkout */}
                        {items.length > 0 && (
                            <div className="pt-4 border-t border-white/10 space-y-4">
                                <div className="flex justify-between items-center text-sm font-mono">
                                    <span className="text-zinc-400">Συνολικό Κόστος:</span>
                                    <span className="text-xl font-bold text-emerald-400">{totalPrice}€</span>
                                </div>

                                {!isCheckingOut ? (
                                    <button
                                        onClick={() => setIsCheckingOut(true)}
                                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold text-xs transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
                                    >
                                        <span>Ταμείο & Αποστολή Αιτήματος</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleCheckoutSubmit}
                                        disabled={submitting}
                                        className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold text-xs transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                        <span>{submitting ? "Αποστολή..." : "Οριστική Υποβολή Παραγγελίας"}</span>
                                    </button>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            )}
        </>
    );
}
