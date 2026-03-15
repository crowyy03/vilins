"use client";

import { useRef, useEffect, useState, useCallback, type RefObject } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { asset } from "@/lib/utils";

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

  // Приводим пути через asset, как у тебя было
  const srcUrl = asset(src);
  const posterUrl = asset(poster);

  const [videoSrc, setVideoSrc] = useState<string>(srcUrl);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let objectUrl = "";
    let isMounted = true;

    const loadVideoAsBlob = async () => {
      try {
        const response = await fetch(srcUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const blob = await response.blob();

        if (isMounted) {
          objectUrl = URL.createObjectURL(blob);
          setVideoSrc(objectUrl);
          setIsLoaded(true);
        }
      } catch (error) {
        console.warn("Blob preload failed, using fallback src:", error);
        if (isMounted) setIsLoaded(true);
      }
    };

    loadVideoAsBlob();

    return () => {
      isMounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [srcUrl]);

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
    if (!isLoaded) return;
    requestAnimationFrame(() => seekTo(v));
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLoaded) return;

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
  }, [seekTo, videoProgress, isLoaded]);

  return (
    <div id={mediaId} className={`absolute inset-0 bg-[#181B20] ${className}`}>
      {/* Постер показывается, пока видео не готово */}
      <img
        src={posterUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          // ВАЖНО: НЕТ z-10, видео лежит под градиентом из StorySection
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
