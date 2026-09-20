import { NextResponse } from "next/server";

export async function GET() {
    try {
        const telemetryData = {
            status: "online",
            node: "Proxmox-VE-Main",
            cpuUsage: "14%",
            memoryUsage: "42%",
            activeContainers: 6,
            tailscaleMesh: "Connected (Secure)",
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

