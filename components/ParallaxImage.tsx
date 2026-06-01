"use client";
import { useEffect, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  speed?: number;
  priority?: boolean;
  imgClassName?: string;
};

export default function ParallaxImage({ src, alt, speed = 14, priority = false, imgClassName = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 (below) .. 1 (above), 0 when centered
      const progress = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${(-progress * speed).toFixed(2)}px, 0)`;
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className="par">
      <img
        src={src}
        alt={alt}
        loading={priority ? undefined : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        className={`w-full h-full object-cover ${imgClassName}`}
        draggable={false}
      />
    </div>
  );
}
