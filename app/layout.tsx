import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import LiveChatWidget from "@/components/LiveChatWidget";
import GlobalCart from "@/components/GlobalCart";
import ScrollProgress from "@/components/ScrollProgress";
import MiltosAIAssistant from "@/components/MiltosAIAssistant";

const inter = Inter({ subsets: ["latin", "greek"] });

export const metadata: Metadata = {
  title: "Miltos Papageorgiou | Cloud Infra & Web Developer",
  description: "Μηχανικός Υπολογιστών με εξειδίκευση σε self-hosted υποδομές (Proxmox, Docker) και μοντέρνες Next.js εφαρμογές. Δείτε το live portfolio μου.",
  keywords: ["Miltos Papageorgiou", "Next.js", "Proxmox", "Homelab", "React", "Docker", "Tailscale", "Web Developer Greece", "DevOps"],
  authors: [{ name: "Miltos Papageorgiou" }],
  openGraph: {
    title: "Miltos Papageorgiou | Cloud Infra & Full Stack Developer",
    description: "Hire me: Εξειδίκευση σε Next.js Web Apps & Proxmox/Docker Homelabs. Εξερευνήστε τις υπηρεσίες και το διαδραστικό μου portfolio.",
    url: "https://www.miltospapageorgiou.com/",
    siteName: "Miltos Papageorgiou Portfolio",
    images: [
      {
        url: "https://www.miltospapageorgiou.com/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Miltos Papageorgiou - Cloud & Web Developer",
      },
    ],
    locale: "el_GR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miltos Papageorgiou | Cloud Infra & Full Stack Developer",
    description: "Εξειδίκευση σε Next.js Web Apps & Proxmox/Docker Homelabs.",
    images: ["https://www.miltospapageorgiou.com/profile.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0b0c10] text-[#e5e7eb] antialiased min-h-screen relative`}>
        <ScrollProgress />
        {children}
        <LiveChatWidget />
        <MiltosAIAssistant />
        <GlobalCart />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
