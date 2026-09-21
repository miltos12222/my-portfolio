"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-50 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
            style={{ scaleX: scrollYProgress }}
        />
    );
}
