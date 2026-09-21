import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const time = Date.now();
    const cpuUsage = Math.floor(18 + Math.sin(time / 4000) * 6);
    const ramUsage = Math.floor(42 + Math.cos(time / 8000) * 2);

    // Τεχνητή νοημοσύνη / Sentinel status rotation για το 2030 feel
    const aiStatuses = [
        "AI Sentinel: Optimal (0 anomalies)",
        "Tailscale Mesh: WireGuard 256-bit Secure",
        "Auto-Backup: ZFS Snapshot Verified",
        "Containers: 6/6 Microservices Healthy"
    ];
    const currentStatusIndex = Math.floor(time / 6000) % aiStatuses.length;

    return NextResponse.json({
        status: "online",
        node: "Proxmox-VE-Main",
        cpuUsage: `${cpuUsage}%`,
        memoryUsage: `${ramUsage}%`,
        activeContainers: 6,
        tailscaleMesh: "Encrypted Active",
        uptime: "14d 7h 14m",
        aiSentinel: aiStatuses[currentStatusIndex],
        securityGrade: "A+ (Zero Trust)"
    });
}
