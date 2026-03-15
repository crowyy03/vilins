"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative overflow-hidden bg-[#22262D] py-32 md:py-40">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#4B5563_0%,_transparent_70%)]" />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-16"
      >
        <h2 className="text-3xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-4xl md:text-5xl">
          Разработаем металл
          <br />
          для вашего лобби
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base font-light leading-relaxed text-[#A0A7B0]">
          Расскажите про объект — мы предложим решения по металлу, срокам и
          бюджету.
        </p>
        <Link
          href="/contacts"
          className="mt-10 inline-flex items-center border border-[#5B6472] px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.12em] text-[#E4E6EA] transition-all duration-300 hover:border-[#8A919C] hover:bg-white/5 hover:text-white"
        >
          Обсудить проект
        </Link>
      </motion.div>
    </section>
  );
}
