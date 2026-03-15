"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/utils";

export function Hero() {
  const heroVideoSrc = asset("/hero.mp4");
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* 
        Используем dangerouslySetInnerHTML, чтобы React не трогал тег video при загрузке.
        Это гарантирует 100% моментальный autoplay при первом заходе.
      */}
      <div
        id="hero_media"
        className="absolute inset-0"
        dangerouslySetInnerHTML={{
          __html: `
            <video
              src="${heroVideoSrc}"
              autoplay
              muted
              loop
              playsinline
              preload="auto"
              style="height: 100%; width: 100%; object-fit: cover;"
            ></video>
          `,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="glass-text select-none text-[64px] font-black uppercase leading-none tracking-[-0.03em] sm:text-[96px] md:text-[120px] lg:text-[160px]"
          data-text="VILINS"
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.08)",
          }}
        >
          VILINS
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
        animate={{ opacity: 1 }}
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
