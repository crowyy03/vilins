"use client";

import { useRef, useEffect, useState, useCallback, type RefObject } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface ScrollVideoProps {
  src: string;
  poster: string;
  mediaId: string;
  scrollRef: RefObject<HTMLDivElement | null>;
  className?: string;
}

export function ScrollVideo({
  src,
  poster,
  mediaId,
  scrollRef,
  className = "",
}: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ждём гидратацию, чтобы useScroll не считал высоту = 0
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const videoProgress = useTransform(
    scrollYProgress,
    [0, 0.15, 0.82, 1],
    [0, 0.05, 1, 1]
  );

  const seekTo = useCallback((value: number) => {
    const video = videoRef.current;
    if (!video || !isFinite(video.duration) || isNaN(video.duration)) return;

    const clamped = Math.min(1, Math.max(0, value));
    const target = clamped * video.duration;
    if (isFinite(target)) {
      video.currentTime = target;
    }
  }, []);

  useMotionValueEvent(videoProgress, "change", (v) => {
    if (!isMounted) return;              // не трогаем до полноценного маунта
    requestAnimationFrame(() => seekTo(v));
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isMounted) return;

    const onReady = () => {
      requestAnimationFrame(() => seekTo(videoProgress.get()));
    };

    if (video.readyState >= 2) {
      onReady();
    } else {
      video.addEventListener("loadeddata", onReady);
    }

    return () => {
      video.removeEventListener("loadeddata", onReady);
    };
  }, [isMounted, seekTo, videoProgress]);

  return (
    <div id={mediaId} className={`absolute inset-0 ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
