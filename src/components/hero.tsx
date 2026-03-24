"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { asset } from "@/lib/utils";

const AUTOPLAY_FALLBACK_MS = 4000;
const REVEAL_DELAY_MS = 400;

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showContent, setShowContent] = useState(false);
  const revealedRef = useRef(false);

  const reveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setShowContent(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    let delayTimer: ReturnType<typeof setTimeout>;
    let fallbackTimer: ReturnType<typeof setTimeout>;

    const scheduleReveal = () => {
      if (cancelled || revealedRef.current) return;
      delayTimer = setTimeout(() => {
        if (!cancelled) reveal();
      }, REVEAL_DELAY_MS);
    };

    if (!video.paused && video.readyState >= 3) {
      scheduleReveal();
    } else {
      video.addEventListener("playing", scheduleReveal, { once: true });
    }

    try {
      const p = video.play();
      if (p) p.catch(() => {});
    } catch {
      /* autoplay blocked — fallback timer handles it */
    }

    fallbackTimer = setTimeout(() => {
      if (!cancelled) reveal();
    }, AUTOPLAY_FALLBACK_MS);

    return () => {
      cancelled = true;
      clearTimeout(delayTimer);
      clearTimeout(fallbackTimer);
      video.removeEventListener("playing", scheduleReveal);
    };
  }, [reveal]);

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={asset("/hero.mp4")}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            showContent
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="glass-text select-none text-[64px] font-black uppercase leading-none tracking-[-0.03em] sm:text-[96px] md:text-[120px] lg:text-[160px]"
          data-text="VILINS"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}
        >
          VILINS
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="mt-8 flex flex-col items-center gap-5"
        >
          <p className="text-[28px] font-semibold uppercase tracking-[0.15em] text-white">
            Проектируем - Изготавливаем - Монтируем
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-normal uppercase tracking-[0.2em] text-[#6B7280]">
          Scroll
        </span>
        <span className="text-[14px] text-[#6B7280]">↓</span>
      </motion.div>
    </section>
  );
}
