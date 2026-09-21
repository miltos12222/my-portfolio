import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Αποτρέπει τη Vercel από το να κάνει cache την απάντηση

export async function GET() {
    // Ρεαλιστική προσομοίωση δεδομένων (Oscillation based on current time)
    const time = Date.now();

    // Το CPU παίζει ομαλά μεταξύ 12% και 28%
    const cpuUsage = Math.floor(20 + Math.sin(time / 5000) * 8);

    // Η RAM παίζει ομαλά μεταξύ 40% και 46%
    const ramUsage = Math.floor(43 + Math.cos(time / 10000) * 3);

    return NextResponse.json({
        status: "online",
        node: "Proxmox-VE-Main",
        cpuUsage: `${cpuUsage}%`,
        memoryUsage: `${ramUsage}%`,
        activeContainers: 6,
        tailscaleMesh: "Encrypted Active",
        uptime: "14d 7h 12m",
    });
}
