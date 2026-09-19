"use client";

import { MotionValue, useTransform, motion } from "framer-motion";
import {
  Server,
  Cpu,
  Boxes,
  Cloud,
  Network,
  Command,
  Flame,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Zap,
  User,
} from "lucide-react";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Stage 1: Hero (0% - 25%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.04, 0.2, 0.27], [1, 1, 0.9, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.27], [0, -50]);
  const heroScale = useTransform(scrollYProgress, [0, 0.27], [1, 0.95]);

  // Stage 2: Infrastructure & Systems (28% - 53%)
  const infraOpacity = useTransform(scrollYProgress, [0.26, 0.32, 0.5, 0.56], [0, 1, 1, 0]);
  const infraY = useTransform(scrollYProgress, [0.26, 0.32, 0.5, 0.56], [60, 0, 0, -50]);
  const infraScale = useTransform(scrollYProgress, [0.26, 0.32, 0.56], [0.95, 1, 0.96]);

  // Stage 3: Experience & Resilience (57% - 79%)
  const expOpacity = useTransform(scrollYProgress, [0.57, 0.63, 0.77, 0.82], [0, 1, 1, 0]);
  const expY = useTransform(scrollYProgress, [0.57, 0.63, 0.77, 0.82], [60, 0, 0, -50]);
  const expScale = useTransform(scrollYProgress, [0.57, 0.63, 0.82], [0.95, 1, 0.96]);

  // Stage 4: About Me / Profile & Vision (83% - 100%)
  const aboutOpacity = useTransform(scrollYProgress, [0.83, 0.88, 0.97, 1], [0, 1, 1, 0.95]);
  const aboutY = useTransform(scrollYProgress, [0.83, 0.88, 1], [60, 0, -20]);
  const aboutScale = useTransform(scrollYProgress, [0.83, 0.88, 1], [0.95, 1, 1]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex h-screen w-full flex-col justify-between p-4 sm:p-8 md:p-12 lg:p-16">
      {/* ================= STAGE 1: HERO OVERLAY (0% - 25%) ================= */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        className="my-auto mx-auto flex w-full max-w-4xl flex-col items-center text-center justify-center pt-16 md:pt-20"
      >
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-4 py-1.5 border border-white/10 backdrop-blur-xl shadow-lg mb-6">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] md:text-xs font-mono font-medium text-gray-300 tracking-wider uppercase">
            Computer Science Graduate • Systems & Web
          </span>
        </div>

        {/* Primary Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] drop-shadow-2xl">
          Miltos <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Papageorgiou
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-2xl text-base sm:text-xl md:text-2xl font-light text-gray-300 leading-relaxed px-4">
          Computer Science Graduate <span className="text-cyan-400">|</span> Infrastructure & Web
          Developer
        </p>

        {/* Highlights Bar */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 px-4">
          {[
            { label: "Ultra-Productive", icon: Zap, color: "text-amber-400" },
            { label: "Adaptable Mindset", icon: Sparkles, color: "text-cyan-400" },
            { label: "Team-Oriented Leader", icon: ShieldCheck, color: "text-indigo-400" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-xl bg-black/40 backdrop-blur-md px-3.5 py-1.5 border border-white/10 shadow-sm"
              >
                <Icon className={`h-3.5 w-3.5 ${item.color}`} />
                <span className="text-xs font-medium text-gray-200">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Scroll indicator prompt */}
        <div className="mt-12 flex flex-col items-center gap-2 text-gray-400">
          <span className="text-[11px] font-mono tracking-widest uppercase text-gray-400">
            Scroll to scrub journey
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 p-1"
          >
            <div className="h-1.5 w-1 rounded-full bg-cyan-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* ================= STAGE 2: INFRASTRUCTURE & SYSTEMS (28% - 53%) ================= */}
      <motion.div
        style={{ opacity: infraOpacity, y: infraY, scale: infraScale }}
        className="my-auto mx-auto w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pt-10"
      >
        <div className="max-w-xl text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3.5 py-1 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-4">
            <Server className="h-3.5 w-3.5" />
            <span>01 / INFRASTRUCTURE MATRIX</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-xl">
            Self-Hosted Infrastructure <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              & Systems Engineering
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            Architecting robust, low-latency private cloud infrastructure. From bare-metal Proxmox
            virtualization to containerized microservices connected via encrypted mesh networks.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {[
              { name: "Linux Administration", icon: Cpu, badge: "Kernel Tuning" },
              { name: "Proxmox VE Cluster", icon: Server, badge: "Virtualization" },
              { name: "Docker LXC Containers", icon: Boxes, badge: "Microservices" },
              { name: "Nextcloud Private Cloud", icon: Cloud, badge: "Storage" },
              { name: "Tailscale Mesh VPN", icon: Network, badge: "WireGuard" },
            ].map((tech, idx) => {
              const TechIcon = tech.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 rounded-xl bg-black/50 backdrop-blur-xl border border-white/10 px-3.5 py-2 hover:border-cyan-500/30 transition-all shadow-md"
                >
                  <TechIcon className="h-4 w-4 text-cyan-400 shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-white">{tech.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono">{tech.badge}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/[0.03] border border-white/10 p-3 backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
              <Command className="h-4 w-4" />
            </div>
            <p className="text-xs text-gray-300">
              <span className="font-semibold text-white">macOS Power-User & Workflow:</span>{" "}
              Hyper-productive terminal environment, custom automation scripts, and ergonomic
              developer tooling.
            </p>
          </div>
        </div>

        {/* Live-style Telemetry Card */}
        <div className="hidden lg:flex flex-col w-72 rounded-2xl bg-[#090b12]/80 border border-white/10 p-5 backdrop-blur-2xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs font-mono text-gray-400">NODE: pve-master</span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-gray-400 mb-1">
                <span>CPU Load</span>
                <span className="text-cyan-400 font-semibold">14.2%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 w-[14.2%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-400 mb-1">
                <span>RAM Usage</span>
                <span className="text-indigo-400 font-semibold">28.6 / 64 GB</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[45%]" />
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 text-[11px] text-gray-400 space-y-1">
              <div className="flex justify-between">
                <span>Active LXCs:</span>
                <span className="text-white">12 Running</span>
              </div>
              <div className="flex justify-between">
                <span>Mesh Uptime:</span>
                <span className="text-white">99.98%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================= STAGE 3: EXPERIENCE & RESILIENCE (57% - 79%) ================= */}
      <motion.div
        style={{ opacity: expOpacity, y: expY, scale: expScale }}
        className="my-auto mx-auto w-full max-w-4xl flex flex-col items-center md:items-start text-center md:text-left pt-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3.5 py-1 border border-amber-500/20 text-amber-400 text-xs font-mono font-medium mb-4">
          <Flame className="h-3.5 w-3.5" />
          <span>02 / GRIT & EXECUTION</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-xl">
          High-Pressure Execution <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
            & Unshakeable Work Ethic
          </span>
        </h2>

        <p className="mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
          Forged through multi-year experience in fast-paced hospitality & high-demand seasonal
          operations. Developing rapid stress modulation, relentless learning curves, and absolute
          target persistence when failure is not an option.
        </p>

        {/* Metric Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {[
            {
              stat: "Multi-Year",
              title: "High-Volume Operations",
              desc: "Managing peak seasonal rushes with calm decisiveness and team harmony.",
            },
            {
              stat: "100%",
              title: "Target Persistence",
              desc: "Relentless ownership from problem identification to resolution under deadlines.",
            },
            {
              stat: "< 0s",
              title: "Panic Threshold",
              desc: "Cool-headed triage of unexpected blockers, server disruptions, or crisis loads.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 p-5 text-left shadow-lg"
            >
              <span className="text-2xl sm:text-3xl font-mono font-black text-amber-400">
                {item.stat}
              </span>
              <h4 className="mt-2 text-sm font-bold text-white">{item.title}</h4>
              <p className="mt-1 text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ================= STAGE 4: ABOUT ME / PROFILE & VISION (83% - 100%) ================= */}
      <motion.div
        style={{ opacity: aboutOpacity, y: aboutY, scale: aboutScale }}
        className="my-auto mx-auto w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pt-10"
      >
        <div className="max-w-xl text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3.5 py-1 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-4">
            <User className="h-3.5 w-3.5" />
            <span>03 / ABOUT ME • ΛΙΓΑ ΛΟΓΙΑ ΓΙΑ ΜΕΝΑ</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-xl">
            Engineering Foundation & <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Continuous Growth Mindset
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            Computer Science graduate blending formal software fundamentals with hands-on systems
            craftsmanship. Driven by extreme day-to-day productivity, self-hosted autonomy, and a
            hunger to engineer scalable, dependable systems.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                title: "Computer Science Degree",
                desc: "Strong algorithmic grounding, system architecture, and modern software engineering.",
                icon: GraduationCap,
                color: "text-cyan-400",
              },
              {
                title: "High Daily Productivity",
                desc: "Disciplined execution, tailored macOS/Linux workflows, and high output velocity.",
                icon: Zap,
                color: "text-amber-400",
              },
              {
                title: "Resilience & Work Ethic",
                desc: "High-pressure background building real-world adaptability and target persistence.",
                icon: ShieldCheck,
                color: "text-emerald-400",
              },
              {
                title: "Self-Hosted Infrastructure",
                desc: "Passionate homelab builder focused on data privacy, Linux, and automated orchestration.",
                icon: Server,
                color: "text-purple-400",
              },
            ].map((box, idx) => {
              const BIcon = box.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 p-4 hover:border-cyan-500/30 transition-all shadow-md"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <BIcon className={`h-4 w-4 ${box.color}`} />
                    <h4 className="text-xs font-bold text-white">{box.title}</h4>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{box.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Profile Card Widget */}
        <div className="hidden lg:flex flex-col w-72 rounded-2xl bg-[#0b0e18]/85 border border-white/10 p-5 backdrop-blur-2xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs font-mono text-gray-300 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-cyan-400" />
              PROFILE OVERVIEW
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
              READY TO WORK
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
              <div className="flex justify-between text-gray-400">
                <span>Degree:</span>
                <span className="text-white font-bold">B.Sc. CompSci</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Location:</span>
                <span className="text-cyan-400">Athens, Greece</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Focus:</span>
                <span className="text-white font-semibold">Infra & Web Dev</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Mindset:</span>
                <span className="text-emerald-400 font-semibold">Problem Solver</span>
              </div>
            </div>

            <div className="text-[11px] text-gray-400 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Autonomous & Fast Learner</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>Calm Under High Pressure</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
