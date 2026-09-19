"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Cloud,
  Network,
  Mail,
  Copy,
  Check,
  ShieldCheck,
  Code2,
  Zap,
  GraduationCap,
  Flame,
  User,
  Workflow,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function PortfolioGrid() {
  const [activeTab, setActiveTab] = useState<"all" | "infra" | "cloud" | "web">("all");
  const [activeNode, setActiveNode] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [cliCommand, setCliCommand] = useState<string>("about");

  const copyEmail = () => {
    navigator.clipboard.writeText("miltospapageorgiou@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const homelabNodes = [
    {
      id: "proxmox",
      name: "Proxmox VE Hypervisor",
      badge: "Bare Metal Hypervisor",
      status: "Online • Healthy",
      description:
        "High-performance virtualization environment running on dedicated bare-metal hardware. Configured with ZFS mirroring, automated cron snapshots, and hardware passthrough for maximum stability.",
      metrics: [
        { label: "Hypervisor", val: "PVE 8.x Kernel 6.8" },
        { label: "Memory Pool", val: "64 GB DDR4" },
        { label: "Storage Engine", val: "ZFS Mirror Pool" },
        { label: "Hyper-Threads", val: "16 Dedicated Threads" },
      ],
      tags: ["Proxmox", "Linux Kernel", "ZFS", "QEMU/KVM"],
    },
    {
      id: "containers",
      name: "Docker & LXC Container Suite",
      badge: "Isolated Microservices",
      status: "14 Containers Active",
      description:
        "Lightweight LXC containers and Docker daemon stacks hosting private services, including Nextcloud data storage, automated database sync, and containerized dev environments.",
      metrics: [
        { label: "Engine", val: "Docker Compose / LXC" },
        { label: "Orchestration", val: "Modular Stacks" },
        { label: "Volume Mounts", val: "Direct NVMe Storage" },
        { label: "Restart Policy", val: "Always-on Graceful" },
      ],
      tags: ["Docker", "LXC", "Nextcloud", "Nginx"],
    },
    {
      id: "tailscale",
      name: "Tailscale Mesh Network",
      badge: "Zero-Trust WireGuard",
      status: "Mesh Synced",
      description:
        "Encrypted WireGuard peer-to-peer overlay network connecting servers, mobile devices, and remote workstations seamlessly with MagicDNS and ACL access policies.",
      metrics: [
        { label: "Protocol", val: "WireGuard Noise" },
        { label: "Routing", val: "Subnet Routers / NAT" },
        { label: "Security", val: "Point-to-Point 256-bit" },
        { label: "Latency", val: "< 12ms Direct Peer" },
      ],
      tags: ["Tailscale", "WireGuard", "MagicDNS", "Mesh VPN"],
    },
    {
      id: "macos",
      name: "macOS Workstation & Terminal",
      badge: "Ergonomic Workflow",
      status: "Optimized Setup",
      description:
        "Tailored developer workstation environment with custom Zsh scripting, tmux session managers, Raycast automations, and fast keybindings for uninterrupted coding.",
      metrics: [
        { label: "Shell", val: "Zsh + Custom Prompt" },
        { label: "Multiplexer", val: "Tmux Persistent Sessions" },
        { label: "Package Mgr", val: "Homebrew / Nix" },
        { label: "Editor", val: "VS Code + Neovim Keymaps" },
      ],
      tags: ["macOS", "Zsh", "Tmux", "Productivity"],
    },
  ];

  // Expanded Personal Projects as requested
  const projects = [
    {
      title: "Proxmox VE Home-Lab Infrastructure",
      category: "infra",
      categoryLabel: "Infrastructure & Virtualization",
      description:
        "A bare-metal virtualization cluster built on Proxmox VE featuring ZFS mirroring pools, automated periodic snapshot rotation, and isolated LXC containerization for enterprise-grade self-hosting.",
      stats: ["ZFS Mirroring", "Automated Snapshots", "LXC Virtualization"],
      tech: ["Proxmox VE", "Debian Linux", "ZFS", "LXC", "Cron Automations"],
      icon: Server,
      gradient: "from-cyan-500/20 to-blue-500/5",
    },
    {
      title: "Nextcloud Private Cloud Solution",
      category: "cloud",
      categoryLabel: "Private Cloud & Data Sovereignty",
      description:
        "A private self-hosted cloud storage ecosystem ensuring complete data ownership, automated mobile camera and file backups, zero-telemetry sync, and end-to-end encrypted remote access.",
      stats: ["Zero Cloud Lock-in", "Automated Media Backup", "End-to-End Encrypted"],
      tech: ["Nextcloud", "Docker Compose", "PostgreSQL", "Redis", "Nginx Proxy"],
      icon: Cloud,
      gradient: "from-indigo-500/20 to-sky-500/5",
    },
    {
      title: "Zero-Trust Network Mesh (Tailscale & WireGuard)",
      category: "cloud",
      categoryLabel: "Secure Networking",
      description:
        "A high-security overlay mesh network establishing point-to-point encrypted tunnels between remote servers, client devices, and home infrastructure without exposing public ports.",
      stats: ["Zero Public Open Ports", "WireGuard Noise Protocol", "MagicDNS Routing"],
      tech: ["Tailscale", "WireGuard", "Access Control Lists", "Subnet Router"],
      icon: Network,
      gradient: "from-emerald-500/20 to-teal-500/5",
    },
    {
      title: "Interactive Scrollytelling Portfolio",
      category: "web",
      categoryLabel: "Web Engineering & Creative Tech",
      description:
        "An Awwwards-inspired interactive portfolio pairing high-performance HTML5 Canvas image sequence scrubbing with Framer Motion scroll hooks, dark glassmorphism, and responsive Next.js App Router.",
      stats: ["60+ FPS Scrub", "High-DPI Retina", "HTML5 Canvas API"],
      tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion"],
      icon: Code2,
      gradient: "from-purple-500/20 to-pink-500/5",
    },
  ];

  const skills = [
    {
      category: "Systems & Infrastructure",
      icon: Server,
      color: "text-cyan-400",
      items: [
        "Debian / Ubuntu Server Administration",
        "Proxmox VE (PVE) Hypervisor",
        "Docker & LXC Containerization",
        "Nextcloud Private Cloud Storage",
        "Tailscale & WireGuard Mesh VPN",
        "ZFS File Systems & Snapshot Policies",
        "Bash Scripting & Automation",
        "Reverse Proxy (Nginx / NPM)",
      ],
    },
    {
      category: "Web & Software Engineering",
      icon: Code2,
      color: "text-purple-400",
      items: [
        "Next.js (App Router) & React",
        "TypeScript & Modern JavaScript",
        "Tailwind CSS Design Systems",
        "Framer Motion Scroll Animations",
        "HTML5 Canvas API Rendering",
        "Node.js & REST API Integration",
        "Git Version Control & CI/CD",
        "High Core Web Vitals Optimization",
      ],
    },
    {
      category: "Workflow & Developer Tooling",
      icon: Workflow,
      color: "text-emerald-400",
      items: [
        "macOS Power-User Environment",
        "Custom Zsh Prompt & Aliases",
        "Tmux Session Management",
        "Raycast & System Automations",
        "Homebrew & Nix Tooling",
        "SSH Key & Certificate Hardening",
        "Modular Microservice Architecture",
        "Performance Profiling & Debugging",
      ],
    },
    {
      category: "Execution, Leadership & Work Ethic",
      icon: ShieldCheck,
      color: "text-amber-400",
      items: [
        "Computer Science Academic Degree",
        "High-Pressure Hospitality Background",
        "Multi-Year Seasonal Team Leadership",
        "Rapid On-the-Fly Adaptability",
        "Stress Inoculation & Calm Triage",
        "Relentless Target Persistence",
        "Ultra-High Daily Productivity",
        "End-to-End Ownership & Accountability",
      ],
    },
  ];

  const filteredProjects =
    activeTab === "all" ? projects : projects.filter((p) => p.category === activeTab);

  return (
    <section id="portfolio" className="relative z-20 bg-[#050508] py-24 px-4 sm:px-6 lg:px-8">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-gradient from-cyan-500/10 via-purple-500/5 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto space-y-28">
        {/* ================= SECTION 1: ABOUT ME / LIGA LOGIA GIA MENA ================= */}
        <div id="about" className="scroll-mt-28 space-y-8">
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3.5 py-1 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
              <User className="h-3.5 w-3.5" />
              <span>PROFILE • ΛΙΓΑ ΛΟΓΙΑ ΓΙΑ ΜΕΝΑ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              About Me & Engineering Ethos
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Primary Bio Card */}
            <div className="lg:col-span-8 rounded-3xl bg-[#090b14]/85 border border-white/10 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I am a <strong className="text-white">Computer Science Graduate</strong> with an
                  intense dedication to systems infrastructure, private cloud self-hosting, and
                  modern web software. My technical journey is defined by curiosity and a commitment
                  to full ownership—from the physical hardware running in my home cluster to the
                  client-side code rendering smoothly at 60 FPS.
                </p>

                <p>
                  Beyond pure technical theory, my work ethic and resilience were forged in the
                  furnace of{" "}
                  <strong className="text-amber-400">
                    fast-paced hospitality and high-demand seasonal operations
                  </strong>
                  . Over multiple years in seasonal leadership roles, I developed the ability to
                  triage unexpected crises under extreme pressure, communicate clearly, and maintain
                  unwavering focus until the mission is accomplished.
                </p>

                <p>
                  Today, I channel that same high daily productivity and relentless persistence into
                  software development, automated Linux homelabs, and building digital tools that
                  work flawlessly.
                </p>
              </div>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/5">
                <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-4">
                  <GraduationCap className="h-5 w-5 text-cyan-400 mb-2" />
                  <h4 className="text-sm font-bold text-white">CS Academic Degree</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Strong theoretical principles, data structures, and software architecture.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-4">
                  <Zap className="h-5 w-5 text-amber-400 mb-2" />
                  <h4 className="text-sm font-bold text-white">High Daily Output</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Structured workflows, continuous delivery, and rapid learning curves.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-4">
                  <Flame className="h-5 w-5 text-rose-400 mb-2" />
                  <h4 className="text-sm font-bold text-white">Battle-Tested Grit</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Cool-headed problem solving proven in high-stress operational environments.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stat / Profile Sidebar */}
            <div className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-cyan-950/20 to-[#090b14] border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono font-bold">
                    MP
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Miltos Papageorgiou</h3>
                    <p className="text-xs text-gray-400 font-mono">Athens, Greece</p>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-gray-500 block text-[10px] uppercase tracking-wider">
                      Specialization
                    </span>
                    <span className="text-white font-semibold">Systems & Web Developer</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-gray-500 block text-[10px] uppercase tracking-wider">
                      Availability
                    </span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Open for Full-Time / Contract
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-gray-500 block text-[10px] uppercase tracking-wider">
                      Personal Stack
                    </span>
                    <span className="text-cyan-300 font-semibold">
                      Proxmox • Linux • Docker • Next.js
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={copyEmail}
                  className="w-full py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-xs font-mono font-medium text-white flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Mail className="h-4 w-4 text-cyan-400" />}
                  <span>{copied ? "Copied: miltospapageorgiou@gmail.com" : "Email: miltospapageorgiou@gmail.com"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: HOMELAB & SYSTEMS INTERACTIVE EXPLORER ================= */}
        <div id="systems" className="scroll-mt-28 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3.5 py-1 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
                <Server className="h-3.5 w-3.5" />
                <span>SELF-HOSTED LAB ARCHITECTURE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Live Infrastructure Nodes
              </h2>
            </div>
            <p className="max-w-md text-sm text-gray-400 leading-relaxed">
              Explore the core architecture of my self-hosted environment. Built for absolute data
              ownership, isolation, and resilient high-throughput workflows.
            </p>
          </div>

          {/* Interactive Node Tabs & Inspection Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left selector buttons */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {homelabNodes.map((node, idx) => (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(idx)}
                  className={`group relative text-left p-4 rounded-2xl transition-all duration-300 border ${
                    activeNode === idx
                      ? "bg-white/[0.07] border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.15)]"
                      : "bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                      NODE {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      {node.badge}
                    </span>
                  </div>
                  <h3 className="mt-1 text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {node.name}
                  </h3>
                </button>
              ))}
            </div>

            {/* Right Detailed Node Card */}
            <div className="lg:col-span-8 rounded-3xl bg-[#090b14]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <span className="text-xs font-mono text-gray-400">INSPECTING SERVICE</span>
                    <h3 className="text-2xl font-black text-white">
                      {homelabNodes[activeNode].name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    {homelabNodes[activeNode].status}
                  </div>
                </div>

                <p className="mt-5 text-sm sm:text-base text-gray-300 leading-relaxed">
                  {homelabNodes[activeNode].description}
                </p>

                {/* Specs Grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {homelabNodes[activeNode].metrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="rounded-xl bg-white/[0.03] border border-white/5 p-3.5"
                    >
                      <span className="text-[11px] font-mono text-gray-400 block">
                        {metric.label}
                      </span>
                      <span className="text-xs sm:text-sm font-mono font-bold text-white mt-1 block">
                        {metric.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {homelabNodes[activeNode].tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 text-xs font-mono text-cyan-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-mono">Self-Managed & Hardened</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 3: INTERACTIVE TERMINAL SIMULATOR ================= */}
        <div className="rounded-3xl bg-[#090b12] border border-white/10 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between bg-black/60 px-5 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-amber-500/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-gray-400">
                miltos@infra-hypervisor: ~ (zsh)
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <span className="hidden sm:inline">Click commands below to inspect</span>
            </div>
          </div>

          <div className="p-6 font-mono text-xs sm:text-sm space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-cyan-400">➜</span>
              <span className="text-purple-400">~/systems</span>
              <span className="text-gray-200">$ {cliCommand}</span>
            </div>

            {/* Simulated Command Output */}
            <div className="rounded-xl bg-black/50 p-4 border border-white/5 text-gray-300 space-y-2">
              {cliCommand === "about" && (
                <div className="space-y-1">
                  <p className="text-cyan-400 font-bold">● CANDIDATE PROFILE:</p>
                  <p>• Name: Miltos Papageorgiou (Athens, Greece)</p>
                  <p>• Degree: Computer Science Graduate</p>
                  <p>• Focus: Self-Hosted Infrastructure, Linux & Modern Reactive Web</p>
                  <p>• Ethos: Extreme day-to-day productivity with high operational grit</p>
                </div>
              )}
              {cliCommand === "status" && (
                <div className="space-y-1">
                  <p className="text-emerald-400 font-bold">
                    ● HOMELAB CLUSTER STATUS: OPTIMAL (ALL SYSTEMS NOMINAL)
                  </p>
                  <p className="text-gray-400">
                    Host: Proxmox Virtual Environment 8.2 | Uptime: 48 days, 14 hours
                  </p>
                  <p className="text-gray-400">
                    Tailscale Mesh: 6 connected nodes | WireGuard status: active
                  </p>
                  <p className="text-gray-400">
                    Nextcloud Storage: 2.1 TB indexed | Zero external cloud telemetry
                  </p>
                </div>
              )}
              {cliCommand === "projects" && (
                <div className="space-y-1">
                  <p className="text-purple-400 font-bold">● ACTIVE PERSONAL PROJECTS:</p>
                  <p>1. Proxmox VE Home-Lab (ZFS mirroring & automated snapshots)</p>
                  <p>2. Nextcloud Private Cloud (Self-hosted media & file sync)</p>
                  <p>3. Zero-Trust Network Mesh (Tailscale + WireGuard encrypted overlay)</p>
                  <p>4. Interactive Scrollytelling Portfolio (Next.js 16 + HTML5 Canvas API)</p>
                </div>
              )}
              {cliCommand === "resilience" && (
                <div className="space-y-1">
                  <p className="text-amber-400 font-bold">● RESILIENCE & WORK ETHIC:</p>
                  <p>• Multi-year fast-paced hospitality & high-demand seasonal operations</p>
                  <p>• Calm stress management during unexpected blockers and high visitor volume</p>
                  <p>• 100% target persistence from problem triage to clean execution</p>
                </div>
              )}
              {cliCommand === "contact" && (
                <div className="space-y-1">
                  <p className="text-emerald-400 font-bold">● DIRECT CONTACT:</p>
                  <p>Email: miltospapageorgiou@gmail.com</p>
                  <p>Location: Athens, GR (UTC+3)</p>
                  <p>Status: Ready for immediate engineering opportunities</p>
                </div>
              )}
            </div>

            {/* Command Trigger Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-gray-500 font-mono mr-1">Quick Run:</span>
              {[
                { cmd: "about", label: "cat about.md" },
                { cmd: "status", label: "pve status" },
                { cmd: "projects", label: "ls -la ~/projects" },
                { cmd: "resilience", label: "inspect --ethic" },
                { cmd: "contact", label: "cat contact.json" },
              ].map((btn) => (
                <button
                  key={btn.cmd}
                  onClick={() => setCliCommand(btn.cmd)}
                  className={`rounded-lg px-3 py-1 text-xs font-mono transition-all border ${
                    cliCommand === btn.cmd
                      ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                      : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  $ {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= SECTION 4: EXPANDED PERSONAL PROJECTS ================= */}
        <div id="projects" className="scroll-mt-28 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3.5 py-1 border border-purple-500/20 text-purple-400 text-xs font-mono font-medium mb-3">
                <Code2 className="h-3.5 w-3.5" />
                <span>PERSONAL PROJECTS & INFRASTRUCTURE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Featured Engineering Work
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all" as const, label: "All Projects" },
                { id: "infra" as const, label: "Infrastructure" },
                { id: "cloud" as const, label: "Private Cloud & Mesh" },
                { id: "web" as const, label: "Web Engineering" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-black font-semibold shadow-md"
                      : "bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.1] border border-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const ProjectIcon = project.icon;
                return (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-b ${project.gradient} border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all flex flex-col justify-between shadow-xl`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 border border-white/15 text-white">
                          <ProjectIcon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-mono text-gray-400 px-3 py-1 rounded-full bg-black/40 border border-white/5">
                          {project.categoryLabel}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Stat chips */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.stats.map((stat, sIdx) => (
                          <span
                            key={sIdx}
                            className="rounded-xl bg-black/40 border border-white/5 px-3 py-1 text-xs font-mono text-cyan-300"
                          >
                            ✓ {stat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-white/5 flex flex-wrap gap-2 items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] font-mono text-gray-400 px-2 py-0.5 rounded bg-white/[0.04]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* ================= SECTION 5: RESILIENCE & ETHIC HIGHLIGHT ================= */}
        <div id="resilience" className="scroll-mt-28 space-y-8">
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3.5 py-1 border border-amber-500/20 text-amber-400 text-xs font-mono font-medium mb-3">
              <Flame className="h-3.5 w-3.5" />
              <span>OPERATIONAL ENDURANCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              High-Pressure Operations & Resilience
            </h2>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-amber-950/20 via-[#0a0b12] to-black border border-white/10 p-8 sm:p-12 backdrop-blur-2xl shadow-xl">
            <div className="max-w-3xl space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Leadership Under Fire & Extreme Seasonality
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Software development rarely exists in a vacuum. My multi-year background in fast-paced
                seasonal operations taught me that planning is essential, but execution under
                stress is what delivers results. When unexpected anomalies, surge volumes, or urgent
                blockers arise, I operate with absolute composure and systematic triage.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Rapid Crisis Modulation",
                  desc: "Zero panic reaction. Breaking down complex emergencies into actionable, sequential tasks.",
                },
                {
                  title: "Target Persistence",
                  desc: "Relentless ownership from problem identification all the way to complete resolution.",
                },
                {
                  title: "Team Harmony Under Load",
                  desc: "Clear communication, active support, and elevating team morale during high-stakes rushes.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/[0.03] border border-white/5 p-5"
                >
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= SECTION 6: TECHNICAL SKILLS MATRIX ================= */}
        <div className="space-y-10">
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-3">
              <Zap className="h-3.5 w-3.5" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Technical & Operational Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, idx) => {
              const SIcon = skillGroup.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-[#090b14]/70 border border-white/10 p-6 backdrop-blur-xl hover:border-white/20 transition-all flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] border border-white/10">
                        <SIcon className={`h-5 w-5 ${skillGroup.color}`} />
                      </div>
                      <h3 className="text-base font-bold text-white">{skillGroup.category}</h3>
                    </div>

                    <ul className="space-y-2.5">
                      {skillGroup.items.map((item, sIdx) => (
                        <li
                          key={sIdx}
                          className="flex items-center gap-2 text-xs sm:text-sm text-gray-300"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-gray-500">
                    Production Proven
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= SECTION 7: CONTACT & CONNECT ================= */}
        <div
          id="contact"
          className="scroll-mt-28 rounded-3xl bg-gradient-to-tr from-cyan-950/40 via-[#0a0c16] to-purple-950/30 border border-white/15 p-8 sm:p-12 lg:p-16 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>READY FOR NEW OPPORTUNITIES</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Let&apos;s Build Resilient Infrastructure <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                & Exceptional Web Experiences.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Whether you need someone to architect robust self-hosted Linux systems, build modern
              reactive web applications, or bring high-stakes operational work ethic to your team,
              I&apos;m ready to contribute immediately.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              {/* Copy Email Button */}
              <button
                onClick={copyEmail}
                className="flex items-center gap-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3.5 text-sm font-bold transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] active:scale-95"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? "Email Copied to Clipboard!" : "Copy Email Address"}</span>
              </button>

              {/* Direct Mailto */}
              <a
                href="mailto:miltospapageorgiou@gmail.com"
                className="flex items-center gap-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all"
              >
                <Mail className="h-4 w-4 text-gray-300" />
                <span>miltospapageorgiou@gmail.com</span>
              </a>

              {/* LinkedIn & GitHub */}
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white transition-all"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white transition-all"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
