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

    configTitle: "Visual Style Configurator",
    configSub: "Επιλέξτε το στυλ και την αισθητική που ταιριάζει στο brand σας:",
    style1Name: "Minimal Corporate",
    style1Desc: "Καθαρό λευκό/γκρι design, επαγγελματικό και απόλυτα σοβαρό για επιχειρήσεις.",
    style2Name: "Cyberpunk / Tech",
    style2Desc: "Σκοτεινό φόντο, νέον αποχρώσεις, τερματικά και high-tech αισθητική.",
    style3Name: "E-shop High-Conversion",
    style3Desc: "Έμφαση σε γρήγορα καλάθια, πειστικά call-to-actions και αύξηση πωλήσεων.",
    selectThisStyle: "Επιλογή Στυλ & Συνέχεια",

    auditTitle: "Express Micro-Service Audit",
    auditSub: "Θέλετε άμεσο έλεγχο; Αποκτήστε γρήγορα ένα τεχνικό report.",
    auditName: "Express SEO & Speed Audit",
    auditDesc: "Πλήρης έλεγχος ταχύτητας (Lighthouse), διορθώσεις SEO και προτάσεις βελτίωσης σε 24 ώρες.",
    auditPrice: "49€",
    buyAudit: "Αγορά Service",

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

    calcTitle: "Διαδραστικός Υπολογιστής Έργου",
    calcSub: "Υπολογίστε κατά προσέγγιση το κόστος και στείλτε το αίτημά σας άμεσα.",
    calcType: "Είδος Project:",
    calcAddon: "Επιπρόσθετες Υπηρεσίες:",
    estPrice: "Εκτιμώμενο Κόστος:",
    selectThis: "Επιλογή αυτού του πακέτου",

    priceTitle: "Υπηρεσίες & Κατάλογος Πακέτων",
    priceSub: "Επιλέξτε μία ή περισσότερες υπηρεσίες (Multi-select) για να φτιάξετε το δικό σας custom πακέτο συνεργασίας.",
    from: "από",
    hour: "ώρα",

    p1Cat: "WEB DEVELOPMENT",
    p1Title: "Landing Page",
    p1Desc: "Μοντέρνα, αστραπιαία ιστοσελίδα μίας σελίδας για επαγγελματική προβολή και γρήγορα αποτελέσματα.",
    p1Price: 199,
    p1F1: "Next.js & Tailwind CSS",
    p1F2: "Responsive Mobile Design",
    p1F3: "Βασικό SEO & Fast Loading",
    p1F4: "Φόρμα Επικοινωνίας",

    p2Cat: "WEB DEVELOPMENT",
    p2Title: "Personal Portfolio / Blog",
    p2Desc: "Προσωπικός ιστότοπος ή blog με πολλαπλές σελίδες, παρουσίαση έργων και άρθρα.",
    p2Price: 290,
    p2F1: "Custom Portfolio Layout",
    p2F2: "Dynamic Blog / Markdown Support",
    p2F3: "Dark/Light Theme Toggle",
    p2F4: "Social & Analytics Integration",

    p3Cat: "WEB DEVELOPMENT",
    p3Title: "Business App / E-shop",
    p3Desc: "Πλήρης επαγγελματική δυναμική εφαρμογή ή ηλεκτρονικό κατάστημα υψηλών επιδόσεων.",
    p3Price: 450,
    p3F1: "Database & Admin Dashboard",
    p3F2: "Advanced SEO & Performance",
    p3F3: "Ασφαλείς Πληρωμές & E-shop Cart",
    p3F4: "Custom API Integrations",

    p4Cat: "WEB DEVELOPMENT",
    p4Title: "Custom Full-Stack App",
    p4Desc: "Προηγμένη web εφαρμογή κομμένη και ραμμένη στις ειδικές επιχειρηματικές σας ανάγκες.",
    p4Price: 650,
    p4F1: "Full-Stack Architecture (Next.js/Node)",
    p4F2: "User Authentication & Roles",
    p4F3: "Complex Database Design",
    p4F4: "High Security & Zero Lags",

    p5Cat: "DEVOPS / LINUX",
    p5Title: "Basic Homelab Setup",
    p5Desc: "Βασικό στήσιμο εικονικών μηχανών και ασφαλούς δικτύου για οικιακή χρήση.",
    p5Price: 150,
    p5F1: "Proxmox VE & LXC Containers",
    p5F2: "Tailscale Secure Mesh VPN",
    p5F3: "Βασική Ρύθμιση Storage (ext4)",
    p5F4: "Uptime & Health Monitoring",

    p6Cat: "DEVOPS / LINUX",
    p6Title: "Full Enterprise Homelab",
    p6Desc: "Προηγμένη αρχιτεκτονική με αυτόματα backups και ιδιωτικό cloud αποθήκευσης.",
    p6Price: 280,
    p6F1: "Nextcloud & Auto Backup (Unlimited Photos)",
    p6F2: "Automated Snapshots & Recovery",
    p6F3: "Advanced User Rights & Mounts",
    p6F4: "High Availability Optimization",

    p7Cat: "INFRASTRUCTURE",
    p7Title: "Advanced Cloud & Docker",
    p7Desc: "Ανάπτυξη και ενορχήστρωση σύνθετων self-hosted εφαρμογών και βάσεων δεδομένων.",
    p7Price: 250,
    p7F1: "Docker & Docker Compose Stack",
    p7F2: "MariaDB / PostgreSQL Setup",
    p7F3: "Reverse Proxy & SSL Certificates",
    p7F4: "Automated Cron Backups",

    p8Cat: "EXPERT SUPPORT",
    p8Title: "Consulting & Audit",
    p8Desc: "Εξατομικευμένες λύσεις, επίλυση σύνθετων τεχνικών προβλημάτων και security check.",
    p8Price: 35,
    p8F1: "System Auditing & Security Check",
    p8F2: "Performance & Code Optimization",
    p8F3: "1-on-1 Live Τεχνική Υποστήριξη",
    p8F4: "Architecture & DevOps Consulting",

    selected: "Επιλεγμένο",
    select: "Προσθήκη στο Αίτημα",
    contactTitle: "Συνολικό Αίτημα & Απόδειξη Υπηρεσιών",
    contactSub: "Οι υπηρεσίες που επιλέξατε παραπάνω εμφανίζονται αυτόματα παρακάτω για την αποστολή του αιτήματός σας.",
    formName: "Όνομα / Επωνυμία",
    formEmail: "Email Επικοινωνίας",
    formService: "Επιλεγμένες Υπηρεσίες & Συνολικό Κόστος",
    formMsg: "Μήνυμα / Λεπτομέρειες",
    formPlaceholder: "Περιγράψτε τυχόν επιπλέον απαιτήσεις...",
    submitBtn: "Αποστολή Ολοκληρωμένου Αιτήματος",
    sending: "Γίνεται αποστολή...",
    successMsg: "Το αίτημά σας στάλθηκε με επιτυχία! Θα επικοινωνήσω μαζί σας σύντομα.",
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

    learningTitle: "Live Tech Roadmap & History",
    learningSubtitle: "Continuous learning path and technological evolution:",
    learningItems: [
      { date: "Current", text: "Advanced Proxmox Clustering & Kubernetes orchestration." },
      { date: "Previous", text: "Next.js 14 App Router, Server Actions & Advanced TypeScript." },
      { date: "Foundation", text: "Linux Administration, Docker Networking & Tailscale VPN Mesh." }
    ],

    guaranteeText: "Zero downtime deployment • SEO-optimized • Fast delivery (5-7 days)",

    configTitle: "Visual Style Configurator",
    configSub: "Choose the style and aesthetic that best fits your brand:",
    style1Name: "Minimal Corporate",
    style1Desc: "Clean white/grey design, professional and strictly formal for businesses.",
    style2Name: "Cyberpunk / Tech",
    style2Desc: "Dark background, neon accents, terminal aesthetics and high-tech vibe.",
    style3Name: "E-shop High-Conversion",
    style3Desc: "Focused on fast carts, persuasive calls-to-action and sales boosting.",
    selectThisStyle: "Select Style & Proceed",

    auditTitle: "Express Micro-Service Audit",
    auditSub: "Need a fast assessment? Get a concise technical report quickly.",
    auditName: "Express SEO & Speed Audit",
    auditDesc: "Complete Lighthouse speed test, SEO fixes, and optimization roadmap within 24 hours.",
    auditPrice: "49€",
    buyAudit: "Order Service",

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

    calcTitle: "Interactive Project Calculator",
    calcSub: "Estimate your project cost instantly and submit your request.",
    calcType: "Project Type:",
    calcAddon: "Extra Options:",
    estPrice: "Estimated Cost:",
    selectThis: "Select this package",

    priceTitle: "Services & Catalog Packages",
    priceSub: "Select multiple services to build your custom package proposal instantly.",
    from: "from",
    hour: "hour",

    p1Cat: "WEB DEVELOPMENT",
    p1Title: "Landing Page",
    p1Desc: "Modern, ultra-fast single-page website for professional branding and fast results.",
    p1Price: 199,
    p1F1: "Next.js & Tailwind CSS",
    p1F2: "Responsive Mobile Design",
    p1F3: "Basic SEO & Fast Loading",
    p1F4: "Contact Form Integration",

    p2Cat: "WEB DEVELOPMENT",
    p2Title: "Personal Portfolio / Blog",
    p2Desc: "Multi-page personal website or blog featuring project galleries and articles.",
    p2Price: 290,
    p2F1: "Custom Portfolio Layout",
    p2F2: "Dynamic Blog / Markdown Support",
    p2F3: "Dark/Light Theme Toggle",
    p2F4: "Social & Analytics Integration",

    p3Cat: "WEB DEVELOPMENT",
    p3Title: "Business App / E-shop",
    p3Desc: "Full professional dynamic web application or high-performance e-commerce store.",
    p3Price: 450,
    p3F1: "Database & Admin Dashboard",
    p3F2: "Advanced SEO & Performance",
    p3F3: "Secure Payments & E-shop Cart",
    p3F4: "Custom API Integrations",

    p4Cat: "WEB DEVELOPMENT",
    p4Title: "Custom Full-Stack App",
    p4Desc: "Advanced web application tailored precisely to your specific business needs.",
    p4Price: 650,
    p4F1: "Full-Stack Architecture (Next.js/Node)",
    p4F2: "User Authentication & Roles",
    p4F3: "Complex Database Design",
    p4F4: "High Security & Zero Lags",

    p5Cat: "DEVOPS / LINUX",
    p5Title: "Basic Homelab Setup",
    p5Desc: "Essential virtual machines and secure network setup for personal or local use.",
    p5Price: 150,
    p5F1: "Proxmox VE & LXC Containers",
    p5F2: "Tailscale Secure Mesh VPN",
    p5F3: "Basic Storage Setup (ext4)",
    p5F4: "Uptime & Health Monitoring",

    p6Cat: "DEVOPS / LINUX",
    p6Title: "Full Enterprise Homelab",
    p6Desc: "Advanced architecture featuring automated backups and private cloud storage.",
    p6Price: 280,
    p6F1: "Nextcloud & Auto Backup (Unlimited Photos)",
    p6F2: "Automated Snapshots & Recovery",
    p6F3: "Advanced User Rights & Mounts",
    p6F4: "High Availability Optimization",

    p7Cat: "INFRASTRUCTURE",
    p7Title: "Advanced Cloud & Docker",
    p7Desc: "Deployment and orchestration of advanced self-hosted apps and databases.",
    p7Price: 250,
    p7F1: "Docker & Docker Compose Stack",
    p7F2: "MariaDB / PostgreSQL Setup",
    p7F3: "Reverse Proxy & SSL Certificates",
    p7F4: "Automated Cron Backups",

    p8Cat: "EXPERT SUPPORT",
    p8Title: "Consulting & Audit",
    p8Desc: "Custom solutions, technical troubleshooting, and systems consulting.",
    p8Price: 35,
    p8F1: "System Auditing & Security Check",
    p8F2: "Performance & Code Optimization",
    p8F3: "1-on-1 Live Technical Support",
    p8F4: "Architecture & DevOps Consulting",

    selected: "Selected",
    select: "Select",
    contactTitle: "Total Request & Service Invoice",
    contactSub: "The services you selected above are automatically listed below for your inquiry.",
    formName: "Name / Company",
    formEmail: "Contact Email",
    formService: "Selected Services & Total Cost",
    formMsg: "Message / Details",
    formPlaceholder: "Describe any extra requirements...",
    submitBtn: "Send Complete Request",
    sending: "Sending...",
    successMsg: "Your request was sent successfully! I will contact you soon.",
    errorMsg: "Failed to send. Please try again.",
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

  // --- MULTI-SELECT CART / SERVICES STATE ---
  const [selectedServices, setSelectedServices] = useState<string[]>(["Full Enterprise Homelab (280€)"]);

  const toggleService = (title: string, price: number | string, isHourly: boolean = false) => {
    const itemStr = `${title} (${price}${isHourly ? (lang === "gr" ? "€/ώρα" : "€/hr") : "€"})`;
    if (selectedServices.includes(itemStr)) {
      if (selectedServices.length === 1) {
        toast.error(lang === "gr" ? "Πρέπει να έχετε τουλάχιστον μία υπηρεσία επιλεγμένη." : "You must keep at least one service selected.");
        return;
      }
      setSelectedServices(selectedServices.filter(s => s !== itemStr));
      toast.info(lang === "gr" ? `Αφαιρέθηκε: ${title}` : `Removed: ${title}`);
    } else {
      setSelectedServices([...selectedServices, itemStr]);
      toast.success(lang === "gr" ? `Προστέθηκε: ${title}` : `Added: ${title}`);
    }
  };

  // Calculate total price dynamically
  const calculatedCartTotal = selectedServices.reduce((sum, item) => {
    const match = item.match(/\((\d+)€/);
    return sum + (match ? parseInt(match[1], 10) : 0);
  }, 0);

  const cartSummaryText = selectedServices.join(" + ");

  // --- CALCULATOR STATES ---
  const [calcBasePrice, setCalcBasePrice] = useState(199);
  const [calcBaseName, setCalcBaseName] = useState("Landing Page");
  const [calcAddonSeo, setCalcAddonSeo] = useState(false);
  const [calcAddonVpn, setCalcAddonVpn] = useState(false);

  const calculatedTotal = calcBasePrice + (calcAddonSeo ? 70 : 0) + (calcAddonVpn ? 100 : 0);

  // --- CONFIGURATOR STATE ---
  const [selectedStyle, setSelectedStyle] = useState("Minimal Corporate");

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
      case "Express SEO & Speed Audit": return "49€";
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
          serviceTitle: cartSummaryText,
          servicePrice: `${calculatedCartTotal}€`,
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

        {/* VISUAL STYLE CONFIGURATOR */}
        <section className={`rounded-3xl border border-blue-500/30 bg-blue-500/[0.02] p-6 sm:p-8 space-y-6 animate-fade-in-up`}>
          <div className="flex items-center gap-3">
            <Palette className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-lg font-bold">{t.configTitle}</h2>
              <p className="text-xs opacity-70">{t.configSub}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: t.style1Name, desc: t.style1Desc, tag: "Corporate" },
              { name: t.style2Name, desc: t.style2Desc, tag: "Tech / Cyber" },
              { name: t.style3Name, desc: t.style3Desc, tag: "E-commerce" },
            ].map((st, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedStyle(st.name);
                  toast.success(`Επιλέχθηκε το στυλ: ${st.name}`);
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${selectedStyle === st.name ? "bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/10" : "bg-white/[0.02] border-white/10 hover:border-white/20"}`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">{st.tag}</span>
                    {selectedStyle === st.name && <Check className="w-4 h-4 text-blue-400" />}
                  </div>
                  <h3 className="text-sm font-bold">{st.name}</h3>
                  <p className="text-xs opacity-70 leading-relaxed">{st.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-blue-400">
                  <span>Preview Active</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                const styleItem = `Custom Design Style: ${selectedStyle}`;
                if (!selectedServices.includes(styleItem)) {
                  setSelectedServices([...selectedServices, styleItem]);
                }
                toast.success(`Το στυλ "${selectedStyle}" προστέθηκε στην παραγγελία σας!`);
                window.location.href = "#contact";
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              {t.selectThisStyle}
            </button>
          </div>
        </section>

        {/* EXPRESS MICRO-SERVICE AUDIT */}
        <section className={`rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.02] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 animate-fade-in-up`}>
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-wider">Instant Service</span>
            <h2 className="text-lg font-bold">{t.auditName}</h2>
            <p className="text-xs opacity-80 max-w-xl">{t.auditDesc}</p>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
            <div className="text-2xl font-bold font-mono text-emerald-400">{t.auditPrice}</div>
            <button
              onClick={() => {
                const auditItem = `Express SEO & Speed Audit (49€)`;
                if (!selectedServices.includes(auditItem)) {
                  setSelectedServices([...selectedServices, auditItem]);
                }
                toast.success("Προστέθηκε το Express Audit (49€)");
                window.location.href = "#contact";
              }}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              {t.buyAudit}
            </button>
          </div>
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

        {/* INTERACTIVE COST CALCULATOR */}
        <section className={`rounded-3xl border border-cyan-500/30 bg-cyan-500/[0.02] p-6 sm:p-8 space-y-6 animate-fade-in-up`}>
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-cyan-400" />
            <div>
              <h2 className="text-lg font-bold">{t.calcTitle}</h2>
              <p className="text-xs opacity-70">{t.calcSub}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs font-mono opacity-80 mb-2">{t.calcType}</label>
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
                }}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
              >
                <option value={199} className="bg-zinc-900 text-white">Landing Page (199€)</option>
                <option value={290} className="bg-zinc-900 text-white">Personal Portfolio / Blog (290€)</option>
                <option value={450} className="bg-zinc-900 text-white">Business App / E-shop (450€)</option>
                <option value={650} className="bg-zinc-900 text-white">Custom Full-Stack App (650€)</option>
                <option value={150} className="bg-zinc-900 text-white">Basic Homelab Setup (150€)</option>
                <option value={280} className="bg-zinc-900 text-white">Full Enterprise Homelab (280€)</option>
                <option value={250} className="bg-zinc-900 text-white">Advanced Cloud & Docker (250€)</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-mono opacity-80">{t.calcAddon}</label>
              <div className="flex flex-col sm:flex-row gap-4 text-xs opacity-90">
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
              <span className="text-xs opacity-70 font-mono">{t.estPrice}</span>
              <div className="text-3xl font-bold text-cyan-400 font-mono">{calculatedTotal}€</div>
            </div>
            <button
              onClick={() => {
                const desc = `${calcBaseName} ${calcAddonSeo ? "+ SEO" : ""} ${calcAddonVpn ? "+ VPN" : ""}`;
                const calcItem = `${desc} (${calculatedTotal}€)`;
                if (!selectedServices.includes(calcItem)) {
                  setSelectedServices([...selectedServices, calcItem]);
                }
                toast.success(`Προστέθηκε στο αίτημα: ${calcItem}`);
                window.location.href = "#contact";
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              {t.selectThis}
            </button>
          </div>
        </section>

        {/* PRICING SECTION - MULTI-SELECT CATALOG & CART BUILDER */}
        <section id="services" className={`rounded-3xl ${cardBg} p-6 sm:p-10 space-y-8 animate-fade-in-up delay-400 transition-colors`}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.priceTitle}</h2>
            <p className="text-sm opacity-70 leading-relaxed">{t.priceSub}</p>
          </div>

          <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto snap-x snap-mandatory gap-6 pb-4 pt-2 no-scrollbar scroll-smooth">

            {[
              { title: t.p1Title, cat: t.p1Cat, desc: t.p1Desc, price: t.p1Price, f: [t.p1F1, t.p1F2, t.p1F3, t.p1F4] },
              { title: t.p2Title, cat: t.p2Cat, desc: t.p2Desc, price: t.p2Price, f: [t.p2F1, t.p2F2, t.p2F3, t.p2F4] },
              { title: t.p3Title, cat: t.p3Cat, desc: t.p3Desc, price: t.p3Price, f: [t.p3F1, t.p3F2, t.p3F3, t.p3F4] },
              { title: "Custom Full-Stack App", cat: "WEB DEVELOPMENT", desc: "Προηγμένη web εφαρμογή κομμένη και ραμμένη στις ειδικές επιχειρηματικές σας ανάγκες.", price: t.p4Price, f: ["Full-Stack Architecture (Next.js/Node)", "User Authentication & Roles", "Complex Database Design", "High Security & Zero Lags"] },
              { title: t.p5Title, cat: t.p5Cat, desc: t.p5Desc, price: t.p5Price, f: [t.p5F1, t.p5F2, t.p5F3, t.p5F4] },
              { title: t.p6Title, cat: t.p6Cat, desc: t.p6Desc, price: t.p6Price, f: [t.p6F1, t.p6F2, t.p6F3, t.p6F4] },
              { title: t.p7Title, cat: t.p7Cat, desc: t.p7Desc, price: t.p7Price, f: [t.p7F1, t.p7F2, t.p7F3, t.p7F4] },
              { title: t.p8Title, cat: t.p8Cat, desc: t.p8Desc, price: t.p8Price, hourly: true, f: [t.p8F1, t.p8F2, t.p8F3, t.p8F4] }
            ].map((pkg, idx) => {
              const itemStr = `${pkg.title} (${pkg.price}${pkg.hourly ? (lang === "gr" ? "€/ώρα" : "€/hr") : "€"})`;
              const isSelected = selectedServices.some(s => s.startsWith(pkg.title));

              return (
                <div key={idx} className={`min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border-2 ${isSelected ? "bg-cyan-500/10 border-cyan-500 shadow-[0_0_35px_-5px_rgba(6,182,212,0.2)] scale-[1.02]" : "bg-white/[0.02] border-white/10 hover:border-white/20"}`}>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">{pkg.cat}</span>
                      {isSelected && <span className="flex items-center gap-1 text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold"><Check className="w-3 h-3" /> {t.selected}</span>}
                    </div>
                    <h3 className="text-lg font-bold mt-2">{pkg.title}</h3>
                    <div className="my-4 flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{pkg.price}€</span>
                      <span className="text-xs opacity-70 font-mono">/ {pkg.hourly ? t.hour : t.from}</span>
                    </div>
                    <p className="text-xs opacity-80 mb-6 leading-relaxed">{pkg.desc}</p>
                    <ul className="space-y-3 text-xs opacity-90 mb-8">
                      {pkg.f.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => toggleService(pkg.title, pkg.price, pkg.hourly)}
                    className={`w-full py-3 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${isSelected ? "bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20" : "bg-white/10 hover:bg-white/20"}`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isSelected ? t.selected : t.select}</span>
                  </button>
                </div>
              );
            })}

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
              <div className="flex flex-col sm:flex-row gap-2">
                <input type="text" readOnly value={cartSummaryText} className="w-full sm:w-2/3 px-4 py-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 font-mono text-xs sm:text-sm cursor-not-allowed" />
                <input type="text" readOnly value={`${calculatedCartTotal}€`} className="w-full sm:w-1/3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/15 text-cyan-300 font-bold font-mono text-sm text-center cursor-not-allowed" />
              </div>
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
