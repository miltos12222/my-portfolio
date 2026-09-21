"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Mail, Server, Code2, Cpu, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Star, Send, Terminal, Globe, Download, Calendar, History, ShieldCheck, HelpCircle, Briefcase, ShoppingBag, Network, HardDrive, Shield, Database, Coffee, Menu, X, Clock, RefreshCw, CreditCard, ArrowRight, User, Sparkles, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { toast } from "sonner";
import { motion, type Variants } from "framer-motion";
import dynamic from 'next/dynamic';
import TechBubbleModal from "@/components/TechBubbleModal";
import { playNeuralSound } from "@/utils/useSoundFX";

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0b0c10]">
      <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-cyan-400 font-mono text-[10px] animate-pulse">LOADING 3D RENDER ENGINE...</span>
    </div>
  )
});

const translations = {
  gr: {
    available: "AVAILABLE FOR HIRE",
    location: "ATHENS, GR",
    roleDesc: "Computer Science Graduate & Infrastructure Enthusiast. Εξειδίκευση σε self-hosted υποδομές, αυτοματισμούς Linux/Docker και σύγχρονη ανάπτυξη web εφαρμογών.",
    cvBtn: "Λήψη CV",
    contactBtn: "Επικοινωνία",
    bookCall: "Κλείστε Ραντεβού",
    donateBtn: "Support & Donate",
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
    aboutP2: "Στόχος μου είναι η δημιουργία ασφαλών, γρήγορων και κλιμακούμενων εφαρμογών, αξιοποιώντας σύγχρονα εργαλεία αυτοματισμού και self-hosted αρχιτεκτονικές.",
    learningTitle: "Live Tech Roadmap & History",
    learningSubtitle: "Η συνεχής πορεία μάθησης και τεχνολογικής εξέλιξης:",
    learningItems: [
      { date: "Τρέχον", text: "Advanced Proxmox Clustering & Kubernetes orchestration." },
      { date: "Προηγούμενο", text: "Next.js 14 App Router, Server Actions & Advanced TypeScript." },
      { date: "Βάση", text: "Linux Administration, Docker Networking & Tailscale VPN Mesh." }
    ],
    guaranteeText: "Zero downtime deployment • SEO-optimized • Fast delivery (5-7 days)",
    servicesBannerTitle: "Ψάχνετε Υπηρεσίες Web Development & Homelab?",
    servicesBannerDesc: "Επισκεφθείτε τον εμπορικό μας κατάλογο, επιλέξτε πολλαπλές υπηρεσίες και φτιάξτε το custom πακέτο σας ζωντανά.",
    servicesBannerBtn: "Μετάβαση στον Κατάλογο Υπηρεσιών ➔",
    topoTitle: "Interactive Homelab Architecture Topology",
    topoSub: "Κάντε κλικ στα nodes της υποδομής για να δείτε τα live specs και τους ρόλους τους.",
    faqTitle: "Συχνές Ερωτήσεις (FAQ)",
    faqSub: "Όλες οι απαντήσεις σχετικά με τη διαδικασία συνεργασίας και τις τεχνικές λεπτομέρειες.",
    faqList: [
      { q: "Πώς γίνεται η πληρωμή;", a: "Η διαδικασία περιλαμβάνει 50% προκαταβολή για την έναρξη του έργου και 50% εξόφληση με την παράδοση." },
      { q: "Χρειάζομαι hosting;", a: "Όχι απαραίτητα. Σας τα στήνω και τα παραδίδω πλήρως λειτουργικά (σε Vercel για τα web apps ή στο δικό σας Proxmox)." },
      { q: "Πόσες αλλαγές περιλαμβάνονται;", a: "Κάθε πακέτο περιλαμβάνει δωρεάν αναθεωρήσεις και διορθώσεις κατά τη διάρκεια της ανάπτυξης." },
      { q: "Πόσος χρόνος χρειάζεται για την ολοκλήρωση;", a: "Συνήθως από 5 έως 10 εργάσιμες ημέρες ανάλογα με την πολυπλοκότητα (Landing Pages σε 3-5 ημέρες)." },
      { q: "Είναι φιλικό προς τις μηχανές αναζήτησης (SEO);", a: "Ναι, απόλυτα. Χρησιμοποιώ Next.js SSR και βέλτιστες πρακτικές για top Google Lighthouse scores." },
      { q: "Παρέχετε τεχνική υποστήριξη μετά την παράδοση;", a: "Φυσικά. Παρέχεται δυνατότητα μηνιαίας συντήρησης και ασφάλειας." },
      { q: "Μπορώ να ενημερώνω μόνος μου το περιεχόμενο;", a: "Ναι, ενσωματώνουμε Headless CMS ή Markdown δομή ώστε να αλλάζετε κείμενα/φωτογραφίες." },
      { q: "Τι γίνεται αν χρειαστώ κάτι πιο σύνθετο;", a: "Προσαρμόζουμε το πακέτο στις απαιτήσεις σας (Custom Full-Stack App)." },
      { q: "Πώς μπορούμε να ξεκινήσουμε;", a: "Συμπληρώστε τη φόρμα ή κλείστε ένα 15λεπτο ραντεβού (Book a Call)." }
    ],
    revTitle: "Αξιολογήσεις & Real Testimonials",
    revSub: "Αληθινές εντυπώσεις από την ολοκλήρωση έργων, υποδομών και custom builds.",
    test1: "«Η ταχύτητα υλοποίησης και η αρχιτεκτονική του Next.js app ξεπέρασαν κάθε προσδοκία. Εξαιρετικός επαγγελματίας με βαθιά τεχνική κατάρτιση.»",
    test2: "«Το στήσιμο του Proxmox homelab και τα αυτόματα backups έλυσαν τα χέρια στην επιχείρησή μας. Απόλυτη σταθερότητα και ασφάλεια δεδομένων.»",
    test3: "«Το custom PC build που παραγγείλαμε αποδίδει απίστευτα κάτω από βαριά φορτία. Άψογος επαγγελματισμός στο hardware.»",
    test4: "«Άμεση επικοινωνία, καθαρός κώδικας και προσοχή στη λεπτομέρεια. Συνιστάται ανεπιφύλακτα για κάθε τεχνικό project ή ιστοσελίδα.»",
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
    proj2Desc: "Σύγχρονο, ελαφρύ και πλήρως βελτιστοποιημένο portfolio κατασκευασμένο με Next.js, Tailwind CSS και TypeScript, σχεδιασμένο για άμεση φόρτωση.",
    proj2List1: "Βελτιστοποίηση εικόνων και assets για κορυφαία επίδοση σε Lighthouse score.",
    proj2List2: "Αξιοποίηση Server Components και σύγχρονων hooks για ομαλό UX.",
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
    donateBtn: "Support & Donate",
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
    aboutP2: "My goal is to create secure, fast, and scalable applications by leveraging modern automation tools and self-hosted architectures.",
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
    topoTitle: "Interactive Homelab Architecture Topology",
    topoSub: "Click on infrastructure nodes to view live specs and roles.",
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqSub: "Everything you need to know about our collaboration process and technical details.",
    faqList: [
      { q: "How does payment work?", a: "A 50% deposit is required to kick off the project, and the remaining 50% is paid upon delivery." },
      { q: "Do I need hosting?", a: "Not necessarily. I set everything up and deliver it fully operational." },
      { q: "How many revisions are included?", a: "Each package includes free iterations and adjustments during development." },
      { q: "What is the typical turnaround time?", a: "Usually between 5 to 10 business days depending on project complexity." },
      { q: "Is it SEO friendly?", a: "Yes, absolutely. I utilize Next.js SSR and best practices for top Lighthouse scores." },
      { q: "Do you provide post-launch support?", a: "Yes, monthly maintenance, security updates, or hourly consulting are available." },
      { q: "Can I update the content myself?", a: "Yes, we integrate easy CMS so you can update texts and images without code." },
      { q: "What if I need something custom?", a: "We can tailor a custom full-stack app specifically matching your business." },
      { q: "How do we get started?", a: "Fill out the contact form or book a 15-minute discovery call." }
    ],
    revTitle: "Reviews & Real Testimonials",
    revSub: "Authentic impressions from completed projects, infrastructures, and custom builds.",
    test1: '"Implementation speed and app architecture exceeded every expectation. Exceptional professional."',
    test2: '"Proxmox homelab setup and automated backups saved our business. Absolute stability."',
    test3: '"The custom PC build performs incredibly under heavy loads. Flawless professionalism."',
    test4: '"Prompt communication, clean code, and attention to detail. Highly recommended."',
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
    proj2Desc: "Modern, lightweight, and fully optimized portfolio built with Next.js, Tailwind CSS, and TypeScript.",
    proj2List1: "Image and asset optimization for top Lighthouse scores.",
    proj2List2: "Leveraging Server Components and modern hooks for smooth UX.",
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  const [lang, setLang] = useState<"gr" | "en">("gr");
  const t = translations[lang];

  // Tab Navigation State (Home, CV, Marketplace, Contact)
  const [activeTab, setActiveTab] = useState<'home' | 'cv' | 'marketplace' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Marketplace & Subscription State
  const [selectedWebPackage, setSelectedWebPackage] = useState(1);
  const [selectedSubPackage, setSelectedSubPackage] = useState<number | null>(null);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Live Athens Time State
  const [athensTime, setAthensTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Athens',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setAthensTime(new Intl.DateTimeFormat('el-GR', options).format(new Date()));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const webPackages = [
    { id: 1, name: "One-Page / Landing Page", pages: "1 Σελίδα", price: 190, desc: "Ιδανικό για γρήγορη προβολή, freelancers & startups." },
    { id: 2, name: "Basic Website", pages: "2 - 3 Σελίδες", price: 320, desc: "Για μικρές επιχειρήσεις που χρειάζονται τα βασικά." },
    { id: 3, name: "Professional Website", pages: "4 - 7 Σελίδες", price: 550, desc: "Πλήρες προφίλ, υπηρεσίες, portfolio & SEO optimization." },
    { id: 4, name: "Corporate / Advanced", pages: "8 - 10 Σελίδες", price: 850, desc: "Για μεσαίες επιχειρήσεις με εξειδικευμένες φόρμες." },
    { id: 5, name: "Enterprise Custom Portal", pages: "10+ Σελίδες / E-shop", price: 1300, desc: "Απεριόριστες δυνατότητες, custom αρχιτεκτονική." },
  ];

  const subPackages = [
    { id: 1, name: "Basic Care", freq: "1 έλεγχος/μήνα", price: 30, desc: "Updates σε Core/Plugins, βασικό backup ασφαλείας." },
    { id: 2, name: "Pro Updates & Growth", freq: "2-3 updates/μήνα", price: 60, desc: "Περιλαμβάνει 1 ώρα αλλαγών περιεχομένου & uptime check." },
    { id: 3, name: "Business VIP Care", freq: "Απεριόριστα & Άμεσα", price: 150, desc: "Καθημερινά backups, firewall & 3-4 ώρες αλλαγών ανά μήνα." },
  ];

  const currentWeb = webPackages.find(p => p.id === selectedWebPackage);
  const currentSub = subPackages.find(p => p.id === selectedSubPackage);
  const totalPrice = (currentWeb?.price || 0) + (currentSub?.price || 0);

  const [infraOpen, setInfraOpen] = useState(false);
  const [webOpen, setWebOpen] = useState(false);
  const [ethicOpen, setEthicOpen] = useState(false);
  const [project1Open, setProject1Open] = useState(false);
  const [project2Open, setProject2Open] = useState(false);
  const [stackOpen, setStackOpen] = useState(false);
  const [resilienceOpen, setResilienceOpen] = useState(false);

  const [activeBubble, setActiveBubble] = useState<{ title: string; date: string; content: string } | null>(null);

  const [selectedNode, setSelectedNode] = useState<{ name: string; type: string; specs: string; desc: string } | null>({
    name: "Proxmox VE Hypervisor",
    type: "Core Host",
    specs: "Intel Xeon / 64GB RAM / ZFS RAID-1",
    desc: "Κεντρικός hypervisor που τρέχει όλα τα virtual machines, LXC containers και υπηρεσίες υψηλής διαθεσιμότητας."
  });

  const topologyNodes = [
    { name: "Proxmox VE", type: "Hypervisor", icon: <Server className="w-5 h-5 text-cyan-400" />, specs: "64GB RAM / ZFS RAID-1", desc: "Κεντρικός hypervisor που διαχειρίζεται τα VMs και τα containers." },
    { name: "Tailscale Mesh", type: "Virtual Network", icon: <Network className="w-5 h-5 text-emerald-400" />, specs: "Encrypted WireGuard VPN", desc: "Ασφαλής διασύνδεση όλων των nodes χωρίς public port exposure." },
    { name: "Nextcloud", type: "Storage & Sync", icon: <HardDrive className="w-5 h-5 text-blue-400" />, specs: "Unlimited Photo / File Sync", desc: "Private cloud αποθήκευσης και αυτόματου συγχρονισμού αρχείων." },
    { name: "MariaDB & Docker", type: "Database & Containers", icon: <Database className="w-5 h-5 text-purple-400" />, specs: "Containerized Microservices", desc: "Οργάνωση υπηρεσιών σε Docker containers με αυτόνομα persistent volumes." },
  ];

  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const playKeyClick = () => {
    playNeuralSound('hover');
  };

  const [telemetry, setTelemetry] = useState<{
    status: string;
    node: string;
    cpuUsage: string;
    memoryUsage: string;
    activeContainers: number;
    tailscaleMesh: string;
    uptime: string;
    aiSentinel?: string;
    securityGrade?: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/telemetry")
      .then((res) => res.json())
      .then((data) => setTelemetry(data))
      .catch((err) => console.error("Failed to load telemetry:", err));
  }, []);

  const [faqIndex, setFaqIndex] = useState(0);
  const [faqFade, setFaqFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFaqFade(false);
      setTimeout(() => {
        setFaqIndex((prev) => (prev + 1) % t.faqList.length);
        setFaqFade(true);
      }, 300);
    }, 6000);
    return () => clearInterval(interval);
  }, [t.faqList.length]);

  const handleNextFaq = () => {
    playNeuralSound('click');
    setFaqFade(false);
    setTimeout(() => {
      setFaqIndex((prev) => (prev + 1) % t.faqList.length);
      setFaqFade(true);
    }, 300);
  };

  const handlePrevFaq = () => {
    playNeuralSound('click');
    setFaqFade(false);
    setTimeout(() => {
      setFaqIndex((prev) => (prev - 1 + t.faqList.length) % t.faqList.length);
      setFaqFade(true);
    }, 300);
  };

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const [termInput, setTermInput] = useState("");
  const [termHistory, setTermHistory] = useState<{ cmd: string, output: React.ReactNode }[]>([{
    cmd: "neofetch",
    output: (
      <div className="pl-2 pt-1 flex gap-4">
        <div className="text-cyan-500 font-bold hidden sm:block">
          <pre>{`   .---.\n  /   <span> </span> \\\n  \\.@-@./\n  /   _   \\\n //     \\\\`}</pre>
        </div>
        <div className="space-y-1">
          <p><span className="text-cyan-400 font-bold">OS:</span> Debian GNU/Linux 12 (bookworm)</p>
          <p><span className="text-cyan-400 font-bold">Host:</span> Proxmox Virtual Environment</p>
          <p><span className="text-cyan-400 font-bold">Uptime:</span> 14d 7h (99.9% High Availability)</p>
          <p><span className="text-cyan-400 font-bold">Stack:</span> Next.js, Tailwind, TypeScript</p>
          <p><span className="text-cyan-400 font-bold">Services:</span> Docker, Tailscale, Nextcloud</p>
          <p><span className="text-emerald-400 bg-emerald-400/10 px-1 py-0.5 rounded">Online & Ready for Hire</span></p>
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

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playNeuralSound('click');
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
        setTimeout(() => setActiveTab('contact'), 800);
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
          serviceTitle: formData.service || (currentWeb ? `${currentWeb.name} ${currentSub ? `+ ${currentSub.name}` : ''}` : "General Inquiry"),
          servicePrice: totalPrice ? `${totalPrice}€` : "General Inquiry",
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (res.ok && !data.error) {
        playNeuralSound('success');
        toast.success(t.successMsg);
        setFormData({ name: "", email: "", service: "", message: "" });
        setCheckoutComplete(true);
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

  const themeBg = "bg-[#0b0c10] text-[#e5e7eb]";
  const cardBg = "bg-white/[0.03] border-white/15 text-[#e5e7eb]";

  return (
    <div className={`relative min-h-screen ${themeBg} selection:bg-cyan-500/25 selection:text-white w-full overflow-x-hidden transition-colors duration-300`}>
      <div id="top" className="absolute top-0 left-0 h-px w-px pointer-events-none" />

      <Navbar />

      {/* TOP-LEFT FLOATING NAVIGATION (DESKTOP & MOBILE RESPONSIVE DRAWER) */}
      <header className="fixed top-20 left-4 z-50 flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-1 bg-[#0b0c10]/90 backdrop-blur-xl border border-white/15 p-1.5 rounded-full shadow-2xl">
          <button
            onClick={() => { playNeuralSound('click'); setActiveTab('home'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${activeTab === 'home' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
          >
            <Globe className="w-4 h-4" /> Αρχική
          </button>
          <button
            onClick={() => { playNeuralSound('click'); setActiveTab('cv'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${activeTab === 'cv' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
          >
            <User className="w-4 h-4" /> Βιογραφικό & Projects
          </button>
          <button
            onClick={() => { playNeuralSound('click'); setActiveTab('marketplace'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${activeTab === 'marketplace' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
          >
            <ShoppingBag className="w-4 h-4" /> Agency Web & Cloud
          </button>
          <button
            onClick={() => { playNeuralSound('click'); setActiveTab('contact'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${activeTab === 'contact' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
          >
            <Mail className="w-4 h-4" /> Επικοινωνία / Αίτηση
          </button>
        </nav>

        {/* Mobile Hamburger Button (Top-Left 3 dots / lines menu) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-3 bg-[#0b0c10]/95 backdrop-blur-2xl border border-white/20 rounded-full text-white shadow-2xl flex items-center justify-center"
          aria-label="Mobile Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-cyan-400" />}
        </button>
      </header>

      {/* COMPREHENSIVE MOBILE FULL MENU (DROPDOWN / DRAWER) CONTAINING EVERYTHING */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-36 z-50 bg-[#0b0c10]/95 backdrop-blur-2xl border border-cyan-500/40 rounded-3xl p-5 flex flex-col gap-3 shadow-2xl md:hidden animate-in fade-in slide-in-from-top-4">
          <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider pb-1 border-b border-white/10">
            [ 📱 Mobile Navigation Hub ]
          </div>

          <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] hover:bg-cyan-500/20 border border-white/10 text-left text-xs font-bold transition-all">
            <Globe className="w-4 h-4 text-cyan-400" /> <span>Αρχική & Overview</span>
          </button>

          <button onClick={() => { setActiveTab('cv'); setMobileMenuOpen(false); }} className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] hover:bg-cyan-500/20 border border-white/10 text-left text-xs font-bold transition-all">
            <User className="w-4 h-4 text-purple-400" /> <span>Βιογραφικό & Projects</span>
          </button>

          <button onClick={() => { setActiveTab('marketplace'); setMobileMenuOpen(false); }} className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] hover:bg-cyan-500/20 border border-white/10 text-left text-xs font-bold transition-all">
            <ShoppingBag className="w-4 h-4 text-emerald-400" /> <span>Agency Web & Cloud (Marketplace)</span>
          </button>

          <a href="/services" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] hover:bg-cyan-500/20 border border-white/10 text-left text-xs font-bold transition-all">
            <Server className="w-4 h-4 text-blue-400" /> <span>DevOps & Cloud Solutions</span>
          </a>

          <a href="/services" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] hover:bg-cyan-500/20 border border-white/10 text-left text-xs font-bold transition-all">
            <Cpu className="w-4 h-4 text-amber-400" /> <span>Custom PC & Hardware</span>
          </a>

          <a href="/donate" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] hover:bg-pink-500/20 border border-white/10 text-left text-xs font-bold transition-all">
            <Coffee className="w-4 h-4 text-pink-400" /> <span>Support & Donate ☕</span>
          </a>

          <button onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }} className="flex items-center gap-3 p-3 rounded-2xl bg-cyan-500 text-black text-left text-xs font-bold transition-all shadow-lg shadow-cyan-500/30">
            <Mail className="w-4 h-4" /> <span>Επικοινωνία / Αίτηση</span>
          </button>
        </div>
      )}

      <main className="relative w-full pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">

        {/* ================= VIEW 1: HOME ================= */}
        {activeTab === 'home' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Top Controls */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-2.5 sm:gap-3 mb-6">
              <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" onClick={() => playNeuralSound('click')} className="flex justify-center items-center gap-2 px-4 py-3 sm:py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-bold text-emerald-300 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>{t.bookCall}</span>
              </a>

              <a href="/donate" onClick={() => playNeuralSound('click')} className="flex justify-center items-center gap-2 px-4 py-3 sm:py-2 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-xs font-bold text-pink-300 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer">
                <Coffee className="w-4 h-4 text-pink-400" />
                <span>{t.donateBtn}</span>
              </a>

              <button onClick={() => { playNeuralSound('click'); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })); }} className="col-span-2 sm:col-span-1 flex justify-center items-center gap-2 px-4 py-3 sm:py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] text-xs font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer group">
                <Terminal className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Μενού (⌘K)</span>
              </button>

              <button onClick={() => { playNeuralSound('click'); setLang(lang === "gr" ? "en" : "gr"); }} className="col-span-2 sm:col-span-1 flex justify-center items-center gap-2 px-4 py-3 sm:py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] text-xs font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>{lang === "gr" ? "🇬🇧 EN" : "🇬🇷 GR"}</span>
              </button>
            </motion.div>

            {/* 3D SPLINE HERO BANNER */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="relative w-full h-[250px] sm:h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_-10px_rgba(6,182,212,0.15)] group"
            >
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 font-bold backdrop-blur-md animate-pulse">
                  [ 3D Interactive Terminal - Drag to Rotate ]
                </span>
              </div>
              <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
            </motion.div>

            {/* OVERVIEW SECTION */}
            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <motion.div variants={fadeUp} className={`group md:col-span-2 md:row-span-2 rounded-3xl ${cardBg} p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-500/60`}>
                <div className="flex items-center justify-between z-10 mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    {t.available}
                  </span>
                  <span className="text-xs font-mono opacity-70">{t.location}</span>
                </div>

                <div className="z-10 flex flex-col sm:flex-row items-center gap-6 my-auto text-center sm:text-left">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-white/15 shadow-xl shrink-0 bg-zinc-900 group-hover:scale-105 transition-transform duration-300">
                    <Image src="/profile.jpg" alt="Miltos Papageorgiou" fill className="object-cover object-center" priority />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Miltos Papageorgiou</h1>
                    <p className="text-sm opacity-90 leading-relaxed">{t.roleDesc}</p>
                  </div>
                </div>

                {/* Restored Social & Contact Links + NEW AI UTILITY HUB LINK */}
                <div className="z-10 flex flex-wrap justify-center sm:justify-start items-center gap-3 mt-8 pt-6 border-t border-white/10">
                  <a href="https://github.com/miltos12222" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium transition-all"><GithubIcon className="w-4 h-4" /><span>GitHub</span></a>
                  <a href="https://www.linkedin.com/in/miltos-papageorgiou-740990438" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 border border-[#0A66C2]/40 text-xs font-medium text-blue-300 transition-all"><LinkedinIcon className="w-4 h-4 text-[#0A66C2]" /><span>LinkedIn</span></a>
                  <a href="/cv.pdf" download className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-xs font-medium text-purple-300 transition-all"><Download className="w-4 h-4" /><span>{t.cvBtn}</span></a>

                  {/* NEW UTILITY HUB BUTTON */}
                  <a href="https://miltos-utility-hub.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/40 text-xs font-bold text-cyan-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                    <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>AI Utility Hub</span>
                  </a>

                  <button onClick={() => setActiveTab('contact')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-xs font-medium text-cyan-300 transition-all"><Mail className="w-4 h-4" /><span>{t.contactBtn}</span></button>
                </div>
              </motion.div>

              {/* Self-Hosted Card with Restored Live Telemetry HUD */}
              <motion.div variants={fadeUp} className={`group rounded-3xl ${cardBg} p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-500/60`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Server className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {telemetry ? telemetry.status.toUpperCase() : "ONLINE"}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono opacity-70 uppercase tracking-wider">Infrastructure</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">Self-Hosted</h3>
                  <p className="text-xs opacity-80 mb-3">{t.infraDesc}</p>

                  <div className="my-3 p-3.5 rounded-2xl bg-black/60 border border-cyan-500/30 font-mono text-[11px] space-y-2 text-zinc-300 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500">Core Node:</span>
                      <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        {telemetry ? telemetry.node : "Proxmox-VE-Main"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">CPU / RAM:</span>
                      <span className="text-emerald-400">{telemetry ? `${telemetry.cpuUsage} / ${telemetry.memoryUsage}` : "18% / 42%"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Uptime:</span>
                      <span className="text-purple-400 font-bold">{telemetry ? telemetry.uptime : "14d 7h (99.9%)"}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap gap-1.5 py-2 border-t border-white/5 mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Proxmox</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Docker</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Tailscale</span>
                  </div>
                  <button onClick={() => setActiveTab('marketplace')} className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-xs font-medium text-cyan-300 transition-all"><span>Υπηρεσίες Υποδομής</span><ArrowRight className="w-3.5 h-3.5" /></button>
                </div>
              </motion.div>

              {/* Web Stack Card */}
              <motion.div variants={fadeUp} className={`group rounded-3xl ${cardBg} p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-purple-500/60`}>
                <div>
                  <div className="flex items-center justify-between opacity-70 mb-4"><Code2 className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-300" /><span className="text-[10px] font-mono uppercase tracking-wider">Development</span></div>
                  <h3 className="text-lg font-bold mb-1">Modern Stack</h3>
                  <p className="text-xs opacity-80 mb-3">{t.webDesc}</p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-1.5 py-2 border-t border-white/5 mb-3"><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Next.js</span><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">TypeScript</span><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Tailwind</span></div>
                  <button onClick={() => setActiveTab('marketplace')} className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-xs font-medium text-purple-300 transition-all"><span>Marketplace Websites</span><ArrowRight className="w-3.5 h-3.5" /></button>
                </div>
              </motion.div>
            </motion.section>

            {/* ================= NEW DEDICATED SECTION: NEXT-GEN AI UTILITY HUB SPOTLIGHT ================= */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 via-[#0b0c10] to-purple-950/20 p-8 sm:p-10 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                  <Sparkles className="w-4 h-4" /> Project Spotlight & Micro-SaaS
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Next-Gen AI Utility Hub (2030 Edition)
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
                    Αυτή η νέα πλατφόρμα δημιουργήθηκε με στόχο να προσφέρει μια αστραπιαία, μηδενικών διαφημίσεων (zero-ads) σουίτα εργαλείων, συνδυάζοντας βασικά καθημερινά utilities (όπως URL Shortener, Password & QR Generators) με προηγμένες υπηρεσίες Τεχνητής Νοημοσύνης (AI Business Plans, Smart Contracts & CV Builders).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-cyan-400 font-bold text-xs font-mono">⚡ True Client-Side AI</span>
                    <p className="text-xs text-zinc-400">Δυναμική παραγωγή επαγγελματικών εγγράφων χωρίς εξωτερικά κόστη API billing.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-purple-400 font-bold text-xs font-mono">💳 Revolut Pay Integration</span>
                    <p className="text-xs text-zinc-400">Απλό, άμεσο και ασφαλές μοντέλο Pay-Per-Use μέσω προσωπικού Revolut link.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-emerald-400 font-bold text-xs font-mono">🛡️ Anti-Screenshot Previews</span>
                    <p className="text-xs text-zinc-400">Προστατευμένες προεπισκοπήσεις με θόλωση και ξεκλείδωμα καθαρού PDF με window.print().</p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a
                    href="https://miltos-utility-hub.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
                  >
                    <span>Επίσκεψη στο Live Utility Hub</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/miltos12222/utility-hub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs sm:text-sm font-semibold text-white transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Προβολή Source Code (GitHub)</span>
                  </a>
                </div>
              </div>
            </motion.section>

            {/* INTERACTIVE HOMELAB ARCHITECTURE TOPOLOGY SECTION */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className={`rounded-3xl ${cardBg} p-6 sm:p-8 space-y-6 transition-colors`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
                  <Network className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">{t.topoTitle}</h2>
                  <p className="text-xs opacity-70">{t.topoSub}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {topologyNodes.map((node, i) => (
                  <button
                    key={i}
                    onClick={() => { playNeuralSound('click'); setSelectedNode(node); }}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 hover:-translate-y-1.5 hover:scale-[1.04] active:scale-95 ${selectedNode?.name === node.name
                      ? "bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                      : "bg-white/[0.02] border-white/10 hover:border-cyan-500/50 hover:shadow-[0_10px_25px_-5px_rgba(6,182,212,0.3)]"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-black/40 border border-white/10">{node.icon}</div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300">{node.type}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">{node.name}</h3>
                      <p className="text-[11px] font-mono text-cyan-400">{node.specs}</p>
                    </div>
                  </button>
                ))}
              </div>

              {selectedNode && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-2xl bg-black/40 border border-cyan-500/30 flex items-start gap-4 font-mono text-xs shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                  <Shield className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
                  <div className="space-y-1">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider">&gt; node_inspect --target={selectedNode.name}</span>
                    <p className="text-zinc-300 font-sans leading-relaxed pt-1">{selectedNode.desc}</p>
                  </div>
                </motion.div>
              )}
            </motion.section>

            {/* LIVE LEARNING & ROADMAP HISTORY */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className={`rounded-3xl border border-purple-500/30 bg-purple-500/[0.03] p-6 sm:p-8 space-y-4`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
                  <History className="w-5 h-5 text-purple-400 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">{t.learningTitle}</h2>
                  <p className="text-xs opacity-70">{t.learningSubtitle} <span className="text-cyan-400">(Click cards for tech notes)</span></p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {t.learningItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      playNeuralSound('open');
                      setActiveBubble({
                        title: item.text,
                        date: item.date,
                        content: `Αναλυτικές πληροφορίες για την ενότητα "${item.text}". Υλοποίηση με έμφαση στην υψηλή διαθεσιμότητα, τη βελτιστοποίηση κώδικα και τη σωστή αρχιτεκτονική συστημάτων.`
                      });
                    }}
                    className="group rounded-2xl bg-white/[0.03] border border-white/10 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:scale-[1.04] hover:border-purple-500/50 hover:shadow-[0_15px_30px_-5px_rgba(168,85,247,0.3)] active:scale-95 cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                      ✨ Click bubble
                    </div>
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 w-fit mb-3 font-bold">{item.date}</span>
                    <p className="text-xs sm:text-sm opacity-90 leading-relaxed group-hover:text-purple-200 transition-colors">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* LIVE GIT CONTRIBUTION STREAM */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className={`rounded-3xl ${cardBg} p-6 sm:p-8 space-y-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Terminal className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Live Git Contribution Stream</h2>
                    <p className="text-xs opacity-70">Recent commits, deployments & homelab scripts (GitHub API synced)</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold hidden sm:inline-block">
                  🟢 Active Today
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="group p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1 font-mono text-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 cursor-pointer">
                  <span className="text-[10px] text-cyan-400 uppercase font-bold">commit #492763d</span>
                  <p className="text-white text-xs font-sans">feat: upgrade framer motion typescript variants & types</p>
                  <span className="text-[10px] text-zinc-500">2 hours ago • main branch</span>
                </div>
                <div className="group p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1 font-mono text-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/50 cursor-pointer">
                  <span className="text-[10px] text-purple-400 uppercase font-bold">commit #8b192fa</span>
                  <p className="text-white text-xs font-sans">fix: optimize 3d spline lazy loading & dynamic import</p>
                  <span className="text-[10px] text-zinc-500">Yesterday • production</span>
                </div>
                <div className="group p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1 font-mono text-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 cursor-pointer">
                  <span className="text-[10px] text-emerald-400 uppercase font-bold">script #proxmox_zfs</span>
                  <p className="text-white text-xs font-sans">Automated ZFS snapshot backup & Tailscale mesh sync</p>
                  <span className="text-[10px] text-zinc-500">3 days ago • homelab</span>
                </div>
              </div>
            </motion.section>

            {/* COMMERCIAL SERVICES BANNER */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="group rounded-3xl border border-cyan-500/40 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 hover:border-cyan-400">
              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">Commercial Hub</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{t.servicesBannerTitle}</h2>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">{t.servicesBannerDesc}</p>
              </div>
              <button onClick={() => setActiveTab('marketplace')} className="px-6 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-cyan-500/25 shrink-0 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95">
                <span>{t.servicesBannerBtn}</span>
              </button>
            </motion.section>

            {/* ABOUT ME + INTERACTIVE TERMINAL */}
            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} id="about-me" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <motion.div variants={fadeUp} className={`group rounded-3xl ${cardBg} p-8 flex flex-col justify-center transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-500/60`}>
                <h2 className="text-xl font-bold mb-4 group-hover:text-cyan-300 transition-colors">{t.aboutTitle}</h2>
                <p className="text-sm opacity-90 leading-relaxed mb-4">{t.aboutP1}</p>
                <p className="text-sm opacity-80 leading-relaxed">{t.aboutP2}</p>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-5 font-mono text-xs shadow-2xl relative overflow-hidden group flex flex-col h-[350px]">
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
                      onChange={(e) => {
                        setTermInput(e.target.value);
                        playKeyClick();
                      }}
                      className="flex-1 bg-transparent outline-none border-none text-white focus:ring-0 p-0 m-0 min-w-0"
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </form>
                  <div ref={terminalEndRef} />
                </div>
              </motion.div>
            </motion.section>

            {/* INFRASTRUCTURE & RESILIENCE */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} id="infrastructure" className={`group rounded-3xl ${cardBg} p-8 space-y-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"><Server className="w-6 h-6 text-cyan-400" /><h2 className="text-xl font-bold">Infrastructure & Homelab Stack</h2></div>
                <button onClick={() => { playNeuralSound('click'); setStackOpen(!stackOpen); }} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-medium cursor-pointer"><span>{stackOpen ? t.less : t.more}</span><ChevronDown className={`h-3.5 w-3.5 text-cyan-400 transition-transform ${stackOpen ? "rotate-180" : ""}`} /></button>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">{t.stackDesc}</p>
              {stackOpen && (<div className="pt-4 border-t border-white/10 space-y-2 text-xs opacity-90"><p>• {t.stackList1}</p><p>• {t.stackList2}</p><p>• {t.stackList3}</p></div>)}
            </motion.section>

            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} id="resilience" className={`group rounded-3xl ${cardBg} p-8 space-y-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"><Cpu className="w-6 h-6 text-emerald-400" /><h2 className="text-xl font-bold">{t.resTitle}</h2></div>
                <button onClick={() => { playNeuralSound('click'); setResilienceOpen(!resilienceOpen); }} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-medium cursor-pointer"><span>{resilienceOpen ? t.less : t.more}</span><ChevronDown className={`h-3.5 w-3.5 text-emerald-400 transition-transform ${resilienceOpen ? "rotate-180" : ""}`} /></button>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">{t.resDesc}</p>
              {resilienceOpen && (<div className="pt-4 border-t border-white/10 space-y-2 text-xs opacity-90"><p>• {t.resList1}</p><p>• {t.resList2}</p><p>• {t.resList3}</p></div>)}
            </motion.section>

            {/* PROJECTS SECTION */}
            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} id="projects" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={fadeUp} className={`group rounded-3xl ${cardBg} p-6 flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-4"><span className="text-xs font-mono text-cyan-400">Infrastructure</span><Server className="w-4 h-4 opacity-70" /></div>
                  <h3 className="text-base font-bold mb-2">Self-Hosted Homelab & Nextcloud</h3>
                  <p className="text-xs opacity-90 leading-relaxed mb-3">{t.proj1Desc}</p>
                  {project1Open && (<div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs opacity-90"><p>• {t.proj1List1}</p><p>• {t.proj1List2}</p></div>)}
                </div>
                <div>
                  <div className="flex flex-wrap gap-1.5 py-3 border-t border-white/5 mb-3"><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Proxmox</span><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Docker</span><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Tailscale</span></div>
                  <button onClick={() => { playNeuralSound('click'); setProject1Open(!project1Open); }} className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-medium cursor-pointer"><span>{project1Open ? t.less : t.more}</span><ChevronDown className={`h-3.5 w-3.5 text-cyan-400 transition-transform ${project1Open ? "rotate-180" : ""}`} /></button>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className={`group rounded-3xl ${cardBg} p-6 flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-4"><span className="text-xs font-mono text-purple-400">Web App</span><Code2 className="w-4 h-4 opacity-70" /></div>
                  <h3 className="text-base font-bold mb-2">High-Performance Portfolio</h3>
                  <p className="text-xs opacity-90 leading-relaxed mb-3">{t.proj2Desc}</p>
                  {project2Open && (<div className="pt-2 pb-3 border-t border-white/10 space-y-1.5 text-xs opacity-90"><p>• {t.proj2List1}</p><p>• {t.proj2List2}</p></div>)}
                </div>
                <div>
                  <div className="flex flex-wrap gap-1.5 py-3 border-t border-white/5 mb-3"><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Next.js</span><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">Tailwind</span><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">TypeScript</span></div>
                  <div className="flex gap-2">
                    <button onClick={() => { playNeuralSound('click'); setProject2Open(!project2Open); }} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-medium cursor-pointer"><span>{project2Open ? t.less : t.more}</span><ChevronDown className={`h-3.5 w-3.5 text-purple-400 transition-transform ${project2Open ? "rotate-180" : ""}`} /></button>
                    <a href="https://github.com/miltos12222" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs"><GithubIcon className="w-3.5 h-3.5" /><span>Code</span></a>
                  </div>
                </div>
              </motion.div>
            </motion.section>

            {/* TECH STACK GUARANTEE BAR */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.03] p-4 flex items-center justify-center gap-3 text-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span className="text-xs font-mono font-medium tracking-wide opacity-90">{t.guaranteeText}</span>
            </motion.section>

            {/* REVIEWS SECTION */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} id="reviews" className={`rounded-3xl ${cardBg} p-8 space-y-6`}>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[t.test1, t.test2, t.test3, t.test4].map((testText, idx) => (
                  <div key={idx} className="rounded-2xl bg-white/[0.03] border border-white/5 p-6 space-y-3 flex flex-col justify-between">
                    <p className="text-xs sm:text-sm opacity-90 leading-relaxed italic">{testText}</p>
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-4 border-t border-white/5">
                      <span>Verified Client</span>
                      <span className="text-cyan-400">★★★★★</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* FAQ SLIDER SECTION */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className={`rounded-3xl ${cardBg} p-6 sm:p-8 space-y-6 relative overflow-hidden`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-cyan-400 animate-pulse" />
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">{t.faqTitle}</h2>
                    <p className="text-xs opacity-70">{t.faqSub}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={handlePrevFaq} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 cursor-pointer" title="Previous"><ChevronLeft className="w-4 h-4" /></button>
                  <span className="text-xs font-mono opacity-60">{faqIndex + 1} / {t.faqList.length}</span>
                  <button onClick={handleNextFaq} className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 cursor-pointer" title="Next"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl min-h-[140px] flex flex-col justify-center relative cursor-pointer" onClick={handleNextFaq}>
                <div className={`space-y-2 transition-opacity duration-300 ${faqFade ? "opacity-100" : "opacity-0"}`}>
                  <h3 className="text-sm sm:text-base font-bold text-cyan-400">{t.faqList[faqIndex].q}</h3>
                  <p className="text-xs sm:text-sm opacity-90 leading-relaxed">{t.faqList[faqIndex].a}</p>
                </div>
              </div>
            </motion.section>

            {/* CONTACT FORM SECTION */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} id="contact" className={`rounded-3xl ${cardBg} p-8 space-y-6`}>
              <div>
                <h2 className="text-xl font-bold mb-1">{t.contactTitle}</h2>
                <p className="text-xs opacity-70 mb-6">{t.contactSub}</p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium opacity-80 mb-2">{t.formName}</label>
                    <input type="text" required placeholder="Γιάννης Παπαδόπουλος" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium opacity-80 mb-2">{t.formEmail}</label>
                    <input type="email" required placeholder="example@domain.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium opacity-80 mb-2">{t.formService}</label>
                  <input type="text" required placeholder="Θέμα επικοινωνίας" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500" />
                </div>

                <div>
                  <label className="block text-xs font-medium opacity-80 mb-2">{t.formMsg}</label>
                  <textarea required rows={4} placeholder={t.formPlaceholder} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 resize-none" />
                </div>

                <button type="submit" disabled={isSubmitting} className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold text-sm transition-all shadow cursor-pointer">
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t.sending : t.submitBtn}</span>
                </button>
              </form>
            </motion.section>

            {/* LIVE ATHENS TIME BAR */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.03] p-4 flex items-center justify-center gap-3 text-center">
              <Clock className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
              <span className="text-xs font-mono font-medium tracking-wide opacity-90">
                Athens, GR (EET) • <span className="text-cyan-400 font-bold">{athensTime || "15:49:46"}</span>
              </span>
            </motion.section>
          </div>
        )}

        {/* ================= VIEW 2: CV & TESTIMONIALS ================= */}
        {activeTab === 'cv' && (
          <div className="space-y-12 animate-in fade-in duration-300 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold">Βιογραφικό & Testimonials</h2>
              <p className="text-xs text-zinc-400">Η επαγγελματική πορεία, οι δεξιότητες και οι αξιολογήσεις πελατών.</p>
            </div>

            <div className={`p-8 rounded-3xl ${cardBg} space-y-6`}>
              <h3 className="text-xl font-bold text-cyan-400">{t.aboutTitle}</h3>
              <p className="text-sm opacity-90 leading-relaxed">{t.aboutP1}</p>
              <p className="text-sm opacity-80 leading-relaxed">{t.aboutP2}</p>
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                <a href="/cv.pdf" download className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs flex items-center gap-2"><Download className="w-4 h-4" /> {t.cvBtn}</a>
                <button onClick={() => setActiveTab('contact')} className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold flex items-center gap-2"><Mail className="w-4 h-4" /> {t.contactBtn}</button>
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold">{t.revTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[t.test1, t.test2, t.test3, t.test4].map((testText, idx) => (
                  <div key={idx} className={`p-6 rounded-3xl ${cardBg} space-y-3 flex flex-col justify-between`}>
                    <div className="flex gap-1 text-amber-400">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}</div>
                    <p className="text-xs sm:text-sm opacity-90 leading-relaxed italic">{testText}</p>
                    <span className="text-[10px] font-mono opacity-60">— Verified Client</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 3: MARKETPLACE & SUBSCRIPTIONS ================= */}
        {activeTab === 'marketplace' && (
          <div className="space-y-12 animate-in fade-in duration-300 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold uppercase">Commercial Sell 2030</span>
              <h2 className="text-3xl font-extrabold">Marketplace Υπηρεσιών & Συνδρομών</h2>
              <p className="text-xs text-zinc-400">Επιλέξτε πακέτο ιστοσελίδας και προαιρετική συνδρομή ενημερώσεων.</p>
            </div>

            {/* Web Packages Selector */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2"><Globe className="w-5 h-5 text-cyan-400" /> 1. Επιλέξτε Κατηγορία Ιστοσελίδας</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {webPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => { playNeuralSound('click'); setSelectedWebPackage(pkg.id); }}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${selectedWebPackage === pkg.id ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)]' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">{pkg.pages}</span>
                        <span className="text-lg font-extrabold text-white">{pkg.price}€</span>
                      </div>
                      <h4 className="font-bold text-sm mb-1">{pkg.name}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">{pkg.desc}</p>
                    </div>
                    <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">Επιλογή</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedWebPackage === pkg.id ? 'bg-cyan-400 border-cyan-400 text-black' : 'border-zinc-600'}`}>
                        {selectedWebPackage === pkg.id && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Maintenance Subscriptions Selector */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2"><RefreshCw className="w-5 h-5 text-purple-400" /> 2. Συνδρομή Ενημερώσεων & Υποστήριξης (Maintenance Care)</h3>
                {selectedSubPackage !== null && (
                  <button onClick={() => setSelectedSubPackage(null)} className="text-xs text-zinc-400 hover:text-white underline">Αφαίρεση</button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {subPackages.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => { playNeuralSound('click'); setSelectedSubPackage(sub.id); }}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${selectedSubPackage === sub.id ? 'bg-purple-500/15 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.25)]' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold">{sub.freq}</span>
                        <span className="text-lg font-extrabold text-white">+{sub.price}€<span className="text-[10px] font-normal text-zinc-400">/μήνα</span></span>
                      </div>
                      <h4 className="font-bold text-sm mb-1">{sub.name}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">{sub.desc}</p>
                    </div>
                    <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">Συνδρομή</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedSubPackage === sub.id ? 'bg-purple-400 border-purple-400 text-black' : 'border-zinc-600'}`}>
                        {selectedSubPackage === sub.id && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Bottom Bar */}
            <div className={`p-6 rounded-3xl ${cardBg} flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/5 to-purple-500/5`}>
              <div>
                <span className="text-xs text-zinc-400 block font-mono">Συνολικό Εκτιμώμενο Κόστος:</span>
                <div className="text-2xl font-extrabold text-white">
                  {totalPrice}€ <span className="text-xs font-normal text-zinc-400">{selectedSubPackage ? '+ μηνιαία συντήρηση' : 'εφάπαξ'}</span>
                </div>
              </div>
              <button
                onClick={() => { playNeuralSound('click'); setActiveTab('contact'); }}
                className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/30 transition-all cursor-pointer"
              >
                <CreditCard className="w-4 h-4" /> <span>Προχωρήστε στην Πληρωμή / Αίτηση</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= VIEW 4: CONTACT / CHECKOUT ================= */}
        {activeTab === 'contact' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold">{t.contactTitle}</h2>
              <p className="text-xs text-zinc-400">{t.contactSub}</p>
            </div>

            {checkoutComplete ? (
              <div className="p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-emerald-300">{t.successMsg}</h3>
                <p className="text-xs text-zinc-300">Έχουμε λάβει τις επιλογές σας και θα επικοινωνήσουμε άμεσα μαζί σας.</p>
                <button onClick={() => setCheckoutComplete(false)} className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold">Νέα Υποβολή</button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className={`p-8 rounded-3xl ${cardBg} space-y-4`}>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-zinc-500 block">Επιλεγμένο Πακέτο:</span>
                    <strong className="text-cyan-400">{currentWeb?.name}</strong> {currentSub ? `+ ${currentSub.name}` : ''}
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-500 block">Σύνολο:</span>
                    <strong className="text-white text-sm">{totalPrice}€</strong>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium opacity-80 mb-1">{t.formName}</label>
                  <input type="text" required placeholder="Γιάννης Παπαδόπουλος" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500" />
                </div>

                <div>
                  <label className="block text-xs font-medium opacity-80 mb-1">{t.formEmail}</label>
                  <input type="email" required placeholder="example@domain.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500" />
                </div>

                <div>
                  <label className="block text-xs font-medium opacity-80 mb-1">{t.formService}</label>
                  <input type="text" placeholder="π.χ. Marketplace Website & Maintenance" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500" />
                </div>

                <div>
                  <label className="block text-xs font-medium opacity-80 mb-1">{t.formMsg}</label>
                  <textarea rows={4} required placeholder={t.formPlaceholder} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/15 text-xs placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 resize-none" />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer">
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t.sending : t.submitBtn}</span>
                </button>
              </form>
            )}
          </div>
        )}

      </main>

      <TechBubbleModal isOpen={!!activeBubble} onClose={() => setActiveBubble(null)} title={activeBubble?.title || ""} date={activeBubble?.date || ""} content={activeBubble?.content || ""} />
      <Footer />
    </div>
  );
}
