"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  lobbyElements,
  getProjectsByIds,
  type Project,
} from "@/lib/data";
import { ProjectDrawer } from "@/components/ui/project-drawer";
import { asset } from "@/lib/utils";

export function HotspotSection() {
  const [active, setActive] = useState<string | null>(null);
  const [videoState, setVideoState] = useState<
    "idle" | "opening" | "open" | "closing"
  >("idle");
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const activeElement = lobbyElements.find((e) => e.key === active);
  const activeProjects = activeElement
    ? getProjectsByIds(activeElement.projectIds)
    : [];

  const handleOpen = useCallback((key: string) => {
    setActive(key);
    setOpenProject(null);
    setVideoState("opening");
  }, []);

  const handleClose = useCallback(() => {
    setOpenProject(null);
    setVideoState("closing");
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeElement) return;

    if (videoState === "opening") {
      video.src = asset(activeElement.videoSrc);
      video.currentTime = 0;
      video.playbackRate = 1;
      video
        .play()
        .then(() => setVideoState("open"))
        .catch(() => setVideoState("open"));
    }

    if (videoState === "closing") {
      const duration = video.duration;
      if (!isFinite(duration) || duration === 0) {
        setActive(null);
        setVideoState("idle");
        return;
      }

      video.pause();
      let raf: number;
      const step = () => {
        if (video.currentTime <= 0.01) {
          video.pause();
          setActive(null);
          setVideoState("idle");
          return;
        }
        video.currentTime = Math.max(0, video.currentTime - 0.05);
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);

      return () => cancelAnimationFrame(raf);
    }
  }, [videoState, activeElement]);

  return (
    <section
      id="scene-05"
      className="relative min-h-screen w-full overflow-hidden bg-[#1C1F26]"
      ref={sectionRef}
    >
      {/* Lobby background — real lobby photo */}
      <div className="absolute inset-0">
        <img
          src={asset("/scene/scene-04_video_lobby-final.jpeg")}
          alt="Lobby overview"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#181B20]/80 via-[#181B20]/40 to-[#181B20]/70" />
      </div>

      {/* Element video overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-[1]"
          >
            <video
              ref={videoRef}
              muted
              playsInline
              preload="none"
              poster={activeElement ? asset(activeElement.posterSrc) : undefined}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#181B20]/70 via-[#181B20]/30 to-[#181B20]/60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project detail slide-out */}
      <ProjectDrawer
        project={openProject}
        onClose={() => setOpenProject(null)}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col px-6 py-24 md:flex-row md:items-center md:px-10 lg:px-16">
        {/* Left: hotspots or detail panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative flex-1"
        >
          <AnimatePresence mode="wait">
            {!active && videoState === "idle" && (
              <motion.div
                key="hotspots"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative h-full min-h-[400px] md:min-h-[600px]"
              >
                {lobbyElements.map((el, i) => (
                  <motion.button
                    key={el.key}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    onClick={() => handleOpen(el.key)}
                    className="group absolute flex h-10 w-10 items-center justify-center"
                    style={{
                      top: el.position.top,
                      left: el.position.left,
                    }}
                    aria-label={el.label}
                  >
                    <span className="absolute h-10 w-10 animate-ping rounded-full bg-white/10" />
                    <span className="relative h-3 w-3 rounded-full border border-white/40 bg-white/20 transition-all group-hover:scale-150 group-hover:bg-white/40" />
                  </motion.button>
                ))}
              </motion.div>
            )}

            {active &&
              activeElement &&
              (videoState === "open" || videoState === "opening") && (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="flex min-h-[400px] flex-col justify-center py-8 md:min-h-[600px] md:py-0"
                >
                  <div className="max-w-md rounded-sm border border-white/10 bg-[#1C1F26]/10 p-6 backdrop-blur-md md:p-8">
                    <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {activeElement.label}
                    </h3>
                    <p className="mt-4 text-sm font-light leading-relaxed text-[#A0A7B0]">
                      {activeElement.description}
                    </p>

                    {activeProjects.length > 0 && (
                      <div className="mt-6">
                        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B7280]">
                          Проекты с этим решением
                        </p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {activeProjects.map((p: Project) => (
                            <button
                              key={p.id}
                              onClick={() => setOpenProject(p)}
                              className="group/card overflow-hidden rounded-sm border border-[#5B6472]/20 bg-[#22262D]/60 text-left transition-all hover:border-[#5B6472]/40 hover:bg-[#22262D]/80"
                            >
                              {p.thumb && (
                                <div className="aspect-[3/2] overflow-hidden">
                                  <img
                                    src={asset(p.thumb)}
                                    alt={p.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                                  />
                                </div>
                              )}
                              <div className="p-3">
                                <div className="flex items-baseline justify-between">
                                  <p className="text-[13px] font-medium text-[#E4E6EA]">
                                    {p.title}
                                  </p>
                                  <span className="text-[11px] font-light text-[#6B7280]">
                                    {p.year}
                                  </span>
                                </div>
                                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] font-light text-[#8A919C]">
                                  <span>{p.type}</span>
                                  <span>{p.area}</span>
                                </div>
                                <span className="mt-2 inline-block text-[10px] font-medium tracking-wide text-[#5B6472] transition-colors group-hover/card:text-[#8A919C]">
                                  Подробнее →
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleClose}
                      className="mt-6 text-[12px] font-medium uppercase tracking-[0.1em] text-[#8A919C] transition-colors hover:text-white"
                    >
                      ← Назад к лобби
                    </button>
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        </motion.div>

        {/* Right: element list */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 w-full md:mt-0 md:max-w-[360px] md:pl-10"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#8A919C]">
            05 — Элементы в лобби
          </p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-3xl">
            Что VILINS делает в&nbsp;вашем лобби
          </h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-[#A0A7B0]">
            Каждый элемент получает свой металл, геометрию и узлы крепления.
            Внутри одного лобби всё работает как система.
          </p>

          <div className="mt-8 space-y-5">
            {lobbyElements.map((el, i) => (
              <button
                key={el.key}
                onClick={() =>
                  active === el.key ? handleClose() : handleOpen(el.key)
                }
                className={`group block w-full text-left transition-all ${
                  active === el.key
                    ? "opacity-100"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 text-sm font-semibold text-[#5B6472]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[#E4E6EA] transition-colors group-hover:text-white">
                      {el.label}
                    </p>
                    <p className="mt-1 text-[12px] font-light leading-snug text-[#6B7280]">
                      {el.description.slice(0, 70)}…
                    </p>
                    <span className="mt-1.5 inline-block text-[11px] font-medium tracking-wide text-[#5B6472] transition-colors group-hover:text-[#8A919C]">
                      Смотреть проекты →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
