"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Footer } from "@/components/footer";
import { materials, type MaterialEntry } from "@/lib/data";

function MaterialCard({
  material,
  index,
}: {
  material: MaterialEntry;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`grid gap-8 md:grid-cols-2 md:gap-12 ${
        isEven ? "" : "md:[direction:rtl]"
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-sm bg-[#22262D] md:[direction:ltr]">
        <img
          src={material.imageSrc}
          alt={material.title}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-center md:[direction:ltr]">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl md:text-4xl">
          {material.title}
        </h2>
        <p className="mt-4 text-sm font-light leading-[1.7] text-[#A0A7B0]">
          {material.description}
        </p>
        <div className="mt-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
            Применение
          </p>
          <ul className="mt-3 space-y-2">
            {material.useCases.map((uc) => (
              <li
                key={uc}
                className="flex items-center gap-3 text-sm font-light text-[#C6CBD1]"
              >
                <span className="h-1 w-1 rounded-full bg-[#5B6472]" />
                {uc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function MaterialsPage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <main className="bg-[#1C1F26]">
      <section className="flex min-h-[50vh] items-end pb-16 pt-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6B7280]">
              Каталог
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
              Материалы и&nbsp;изделия
            </h1>
            <p className="mt-4 max-w-lg text-base font-light leading-relaxed text-[#8A919C]">
              Каждый металл подбирается под задачу, среду и архитектурную
              концепцию. От сырья до готовых систем.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] space-y-20 px-6 pb-32 md:space-y-28 md:px-10 lg:px-16">
        {materials.map((material, i) => (
          <MaterialCard key={material.title} material={material} index={i} />
        ))}
      </section>

      <Footer />
    </main>
  );
}
