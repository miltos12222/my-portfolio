"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MotionValue, useScroll, useTransform, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ScrollyCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  totalFrames?: number;
  onProgressChange?: (progress: number) => void;
  children?: React.ReactNode;
}

export default function ScrollyCanvas({
  containerRef,
  totalFrames = 75,
  onProgressChange,
  children,
}: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const currentFrameRef = useRef(1);
  const rafIdRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 1) to frame index (1 to totalFrames)
  const frameIndex: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    [1, totalFrames]
  );

  const drawCover = useCallback(
    (
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement
    ) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      // Synchronize canvas buffer dimensions with display size & device pixel ratio
      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Compute "cover" scale and center offsets
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      const scale = Math.max(displayWidth / imgWidth, displayHeight / imgHeight);
      const renderWidth = imgWidth * scale;
      const renderHeight = imgHeight * scale;

      const offsetX = (displayWidth - renderWidth) / 2;
      const offsetY = (displayHeight - renderHeight) / 2;

      ctx.clearRect(0, 0, displayWidth, displayHeight);
      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

      ctx.restore();
    },
    []
  );

  // Draw image to canvas using aspect-ratio "cover" with Retina (dpr) scaling
  const renderFrame = useCallback(
    (frameIdx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const idx = Math.min(Math.max(Math.round(frameIdx) - 1, 0), totalFrames - 1);
      const img = imagesRef.current[idx];

      if (!img || !img.complete || img.naturalWidth === 0) {
        // If target frame not ready, find closest loaded frame as graceful fallback
        const fallback = imagesRef.current.find((im) => im && im.complete && im.naturalWidth > 0);
        if (!fallback) return;
        drawCover(canvas, ctx, fallback);
        return;
      }

      drawCover(canvas, ctx, img);
    },
    [totalFrames, drawCover]
  );

  // Preload all frames sequentially & eagerly
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const imageList: HTMLImageElement[] = [];

    // Initialize array slots
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameStr = String(i).padStart(3, "0");
      img.src = `/frames/frame_${frameStr}.png`;

      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        const percent = Math.round((loadedCount / totalFrames) * 100);
        setLoadProgress(percent);

        // Mark as ready once the first 10 frames or 30% are loaded for immediate interactive feedback
        if (loadedCount === 1) {
          renderFrame(1);
        }
        if (loadedCount >= Math.min(15, totalFrames)) {
          setIsReady(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount >= 10) setIsReady(true);
      };

      imageList.push(img);
    }

    imagesRef.current = imageList;

    return () => {
      isMounted = false;
    };
  }, [totalFrames, renderFrame]);

  // Handle frame updates on scroll with requestAnimationFrame
  useEffect(() => {
    const unsubscribeScroll = scrollYProgress.on("change", (p) => {
      if (onProgressChange) onProgressChange(p);
    });

    const unsubscribeIndex = frameIndex.on("change", (latest) => {
      currentFrameRef.current = latest;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        renderFrame(currentFrameRef.current);
      });
    });

    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribeScroll();
      unsubscribeIndex();
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [frameIndex, scrollYProgress, renderFrame, onProgressChange]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050508]">
      {/* HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: isReady ? 1 : 0 }}
      />

      {/* Cinematic Vignette & Ambient Radial Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/40" />
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-[#050508]/20 to-[#050508]/80" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-transparent" />

      {/* Preloader Screen */}
      {!isReady && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#050508] px-6">
          <div className="glass-panel-glow flex flex-col items-center gap-4 rounded-3xl p-8 max-w-sm w-full text-center">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
              <Loader2 className="h-7 w-7 animate-spin text-cyan-400" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white tracking-wide">
                Initializing Visual Pipeline
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                Streaming high-definition sequence • {loadProgress}%
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${loadProgress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Children (e.g. Scrollytelling Overlays) */}
      {children}
    </div>
  );
}
