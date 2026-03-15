"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/lib/data";
import { ProjectDrawer } from "@/components/ui/project-drawer";
import { asset } from "@/lib/utils";

interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  items: Project[];
}

interface TimelineProps {
  entries: TimelineEntry[];
}

function TimelineItem({
  entry,
  onProjectClick,
}: {
  entry: TimelineEntry;
  onProjectClick: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="relative grid grid-cols-[80px_1fr] gap-8 pb-24 md:grid-cols-[120px_1fr] md:gap-12"
    >
      <div className="relative flex flex-col items-center">
        <div className="sticky top-32 flex flex-col items-center">
          <div className="h-3 w-3 rounded-full border-2 border-[#4B5563] bg-[#1C1F26]" />
          <span className="mt-3 text-lg font-semibold tracking-tight text-[#E4E6EA] md:text-xl">
            {entry.year}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[#E4E6EA] sm:text-3xl md:text-4xl">
          {entry.title}
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entry.items.map((project) => (
            <button
              key={project.id}
              onClick={() => onProjectClick(project)}
              className="group overflow-hidden rounded-sm border border-[#5B6472]/20 bg-[#22262D]/60 text-left transition-all hover:border-[#5B6472]/40 hover:bg-[#22262D]/80"
            >
              {project.thumb && (
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={asset(project.thumb)}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-sm font-medium text-[#E4E6EA]">
                    {project.title}
                  </h4>
                  <span className="shrink-0 text-[11px] font-light text-[#6B7280]">
                    {project.type}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#8A919C]">
                  <span className="font-light">{project.area}</span>
                  <span className="font-light">{project.timeline}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.scope.map((s) => (
                    <span
                      key={s}
                      className="rounded border border-[#5B6472]/25 px-2 py-0.5 text-[10px] font-light text-[#8A919C]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <span className="mt-3 inline-block text-[10px] font-medium tracking-wide text-[#5B6472] transition-colors group-hover:text-[#8A919C]">
                  Подробнее →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Timeline({ entries }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <ProjectDrawer
        project={openProject}
        onClose={() => setOpenProject(null)}
      />

      <div ref={containerRef} className="relative">
        <div className="absolute left-[39px] top-0 h-full w-[1px] bg-[#22262D] md:left-[59px]">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-transparent via-[#4B8B9C] to-transparent"
          />
        </div>

        <div className="relative">
          {entries.map((entry) => (
            <TimelineItem
              key={entry.year + entry.title}
              entry={entry}
              onProjectClick={setOpenProject}
            />
          ))}
        </div>
      </div>
    </>
  );
}
