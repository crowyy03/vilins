"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Timeline } from "@/components/ui/timeline";
import { Footer } from "@/components/footer";
import { projects } from "@/lib/data";

function groupProjectsByYear() {
  const grouped = new Map<number, typeof projects>();
  for (const p of projects) {
    const list = grouped.get(p.year) || [];
    list.push(p);
    grouped.set(p.year, list);
  }

  return Array.from(grouped.entries())
    .sort(([a], [b]) => b - a)
    .map(([year, items]) => ({
      year: String(year),
      title: items.map((i) => i.title).join(", "),
      description: items
        .map(
          (i) =>
            `${i.title} (${i.type}, ${i.area}): ${i.scope.join(", ").toLowerCase()}.`
        )
        .join(" "),
      items,
    }));
}

const timelineEntries = groupProjectsByYear();

export default function ProjectsPage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <main className="bg-[#1C1F26]">
      <section className="flex min-h-[60vh] items-end pb-16 pt-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6B7280]">
              Портфолио
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Проекты VILINS
            </h1>
            <p className="mt-4 max-w-lg text-base font-light leading-relaxed text-[#8A919C]">
              Реализованные лобби и фасады в хронологическом порядке.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-32 md:px-10 lg:px-16">
        <Timeline entries={timelineEntries} />
      </section>

      <Footer />
    </main>
  );
}
