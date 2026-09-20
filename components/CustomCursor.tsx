"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Αν είναι κινητό (touch screen), μην εμφανίσεις τον κέρσορα
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsHidden(false);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Έλεγχος αν το ποντίκι είναι πάνω από clickable στοιχείο
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, input, textarea, select") !== null;
      setIsHovering(clickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Κεντρική λευκή-κυανή τελεία */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-300 rounded-full pointer-events-none z-[9999] transition-transform duration-75"
        style={{ transform: `translate(${position.x - 4}px, ${position.y - 4}px)` }}
      />
      {/* Εξωτερικός κύκλος με Glow Effect */}
      <div
        className={`fixed top-0 left-0 w-10 h-10 border rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          isHovering
            ? "border-cyan-400 bg-cyan-400/20 scale-150 backdrop-blur-[1px]"
            : "border-cyan-500/40 bg-transparent scale-100"
        }`}
        style={{ transform: `translate(${position.x - 20}px, ${position.y - 20}px)` }}
      />
    </>
  );
}
