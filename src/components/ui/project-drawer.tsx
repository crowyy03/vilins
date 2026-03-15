"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/data";
import { asset } from "@/lib/utils";

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-[#5B6472]/20 bg-[#1C1F26] shadow-2xl md:max-w-lg"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#22262D] bg-[#1C1F26]/95 px-6 py-4 backdrop-blur-md">
              <h3 className="text-lg font-semibold tracking-tight text-white">
                {project.title}
              </h3>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-sm text-[#8A919C] transition-colors hover:bg-[#22262D] hover:text-white"
                aria-label="Закрыть"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 px-6 py-6">
              {project.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {project.images.map((img, i) => (
                    <div
                      key={i}
                      className={`overflow-hidden rounded-sm bg-[#22262D] ${
                        i === 0 && project.images.length > 2
                          ? "col-span-2 aspect-[3/2]"
                          : "aspect-[3/2]"
                      }`}
                    >
                      <img
                        src={asset(img)}
                        alt={`${project.title} — ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#5B6472]">
                      Тип
                    </p>
                    <p className="mt-0.5 text-sm font-light text-[#E4E6EA]">
                      {project.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#5B6472]">
                      Площадь
                    </p>
                    <p className="mt-0.5 text-sm font-light text-[#E4E6EA]">
                      {project.area}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#5B6472]">
                      Сроки
                    </p>
                    <p className="mt-0.5 text-sm font-light text-[#E4E6EA]">
                      {project.timeline}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#5B6472]">
                    Что сделали
                  </p>
                  <p className="mt-1.5 text-sm font-light leading-relaxed text-[#A0A7B0]">
                    {project.scope.join(", ")}.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.scope.map((s) => (
                    <span
                      key={s}
                      className="rounded border border-[#5B6472]/25 px-2.5 py-1 text-[11px] font-light text-[#8A919C]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
