import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050508",
};

export const metadata: Metadata = {
  title: "Miltos Papageorgiou | Infrastructure & Web Developer",
  description:
    "Portfolio & interactive resume of Miltos Papageorgiou. Computer Science Graduate specializing in self-hosted Linux systems, Proxmox VE, Docker, and modern reactive web development.",
  keywords: [
    "Miltos Papageorgiou",
    "Infrastructure Developer",
    "Web Developer",
    "Computer Science Graduate",
    "Proxmox VE",
    "Docker LXC",
    "Linux Systems",
    "Nextcloud Private Cloud",
    "Next.js",
    "Tailscale WireGuard",
    "ZFS Storage",
  ],
  authors: [{ name: "Miltos Papageorgiou" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-[#050508] text-gray-100 flex flex-col selection:bg-cyan-500/30 selection:text-white">
        {children}
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
