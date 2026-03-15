"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollVideo } from "@/components/ui/scroll-video";
import { asset } from "@/lib/utils";

interface Bullet {
  text: string;
}

interface Fact {
  value: string;
  label: string;
}

interface StorySectionProps {
  id: string;
  mediaId: string;
  label: string;
  heading: string;
  headingSize?: "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
  subheading?: string;
  paragraph: string;
  bullets?: Bullet[];
  facts?: Fact[];
  align: "left" | "right";
  videoSrc?: string;
  posterSrc?: string;
  imageSrc?: string;
}

const headingSizeClasses: Record<string, string> = {
  xl: "text-xl sm:text-2xl",
  "2xl": "text-2xl sm:text-3xl",
  "3xl": "text-3xl sm:text-4xl",
  "4xl": "text-3xl sm:text-4xl md:text-5xl",
  "5xl": "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
  "6xl": "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
  "7xl": "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
};

function SectionContent({
  id,
  mediaId,
  label,
  heading,
  headingSize = "5xl",
  subheading,
  paragraph,
  bullets,
  facts,
  align,
  videoSrc,
  posterSrc,
  imageSrc,
  scrollRef,
}: StorySectionProps & { scrollRef: React.RefObject<HTMLDivElement | null> }) {
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, amount: 0.15 });
  const xOffset = align === "left" ? -40 : 40;

  return (
    <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
      {videoSrc && posterSrc ? (
        <>
          <ScrollVideo
            src={videoSrc}
            poster={posterSrc}
            mediaId={mediaId}
            scrollRef={scrollRef}
          />
          <div
            className={`absolute inset-0 z-[1] ${
              align === "left"
                ? "bg-gradient-to-r from-[#181B20]/90 via-[#181B20]/50 to-transparent"
                : "bg-gradient-to-l from-[#181B20]/90 via-[#181B20]/50 to-transparent"
            }`}
          />
        </>
      ) : (
        <div id={mediaId} className="absolute inset-0">
          <img
            src={imageSrc ? asset(imageSrc) : ""}
            alt={heading}
            className="h-full w-full object-cover"
          />
          <div
            className={`absolute inset-0 ${
              align === "left"
                ? "bg-gradient-to-r from-[#181B20]/90 via-[#181B20]/50 to-transparent"
                : "bg-gradient-to-l from-[#181B20]/90 via-[#181B20]/50 to-transparent"
            }`}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, x: xOffset }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`max-w-[460px] ${align === "right" ? "ml-auto" : ""}`}        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#8A919C]">
            {label}
          </p>

          <h2
            className={`mt-4 font-semibold leading-[1.08] tracking-[-0.025em] text-white ${headingSizeClasses[headingSize]}`}
          >
            {heading}
          </h2>

          {subheading && (
            <p className="mt-3 text-sm font-normal leading-relaxed text-[#C6CBD1] sm:text-base">
              {subheading}
            </p>
          )}

          <p className="mt-5 text-sm font-normal leading-relaxed text-[#D0D3D9] sm:text-[15px]">
            {paragraph}
          </p>

          {bullets && bullets.length > 0 && (
            <ul className="mt-5 space-y-2">
              {bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[13px] font-light text-[#C6CBD1] sm:text-sm"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5B6472]" />
                  {b.text}
                </li>
              ))}
            </ul>
          )}

          {facts && facts.length > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-3">
              {facts.map((f, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-base font-semibold tracking-tight text-white sm:text-lg">
                    {f.value}
                  </p>
                  <p className="text-[10px] font-light leading-snug text-[#8A919C] sm:text-[11px]">
                    {f.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export function StorySection(props: StorySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Each section gets ~2.5 viewport heights of scroll distance.
  // The visible content is sticky inside, so the user scrolls through
  // the tall wrapper while the section stays pinned and the video
  // plays smoothly across that scroll range.
  return (
    <div
      ref={scrollContainerRef}
      id={props.id}
      style={{ height: "250vh" }}
      className="relative"
    >
      <SectionContent {...props} scrollRef={scrollContainerRef} />
    </div>
  );
}
