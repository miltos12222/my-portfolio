"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Mail, Server, Code2, Cpu, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Star, Send, Check, Terminal, Globe, Download, Calendar, Calculator, Sparkles, Sun, Moon, Zap, History, ShieldCheck, HelpCircle, Palette, ArrowRight, ShoppingBag } from "lucide-react";
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

    learningTitle: "Live Tech Roadmap & History",
    learningSubtitle: "Η συνεχής πορεία μάθησης και τεχνολογικής εξέλιξης:",
    learningItems: [
      { date: "Τρέχον", text: "Advanced Proxmox Clustering & Kubernetes orchestration." },
      { date: "Προηγούμενο", text: "Next.js 14 App Router, Server Actions & Advanced TypeScript." },
      { date: "Βάση", text: "Linux Administration, Docker Networking & Tailscale VPN Mesh." }
    ],

    guaranteeText: "Zero downtime deployment • SEO-optimized • Fast delivery (5-7 days)",

    servicesBannerTitle: "Ψάχνετε Υπηρεσίες Web Development & Homelab;",
    servicesBannerDesc: "Επισκεφθείτε τον εμπορικό μας κατάλογο, επιλέξτε πολλαπλές υπηρεσίες και φτιάξτε το custom πακέτο σας ζωντανά.",
    servicesBannerBtn: "Μετάβαση στον Κατάλογο Υπηρεσιών ➔",

    faqTitle: "Συχνές Ερωτήσεις (FAQ)",
    faqSub: "Όλες οι απαντήσεις σχετικά με τη διαδικασία συνεργασίας και τις τεχνικές λεπτομέρειες.",
    faqList: [
      { q: "Πώς γίνεται η πληρωμή;", a: "Η διαδικασία περιλαμβάνει 50% προκαταβολή για την έναρξη του έργου και 50% εξόφληση με την παράδοση και τον έλεγχο της εφαρμογής." },
      { q: "Χρειάζομαι hosting;", a: "Όχι απαραίτητα. Σας τα στήνω και τα παραδίδω πλήρως λειτουργικά (σε Vercel για τα web apps ή σε δικό σας Proxmox server για self-hosted λύσεις)." },
      { q: "Πόσες αλλαγές περιλαμβάνονται;", a: "Κάθε πακέτο περιλαμβάνει δωρεάν αναθεωρήσεις και διορθώσεις κατά τη διάρκεια της ανάπτυξης, καθώς και υποστήριξη για τυχόν παρατηρήσεις μετά την παράδοση." },
      { q: "Πόσος χρόνος χρειάζεται για την ολοκλήρωση;", a: "Συνήθως από 5 έως 10 εργάσιμες ημέρες ανάλογα με την πολυπλοκότητα του project (Landing Pages παραδίδονται συχνά σε 3-5 ημέρες)." },
      { q: "Είναι φιλικό προς τις μηχανές αναζήτησης (SEO);", a: "Ναι, απόλυτα. Χρησιμοποιώ Next.js server-side rendering, sitemaps και βέλτιστες πρακτικές για κορυφαίες επιδόσεις σε Google Lighthouse scores." },
      { q: "Παρέχετε τεχνική υποστήριξη μετά την παράδοση;", a: "Φυσικά. Υπάρχει δυνατότητα μηνιαίας συντήρησης, ασφάλειας και ενημερώσεων ή υποστήριξη με την ώρα (Consulting & Audit)." },
      { q: "Μπορώ να ενημερώνω μόνος μου το περιεχόμενο;", a: "Ναι, μπορούμε να ενσωματώσουμε εύκολο CMS ή Markdown δομή ώστε να αλλάζετε κείμενα και φωτογραφίες χωρίς κώδικα." },
      { q: "Τι γίνεται αν χρειαστώ κάτι πιο σύνθετο;", a: "Μπορούμε να προσαρμόσουμε το πακέτο ακριβώς στις απαιτήσεις σας (Custom Full-Stack App) με βάση τις ανάγκες της επιχείρησής σας." },
      { q: "Πώς μπορούμε να ξεκινήσουμε;", a: "Απλώς συμπληρώστε τη φόρμα επικοινωνίας ή κλείστε ένα απευθείας 15λεπτο ραντεβού (Book a Call) για να συζητήσουμε το project σας." }
    ],

    testimonialsTitle: "Συστάσεις & Real Testimonials",
    test1Text: '"Ο Μίλτος έδειξε εξαιρετική αφοσίωση και τεχνική κατάρτιση στο στήσιμο των δικτύων και των containers. Επαγγελματίας σε όλα του."',
    test1Author: "Dr. A. K., Καθηγητής Πληροφορικής (AUTH)",
    test2Text: '"Το portfolio και οι υπηρεσίες του ξεχωρίζουν για την ταχύτητα και την καθαρότητα του κώδικα. Άριστος συνεργάτης."',
    test2Author: "Γιάννης Π., Senior Software Engineer",

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

    contactTitle: "Άμεση Επικοινωνία",
    contactSub: "Στείλτε μου το μήνυμά σας και θα επικοινωνήσω μαζί σας άμεσα.",
    formName: "Όνομα / Επωνυμία",
    formEmail: "Email Επικοινωνίας",
    formService: "Θέμα / Υπηρεσία",
    formMsg: "Μήνυμα / Λεπτομέρειες",
    formPlaceholder: "Περιγράψτε το αίτημά σας...",
    submitBtn: "Αποστολή Μηνύματος",
    sending: "Γίνεται αποστολή...",
    successMsg: "Το μήνυμά σας στάλθηκε με επιτυχία!",
    errorMsg: "Αποτυχία αποστολής.",
    serverError: "Σφάλμα σύνδεσης."
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

    learningTitle: "Live Tech Roadmap & History",
    learningSubtitle: "Continuous learning path and technological evolution:",
    learningItems: [
      { date: "Current", text: "Advanced Proxmox Clustering & Kubernetes orchestration." },
      { date: "Previous", text: "Next.js 14 App Router, Server Actions & Advanced TypeScript." },
      { date: "Foundation", text: "Linux Administration, Docker Networking & Tailscale VPN Mesh." }
    ],

    guaranteeText: "Zero downtime deployment • SEO-optimized • Fast delivery (5-7 days)",

    servicesBannerTitle: "Looking for Web Development & Homelab Services?",
    servicesBannerDesc: "Visit our commercial catalog, select multiple services, and build your custom package live.",
    servicesBannerBtn: "Go to Services Catalog ➔",

    faqTitle: "Frequently Asked Questions (FAQ)",
    faqSub: "Everything you need to know about our collaboration process and technical details.",
    faqList: [
      { q: "How does payment work?", a: "A 50% deposit is required to kick off the project, and the remaining 50% is paid upon delivery and final testing." },
      { q: "Do I need hosting?", a: "Not necessarily. I set everything up and deliver it fully operational (on Vercel for web apps or your own Proxmox server for self-hosted solutions)." },
      { q: "How many revisions are included?", a: "Each package includes free iterations and adjustments during development, plus post-launch support." },
      { q: "What is the typical turnaround time?", a: "Usually between 5 to 10 business days depending on project complexity (Landing pages are often delivered in 3-5 days)." },
      { q: "Is it SEO friendly?", a: "Yes, absolutely. I utilize Next.js server-side rendering, sitemaps, and best practices for top Google Lighthouse scores." },
      { q: "Do you provide post-launch support?", a: "Yes, monthly maintenance, security updates, or hourly consulting & audit are available." },
      { q: "Can I update the content myself?", a: "Yes, we can integrate an easy-to-use CMS or Markdown setup so you can update texts and images without code." },
      { q: "What if I need something custom or advanced?", a: "We can tailor a custom full-stack app specifically matching your unique business requirements." },
      { q: "How do we get started?", a: "Simply fill out the contact form below or book a direct 15-minute discovery call to discuss your project." }
    ],

    testimonialsTitle: "Recommendations & Real Testimonials",
    test1Text: '"Miltos showed exceptional dedication and technical skill in setting up network systems and containers. A true professional."',
    test1Author: "Dr. A. K., CS Professor (AUTH)",
    test2Text: '"His portfolio and services stand out for speed and clean code execution. An outstanding collaborator."',
    test2Author: "John P., Senior Software Engineer",

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

    contactTitle: "Direct Contact",
    contactSub: "Send me a message and I will get back to you promptly.",
    formName: "Name / Company",
    formEmail: "Contact Email",
    formService: "Subject / Service",
    formMsg: "Message / Details",
    formPlaceholder: "Describe your inquiry...",
    submitBtn: "Send Message",
    sending: "Sending...",
    successMsg: "Your message was sent successfully!",
    errorMsg: "Failed to send.",
    serverError: "Server connection error."
  }
};

export default function Home() {
  const [lang, setLang] = useState<"gr" | "en">("gr");
  const t = translations[lang];

  // --- THEME STATE ---
  const [theme, setTheme] = useState<"dark" | "cyberpunk" | "light">("dark");

  const [infraOpen, setInfraOpen] = useState(false);
  const [webOpen, setWebOpen] = useState(false);
  const [ethicOpen, setEthicOpen] = useState(false);
  const [project1Open, setProject1Open] = useState(false);
  const [project2Open, setProject2Open] = useState(false);
  const [stackOpen, setStackOpen] = useState(false);
  const [resilienceOpen, setResilienceOpen] = useState(false);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FAQ SLIDER STATE ---
  const [faqIndex, setFaqIndex] = useState(0);
  const [faqFade, setFaqFade] = useState(true);

  // Auto slide FAQ every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFaqFade(false);
      setTimeout(() => {
        setFaqIndex((prev) => (prev + 1) % t.faqList.length);
        setFaqFade(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, [t.faqList.length]);

  const handleNextFaq = () => {
    setFaqFade(false);
    setTimeout(() => {
      setFaqIndex((prev) => (prev + 1) % t.faqList.length);
      setFaqFade(true);
    }, 300);
  };

  const handlePrevFaq = () => {
    setFaqFade(false);
    setTimeout(() => {
      setFaqIndex((prev) => (prev - 1 + t.faqList.length) % t.faqList.length);
      setFaqFade(true);
    }, 300);
  };

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

  // ΟΡΙΣΤΙΚΗ ΔΙΟΡΘΩΣΗ SCROLL POSITION ΣΤΟ REFRESH (Force Top)
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
          serviceTitle: formData.name,
          servicePrice: "General Inquiry",
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

  // --- DYNAMIC THEME STYLING CLASSES ---
  const themeBg = theme === 'light' ? 'bg-slate-50 text-slate-900' : theme === 'cyberpunk' ? 'bg-[#050b05] text-[#00ff66]' : 'bg-[#0b0c10] text-[#e5e7eb]';
  const cardBg = theme === 'light' ? 'bg-white border-slate-200 text-slate-800 shadow-md' : theme === 'cyberpunk' ? 'bg-[#0a140a] border-[#00ff66]/30 text-[#00ff66]' : 'bg-white/[0.03] border-white/15 text-[#e5e7eb]';

  return (
    <div className={`relative min-h-screen ${themeBg} selection:bg-cyan-500/25 selection:text-white w-full overflow-x-hidden transition-colors duration-300`}>
      <div id="top" className="absolute top-0 left-0 h-px w-px pointer-events-none" />

      <Navbar />

      <main className="relative w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">

        {/* Top Controls */}
        <div className="flex flex-wrap justify-end gap-3 mb-4 animate-fade-in-up">
          <div className="flex items-center gap-1 bg-white/[0.05] border border-white/10 p-1 rounded-xl">
            <button onClick={() => setTheme('dark')} title="Dark Mode" className={`p-2 rounded-lg text-xs transition-all cursor-pointer ${theme === 'dark' ? 'bg-cyan-500 text-black font-bold shadow' : 'opacity-60 hover:opacity-100'}`}><Moon className="w-3.5 h-3.5" /></button>
            <button onClick={() => setTheme('cyberpunk')} title="Cyberpunk Matrix Mode" className={`p-2 rounded-lg text-xs transition-all cursor-pointer ${theme === 'cyberpunk' ? 'bg-[#00ff66] text-black font-bold shadow' : 'opacity-60 hover:opacity-100'}`}><Zap className="w-3.5 h-3.5" /></button>
            <button onClick={() => setTheme('light')} title="Light Mode" className={`p-2 rounded-lg text-xs transition-all cursor-pointer ${theme === 'light' ? 'bg-blue-600 text-white font-bold shadow' : 'opacity-60 hover:opacity-100'}`}><Sun className="w-3.5 h-3.5" /></button>
          </div>

          <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-bold text-emerald-300 transition-all shadow-lg cursor-pointer">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>{t.bookCall}</span>
          </a>

          <button onClick={() => window.dispatchEvent(new Event("open-command-palette"))} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] text-xs font-bold transition-all shadow-lg cursor-pointer group">
            <Terminal className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Μενού (⌘K)</span>
            <span className="sm:hidden">Μενού</span>
          </button>

          <button onClick={() => setLang(lang === "gr" ? "en" : "gr")} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] text-xs font-bold transition-all shadow-lg cursor-pointer">
            <Globe className="w-4 h-4 text-cyan-400" />
            {lang === "gr" ? "🇬🇧 EN" : "🇬🇷 GR"}
          </button>
        </div>

        {/* OVERVIEW SECTION */}
        <section id="overview" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in-up">
          <div className={`md:col-span-2 md:row-span-2 rounded-3xl ${cardBg} p-8 flex flex-col justify-between relative overflow-hidden transition-colors`}>
            <div className="flex items-center justify-between z-10 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                {t.available}
              </span>
              <span className="text-xs font-mono opacity-70">{t.location}</span>
            </div>

            <div className="z-10 flex flex-col sm:flex-row items-center gap-6 my-auto">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-white/15 shadow-xl shrink-0 bg-zinc-900">
                <Image src="/profile.jpg" alt="Miltos Papageorgiou" fill className="object-cover object-center" priority />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Miltos Papageorgiou</h1>
                <p className="text-sm opacity-90 leading-relaxed">{t.roleDesc}</p>
              </div>
            </div>

            <div className="z-10 flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-white/10">
              <a href="https://github.com/miltos12222" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium transition-all"><GithubIcon className="w-4 h-4" /><span>GitHub</span></a>
              <a href="https://www.linkedin.com/in/miltos-papageorgiou-740990438" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 border border-[#0A66C2]/40 text-xs font-medium text-blue-300 transition-all"><LinkedinIcon className="w-4 h-4 text-[#0A66C2]" /><span>LinkedIn</span></a>
              <a href="/cv.pdf" download="Miltos_Papageorgiou_CV.pdf" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-xs font-medium text-purple-300 transition-all"><Download className="w-4 h-4" /><span>{t.cvBtn}</span></a>
              <a href="#contact" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-xs font-medium text-cyan-300 transition-all"><Mail className="w-4 h-4" /><span>{t.contactBtn}</span></a>
            </div>
          </div>

          <div className={`rounded-3xl ${cardBg} p-6 flex flex-col justify-between transition-colors`}>
            <div>
              <div className="flex items-center justify-between opacity-70 mb-4"><Server className="w-5 h-5 text-cyan-400" /><span className="text-[10px] font-mono uppercase tracking-wider">Infrastructure</span></div>
              <h3 className="text-lg font-bold mb-1">Self-Hosted</h3>
              <p className="text-xs opacity-80 mb-3">{t.infraDesc}</p>
              {infraOpen && (<div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs opacity-90"><p>• {t.infraList1}</p><p>• {t.infraList2}</p></div>)}
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 py-2 border-t border-white/5 mb-3"><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Proxmox</span><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Docker</span><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Tailscale</span></div>
              <button onClick={() => setInfraOpen(!infraOpen)} className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs transition-all font-medium cursor-pointer"><span>{infraOpen ? t.less : t.more}</span><ChevronDown className={`h-3.5 w-3.5 text-cyan-400 transition-transform duration-200 ${infraOpen ? "rotate-180" : ""}`} /></button>
            </div>
          </div>

          <div className={`rounded-3xl ${cardBg} p-6 flex flex-col justify-between transition-colors`}>
            <div>
              <div className="flex items-center justify-between opacity-70 mb-4"><Code2 className="w-5 h-5 text-purple-400" /><span className="text-[10px] font-mono uppercase tracking-wider">Development</span></div>
              <h3 className="text-lg font-bold mb-1">Modern Stack</h3>
              <p className="text-xs opacity-80 mb-3">{t.webDesc}</p>
              {webOpen && (<div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs opacity-90"><p>• {t.webList1}</p><p>• {t.webList2}</p></div>)}
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 py-2 border-t border-white/5 mb-3"><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Next.js</span><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">TypeScript</span><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Tailwind</span></div>
              <button onClick={() => setWebOpen(!webOpen)} className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs transition-all font-medium cursor-pointer"><span>{webOpen ? t.less : t.more}</span><ChevronDown className={`h-3.5 w-3.5 text-purple-400 transition-transform duration-200 ${webOpen ? "rotate-180" : ""}`} /></button>
            </div>
          </div>

          <div className={`md:col-span-2 lg:col-span-2 rounded-3xl ${cardBg} p-6 flex flex-col justify-between transition-colors`}>
            <div>
              <div className="flex items-center justify-between opacity-70 mb-3"><Cpu className="w-5 h-5 text-emerald-400" /><span className="text-[10px] font-mono uppercase tracking-wider">Work Ethic</span></div>
              <h3 className="text-lg font-bold mb-2">{t.ethicTitle}</h3>
              <p className="text-xs opacity-90 leading-relaxed mb-3">{t.ethicDesc}</p>
              {ethicOpen && (<div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs opacity-90"><p>• {t.ethicList1}</p><p>• {t.ethicList2}</p></div>)}
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-4 text-xs opacity-80"><span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Problem Solver</span><span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fast Learner</span></div>
              <button onClick={() => setEthicOpen(!ethicOpen)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs transition-all font-medium cursor-pointer"><span>{ethicOpen ? t.less : t.more}</span><ChevronDown className={`h-3.5 w-3.5 text-emerald-400 transition-transform duration-200 ${ethicOpen ? "rotate-180" : ""}`} /></button>
            </div>
          </div>
        </section>

        {/* LIVE LEARNING & ROADMAP HISTORY */}
        <section className={`rounded-3xl border border-purple-500/30 bg-purple-500/[0.03] p-6 sm:p-8 space-y-4 animate-fade-in-up`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
              <History className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{t.learningTitle}</h2>
              <p className="text-xs opacity-70">{t.learningSubtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {t.learningItems.map((item, idx) => (
              <div key={idx} className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 flex flex-col justify-between hover:border-purple-500/40 transition-all">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 w-fit mb-2 font-bold">{item.date}</span>
                <p className="text-xs opacity-90 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LINK TO COMMERCIAL SERVICES PAGE (NEW CLEAN 2-PAGE ARCHITECTURE) */}
        <section className="rounded-3xl border border-cyan-500/40 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 animate-fade-in-up text-center sm:text-left">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">Commercial Hub</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{t.servicesBannerTitle}</h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">{t.servicesBannerDesc}</p>
          </div>
          <a
            href="/services"
            className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/25 shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>{t.servicesBannerBtn}</span>
          </a>
        </section>

        {/* TECH MARQUEE */}
        <div className="relative w-full overflow-hidden border-y border-white/5 bg-white/[0.01] py-5 my-8 animate-fade-in-up delay-100 flex items-center">
          <div className="absolute left-0 top-0 z-10 w-24 h-full bg-gradient-to-r from-[#0b0c10] to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 z-10 w-24 h-full bg-gradient-to-l from-[#0b0c10] to-transparent pointer-events-none"></div>

          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-10 items-center justify-around whitespace-nowrap px-5 text-sm font-mono opacity-70 uppercase tracking-widest cursor-default">
                <span className="hover:text-cyan-400 transition-colors">Next.js</span> <span className="text-cyan-500/30">•</span>
                <span className="hover:text-purple-400 transition-colors">TypeScript</span> <span className="text-cyan-500/30">•</span>
                <span className="hover:text-cyan-300 transition-colors">Tailwind CSS</span> <span className="text-cyan-500/30">•</span>
                <span className="hover:text-orange-400 transition-colors">Proxmox VE</span> <span className="text-cyan-500/30">•</span>
                <span className="hover:text-blue-400 transition-colors">Docker</span> <span className="text-cyan-500/30">•</span>
                <span className="hover:text-emerald-400 transition-colors">Linux</span> <span className="text-cyan-500/30">•</span>
                <span className="hover:text-zinc-300 transition-colors">Tailscale</span> <span className="text-cyan-500/30">•</span>
                <span className="hover:text-blue-300 transition-colors">Nextcloud</span> <span className="text-cyan-500/30">•</span>
                <span className="hover:text-red-400 transition-colors">MariaDB</span> <span className="text-cyan-500/30">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT ME + TERMINAL */}
        <section id="about-me" className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in-up delay-200">
          <div className={`rounded-3xl ${cardBg} p-8 flex flex-col justify-center transition-colors`}>
            <h2 className="text-xl font-bold mb-4">{t.aboutTitle}</h2>
            <p className="text-sm opacity-90 leading-relaxed mb-4">{t.aboutP1}</p>
            <p className="text-sm opacity-80 leading-relaxed">{t.aboutP2}</p>
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
                <input id="term-input" type="text" value={termInput} onChange={(e) => setTermInput(e.target.value)} className="flex-1 bg-transparent outline-none border-none text-white focus:ring-0 p-0 m-0 min-w-0" autoComplete="off" spellCheck="false" />
              </form>
              <div ref={terminalEndRef} />
            </div>
          </div>
        </section>

        {/* INFRASTRUCTURE */}
        <section id="infrastructure" className={`rounded-3xl ${cardBg} p-8 space-y-4 transition-colors`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><Server className="w-6 h-6 text-cyan-400" /><h2 className="text-xl font-bold">Infrastructure & Homelab Stack</h2></div>
            <button onClick={() => setStackOpen(!stackOpen)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs transition-all font-medium cursor-pointer"><span>{stackOpen ? t.less : t.more}</span><ChevronDown className={`h-3.5 w-3.5 text-cyan-400 transition-transform duration-200 ${stackOpen ? "rotate-180" : ""}`} /></button>
          </div>
          <p className="text-sm opacity-90 leading-relaxed">{t.stackDesc}</p>
          {stackOpen && (<div className="pt-4 border-t border-white/10 space-y-2 text-xs opacity-90"><p>• {t.stackList1}</p><p>• {t.stackList2}</p><p>• {t.stackList3}</p></div>)}
        </section>

        {/* RESILIENCE */}
        <section id="resilience" className={`rounded-3xl ${cardBg} p-8 space-y-4 transition-colors`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><Cpu className="w-6 h-6 text-emerald-400" /><h2 className="text-xl font-bold">{t.resTitle}</h2></div>
            <button onClick={() => setResilienceOpen(!resilienceOpen)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs transition-all font-medium cursor-pointer"><span>{resilienceOpen ? t.less : t.more}</span><ChevronDown className={`h-3.5 w-3.5 text-emerald-400 transition-transform duration-200 ${resilienceOpen ? "rotate-180" : ""}`} /></button>
          </div>
          <p className="text-sm opacity-90 leading-relaxed">{t.resDesc}</p>
          {resilienceOpen && (<div className="pt-4 border-t border-white/10 space-y-2 text-xs opacity-90"><p>• {t.resList1}</p><p>• {t.resList2}</p><p>• {t.resList3}</p></div>)}
        </section>

        {/* PROJECTS */}
        <section id="projects" className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up delay-300">
          <div className={`rounded-3xl ${cardBg} p-6 flex flex-col justify-between transition-colors`}>
            <div>
              <div className="flex items-center justify-between mb-4"><span className="text-xs font-mono text-cyan-400">Infrastructure</span><Server className="w-4 h-4 opacity-70" /></div>
              <h3 className="text-base font-bold mb-2">Self-Hosted Homelab & Nextcloud</h3>
              <p className="text-xs opacity-90 leading-relaxed mb-3">{t.proj1Desc}</p>
              {project1Open && (<div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs opacity-90"><p>• {t.proj1List1}</p><p>• {t.proj1List2}</p></div>)}
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 py-3 border-t border-white/5 mb-3"><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Proxmox</span><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Docker</span><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Tailscale</span></div>
              <button onClick={() => setProject1Open(!project1Open)} className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs transition-all font-medium cursor-pointer"><span>{project1Open ? t.less : t.more}</span><ChevronDown className={`h-3.5 w-3.5 text-cyan-400 transition-transform duration-200 ${project1Open ? "rotate-180" : ""}`} /></button>
            </div>
          </div>

          <div className={`rounded-3xl ${cardBg} p-6 flex flex-col justify-between transition-colors`}>
            <div>
              <div className="flex items-center justify-between mb-4"><span className="text-xs font-mono text-purple-400">Web App</span><Code2 className="w-4 h-4 opacity-70" /></div>
              <h3 className="text-base font-bold mb-2">High-Performance Portfolio</h3>
              <p className="text-xs opacity-90 leading-relaxed mb-3">{t.proj2Desc}</p>
              {project2Open && (<div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs opacity-90"><p>• {t.proj2List1}</p><p>• {t.proj2List2}</p></div>)}
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 py-3 border-t border-white/5 mb-3"><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Next.js</span><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Tailwind</span><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">TypeScript</span></div>
              <div className="flex gap-2">
                <button onClick={() => setProject2Open(!project2Open)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs transition-all font-medium cursor-pointer"><span>{project2Open ? t.less : t.more}</span><ChevronDown className={`h-3.5 w-3.5 text-purple-400 transition-transform duration-200 ${project2Open ? "rotate-180" : ""}`} /></button>
                <a href="https://github.com/miltos12222" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs transition-all"><GithubIcon className="w-3.5 h-3.5" /><span>Code</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* TECH STACK GUARANTEE BAR */}
        <section className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.03] p-4 flex items-center justify-center gap-3 text-center animate-fade-in-up">
          <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="text-xs font-mono font-medium tracking-wide opacity-90">{t.guaranteeText}</span>
        </section>

        {/* REVIEWS SECTION & REAL TESTIMONIALS */}
        <section id="reviews" className={`rounded-3xl ${cardBg} p-8 space-y-6 transition-colors`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">{t.revTitle}</h2>
              <p className="text-xs opacity-70">{t.revSub}</p>
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
              <p className="text-xs opacity-90 leading-relaxed">{t.test1Text}</p>
              <span className="text-[11px] font-mono text-cyan-400 block font-semibold">— {t.test1Author}</span>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 space-y-3">
              <p className="text-xs opacity-90 leading-relaxed">{t.test2Text}</p>
              <span className="text-[11px] font-mono text-purple-400 block font-semibold">— {t.test2Author}</span>
            </div>
          </div>
        </section>

        {/* FAQ SLIDER SECTION */}
        <section className={`rounded-3xl ${cardBg} p-6 sm:p-8 space-y-6 transition-colors relative overflow-hidden`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-cyan-400" />
              <div>
                <h2 className="text-lg sm:text-xl font-bold">{t.faqTitle}</h2>
                <p className="text-xs opacity-70">{t.faqSub}</p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevFaq}
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-all cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono opacity-60">
                {faqIndex + 1} / {t.faqList.length}
              </span>
              <button
                onClick={handleNextFaq}
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-all cursor-pointer"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* FAQ Card with Smooth Fade Animation */}
          <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl min-h-[140px] flex flex-col justify-center relative">
            <div className={`space-y-2 transition-opacity duration-300 ${faqFade ? "opacity-100" : "opacity-0"}`}>
              <h3 className="text-sm sm:text-base font-bold text-cyan-400">
                {t.faqList[faqIndex].q}
              </h3>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                {t.faqList[faqIndex].a}
              </p>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 pt-1">
            {t.faqList.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setFaqFade(false);
                  setTimeout(() => {
                    setFaqIndex(i);
                    setFaqFade(true);
                  }, 300);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${faqIndex === i ? "w-6 bg-cyan-400" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact" className={`rounded-3xl ${cardBg} p-8 space-y-6 transition-colors`}>
          <div>
            <h2 className="text-xl font-bold mb-1">{t.contactTitle}</h2>
            <p className="text-xs opacity-70 mb-6">{t.contactSub}</p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium opacity-80 mb-2">{t.formName}</label>
                <input type="text" required placeholder="Γιάννης Παπαδόπουλος" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium opacity-80 mb-2">{t.formEmail}</label>
                <input type="email" required placeholder="example@domain.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium opacity-80 mb-2">{t.formService}</label>
              <input type="text" required placeholder="Θέμα επικοινωνίας" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-medium opacity-80 mb-2">{t.formMsg}</label>
              <textarea required rows={4} placeholder={t.formPlaceholder} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-all resize-none" />
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
