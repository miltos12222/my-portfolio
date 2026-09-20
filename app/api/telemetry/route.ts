import { NextResponse } from "next/server";

// Αποθήκευση της στιγμής που ξεκίνησε το API για σταθερό uptime demo
const serverStartTime = Date.now() - (14 * 24 * 60 * 60 * 1000) - (7 * 60 * 60 * 1000); // ~14 μέρες και 7 ώρες uptime

export async function GET() {
    try {
        const uptimeMs = Date.now() - serverStartTime;
        const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((uptimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60));

        const uptimeString = `${days}d ${hours}h ${minutes}m (99.9% SLA)`;

        const telemetryData = {
            status: "online",
            node: "Proxmox-VE-Main",
            cpuUsage: "14%",
            memoryUsage: "42%",
            activeContainers: 6,
            tailscaleMesh: "Connected (Secure)",
            uptime: uptimeString,
            lastUpdated: new Date().toISOString()
        };

        return NextResponse.json(telemetryData, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { status: "error", message: "Failed to fetch telemetry data" },
            { status: 500 }
        );
    }
}
