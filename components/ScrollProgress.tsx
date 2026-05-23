"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (window.scrollY / h) * 100 : 0;
      if (ref.current) ref.current.style.width = p + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div id="scrollbar">
      <span ref={ref} />
    </div>
  );
}
