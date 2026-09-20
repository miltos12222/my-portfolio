"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Mail, Server, Code2, Cpu, CheckCircle2, ChevronDown, Star, Send, Check, Terminal, Globe, Download, Calendar, Calculator } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { toast } from "sonner";

// --- ΛΕΞΙΚΟ ΜΕΤΑΦΡΑΣΕΩΝ ---
const translations = {
  gr: {
    available: "AVAILABLE FOR HIRE",
    location: "ATHENS, GR",
    roleDesc: "Computer Science Graduate & Infrastructure Enthusiast. Εξειδίκευση σε self-hosted υποδομές, αυτοματισμούς Linux/Docker και σύγχρονη ανάπτυξη web εφαρμογών.",
    cvBtn: "Λήψη CV",
    contactBtn: "Επικοινωνία",
    bookCall: "Κλείστε Ραντεβού",
    more: "Ανάλυση",
    less: "Λιγότερα",
    infraDesc: "Proxmox VE, Docker containers, Nextcloud & MariaDB orchestration.",
    infraList1: "Αυτόματος συγχρονισμός και backup unlimited αρχείων και φωτογραφιών.",
    infraList2: "Διαχείριση δικτύου και ασφαλής πρόσβαση μέσω Tailscale VPN.",
    webDesc: "Next.js, TypeScript, Tailwind CSS, high-performance web apps.",
    webList1: "Αρχιτεκτονική φιλική προς SEO και άμεση απόκριση (zero lags).",
    webList2: "Responsive σχεδίαση με Tailwind CSS και modular λογική.",
    ethicTitle: "Υψηλή Παραγωγικότητα & Αντοχή",
    ethicDesc: "Διαθέτω εξαιρετική οργάνωση, προσαρμοστικότητα και αποδεδειγμένη αντοχή σε απαιτητικά περιβάλλοντα εργασίας με αυξημένη πίεση και σύνθετα τεχνικά ζητήματα.",
    ethicList1: "Μεθοδική αντιμετώπιση προβλημάτων σε περιβάλλοντα Linux/Homelab.",
    ethicList2: "Συνεχής εκμάθηση νέων τεχνολογιών και αυτοματισμών ροών εργασίας.",
    aboutTitle: "Σχετικά με Εμένα",
    aboutP1: "Είμαι απόφοιτος Πληροφορικής με έντονο ενδιαφέρον και πρακτική εμπειρία στις υποδομές δικτύων, τη διαχείριση συστημάτων Linux και την ανάπτυξη λογισμικού.",
    aboutP2: "Στόχος μου είναι η δημιουργία ασφαλών, γρήγορων και κλιμακούμενων εφαρμογών, αξιοποιώντας σύγχρονα εργαλεία αυτοματισμού και self-hosted αρχιτεκτονικές. Συνδυάζω το DevOps mindset με το σύγχρονο Web Development.",
    termStatus: "Online & Ready for Hire",
    stackDesc: "Ανάπτυξη και διαχείριση εικονικών μηχανών σε Proxmox VE, παραμετροποίηση Docker containers για αυτόματο backup φωτογραφιών και αρχείων με ασφαλή πρόσβαση μέσω Tailscale VPN.",
    stackList1: "Ρύθμιση αποθηκευτικών χώρων (ext4 mounts) και οργάνωση LXC containers.",
    stackList2: "Αυτόματος συγχρονισμός και ασφαλής αποθήκευση unlimited φωτογραφιών.",
    stackList3: "Ασφαλής σύνδεση απομακρυσμένης πρόσβασης χωρίς exposed ports.",
    resTitle: "Resilience & High Availability",
    resDesc: "Σχεδιασμός με έμφαση στη συνεχή λειτουργία, τα αυτόματα backups και την ανθεκτικότητα απέναντι σε αστοχίες υλικού ή δικτύου.",
    resList1: "Τακτικά snapshots και αντίγραφα ασφαλείας κρίσιμων δεδομένων.",
    resList2: "Προστασία υποδομής έναντι διακοπών δικτύου και απώλειας πακέτων.",
    resList3: "Συνεχής παρακολούθηση υγείας συστημάτων και containers.",
    proj1Desc: "Ανάπτυξη και διαχείριση εικονικών μηχανών σε Proxmox VE, παραμετροποίηση Docker containers για αυτόματο backup φωτογραφιών.",
    proj1List1: "Υλοποίηση εξωτερικών mounts (ext4) και διαχείριση δικαιωμάτων χρηστών.",
    proj1List2: "Αποφυγή exposure ports στο internet χάρη στη χρήση Mesh VPN δικτύου.",
    proj2Desc: "Σύγχρονο, ελαφρύ και πλήρως βελτιστοποιημένο portfolio κατασκευασμένο με Next.js, Tailwind CSS και TypeScript, σχεδιασμένο για άμεση φόρτωση και μηδενικά lags.",
    proj2List1: "Βελτιστοποίηση εικόνων και assets για κορυφαία επίδοση σε Lighthouse score.",
    proj2List2: "Αξιοποίηση Server Components και σύγχρονων hooks για ομαλό UX.",
    revTitle: "Αξιολογήσεις & Βαθμολογία",
    revSub: "Συνεργασίες, feedback και εμπειρία εργασίας",
    rev1: '"Άψογη παραμετροποίηση Homelab και Docker υποδομών. Μεθοδικός, γρήγορος και με εξαιρετική κατανόηση της ασφάλειας δικτύων."',
    rev2: '"Εξαιρετικό αποτέλεσμα στο Next.js web application. Άμεση ανταπόκριση, καθαρός κώδικας και προσοχή στη λεπτομέρεια."',

    calcTitle: "Διαδραστικός Υπολογιστής Έργου",
    calcSub: "Υπολογίστε κατά προσέγγιση το κόστος και στείλτε το αίτημά σας άμεσα.",
    calcType: "Είδος Project:",
    calcAddon: "Επιπρόσθετες Υπηρεσίες:",
    estPrice: "Εκτιμώμενο Κόστος:",
    selectThis: "Επιλογή αυτού του πακέτου",

    priceTitle: "Υπηρεσίες & Κλιμακωτά Πακέτα",
    priceSub: "Επιλέξτε τη λύση που ταιριάζει ακριβώς στο budget και στις απαιτήσεις του project σας. (Swipe δεξιά/αριστερά για περισσότερα)",
    from: "από",
    hour: "ώρα",

    p1Cat: "WEB DEVELOPMENT",
    p1Title: "Landing Page",
    p1Desc: "Μοντέρνα, αστραπιαία ιστοσελίδα μίας σελίδας για επαγγελματική προβολή και γρήγορα αποτελέσματα.",
    p1F1: "Next.js & Tailwind CSS",
    p1F2: "Responsive Mobile Design",
    p1F3: "Βασικό SEO & Fast Loading",
    p1F4: "Φόρμα Επικοινωνίας",

    p2Cat: "WEB DEVELOPMENT",
    p2Title: "Personal Portfolio / Blog",
    p2Desc: "Προσωπικός ιστότοπος ή blog με πολλαπλές σελίδες, παρουσίαση έργων και άρθρα.",
    p2F1: "Custom Portfolio Layout",
    p2F2: "Dynamic Blog / Markdown Support",
    p2F3: "Dark/Light Theme Toggle",
    p2F4: "Social & Analytics Integration",

    p3Cat: "WEB DEVELOPMENT",
    p3Title: "Business App / E-shop",
    p3Desc: "Πλήρης επαγγελματική δυναμική εφαρμογή ή ηλεκτρονικό κατάστημα υψηλών επιδόσεων.",
    p3F1: "Database & Admin Dashboard",
    p3F2: "Advanced SEO & Performance",
    p3F3: "Ασφαλείς Πληρωμές & E-shop Cart",
    p3F4: "Custom API Integrations",

    p4Cat: "WEB DEVELOPMENT",
    p4Title: "Custom Full-Stack App",
    p4Desc: "Προηγμένη web εφαρμογή κομμένη και ραμμένη στις ειδικές επιχειρηματικές σας ανάγκες.",
    p4F1: "Full-Stack Architecture (Next.js/Node)",
    p4F2: "User Authentication & Roles",
    p4F3: "Complex Database Design",
    p4F4: "High Security & Zero Lags",

    p5Cat: "DEVOPS / LINUX",
    p5Title: "Basic Homelab Setup",
    p5Desc: "Βασικό στήσιμο εικονικών μηχανών και ασφαλούς δικτύου για οικιακή χρήση.",
    p5F1: "Proxmox VE & LXC Containers",
    p5F2: "Tailscale Secure Mesh VPN",
    p5F3: "Βασική Ρύθμιση Storage (ext4)",
    p5F4: "Uptime & Health Monitoring",

    p6Cat: "DEVOPS / LINUX",
    p6Title: "Full Enterprise Homelab",
    p6Desc: "Προηγμένη αρχιτεκτονική με αυτόματα backups και ιδιωτικό cloud αποθήκευσης.",
    p6F1: "Nextcloud & Auto Backup (Unlimited Photos)",
    p6F2: "Automated Snapshots & Recovery",
    p6F3: "Advanced User Rights & Mounts",
    p6F4: "High Availability Optimization",

    p7Cat: "INFRASTRUCTURE",
    p7Title: "Advanced Cloud & Docker",
    p7Desc: "Ανάπτυξη και ενορχήστρωση σύνθετων self-hosted εφαρμογών και βάσεων δεδομένων.",
    p7F1: "Docker & Docker Compose Stack",
    p7F2: "MariaDB / PostgreSQL Setup",
    p7F3: "Reverse Proxy & SSL Certificates",
    p7F4: "Automated Cron Backups",

    p8Cat: "EXPERT SUPPORT",
    p8Title: "Consulting & Audit",
    p8Desc: "Εξατομικευμένες λύσεις, επίλυση σύνθετων τεχνικών προβλημάτων και security check.",
    p8F1: "System Auditing & Security Check",
    p8F2: "Performance & Code Optimization",
    p8F3: "1-on-1 Live Τεχνική Υποστήριξη",
    p8F4: "Architecture & DevOps Consulting",

    selected: "Επιλεγμένο",
    select: "Επιλογή",
    contactTitle: "Αίτημα Συνεργασίας",
    contactSub: "Επιλέξτε πακέτο από πάνω ή υπολογίστε το project σας και στείλτε μου τα στοιχεία σας.",
    formName: "Όνομα / Επωνυμία",
    formEmail: "Email Επικοινωνίας",
    formService: "Επιλεγμένη Υπηρεσία & Τιμή",
    formMsg: "Μήνυμα / Λεπτομέρειες",
    formPlaceholder: "Περιγράψτε το project ή το αίτημά σας...",
    submitBtn: "Αποστολή Αιτήματος",
    sending: "Γίνεται αποστολή...",
    successMsg: "Το μήνυμά σας στάλθηκε με επιτυχία! Θα επικοινωνήσω μαζί σας σύντομα.",
    errorMsg: "Αποτυχία αποστολής. Παρακαλώ δοκιμάστε ξανά.",
    serverError: "Σφάλμα σύνδεσης με τον διακομιστή."
  },
  en: {
    available: "AVAILABLE FOR HIRE",
    location: "ATHENS, GR",
    roleDesc: "Computer Science Graduate & Infrastructure Enthusiast. Specialized in self-hosted infrastructure, Linux/Docker automation, and modern web applications.",
    cvBtn: "Download CV",
    contactBtn: "Contact Me",
    bookCall: "Book a Call",
    more: "Details",
    less: "Less",
    infraDesc: "Proxmox VE, Docker containers, Nextcloud & MariaDB orchestration.",
    infraList1: "Automated sync and backup of unlimited files and photos.",
    infraList2: "Network management and secure access via Tailscale VPN.",
    webDesc: "Next.js, TypeScript, Tailwind CSS, high-performance web apps.",
    webList1: "SEO-friendly architecture and instant response (zero lags).",
    webList2: "Responsive design with Tailwind CSS and modular logic.",
    ethicTitle: "High Productivity & Resilience",
    ethicDesc: "Excellent organizational skills, adaptability, and proven resilience in demanding work environments under pressure.",
    ethicList1: "Methodical troubleshooting in Linux/Homelab environments.",
    ethicList2: "Continuous learning of new technologies and workflow automation.",
    aboutTitle: "About Me",
    aboutP1: "I am a Computer Science graduate with a strong interest and practical experience in network infrastructure, Linux system administration, and software development.",
    aboutP2: "My goal is to create secure, fast, and scalable applications by leveraging modern automation tools and self-hosted architectures. I combine a DevOps mindset with modern Web Development.",
    termStatus: "Online & Ready for Hire",
    stackDesc: "Deployment and management of virtual machines on Proxmox VE, Docker container configuration for automated backups, with secure access via Tailscale VPN.",
    stackList1: "Storage configuration (ext4 mounts) and LXC containers organization.",
    stackList2: "Automated synchronization and secure storage of unlimited photos.",
    stackList3: "Secure remote access without exposed ports.",
    resTitle: "Resilience & High Availability",
    resDesc: "Design focused on continuous operation, automated backups, and resilience against hardware or network failures.",
    resList1: "Regular snapshots and backups of critical data.",
    resList2: "Infrastructure protection against network outages and packet loss.",
    resList3: "Continuous health monitoring of systems and containers.",
    proj1Desc: "Deployment and management of virtual machines on Proxmox VE, Docker container configuration for automated backups.",
    proj1List1: "Implementation of external mounts (ext4) and user rights management.",
    proj1List2: "Avoiding exposed ports to the internet thanks to a Mesh VPN network.",
    proj2Desc: "Modern, lightweight, and fully optimized portfolio built with Next.js, Tailwind CSS, and TypeScript, designed for instant loading.",
    proj2List1: "Image and asset optimization for top Lighthouse scores.",
    proj2List2: "Leveraging Server Components and modern hooks for smooth UX.",
    revTitle: "Reviews & Ratings",
    revSub: "Collaborations, feedback, and work experience",
    rev1: '"Flawless Homelab and Docker infrastructure configuration. Methodical, fast, and with excellent understanding of network security."',
    rev2: '"Excellent result on the Next.js web application. Prompt response, clean code, and attention to detail."',

    calcTitle: "Interactive Project Calculator",
    calcSub: "Estimate your project cost instantly and submit your request.",
    calcType: "Project Type:",
    calcAddon: "Extra Options:",
    estPrice: "Estimated Cost:",
    selectThis: "Select this package",

    priceTitle: "Services & Scaled Packages",
    priceSub: "Choose the exact solution that fits your project budget and technical requirements. (Swipe horizontally for more)",
    from: "from",
    hour: "hour",

    p1Cat: "WEB DEVELOPMENT",
    p1Title: "Landing Page",
    p1Desc: "Modern, ultra-fast single-page website for professional branding and fast results.",
    p1F1: "Next.js & Tailwind CSS",
    p1F2: "Responsive Mobile Design",
    p1F3: "Basic SEO & Fast Loading",
    p1F4: "Contact Form Integration",

    p2Cat: "WEB DEVELOPMENT",
    p2Title: "Personal Portfolio / Blog",
    p2Desc: "Multi-page personal website or blog featuring project galleries and articles.",
    p2F1: "Custom Portfolio Layout",
    p2F2: "Dynamic Blog / Markdown Support",
    p2F3: "Dark/Light Theme Toggle",
    p2F4: "Social & Analytics Integration",

    p3Cat: "WEB DEVELOPMENT",
    p3Title: "Business App / E-shop",
    p3Desc: "Full professional dynamic web application or high-performance e-commerce store.",
    p3F1: "Database & Admin Dashboard",
    p3F2: "Advanced SEO & Performance",
    p3F3: "Secure Payments & E-shop Cart",
    p3F4: "Custom API Integrations",

    p4Cat: "WEB DEVELOPMENT",
    p4Title: "Custom Full-Stack App",
    p4F1: "Full-Stack Architecture (Next.js/Node)",
    p4F2: "User Authentication & Roles",
    p4F3: "Complex Database Design",
    p4F4: "High Security & Zero Lags",

    p5Cat: "DEVOPS / LINUX",
    p5Title: "Basic Homelab Setup",
    p5Desc: "Essential virtual machines and secure network setup for personal or local use.",
    p5F1: "Proxmox VE & LXC Containers",
    p5F2: "Tailscale Secure Mesh VPN",
    p5F3: "Basic Storage Setup (ext4)",
    p5F4: "Uptime & Health Monitoring",

    p6Cat: "DEVOPS / LINUX",
    p6Title: "Full Enterprise Homelab",
    p6Desc: "Advanced architecture featuring automated backups and private cloud storage.",
    p6F1: "Nextcloud & Auto Backup (Unlimited Photos)",
    p6F2: "Automated Snapshots & Recovery",
    p6F3: "Advanced User Rights & Mounts",
    p6F4: "High Availability Optimization",

    p7Cat: "INFRASTRUCTURE",
    p7Title: "Advanced Cloud & Docker",
    p7Desc: "Deployment and orchestration of advanced self-hosted apps and databases.",
    p7F1: "Docker & Docker Compose Stack",
    p7F2: "MariaDB / PostgreSQL Setup",
    p7F3: "Reverse Proxy & SSL Certificates",
    p7F4: "Automated Cron Backups",

    p8Cat: "EXPERT SUPPORT",
    p8Title: "Consulting & Audit",
    p8Desc: "Custom solutions, technical troubleshooting, and systems consulting.",
    p8F1: "System Auditing & Security Check",
    p8F2: "Performance & Code Optimization",
    p8F3: "1-on-1 Live Technical Support",
    p8F4: "Architecture & DevOps Consulting",

    selected: "Selected",
    select: "Select",
    contactTitle: "Collaboration Request",
    contactSub: "Select a package above or calculate your project and send me your details.",
    formName: "Name / Company",
    formEmail: "Contact Email",
    formService: "Selected Service & Price",
    formMsg: "Message / Details",
    formPlaceholder: "Describe your project or request...",
    submitBtn: "Send Request",
    sending: "Sending...",
    successMsg: "Your message was sent successfully! I will contact you soon.",
    errorMsg: "Failed to send. Please try again.",
    serverError: "Server connection error."
  }
};

export default function Home() {
  const [lang, setLang] = useState<"gr" | "en">("gr");
  const t = translations[lang];

  const [infraOpen, setInfraOpen] = useState(false);
  const [webOpen, setWebOpen] = useState(false);
  const [ethicOpen, setEthicOpen] = useState(false);
  const [project1Open, setProject1Open] = useState(false);
  const [project2Open, setProject2Open] = useState(false);
  const [stackOpen, setStackOpen] = useState(false);
  const [resilienceOpen, setResilienceOpen] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState("Full Enterprise Homelab");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- CALCULATOR STATES ---
  const [calcBasePrice, setCalcBasePrice] = useState(199);
  const [calcBaseName, setCalcBaseName] = useState("Landing Page");
  const [calcAddonSeo, setCalcAddonSeo] = useState(false);
  const [calcAddonVpn, setCalcAddonVpn] = useState(false);

  const calculatedTotal = calcBasePrice + (calcAddonSeo ? 70 : 0) + (calcAddonVpn ? 100 : 0);

  // --- TERMINAL STATES ---
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const [termInput, setTermInput] = useState("");
  const [termHistory, setTermHistory] = useState<{ cmd: string, output: React.ReactNode }[]>([{
    cmd: "neofetch",
    output: (
      <div className="pl-2 pt-1 flex gap-4">
        <div className="text-cyan-500 font-bold hidden sm:block">
          <pre>{`   .---.\n  /     \\\n  \\.@-@./\n  /  _  \\\n //     \\\\`}</pre>
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
    )
  }]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (termHistory.length > 1 && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [termHistory]);

  const getPlanPrice = (plan: string) => {
    switch (plan) {
      case "Landing Page": return lang === "gr" ? "Από 199€" : "From 199€";
      case "Personal Portfolio / Blog": return lang === "gr" ? "Από 290€" : "From 290€";
      case "Business App / E-shop": return lang === "gr" ? "Από 450€" : "From 450€";
      case "Custom Full-Stack App": return lang === "gr" ? "Από 650€" : "From 650€";
      case "Basic Homelab Setup": return lang === "gr" ? "Από 150€" : "From 150€";
      case "Full Enterprise Homelab": return lang === "gr" ? "Από 280€" : "From 280€";
      case "Advanced Cloud & Docker": return lang === "gr" ? "Από 250€" : "From 250€";
      case "Consulting & Audit": return lang === "gr" ? "35€ / ώρα" : "35€ / hour";
      default: return `Από ${calculatedTotal}€`;
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = termInput.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = <div className="text-zinc-300">Available commands: <br /><span className="text-cyan-400">whoami</span>, <span className="text-cyan-400">stack</span>, <span className="text-cyan-400">hire</span>, <span className="text-cyan-400">clear</span>, <span className="text-cyan-400">neofetch</span></div>;
        break;
      case "whoami":
        output = <div className="text-zinc-300">Miltos Papageorgiou - Cloud Infrastructure & Full Stack Web Developer.</div>;
        break;
      case "stack":
        output = <div className="text-zinc-300">Proxmox, Docker, Next.js, React, Tailscale, MariaDB, Linux.</div>;
        break;
      case "hire":
        output = <div className="text-emerald-400 animate-pulse">Redirecting to contact form...</div>;
        setTimeout(() => window.location.href = "#contact", 800);
        break;
      case "neofetch":
        output = termHistory[0].output;
        break;
      case "clear":
        setTermHistory([]);
        setTermInput("");
        return;
      case "sudo":
      case "sudo su":
        output = <div className="text-amber-400">Permission denied: Nice try, but root access is strictly reserved for Miltos! 🛡️</div>;
        break;
      case "rm -rf /":
      case "rm":
        output = <div className="text-red-500 font-bold animate-bounce">Nice try! System is protected by Proxmox High Availability & Automated Backups. 🚨</div>;
        break;
      case "matrix":
        output = <div className="text-emerald-500 font-mono">Wake up, Neo... The Matrix has you. Follow the white rabbit 🐇</div>;
        break;
      case "ping":
        output = <div className="text-cyan-300">64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.041 ms (Uptime: 99.9%)</div>;
        break;
      default:
        output = <div className="text-red-400">Command not found: {cmd}. Type 'help' for a list of commands.</div>;
    }

    setTermHistory([...termHistory, { cmd, output }]);
    setTermInput("");
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        toast.success(t.successMsg);
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(`${t.errorMsg} (${data.error || "Unknown Error"})`);
      }
    } catch (error) {
      console.error(error);
      toast.error(t.serverError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0b0c10] text-[#e5e7eb] selection:bg-cyan-500/25 selection:text-white w-full overflow-x-hidden">
      <div id="top" className="absolute top-0 left-0 h-px w-px pointer-events-none" />

      <Navbar />

      <main className="relative w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">

        {/* Κουμπιά Κορυφής (Command Menu, Γλώσσα & Book Call) */}
        <div className="flex flex-wrap justify-end gap-3 mb-4 animate-fade-in-up">
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-bold text-emerald-300 transition-all shadow-lg cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>{t.bookCall}</span>
          </a>

          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] text-xs font-bold text-white transition-all shadow-lg cursor-pointer group"
          >
            <Terminal className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Μενού (⌘K)</span>
            <span className="sm:hidden">Μενού</span>
          </button>

          <button
            onClick={() => setLang(lang === "gr" ? "en" : "gr")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] text-xs font-bold text-white transition-all shadow-lg cursor-pointer"
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            {lang === "gr" ? "🇬🇧 EN" : "🇬🇷 GR"}
          </button>
        </div>

        {/* OVERVIEW SECTION */}
        <section id="overview" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in-up">
          <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-white/[0.03] border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between z-10 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                {t.available}
              </span>
              <span className="text-xs font-mono text-zinc-400">{t.location}</span>
            </div>

            <div className="z-10 flex flex-col sm:flex-row items-center gap-6 my-auto">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-white/15 shadow-xl shrink-0 bg-zinc-900">
                <Image src="/profile.jpg" alt="Miltos Papageorgiou" fill className="object-cover object-center" priority />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                  Miltos Papageorgiou
                </h1>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {t.roleDesc}
                </p>
              </div>
            </div>

            <div className="z-10 flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-white/10">
              <a href="https://github.com/miltos12222" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white transition-all">
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/miltos-papageorgiou-740990438" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 border border-[#0A66C2]/40 text-xs font-medium text-blue-300 transition-all">
                <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
                <span>LinkedIn</span>
              </a>

              <a href="/cv.pdf" download="Miltos_Papageorgiou_CV.pdf" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-xs font-medium text-purple-300 transition-all">
                <Download className="w-4 h-4" />
                <span>{t.cvBtn}</span>
              </a>

              <a href="#contact" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-xs font-medium text-cyan-300 transition-all">
                <Mail className="w-4 h-4" />
                <span>{t.contactBtn}</span>
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-zinc-400 mb-4">
                <Server className="w-5 h-5 text-cyan-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider">Infrastructure</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Self-Hosted</h3>
              <p className="text-xs text-zinc-400 mb-3">{t.infraDesc}</p>
              {infraOpen && (
                <div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs text-zinc-300">
                  <p>• {t.infraList1}</p>
                  <p>• {t.infraList2}</p>
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 py-2 border-t border-white/5 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Proxmox</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Docker</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Tailscale</span>
              </div>
              <button onClick={() => setInfraOpen(!infraOpen)} className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs text-zinc-200 transition-all font-medium cursor-pointer">
                <span>{infraOpen ? t.less : t.more}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-cyan-400 transition-transform duration-200 ${infraOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-zinc-400 mb-4">
                <Code2 className="w-5 h-5 text-purple-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider">Development</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Modern Stack</h3>
              <p className="text-xs text-zinc-400 mb-3">{t.webDesc}</p>
              {webOpen && (
                <div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs text-zinc-300">
                  <p>• {t.webList1}</p>
                  <p>• {t.webList2}</p>
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 py-2 border-t border-white/5 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Next.js</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">TypeScript</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Tailwind</span>
              </div>
              <button onClick={() => setWebOpen(!webOpen)} className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs text-zinc-200 transition-all font-medium cursor-pointer">
                <span>{webOpen ? t.less : t.more}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-purple-400 transition-transform duration-200 ${webOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-2 rounded-3xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-zinc-400 mb-3">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider">Work Ethic</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t.ethicTitle}</h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                {t.ethicDesc}
              </p>
              {ethicOpen && (
                <div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs text-zinc-300">
                  <p>• {t.ethicList1}</p>
                  <p>• {t.ethicList2}</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Problem Solver</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fast Learner</span>
              </div>
              <button onClick={() => setEthicOpen(!ethicOpen)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs text-zinc-200 transition-all font-medium cursor-pointer">
                <span>{ethicOpen ? t.less : t.more}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-emerald-400 transition-transform duration-200 ${ethicOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </section>

        {/* TECH MARQUEE */}
        <div className="relative w-full overflow-hidden border-y border-white/5 bg-white/[0.01] py-5 my-8 animate-fade-in-up delay-100 flex items-center">
          <div className="absolute left-0 top-0 z-10 w-24 h-full bg-gradient-to-r from-[#0b0c10] to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 z-10 w-24 h-full bg-gradient-to-l from-[#0b0c10] to-transparent pointer-events-none"></div>

          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-10 items-center justify-around whitespace-nowrap px-5 text-sm font-mono text-zinc-500 uppercase tracking-widest cursor-default">
                <span className="text-white hover:text-cyan-400 transition-colors">Next.js</span> <span className="text-cyan-500/30">•</span>
                <span className="text-white hover:text-purple-400 transition-colors">TypeScript</span> <span className="text-cyan-500/30">•</span>
                <span className="text-white hover:text-cyan-300 transition-colors">Tailwind CSS</span> <span className="text-cyan-500/30">•</span>
                <span className="text-white hover:text-orange-400 transition-colors">Proxmox VE</span> <span className="text-cyan-500/30">•</span>
                <span className="text-white hover:text-blue-400 transition-colors">Docker</span> <span className="text-cyan-500/30">•</span>
                <span className="text-white hover:text-emerald-400 transition-colors">Linux</span> <span className="text-cyan-500/30">•</span>
                <span className="text-white hover:text-zinc-300 transition-colors">Tailscale</span> <span className="text-cyan-500/30">•</span>
                <span className="text-white hover:text-blue-300 transition-colors">Nextcloud</span> <span className="text-cyan-500/30">•</span>
                <span className="text-white hover:text-red-400 transition-colors">MariaDB</span> <span className="text-cyan-500/30">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT ME + TERMINAL */}
        <section id="about-me" className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in-up delay-200">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-center">
            <h2 className="text-xl font-bold text-white mb-4">{t.aboutTitle}</h2>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              {t.aboutP1}
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {t.aboutP2}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-5 font-mono text-xs shadow-2xl relative overflow-hidden group flex flex-col h-[350px]">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="ml-2 text-zinc-500 flex items-center gap-1"><Terminal className="w-3 h-3" /> root@miltos-server:~</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 text-zinc-300 pr-2 pb-4 scrollbar-thin scrollbar-thumb-white/10" onClick={() => document.getElementById('term-input')?.focus()}>
              {termHistory.map((item, i) => (
                <div key={i} className="space-y-1">
                  <p><span className="text-emerald-400">miltos@admin:~$</span> {item.cmd}</p>
                  {item.output}
                </div>
              ))}

              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 mt-2">
                <span className="text-emerald-400 shrink-0">miltos@admin:~$</span>
                <input
                  id="term-input"
                  type="text"
                  value={termInput}
                  onChange={(e) => setTermInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none border-none text-white focus:ring-0 p-0 m-0 min-w-0"
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
              <div ref={terminalEndRef} />
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
            <button onClick={() => setStackOpen(!stackOpen)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs text-zinc-200 transition-all font-medium cursor-pointer">
              <span>{stackOpen ? t.less : t.more}</span>
              <ChevronDown className={`h-3.5 w-3.5 text-cyan-400 transition-transform duration-200 ${stackOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {t.stackDesc}
          </p>
          {stackOpen && (
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-zinc-300">
              <p>• {t.stackList1}</p>
              <p>• {t.stackList2}</p>
              <p>• {t.stackList3}</p>
            </div>
          )}
        </section>

        {/* RESILIENCE */}
        <section id="resilience" className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">{t.resTitle}</h2>
            </div>
            <button onClick={() => setResilienceOpen(!resilienceOpen)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs text-zinc-200 transition-all font-medium cursor-pointer">
              <span>{resilienceOpen ? t.less : t.more}</span>
              <ChevronDown className={`h-3.5 w-3.5 text-emerald-400 transition-transform duration-200 ${resilienceOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {t.resDesc}
          </p>
          {resilienceOpen && (
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-zinc-300">
              <p>• {t.resList1}</p>
              <p>• {t.resList2}</p>
              <p>• {t.resList3}</p>
            </div>
          )}
        </section>

        {/* PROJECTS */}
        <section id="projects" className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up delay-300">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-cyan-400">Infrastructure</span>
                <Server className="w-4 h-4 text-zinc-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Self-Hosted Homelab & Nextcloud</h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                {t.proj1Desc}
              </p>
              {project1Open && (
                <div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs text-zinc-300">
                  <p>• {t.proj1List1}</p>
                  <p>• {t.proj1List2}</p>
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 py-3 border-t border-white/5 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Proxmox</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Docker</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Tailscale</span>
              </div>
              <button onClick={() => setProject1Open(!project1Open)} className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs text-zinc-200 transition-all font-medium cursor-pointer">
                <span>{project1Open ? t.less : t.more}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-cyan-400 transition-transform duration-200 ${project1Open ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-purple-400">Web App</span>
                <Code2 className="w-4 h-4 text-zinc-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">High-Performance Portfolio</h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                {t.proj2Desc}
              </p>
              {project2Open && (
                <div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs text-zinc-300">
                  <p>• {t.proj2List1}</p>
                  <p>• {t.proj2List2}</p>
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 py-3 border-t border-white/5 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Next.js</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">Tailwind</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300">TypeScript</span>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setProject2Open(!project2Open)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs text-zinc-200 transition-all font-medium cursor-pointer">
                  <span>{project2Open ? t.less : t.more}</span>
                  <ChevronDown className={`h-3.5 w-3.5 text-purple-400 transition-transform duration-200 ${project2Open ? "rotate-180" : ""}`} />
                </button>
                <a href="https://github.com/miltos12222" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white transition-all">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section id="reviews" className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">{t.revTitle}</h2>
              <p className="text-xs text-zinc-400">{t.revSub}</p>
            </div>
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-xl text-amber-400 w-fit">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-xs font-bold font-mono">5.0 / 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Infrastructure Systems</span>
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">{t.rev1}</p>
            </div>

            <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Full Stack Web Project</span>
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">{t.rev2}</p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE COST CALCULATOR (NEW SMART WIDGET) */}
        <section className="rounded-3xl border border-cyan-500/30 bg-cyan-500/[0.02] p-6 sm:p-8 space-y-6 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-cyan-400" />
            <div>
              <h2 className="text-lg font-bold text-white">{t.calcTitle}</h2>
              <p className="text-xs text-zinc-400">{t.calcSub}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-2">{t.calcType}</label>
              <select
                value={calcBasePrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCalcBasePrice(val);
                  if (val === 199) setCalcBaseName("Landing Page");
                  if (val === 290) setCalcBaseName("Personal Portfolio / Blog");
                  if (val === 450) setCalcBaseName("Business App / E-shop");
                  if (val === 650) setCalcBaseName("Custom Full-Stack App");
                  if (val === 150) setCalcBaseName("Basic Homelab Setup");
                  if (val === 280) setCalcBaseName("Full Enterprise Homelab");
                  if (val === 250) setCalcBaseName("Advanced Cloud & Docker");
                  setSelectedPlan(calcBaseName);
                }}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
              >
                <option value={199} className="bg-zinc-900">Landing Page (199€)</option>
                <option value={290} className="bg-zinc-900">Personal Portfolio / Blog (290€)</option>
                <option value={450} className="bg-zinc-900">Business App / E-shop (450€)</option>
                <option value={650} className="bg-zinc-900">Custom Full-Stack App (650€)</option>
                <option value={150} className="bg-zinc-900">Basic Homelab Setup (150€)</option>
                <option value={280} className="bg-zinc-900">Full Enterprise Homelab (280€)</option>
                <option value={250} className="bg-zinc-900">Advanced Cloud & Docker (250€)</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-mono text-zinc-300">{t.calcAddon}</label>
              <div className="flex flex-col sm:flex-row gap-4 text-xs text-zinc-300">
                <label className="flex items-center gap-2 cursor-pointer bg-white/[0.03] px-3 py-2 rounded-xl border border-white/5 hover:border-white/10">
                  <input type="checkbox" checked={calcAddonSeo} onChange={(e) => setCalcAddonSeo(e.target.checked)} className="rounded bg-black border-white/20 text-cyan-500 focus:ring-0" />
                  <span>Advanced SEO (+70€)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-white/[0.03] px-3 py-2 rounded-xl border border-white/5 hover:border-white/10">
                  <input type="checkbox" checked={calcAddonVpn} onChange={(e) => setCalcAddonVpn(e.target.checked)} className="rounded bg-black border-white/20 text-cyan-500 focus:ring-0" />
                  <span>Tailscale Mesh VPN Setup (+100€)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div>
              <span className="text-xs text-zinc-400 font-mono">{t.estPrice}</span>
              <div className="text-3xl font-bold text-cyan-400 font-mono">{calculatedTotal}€</div>
            </div>
            <button
              onClick={() => {
                const desc = `${calcBaseName} ${calcAddonSeo ? "+ SEO" : ""} ${calcAddonVpn ? "+ VPN" : ""}`;
                setSelectedPlan(desc);
                toast.success(`Επιλέχθηκε το πακέτο: ${desc} (${calculatedTotal}€)`);
                window.location.href = "#contact";
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              {t.selectThis}
            </button>
          </div>
        </section>

        {/* PRICING SECTION - HORIZONTAL SWIPE ON MOBILE */}
        <section id="services" className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10 space-y-8 animate-fade-in-up delay-400">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{t.priceTitle}</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">{t.priceSub}</p>
          </div>

          {/* Οριζόντιο swipe σε κινητά (flex overflow-x-auto), κανονικό grid σε desktop (lg:grid-cols-3) */}
          <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto snap-x snap-mandatory gap-6 pb-4 pt-2 no-scrollbar scroll-smooth">

            {/* 1. Landing Page */}
            <div className={`min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border-2 ${selectedPlan === "Landing Page" ? "bg-cyan-500/5 border-cyan-500/50 shadow-[0_0_35px_-5px_rgba(6,182,212,0.2)] scale-[1.02]" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">{t.p1Cat}</span>
                <h3 className="text-lg font-bold text-white mt-2">{t.p1Title}</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">199€</span>
                  <span className="text-xs text-zinc-400 font-mono">/ {t.from}</span>
                </div>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">{t.p1Desc}</p>
                <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" /> <span>{t.p1F1}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" /> <span>{t.p1F2}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" /> <span>{t.p1F3}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" /> <span>{t.p1F4}</span></li>
                </ul>
              </div>
              <button onClick={() => setSelectedPlan("Landing Page")} className={`w-full py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${selectedPlan === "Landing Page" ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-bold" : "bg-white/10 hover:bg-white/20 text-white"}`}>
                {selectedPlan === "Landing Page" ? t.selected : t.select}
              </button>
            </div>

            {/* 2. Personal Portfolio / Blog */}
            <div className={`min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border-2 ${selectedPlan === "Personal Portfolio / Blog" ? "bg-indigo-500/5 border-indigo-500/50 shadow-[0_0_35px_-5px_rgba(99,102,241,0.2)] scale-[1.02]" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-bold">{t.p2Cat}</span>
                <h3 className="text-lg font-bold text-white mt-2">{t.p2Title}</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">290€</span>
                  <span className="text-xs text-zinc-400 font-mono">/ {t.from}</span>
                </div>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">{t.p2Desc}</p>
                <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> <span>{t.p2F1}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> <span>{t.p2F2}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> <span>{t.p2F3}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> <span>{t.p2F4}</span></li>
                </ul>
              </div>
              <button onClick={() => setSelectedPlan("Personal Portfolio / Blog")} className={`w-full py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${selectedPlan === "Personal Portfolio / Blog" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 font-bold" : "bg-white/10 hover:bg-white/20 text-white"}`}>
                {selectedPlan === "Personal Portfolio / Blog" ? t.selected : t.select}
              </button>
            </div>

            {/* 3. Business App / E-shop */}
            <div className={`min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border-2 ${selectedPlan === "Business App / E-shop" ? "bg-purple-500/5 border-purple-500/50 shadow-[0_0_35px_-5px_rgba(168,85,247,0.2)] scale-[1.02]" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Recommended
              </div>
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider font-bold">{t.p3Cat}</span>
                <h3 className="text-lg font-bold text-white mt-2">{t.p3Title}</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">450€</span>
                  <span className="text-xs text-zinc-400 font-mono">/ {t.from}</span>
                </div>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">{t.p3Desc}</p>
                <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" /> <span>{t.p3F1}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" /> <span>{t.p3F2}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" /> <span>{t.p3F3}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" /> <span>{t.p3F4}</span></li>
                </ul>
              </div>
              <button onClick={() => setSelectedPlan("Business App / E-shop")} className={`w-full py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${selectedPlan === "Business App / E-shop" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20 font-bold" : "bg-white/10 hover:bg-white/20 text-white"}`}>
                {selectedPlan === "Business App / E-shop" ? t.selected : t.select}
              </button>
            </div>

            {/* 4. Custom Full-Stack App */}
            <div className={`min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border-2 ${selectedPlan === "Custom Full-Stack App" ? "bg-pink-500/5 border-pink-500/50 shadow-[0_0_35px_-5px_rgba(236,72,153,0.2)] scale-[1.02]" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>
              <div>
                <span className="text-xs font-mono text-pink-400 uppercase tracking-wider font-bold">WEB DEVELOPMENT</span>
                <h3 className="text-lg font-bold text-white mt-2">Custom Full-Stack App</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">650€</span>
                  <span className="text-xs text-zinc-400 font-mono">/ {t.from}</span>
                </div>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">Προηγμένη web εφαρμογή κομμένη και ραμμένη στις ειδικές επιχειρηματικές σας ανάγκες.</p>
                <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" /> <span>Full-Stack Architecture (Next.js/Node)</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" /> <span>User Authentication & Roles</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" /> <span>Complex Database Design</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" /> <span>High Security & Zero Lags</span></li>
                </ul>
              </div>
              <button onClick={() => setSelectedPlan("Custom Full-Stack App")} className={`w-full py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${selectedPlan === "Custom Full-Stack App" ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20 font-bold" : "bg-white/10 hover:bg-white/20 text-white"}`}>
                {selectedPlan === "Custom Full-Stack App" ? t.selected : t.select}
              </button>
            </div>

            {/* 5. Basic Homelab Setup */}
            <div className={`min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border-2 ${selectedPlan === "Basic Homelab Setup" ? "bg-blue-500/5 border-blue-500/50 shadow-[0_0_35px_-5px_rgba(59,130,246,0.2)] scale-[1.02]" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider font-bold">{t.p5Cat}</span>
                <h3 className="text-lg font-bold text-white mt-2">{t.p5Title}</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">150€</span>
                  <span className="text-xs text-zinc-400 font-mono">/ {t.from}</span>
                </div>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">{t.p5Desc}</p>
                <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /> <span>{t.p5F1}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /> <span>{t.p5F2}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /> <span>{t.p5F3}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /> <span>{t.p5F4}</span></li>
                </ul>
              </div>
              <button onClick={() => setSelectedPlan("Basic Homelab Setup")} className={`w-full py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${selectedPlan === "Basic Homelab Setup" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20 font-bold" : "bg-white/10 hover:bg-white/20 text-white"}`}>
                {selectedPlan === "Basic Homelab Setup" ? t.selected : t.select}
              </button>
            </div>

            {/* 6. Full Enterprise Homelab */}
            <div className={`min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border-2 ${selectedPlan === "Full Enterprise Homelab" ? "bg-emerald-500/5 border-emerald-500/50 shadow-[0_0_35px_-5px_rgba(16,185,129,0.2)] scale-[1.02]" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">{t.p6Cat}</span>
                <h3 className="text-lg font-bold text-white mt-2">{t.p6Title}</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">280€</span>
                  <span className="text-xs text-zinc-400 font-mono">/ {t.from}</span>
                </div>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">{t.p6Desc}</p>
                <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> <span>{t.p6F1}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> <span>{t.p6F2}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> <span>{t.p6F3}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> <span>{t.p6F4}</span></li>
                </ul>
              </div>
              <button onClick={() => setSelectedPlan("Full Enterprise Homelab")} className={`w-full py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${selectedPlan === "Full Enterprise Homelab" ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-bold" : "bg-white/10 hover:bg-white/20 text-white"}`}>
                {selectedPlan === "Full Enterprise Homelab" ? t.selected : t.select}
              </button>
            </div>

            {/* 7. Advanced Cloud & Docker */}
            <div className={`min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border-2 ${selectedPlan === "Advanced Cloud & Docker" ? "bg-amber-500/5 border-amber-500/50 shadow-[0_0_35px_-5px_rgba(245,158,11,0.2)] scale-[1.02]" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">{t.p7Cat}</span>
                <h3 className="text-lg font-bold text-white mt-2">{t.p7Title}</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">250€</span>
                  <span className="text-xs text-zinc-400 font-mono">/ {t.from}</span>
                </div>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">{t.p7Desc}</p>
                <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> <span>{t.p7F1}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> <span>{t.p7F2}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> <span>{t.p7F3}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> <span>{t.p7F4}</span></li>
                </ul>
              </div>
              <button onClick={() => setSelectedPlan("Advanced Cloud & Docker")} className={`w-full py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${selectedPlan === "Advanced Cloud & Docker" ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-bold" : "bg-white/10 hover:bg-white/20 text-white"}`}>
                {selectedPlan === "Advanced Cloud & Docker" ? t.selected : t.select}
              </button>
            </div>

            {/* 8. Consulting & Audit */}
            <div className={`min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border-2 ${selectedPlan === "Consulting & Audit" ? "bg-rose-500/5 border-rose-500/50 shadow-[0_0_35px_-5px_rgba(244,63,94,0.2)] scale-[1.02]" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>
              <div>
                <span className="text-xs font-mono text-rose-400 uppercase tracking-wider font-bold">{t.p8Cat}</span>
                <h3 className="text-lg font-bold text-white mt-2">{t.p8Title}</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">35€</span>
                  <span className="text-xs text-zinc-400 font-mono">/ {t.hour}</span>
                </div>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">{t.p8Desc}</p>
                <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" /> <span>{t.p8F1}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" /> <span>{t.p8F2}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" /> <span>{t.p8F3}</span></li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" /> <span>{t.p8F4}</span></li>
                </ul>
              </div>
              <button onClick={() => setSelectedPlan("Consulting & Audit")} className={`w-full py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${selectedPlan === "Consulting & Audit" ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20 font-bold" : "bg-white/10 hover:bg-white/20 text-white"}`}>
                {selectedPlan === "Consulting & Audit" ? t.selected : t.select}
              </button>
            </div>

          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact" className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-6 animate-fade-in-up delay-500">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">{t.contactTitle}</h2>
            <p className="text-xs text-zinc-400 mb-6">{t.contactSub}</p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">{t.formName}</label>
                <input type="text" required placeholder="Γιάννης Παπαδόπουλος" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">{t.formEmail}</label>
                <input type="email" required placeholder="example@domain.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">{t.formService}</label>
              <div className="flex gap-2">
                <input type="text" readOnly value={selectedPlan} className="w-2/3 px-4 py-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 font-mono text-sm cursor-not-allowed" />
                <input type="text" readOnly value={getPlanPrice(selectedPlan)} className="w-1/3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-zinc-400 font-mono text-sm text-center cursor-not-allowed" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">{t.formMsg}</label>
              <textarea required rows={4} placeholder={t.formPlaceholder} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all resize-none" />
            </div>

            <button type="submit" disabled={isSubmitting} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer">
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? t.sending : t.submitBtn}</span>
            </button>
          </form>
        </section>

      </main>

      <Footer />
    </div>
  );
}
