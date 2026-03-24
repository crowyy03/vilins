"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type RefObject,
} from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { asset } from "@/lib/utils";

interface ScrollVideoProps {
  src: string;
  poster: string;
  mediaId: string;
  scrollRef: RefObject<HTMLDivElement | null>;
  className?: string;
}

/**
 * Draws `img` onto `ctx` using object-fit:cover logic — the image
 * fills the canvas completely, cropping overflow symmetrically.
 */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = cw / ch;
  let sx: number, sy: number, sw: number, sh: number;

  if (ir > cr) {
    sh = img.naturalHeight;
    sw = sh * cr;
    sx = (img.naturalWidth - sw) / 2;
    sy = 0;
  } else {
    sw = img.naturalWidth;
    sh = sw / cr;
    sx = 0;
    sy = (img.naturalHeight - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

export function ScrollVideo({
  src,
  poster,
  mediaId,
  scrollRef,
  className = "",
}: ScrollVideoProps) {
  /*
   * Derive frames directory from video src.
   * "/scene/scene-01_video_blueprint.mp4" → "/frames/scene-01_video_blueprint"
   */
  const framesDir = useMemo(() => {
    const filename = src.replace(/^.*\//, "").replace(/\.[^.]+$/, "");
    return `/frames/${filename}`;
  }, [src]);

  const posterUrl = asset(poster);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const totalRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const lastIdxRef = useRef(-1);

  const [ready, setReady] = useState(false);

  /* ── Scroll tracking via Framer Motion ── */

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(
    scrollYProgress,
    [0, 0.15, 0.82, 1],
    [0, 0.05, 1, 1],
  );

  /* ── Canvas sizing (HiDPI-aware, capped at 2×) ── */

  const syncSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      ctxRef.current = canvas.getContext("2d", { alpha: false });
      lastIdxRef.current = -1;
    }
  }, []);

  /* ── Draw single frame ── */

  const drawFrame = useCallback(
    (targetIdx: number) => {
      syncSize();

      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      const frames = framesRef.current;
      const total = totalRef.current;
      if (!canvas || !ctx || total === 0) return;

      const clamped = Math.max(0, Math.min(total - 1, targetIdx));
      if (clamped === lastIdxRef.current) return;

      let idx = clamped;
      const frame = frames[idx];
      if (!frame?.complete || !frame.naturalWidth) {
        for (let d = 1; d < total; d++) {
          const lo = idx - d;
          const hi = idx + d;
          if (lo >= 0 && frames[lo]?.complete && frames[lo].naturalWidth) {
            idx = lo;
            break;
          }
          if (hi < total && frames[hi]?.complete && frames[hi].naturalWidth) {
            idx = hi;
            break;
          }
        }
        const fallback = frames[idx];
        if (!fallback?.complete || !fallback.naturalWidth) return;
      }

      drawCover(ctx, frames[idx], canvas.width, canvas.height);
      lastIdxRef.current = clamped;
    },
    [syncSize],
  );

  /* ── Load frame sequence ── */

  useEffect(() => {
    let cancelled = false;

    fetch(asset(`${framesDir}/count.txt`))
      .then((r) => {
        if (!r.ok) throw new Error("no frames");
        return r.text();
      })
      .then((text) => {
        if (cancelled) return;

        const count = parseInt(text.trim(), 10);
        if (isNaN(count) || count < 1) throw new Error("bad count");

        totalRef.current = count;
        const imgs: HTMLImageElement[] = new Array(count);
        framesRef.current = imgs;

        let loaded = 0;

        for (let i = 0; i < count; i++) {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => {
            if (cancelled) return;
            loaded++;
            if (loaded === 1) {
              setReady(true);
              const p = progress.get();
              drawFrame(Math.round(p * (count - 1)));
            }
          };
          img.src = asset(
            `${framesDir}/${String(i + 1).padStart(3, "0")}.webp`,
          );
          imgs[i] = img;
        }
      })
      .catch(() => {
        /* Frames not extracted — poster stays visible */
      });

    return () => {
      cancelled = true;
      framesRef.current = [];
      totalRef.current = 0;
      lastIdxRef.current = -1;
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = undefined;
      }
    };
  }, [framesDir, drawFrame, progress]);

  /* ── Scroll → requestAnimationFrame → drawFrame ── */

  useMotionValueEvent(progress, "change", (v) => {
    if (!ready || totalRef.current === 0) return;
    if (rafRef.current != null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = undefined;
      drawFrame(Math.round(v * (totalRef.current - 1)));
    });
  });

  /* ── Redraw on container resize ── */

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ro = new ResizeObserver(() => {
      lastIdxRef.current = -1;
      if (ready && totalRef.current > 0) {
        const p = progress.get();
        drawFrame(Math.round(p * (totalRef.current - 1)));
      }
    });

    ro.observe(canvas);
    return () => ro.disconnect();
  }, [ready, drawFrame, progress]);

  /* ── Render ── */

  return (
    <div
      id={mediaId}
      className={`absolute inset-0 bg-[#181B20] ${className}`}
    >
      <img
        src={posterUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: ready ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 0.4s ease",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
