"use client";

import { useState, useEffect } from "react";
import { MapPin, Clock } from "lucide-react";

export default function LocationBadge() {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "Europe/Athens",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            };
            setTime(now.toLocaleTimeString("el-GR", options));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs text-zinc-300 font-mono shadow-sm">
            <div className="flex items-center gap-1.5 text-cyan-400">
                <MapPin className="w-3.5 h-3.5" />
                <span className="font-semibold text-white">Ioannina, GR</span>
            </div>
            <span className="text-zinc-600">|</span>
            <div className="flex items-center gap-1 text-zinc-400">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>{time || "00:00:00"}</span>
            </div>
            <span className="relative flex h-2 w-2 ml-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
        </div>
    );
}
