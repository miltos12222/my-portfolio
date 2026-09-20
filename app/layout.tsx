import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin", "greek"] });

export const metadata: Metadata = {
  title: "Miltos Papageorgiou | Infrastructure & Web Development",
  description: "Computer Science Graduate & Infrastructure Enthusiast. Εξειδίκευση σε self-hosted υποδομές (Proxmox, Docker) και μοντέρνες Next.js εφαρμογές.",
  keywords: ["Miltos Papageorgiou", "Next.js", "Proxmox", "Homelab", "React", "Docker", "Tailscale", "Web Developer Greece", "DevOps"],
  authors: [{ name: "Miltos Papageorgiou" }],
  openGraph: {
    title: "Miltos Papageorgiou | Tech Portfolio",
    description: "Δείτε το portfolio μου με σύγχρονες Web Εφαρμογές (Next.js) & Self-Hosted Υποδομές (Proxmox/Docker).",
    url: "https://www.miltospapageorgiou.com/",
    siteName: "Miltos Papageorgiou Portfolio",
    images: [
      {
        url: "https://www.miltospapageorgiou.com/profile.jpg",
        width: 800,
        height: 600,
        alt: "Miltos Papageorgiou Profile",
      },
    ],
    locale: "el_GR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0b0c10] text-[#e5e7eb] antialiased min-h-screen`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
