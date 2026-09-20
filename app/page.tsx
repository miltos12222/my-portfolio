"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Mail, Server, Code2, Cpu, CheckCircle2, ChevronDown, Star, Send, Check, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function Home() {
  const [infraOpen, setInfraOpen] = useState(false);
  const [webOpen, setWebOpen] = useState(false);
  const [ethicOpen, setEthicOpen] = useState(false);
  const [project1Open, setProject1Open] = useState(false);
  const [project2Open, setProject2Open] = useState(false);
  const [stackOpen, setStackOpen] = useState(false);
  const [resilienceOpen, setResilienceOpen] = useState(false);

  // States για τη φόρμα επικοινωνίας
  const [selectedPlan, setSelectedPlan] = useState("Homelab Setup");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Λήψη τιμής βάσει επιλεγμένου πακέτου
  const getPlanPrice = (plan: string) => {
    switch (plan) {
      case "Modern Web App": return "Από 350€";
      case "Homelab Setup": return "Από 150€";
      case "Custom Consulting": return "35€ / ώρα";
      default: return "Κατόπιν Συνεννόησης";
    }
  };

  // Συνάρτηση υποβολής φόρμας
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          serviceTitle: selectedPlan,
          servicePrice: getPlanPrice(selectedPlan),
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok && !data.error) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        alert(`Σφάλμα: ${data.error || "Αποτυχία αποστολής."}`);
      }
    } catch (error) {
      console.error("Σφάλμα δικτύου:", error);
      alert("Σφάλμα σύνδεσης με τον διακομιστή.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0b0c10] text-[#e5e7eb] selection:bg-cyan-500/25 selection:text-white w-full overflow-x-hidden">
      <div id="top" className="absolute top-0 left-0 h-px w-px pointer-events-none" />

      <Navbar />

      <main className="relative w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">

        {/* OVERVIEW SECTION */}
        <section id="overview" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {/* Profile Card */}
          <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-white/[0.03] border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between z-10 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                AVAILABLE FOR HIRE
              </span>
              <span className="text-xs font-mono text-zinc-400">ATHENS, GR</span>
            </div>

            <div className="z-10 flex flex-col sm:flex-row items-center gap-6 my-auto">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-white/15 shadow-xl shrink-0 bg-zinc-900">
                <Image
                  src="/profile.jpg"
                  alt="Miltos Papageorgiou"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                  Miltos Papageorgiou
                </h1>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Computer Science Graduate & Infrastructure Enthusiast. Εξειδίκευση σε self-hosted υποδομές, αυτοματισμούς Linux/Docker και σύγχρονη ανάπτυξη web εφαρμογών.
                </p>
              </div>
            </div>

            <div className="z-10 flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-white/10">
              <a
                href="https://github.com/miltos12222"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>

              <a
                href="https://www.linkedin.com/in/miltos-papageorgiou-740990438"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 border border-[#0A66C2]/40 text-xs font-medium text-blue-300 transition-all"
              >
                <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
                <span>LinkedIn</span>
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-xs font-medium text-cyan-300 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </a>
            </div>
          </div>

          {/* Infrastructure Card */}
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-zinc-400 mb-4">
                <Server className="w-5 h-5 text-cyan-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider">Infrastructure</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Self-Hosted</h3>
              <p className="text-xs text-zinc-400 mb-3">Proxmox VE, Docker containers, Nextcloud & MariaDB orchestration.</p>

              {infraOpen && (
                <div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs text-zinc-300">
                  <p>• Αυτόματος συγχρονισμός και backup 6.000+ φωτογραφιών.</p>
                  <p>• Διαχείριση δικτύου και ασφαλής πρόσβαση μέσω Tailscale VPN.</p>
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 py-2 border-t border-white/5 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Proxmox</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Docker</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Tailscale</span>
              </div>
              <button
                onClick={() => setInfraOpen(!infraOpen)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs text-zinc-200 transition-all font-medium"
              >
                <span>{infraOpen ? "Λιγότερα" : "Ανάλυση"}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-cyan-400 transition-transform duration-200 ${infraOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {/* Development Card */}
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-zinc-400 mb-4">
                <Code2 className="w-5 h-5 text-purple-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider">Development</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Modern Stack</h3>
              <p className="text-xs text-zinc-400 mb-3">Next.js, TypeScript, Tailwind CSS, high-performance web apps.</p>

              {webOpen && (
                <div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs text-zinc-300">
                  <p>• Αρχιτεκτονική φιλική προς SEO και άμεση απόκριση (zero lags).</p>
                  <p>• Responsive σχεδίαση με Tailwind CSS και modular λογική.</p>
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 py-2 border-t border-white/5 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Next.js</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">TypeScript</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Tailwind</span>
              </div>
              <button
                onClick={() => setWebOpen(!webOpen)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs text-zinc-200 transition-all font-medium"
              >
                <span>{webOpen ? "Λιγότερα" : "Ανάλυση"}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-purple-400 transition-transform duration-200 ${webOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {/* Work Ethic Card */}
          <div className="md:col-span-2 lg:col-span-2 rounded-3xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-zinc-400 mb-3">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider">Work Ethic</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Υψηλή Παραγωγικότητα & Αντοχή</h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                Διαθέτω εξαιρετική οργάνωση, προσαρμοστικότητα και αποδεδειγμένη αντοχή σε απαιτητικά περιβάλλοντα εργασίας με αυξημένη πίεση και σύνθετα τεχνικά ζητήματα.
              </p>

              {ethicOpen && (
                <div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs text-zinc-300">
                  <p>• Μεθοδική αντιμετώπιση προβλημάτων σε περιβάλλοντα Linux/Homelab.</p>
                  <p>• Συνεχής εκμάθηση νέων τεχνολογιών και αυτοματισμών ροών εργασίας.</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Problem Solver
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fast Learner
                </span>
              </div>
              <button
                onClick={() => setEthicOpen(!ethicOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs text-zinc-200 transition-all font-medium"
              >
                <span>{ethicOpen ? "Λιγότερα" : "Ανάλυση"}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-emerald-400 transition-transform duration-200 ${ethicOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

        </section>

        {/* FULL EXTRA: ABOUT ME + INTERACTIVE TERMINAL */}
        <section id="about-me" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-center">
            <h2 className="text-xl font-bold text-white mb-4">Σχετικά με Εμένα</h2>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Είμαι απόφοιτος Πληροφορικής με έντονο ενδιαφέρον και πρακτική εμπειρία στις υποδομές δικτύων, τη διαχείριση συστημάτων Linux και την ανάπτυξη λογισμικού.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Στόχος μου είναι η δημιουργία ασφαλών, γρήγορων και κλιμακούμενων εφαρμογών, αξιοποιώντας σύγχρονα εργαλεία αυτοματισμού και self-hosted αρχιτεκτονικές. Συνδυάζω το DevOps mindset με το σύγχρονο Web Development.
            </p>
          </div>

          {/* Terminal Widget */}
          <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-5 font-mono text-xs shadow-2xl relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="ml-2 text-zinc-500 flex items-center gap-1"><Terminal className="w-3 h-3" /> root@miltos-server:~</span>
            </div>
            <div className="space-y-2 text-zinc-300">
              <p><span className="text-emerald-400">miltos@admin:~$</span> neofetch</p>
              <div className="pl-2 pt-1 flex gap-4">
                <div className="text-cyan-500 font-bold hidden sm:block">
                  <pre>{`
   .---.
  /     \\
  \\.@-@./
  /  _  \\
 //     \\\\
                  `}</pre>
                </div>
                <div className="space-y-1">
                  <p><span className="text-cyan-400 font-bold">OS:</span> Debian GNU/Linux 12 (bookworm)</p>
                  <p><span className="text-cyan-400 font-bold">Host:</span> Proxmox Virtual Environment</p>
                  <p><span className="text-cyan-400 font-bold">Uptime:</span> 99.9% High Availability</p>
                  <p><span className="text-cyan-400 font-bold">Stack:</span> Next.js, Tailwind, TypeScript</p>
                  <p><span className="text-cyan-400 font-bold">Services:</span> Docker, Tailscale, Nextcloud</p>
                  <p><span className="text-cyan-400 font-bold">Status:</span> <span className="text-emerald-400 bg-emerald-400/10 px-1 py-0.5 rounded">Online & Ready for Hire</span></p>
                </div>
              </div>
              <p className="pt-2"><span className="text-emerald-400">miltos@admin:~$</span> <span className="animate-pulse">_</span></p>
            </div>
          </div>
        </section>

        {/* INFRASTRUCTURE */}
        <section id="infrastructure" className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Server className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Infrastructure & Homelab Stack</h2>
            </div>
            <button
              onClick={() => setStackOpen(!stackOpen)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs text-zinc-200 transition-all font-medium"
            >
              <span>{stackOpen ? "Λιγότερα" : "Ανάλυση"}</span>
              <ChevronDown className={`h-3.5 w-3.5 text-cyan-400 transition-transform duration-200 ${stackOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            Ανάπτυξη και διαχείριση εικονικών μηχανών σε Proxmox VE, παραμετροποίηση Docker containers για αυτόματο backup φωτογραφιών και αρχείων με ασφαλή πρόσβαση μέσω Tailscale VPN.
          </p>

          {stackOpen && (
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-zinc-300">
              <p>• <strong>Proxmox VE:</strong> Ρύθμιση αποθηκευτικών χώρων (ext4 mounts) και οργάνωση LXC containers.</p>
              <p>• <strong>Nextcloud & MariaDB:</strong> Αυτόματος συγχρονισμός και ασφαλής αποθήκευση πάνω από 6.000 αρχείων και φωτογραφιών.</p>
              <p>• <strong>Tailscale Mesh VPN:</strong> Ασφαλής σύνδεση απομακρυσμένης πρόσβασης χωρίς exposed ports.</p>
            </div>
          )}
        </section>

        {/* RESILIENCE */}
        <section id="resilience" className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Resilience & High Availability</h2>
            </div>
            <button
              onClick={() => setResilienceOpen(!resilienceOpen)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs text-zinc-200 transition-all font-medium"
            >
              <span>{resilienceOpen ? "Λιγότερα" : "Ανάλυση"}</span>
              <ChevronDown className={`h-3.5 w-3.5 text-emerald-400 transition-transform duration-200 ${resilienceOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            Σχεδιασμός με έμφαση στη συνεχή λειτουργία, τα αυτόματα backups και την ανθεκτικότητα απέναντι σε αστοχίες υλικού ή δικτύου.
          </p>

          {resilienceOpen && (
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-zinc-300">
              <p>• <strong>Αυτόματα Backups:</strong> Τακτικά snapshots και αντίγραφα ασφαλείας κρίσιμων δεδομένων.</p>
              <p>• <strong>Fault Tolerance:</strong> Προστασία υποδομής έναντι διακοπών δικτύου και απώλειας πακέτων.</p>
              <p>• <strong>Monitoring:</strong> Συνεχής παρακολούθηση υγείας συστημάτων και containers.</p>
            </div>
          )}
        </section>

        {/* PROJECTS */}
        <section id="projects" className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Project 1 */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-cyan-400">Infrastructure</span>
                <Server className="w-4 h-4 text-zinc-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Self-Hosted Homelab & Nextcloud</h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                Ανάπτυξη και διαχείριση εικονικών μηχανών σε Proxmox VE, παραμετροποίηση Docker containers για αυτόματο backup φωτογραφιών και αρχείων με ασφαλή πρόσβαση μέσω Tailscale VPN.
              </p>

              {project1Open && (
                <div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs text-zinc-300">
                  <p>• Υλοποίηση εξωτερικών mounts (ext4) και διαχείριση δικαιωμάτων χρηστών.</p>
                  <p>• Αποφυγή exposure ports στο internet χάρη στη χρήση Mesh VPN δικτύου.</p>
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 py-3 border-t border-white/5 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Proxmox</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Docker</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Tailscale</span>
              </div>
              <button
                onClick={() => setProject1Open(!project1Open)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs text-zinc-200 transition-all font-medium"
              >
                <span>{project1Open ? "Λιγότερα" : "Ανάλυση"}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-cyan-400 transition-transform duration-200 ${project1Open ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {/* Project 2 */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-purple-400">Web App</span>
                <Code2 className="w-4 h-4 text-zinc-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">High-Performance Portfolio</h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                Σύγχρονο, ελαφρύ και πλήρως βελτιστοποιημένο portfolio κατασκευασμένο με Next.js, Tailwind CSS και TypeScript, σχεδιασμένο για άμεση φόρτωση και μηδενικά lags.
              </p>

              {project2Open && (
                <div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs text-zinc-300">
                  <p>• Βελτιστοποίηση εικόνων και assets για κορυφαία επίδοση σε Lighthouse score.</p>
                  <p>• Αξιοποίηση Server Components και σύγχρονων hooks για ομαλό UX.</p>
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 py-3 border-t border-white/5 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Next.js</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Tailwind</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">TypeScript</span>
              </div>
              <button
                onClick={() => setProject2Open(!project2Open)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs text-zinc-200 transition-all font-medium"
              >
                <span>{project2Open ? "Λιγότερα" : "Ανάλυση"}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-purple-400 transition-transform duration-200 ${project2Open ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

        </section>

        {/* REVIEWS & TESTIMONIALS SECTION */}
        <section id="reviews" className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Αξιολογήσεις & Βαθμολογία</h2>
              <p className="text-xs text-zinc-400">Συνεργασίες, feedback και εμπειρία εργασίας</p>
            </div>
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-xl text-amber-400 w-fit">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold font-mono">5.0 / 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Infrastructure Systems</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                "Άψογη παραμετροποίηση Homelab και Docker υποδομών. Μεθοδικός, γρήγορος και με εξαιρετική κατανόηση της ασφάλειας δικτύων."
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Full Stack Web Project</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                "Εξαιρετικό αποτέλεσμα στο Next.js web application. Άμεση ανταπόκριση, καθαρός κώδικας και προσοχή στη λεπτομέρεια."
              </p>
            </div>
          </div>
        </section>

        {/* PRICING & SERVICES SECTION (Αναβαθμισμένο) */}
        <section id="services" className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2">Υπηρεσίες & Ανταγωνιστικά Πακέτα</h2>
            <p className="text-sm text-zinc-400">Καθαρές τιμές, διαφανής συνεργασία και επαγγελματικό αποτέλεσμα προσαρμοσμένο στις ανάγκες σας.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Package 1: Web Apps */}
            <div className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border-2 ${selectedPlan === "Modern Web App" ? "bg-cyan-500/5 border-cyan-500/50 shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] scale-[1.02]" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">Web Development</span>
                <h3 className="text-xl font-bold text-white mt-2">Modern Web App</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">350€</span>
                  <span className="text-xs text-zinc-400 font-mono">/ από</span>
                </div>
                <p className="text-xs text-zinc-400 mb-6">Σύγχρονη, ταχύτατη ιστοσελίδα (Landing Page / Portfolio) με Next.js & Tailwind CSS.</p>
                <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Responsive & Fast Design</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Βασικό SEO Optimization</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Φόρμα Επικοινωνίας & Analytics</li>
                </ul>
              </div>
              <button
                onClick={() => setSelectedPlan("Modern Web App")}
                className={`w-full py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${selectedPlan === "Modern Web App" ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20" : "bg-white/10 hover:bg-white/20 text-white"}`}
              >
                {selectedPlan === "Modern Web App" ? "Επιλεγμένο" : "Επιλογή"}
              </button>
            </div>

            {/* Package 2: Homelab (Highlighted) */}
            <div className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border-2 ${selectedPlan === "Homelab Setup" ? "bg-purple-500/5 border-purple-500/50 shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)] scale-[1.02]" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Most Popular
              </div>

              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider font-bold">DevOps / Linux</span>
                <h3 className="text-xl font-bold text-white mt-2">Homelab Setup</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">150€</span>
                  <span className="text-xs text-zinc-400 font-mono">/ από</span>
                </div>
                <p className="text-xs text-zinc-400 mb-6">Στήσιμο server, εικονικών μηχανών & containers για προσωπική ή μικρή επαγγελματική χρήση.</p>
                <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Proxmox & Docker Setup</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Nextcloud Data Sync</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Tailscale VPN Access</li>
                </ul>
              </div>
              <button
                onClick={() => setSelectedPlan("Homelab Setup")}
                className={`w-full py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${selectedPlan === "Homelab Setup" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20" : "bg-white/10 hover:bg-white/20 text-white"}`}
              >
                {selectedPlan === "Homelab Setup" ? "Επιλεγμένο" : "Επιλογή"}
              </button>
            </div>

            {/* Package 3: Consulting */}
            <div className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border-2 ${selectedPlan === "Custom Consulting" ? "bg-emerald-500/5 border-emerald-500/50 shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] scale-[1.02]" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">Custom Support</span>
                <h3 className="text-xl font-bold text-white mt-2">Consulting & Audit</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">35€</span>
                  <span className="text-xs text-zinc-400 font-mono">/ ώρα</span>
                </div>
                <p className="text-xs text-zinc-400 mb-6">Εξατομικευμένες λύσεις, επίλυση τεχνικών προβλημάτων και συμβουλευτική συστημάτων.</p>
                <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> System Auditing & Security</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Performance Optimization</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 1-on-1 Τεχνική Υποστήριξη</li>
                </ul>
              </div>
              <button
                onClick={() => setSelectedPlan("Custom Consulting")}
                className={`w-full py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${selectedPlan === "Custom Consulting" ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20" : "bg-white/10 hover:bg-white/20 text-white"}`}
              >
                {selectedPlan === "Custom Consulting" ? "Επιλεγμένο" : "Επιλογή"}
              </button>
            </div>
          </div>
        </section>

        {/* CONTACT FORM SECTION */}
        <section id="contact" className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Αίτημα Συνεργασίας</h2>
            <p className="text-xs text-zinc-400">Επιλέξτε πακέτο από πάνω και στείλτε μου τα στοιχεία σας.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">Όνομα / Επωνυμία</label>
                <input
                  type="text"
                  required
                  placeholder="Γιάννης Παπαδόπουλος"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">Email Επικοινωνίας</label>
                <input
                  type="email"
                  required
                  placeholder="example@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">Επιλεγμένη Υπηρεσία & Τιμή</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={selectedPlan}
                  className="w-2/3 px-4 py-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 font-mono text-sm cursor-not-allowed"
                />
                <input
                  type="text"
                  readOnly
                  value={getPlanPrice(selectedPlan)}
                  className="w-1/3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-zinc-400 font-mono text-sm text-center cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">Μήνυμα / Λεπτομέρειες</label>
              <textarea
                required
                rows={4}
                placeholder="Περιγράψτε το project ή το αίτημά σας..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Γίνεται αποστολή..." : "Αποστολή Αιτήματος"}</span>
            </button>

            {formSubmitted && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center font-medium animate-pulse">
                ✓ Το μήνυμά σας στάλθηκε με επιτυχία! Θα επικοινωνήσω μαζί σας σύντομα.
              </div>
            )}
          </form>
        </section>

      </main>

      <Footer />
    </div>
  );
}
